import * as bcrypt from 'bcryptjs';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import * as auth from '$lib/server/auth';
import * as table from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';


export const load: PageServerLoad = async ({ locals }) => {
  return {
    user: locals.user,
  };
};

export const actions: Actions = {
  login: async (event) => {
    const db = event.locals.db; // ✅ Use db from locals
    
    const formData = await event.request.formData();
    const username = formData.get('username');
    const password = formData.get('password');

    if (!validateUsername(username)) {
      return fail(400, {
        message: 'Invalid username (min 3, max 31 characters, alphanumeric only)'
      });
    }

    if (!validatePassword(password)) {
      return fail(400, {
        message: 'Invalid password (min 6, max 255 characters)'
      });
    }

    const results = await db
      .select()
      .from(table.user)
      .where(eq(table.user.username, username));

    const existingUser = results.at(0);

    if (!existingUser) {
      return fail(400, {
        message: 'Incorrect username or password'
      });
    }

    const validPassword = await bcrypt.compare(
      password as string,
      existingUser.passwordHash
    );

    if (!validPassword) {
      return fail(400, {
        message: 'Incorrect username or password'
      });
    }

    // ✅ Pass db as first parameter
    const sessionToken = auth.generateSessionToken();
    const session = await auth.createSession(db, sessionToken, existingUser.id);
    auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

    return redirect(302, '/');
  },

  logout: async (event) => {
    const db = event.locals.db; // ✅ Use db from locals
    
    if (!event.locals.session) {
      return fail(401);
    }

    // ✅ Pass db as first parameter
    await auth.invalidateSession(db, event.locals.session.id);
    auth.deleteSessionTokenCookie(event);

    throw redirect(302, '/login');
  }
};

function validateUsername(username: unknown): username is string {
  if (typeof username !== "string") return false;

  // 1. No spaces or any whitespace
  if (/\s/.test(username)) return false;

  // 2. Reject emojis (emoji ranges)
  const emojiRegex =
    /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}\u{1F000}-\u{1FFFF}]/u;

  if (emojiRegex.test(username)) return false;

  // 3. Length check
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
// import { db } from '$lib/server/db';
// import * as table from '$lib/server/db/schema';
// import type { Actions, PageServerLoad } from './$types';


// export const load: PageServerLoad = async ({ locals }) => {
//   return {
//     user: locals.user,
//   };
// };

// export const actions: Actions = {
//   login: async (event) => {
//     const formData = await event.request.formData();
//     const username = formData.get('username');
//     const password = formData.get('password');

//     if (!validateUsername(username)) {
//       return fail(400, {
//         message: 'Invalid username (min 3, max 31 characters, alphanumeric only)'
//       });
//     }
//     if (!validatePassword(password)) {
//       return fail(400, { message: 'Invalid password (min 6, max 255 characters)' });
//     }

//     const results = await db.select().from(table.user).where(eq(table.user.username, username));

//     const existingUser = results.at(0);
//     if (!existingUser) {
//       return fail(400, { message: 'Incorrect username or password' });
//     }

//     const validPassword = await bcrypt.compare(password as string, existingUser.passwordHash);

//     if (!validPassword) {
//       return fail(400, { message: 'Incorrect username or password' });
//     }

//     const sessionToken = auth.generateSessionToken();
//     const session = await auth.createSession(sessionToken, existingUser.id);
//     auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

//     return redirect(302, '/');
//   },

//   logout: async (event) => {
//     if (!event.locals.session) {
//       return fail(401);
//     }
//     await auth.invalidateSession(event.locals.session.id);
//     auth.deleteSessionTokenCookie(event);
//     throw redirect(302, '/login');
//   }
// };


// function validateUsername(username: unknown): username is string {
//   return (
//     typeof username === 'string' &&
//     username.length >= 3 &&
//     username.length <= 31 &&
//     /^[a-z0-9_-]+$/.test(username)
//   );
// }

// function validatePassword(password: unknown): password is string {
//   return typeof password === 'string' && password.length >= 6 && password.length <= 255;
// }

