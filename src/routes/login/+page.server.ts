import * as bcrypt from 'bcryptjs';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import { fail, redirect } from '@sveltejs/kit';
import { eq, and } from 'drizzle-orm';
import * as auth from '$lib/server/auth';
import * as table from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

// Track reset attempts per username
const resetAttempts = new Map<string, { count: number; firstAttempt: number }>();

export const load: PageServerLoad = async ({ locals }) => {
    return { user: locals.user };
};

export const actions: Actions = {
    login: async (event) => {
        const db = event.locals.db;
        const formData = await event.request.formData();
        const username = formData.get('username');
        const password = formData.get('password');

        if (!validateUsername(username)) {
            return fail(400, { message: 'Invalid username (min 3, max 31 characters, alphanumeric only)' });
        }
        if (!validatePassword(password)) {
            return fail(400, { message: 'Invalid password (min 6, max 255 characters)' });
        }

        const results = await db
            .select()
            .from(table.user)
            .where(eq(table.user.username, username));

        const existingUser = results.at(0);
        if (!existingUser) {
            return fail(400, { message: 'Incorrect username or password' });
        }

        const validPassword = await bcrypt.compare(password as string, existingUser.passwordHash);
        if (!validPassword) {
            return fail(400, { message: 'Incorrect username or password' });
        }

        const sessionToken = auth.generateSessionToken();
        const session = await auth.createSession(db, sessionToken, existingUser.id);
        auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

        return redirect(302, '/');
    },

    logout: async (event) => {
        const db = event.locals.db;
        if (!event.locals.session) {
            return fail(401);
        }
        await auth.invalidateSession(db, event.locals.session.id);
        auth.deleteSessionTokenCookie(event);
        throw redirect(302, '/login');
    },

    // Step 1: Verify identity
    verifyIdentity: async (event) => {
        const db = event.locals.db;
        const formData = await event.request.formData();
        
        const username = formData.get('username') as string;
        const codename = formData.get('codename') as string;
        const pin = formData.get('pin') as string;
        const gender = formData.get('gender') as string;

        // Check attempts
        const attempts = resetAttempts.get(username);
        if (attempts && attempts.count >= 5) {
            resetAttempts.delete(username);
            throw redirect(303, '/banker');
        }

        const [existingUser] = await db
            .select()
            .from(table.user)
            .where(eq(table.user.username, username));

        if (!existingUser || 
            existingUser.codename !== codename || 
            existingUser.pin !== pin || 
            existingUser.gender !== gender) {
            
            // Record failed attempt
            recordFailedAttempt(username);
            return fail(400, { 
                verified: false,
                message: 'Identity verification failed. Please check your credentials.' 
            });
        }

        // Clear attempts on successful verification
        resetAttempts.delete(username);
        
        return {
            verified: true,
            username: existingUser.username,
            message: 'Identity verified. Please set your new password.'
        };
    },

    // Step 2: Reset password after verification
    resetPassword: async (event) => {
        const db = event.locals.db;
        const formData = await event.request.formData();
        
        const username = formData.get('username') as string;
        const newPassword = formData.get('newPassword') as string;
        const confirmPassword = formData.get('confirmPassword') as string;

        if (!newPassword || !confirmPassword) {
            return fail(400, { message: 'Please fill in both password fields' });
        }

        if (newPassword !== confirmPassword) {
            return fail(400, { message: 'Passwords do not match' });
        }

        if (newPassword.length < 6) {
            return fail(400, { message: 'Password must be at least 6 characters' });
        }

        const [existingUser] = await db
            .select()
            .from(table.user)
            .where(eq(table.user.username, username));

        if (!existingUser) {
            return fail(400, { message: 'User not found' });
        }

        // Update password
        const passwordHash = await bcrypt.hash(newPassword, 10);
        await db.update(table.user)
            .set({ passwordHash })
            .where(eq(table.user.id, existingUser.id));
        
        return { 
            success: true, 
            message: 'Password reset successfully. Please login.' 
        };
    }
};

function recordFailedAttempt(username: string) {
    const now = Date.now();
    const existing = resetAttempts.get(username);
    
    if (existing) {
        // Check if attempts are within 15 minutes
        if (now - existing.firstAttempt < 15 * 60 * 1000) {
            existing.count++;
        } else {
            // Reset if older than 15 minutes
            resetAttempts.set(username, { count: 1, firstAttempt: now });
        }
    } else {
        resetAttempts.set(username, { count: 1, firstAttempt: now });
    }
}

function validateUsername(username: unknown): username is string {
    if (typeof username !== "string") return false;
    if (/\s/.test(username)) return false;
    const emojiRegex = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}\u{1F000}-\u{1FFFF}]/u;
    if (emojiRegex.test(username)) return false;
    if (username.length < 3 || username.length > 20) return false;
    return true;
}

function validatePassword(password: unknown): password is string {
    return typeof password === 'string' && password.length >= 6 && password.length <= 255;
}

// import * as bcrypt from 'bcryptjs';
// import { encodeBase32LowerCase } from '@oslojs/encoding';
// import { fail, redirect } from '@sveltejs/kit';
// import { eq } from 'drizzle-orm';
// import * as auth from '$lib/server/auth';
// import * as table from '$lib/server/db/schema';
// import type { Actions, PageServerLoad } from './$types';


// export const load: PageServerLoad = async ({ locals }) => {
//   return {
//     user: locals.user,
//   };
// };

// export const actions: Actions = {
//   login: async (event) => {
//     const db = event.locals.db; // ✅ Use db from locals
    
//     const formData = await event.request.formData();
//     const username = formData.get('username');
//     const password = formData.get('password');

//     if (!validateUsername(username)) {
//       return fail(400, {
//         message: 'Invalid username (min 3, max 31 characters, alphanumeric only)'
//       });
//     }

//     if (!validatePassword(password)) {
//       return fail(400, {
//         message: 'Invalid password (min 6, max 255 characters)'
//       });
//     }

//     const results = await db
//       .select()
//       .from(table.user)
//       .where(eq(table.user.username, username));

//     const existingUser = results.at(0);

//     if (!existingUser) {
//       return fail(400, {
//         message: 'Incorrect username or password'
//       });
//     }

//     const validPassword = await bcrypt.compare(
//       password as string,
//       existingUser.passwordHash
//     );

//     if (!validPassword) {
//       return fail(400, {
//         message: 'Incorrect username or password'
//       });
//     }

//     // ✅ Pass db as first parameter
//     const sessionToken = auth.generateSessionToken();
//     const session = await auth.createSession(db, sessionToken, existingUser.id);
//     auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

//     return redirect(302, '/');
//   },

//   logout: async (event) => {
//     const db = event.locals.db; // ✅ Use db from locals
    
//     if (!event.locals.session) {
//       return fail(401);
//     }

//     // ✅ Pass db as first parameter
//     await auth.invalidateSession(db, event.locals.session.id);
//     auth.deleteSessionTokenCookie(event);

//     throw redirect(302, '/login');
//   },

//     resetPassword: async (event) => {
//         const db = event.locals.db;
//         const formData = await event.request.formData();
        
//         const username = formData.get('username') as string;
//         const codename = formData.get('codename') as string;
//         const pin = formData.get('pin') as string;
//         const userMonth = formData.get('month'); // 0-11
//         const userYear = formData.get('year');
//         const newPassword = formData.get('newPassword') as string;

//         const [existingUser] = await db.select().from(table.user).where(eq(table.user.username, username));

//         if (!existingUser || existingUser.codename !== codename || existingUser.pin !== pin) {
//             return fail(400, { message: 'Identity verification failed.' });
//         }

//         // Logic for Account Creation Timing
//         const now = new Date();
//         const oneYearAgo = new Date();
//         oneYearAgo.setFullYear(now.getFullYear() - 1);
        
//         const isUnderOneYear = existingUser.createdAt > oneYearAgo;

//         if (isUnderOneYear) {
//             // Verify Month (0-indexed comparison)
//             if (existingUser.createdAt.getMonth() !== parseInt(userMonth as string)) {
//                 return fail(400, { message: 'Incorrect creation month.' });
//             }
//         } else {
//             // Verify Year
//             if (existingUser.createdAt.getFullYear() !== parseInt(userYear as string)) {
//                 return fail(400, { message: 'Incorrect creation year.' });
//             }
//         }

//         // If all pass, update password
//         const passwordHash = await bcrypt.hash(newPassword, 10);
//         await db.update(table.user)
//             .set({ passwordHash })
//             .where(eq(table.user.id, existingUser.id));

//         return { success: true, message: 'Password reset successfully. Please login.' };
//     }
// };


// function validateUsername(username: unknown): username is string {
//   if (typeof username !== "string") return false;

//   // 1. No spaces or any whitespace
//   if (/\s/.test(username)) return false;

//   // 2. Reject emojis (emoji ranges)
//   const emojiRegex =
//     /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}\u{1F000}-\u{1FFFF}]/u;

//   if (emojiRegex.test(username)) return false;

//   // 3. Length check
//   if (username.length < 3 || username.length > 20) return false;

//   return true;
// }


// function validatePassword(password: unknown): password is string {
//   return typeof password === 'string' && password.length >= 6 && password.length <= 255;
// }


