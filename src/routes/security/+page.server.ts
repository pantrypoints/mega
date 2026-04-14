import { error, fail, redirect } from '@sveltejs/kit';
import * as bcrypt from 'bcryptjs';
import type { Actions, PageServerLoad } from './$types';
import { getDb } from '$lib/server/db';
import { user as userTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals, platform }) => {
    if (!locals.user) throw redirect(302, '/login');
    
    return { user: locals.user };
};

export const actions: Actions = {
    // Change Password - requires codename + pin verification
    changePassword: async ({ request, locals, platform }) => {
        if (!locals.user) return fail(401, { message: 'Unauthorized' });
        
        const db = getDb(platform?.env);
        const formData = await request.formData();
        
        const codename = formData.get('codename') as string;
        const pin = formData.get('pin') as string;
        const newPassword = formData.get('newPassword') as string;
        const confirmPassword = formData.get('confirmPassword') as string;
        
        if (!codename || !pin || !newPassword || !confirmPassword) {
            return fail(400, { message: 'All fields are required' });
        }
        
        if (newPassword !== confirmPassword) {
            return fail(400, { message: 'New passwords do not match' });
        }
        
        if (newPassword.length < 6) {
            return fail(400, { message: 'Password must be at least 6 characters' });
        }
        
        // Verify user's codename and pin
        const [user] = await db
            .select()
            .from(userTable)
            .where(eq(userTable.id, locals.user.id));
        
        if (!user || user.codename !== codename) {
            return fail(400, { message: 'Invalid codename' });
        }
        
        const pinValid = await bcrypt.compare(pin, user.pin);
        if (!pinValid) {
            return fail(400, { message: 'Invalid PIN' });
        }
        
        // Update password
        const passwordHash = await bcrypt.hash(newPassword, 10);
        await db.update(userTable)
            .set({ passwordHash, dateModified: new Date().toISOString() })
            .where(eq(userTable.id, locals.user.id));
        
        return { success: true, message: 'Password changed successfully' };
    },
    
    // Change PIN - requires codename + password verification
    changePin: async ({ request, locals, platform }) => {
        if (!locals.user) return fail(401, { message: 'Unauthorized' });
        
        const db = getDb(platform?.env);
        const formData = await request.formData();
        
        const codename = formData.get('codename') as string;
        const currentPassword = formData.get('currentPassword') as string;
        const newPin = formData.get('newPin') as string;
        const confirmPin = formData.get('confirmPin') as string;
        
        if (!codename || !currentPassword || !newPin || !confirmPin) {
            return fail(400, { message: 'All fields are required' });
        }
        
        if (newPin !== confirmPin) {
            return fail(400, { message: 'New PINs do not match' });
        }
        
        if (!/^[0-9]{4,8}$/.test(newPin)) {
            return fail(400, { message: 'PIN must be 4-8 digits' });
        }
        
        // Verify user's codename and password
        const [user] = await db
            .select()
            .from(userTable)
            .where(eq(userTable.id, locals.user.id));
        
        if (!user || user.codename !== codename) {
            return fail(400, { message: 'Invalid codename' });
        }
        
        const passwordValid = await bcrypt.compare(currentPassword, user.passwordHash);
        if (!passwordValid) {
            return fail(400, { message: 'Invalid password' });
        }
        
        // Update PIN
        const pinHash = await bcrypt.hash(newPin, 10);
        await db.update(userTable)
            .set({ pin: pinHash, dateModified: new Date().toISOString() })
            .where(eq(userTable.id, locals.user.id));
        
        return { success: true, message: 'PIN changed successfully' };
    },
    
    // Change Codename - requires password + pin verification
    changeCodename: async ({ request, locals, platform }) => {
        if (!locals.user) return fail(401, { message: 'Unauthorized' });
        
        const db = getDb(platform?.env);
        const formData = await request.formData();
        
        const currentPassword = formData.get('currentPassword') as string;
        const pin = formData.get('pin') as string;
        const newCodename = formData.get('newCodename') as string;
        const confirmCodename = formData.get('confirmCodename') as string;
        
        if (!currentPassword || !pin || !newCodename || !confirmCodename) {
            return fail(400, { message: 'All fields are required' });
        }
        
        if (newCodename !== confirmCodename) {
            return fail(400, { message: 'New codenames do not match' });
        }
        
        if (!/^[a-zA-Z0-9_-]{3,31}$/.test(newCodename)) {
            return fail(400, { message: 'Codename must be 3-31 characters (letters, numbers, underscore, hyphen)' });
        }
        
        // Check if codename is already taken
        const [existingUser] = await db
            .select()
            .from(userTable)
            .where(eq(userTable.codename, newCodename));
        
        if (existingUser && existingUser.id !== locals.user.id) {
            return fail(400, { message: 'Codename already taken' });
        }
        
        // Verify user's password and pin
        const [user] = await db
            .select()
            .from(userTable)
            .where(eq(userTable.id, locals.user.id));
        
        if (!user) return fail(404, { message: 'User not found' });
        
        const passwordValid = await bcrypt.compare(currentPassword, user.passwordHash);
        if (!passwordValid) {
            return fail(400, { message: 'Invalid password' });
        }
        
        const pinValid = await bcrypt.compare(pin, user.pin);
        if (!pinValid) {
            return fail(400, { message: 'Invalid PIN' });
        }
        
        // Update codename
        await db.update(userTable)
            .set({ codename: newCodename, dateModified: new Date().toISOString() })
            .where(eq(userTable.id, locals.user.id));
        
        return { success: true, message: 'Codename changed successfully' };
    }
};