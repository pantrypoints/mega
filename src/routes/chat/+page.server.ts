import { fail, redirect } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';
import { message, user } from '$lib/server/db/schema';

// 💡 Ensure all necessary Drizzle imports are here
import { eq, or, and, asc, desc, sql, count } from 'drizzle-orm'; 
import { encodeBase32LowerCase } from '@oslojs/encoding';


function generateId() {
   const bytes = crypto.getRandomValues(new Uint8Array(15));
   return encodeBase32LowerCase(bytes);
}




export const load = async ({ locals, url, platform }) => {
   if (!locals.user) throw redirect(302, '/login');
   
   const db = getDb(platform?.env); // ← IMPORTANT
   const myId = locals.user.id;
   const receiverId = url.searchParams.get('with');

   // NOTE: The unread message count is now fetched in +layout.server.ts, 
   // but we still need the load function here to MARK MESSAGES AS READ.

   // 1. Fetch contacts
   const myMessages = await db
      .select({
         sender: message.sender,
         receiver: message.receiver,
         date: message.dateCreated
      })
      .from(message)
      .where(or(eq(message.sender, myId), eq(message.receiver, myId)))
      .orderBy(desc(message.dateCreated));

   const contactIds = new Set<string>();
   for (const msg of myMessages) {
      if (msg.sender !== myId) contactIds.add(msg.sender);
      if (msg.receiver !== myId) contactIds.add(msg.receiver);
   }

   let contacts = [];
   if (contactIds.size > 0) {
      contacts = await db
         .select({ id: user.id, username: user.username, avatar: user.avatar, codename: user.codename })
         .from(user)
         .where(sql`${user.id} IN ${Array.from(contactIds)}`);
   }

   // 2. Active conversation
   let conversation = [];
   let activeReceiver = null;

   if (receiverId) {
      const receiverRows = await db
         .select({ id: user.id, username: user.username, avatar: user.avatar, codename: user.codename })
         .from(user)
         .where(eq(user.id, receiverId));
      activeReceiver = receiverRows[0];

      if (activeReceiver) {
         // Fetch conversation
         conversation = await db
            .select()
            .from(message)
            .where(or(
               and(eq(message.sender, myId), eq(message.receiver, receiverId)),
               and(eq(message.sender, receiverId), eq(message.receiver, myId))
            ))
            .orderBy(asc(message.dateCreated));

         // 💡 Mark all received messages in this conversation as read
         await db
            .update(message)
            .set({ isRead: true })
            .where(and(
               eq(message.receiver, myId), 
               eq(message.sender, receiverId), 
               eq(message.isRead, false)
            ));
         // The polling in the layout will automatically update the FAB's unread count shortly after.
      }
   }

   return {
      user: locals.user,
      contacts,
      activeReceiver,
      conversation,
      // unreadMessageCount is inherited from +layout.server.ts
   };
};

export const actions = {
   sendMessage: async ({ request, locals, url, platform }) => {
      if (!locals.user) return fail(401);
      const db = getDb(platform?.env); // ← IMPORTANT
      const data = await request.formData();
      const content = data.get('content')?.toString();
      const receiverId = url.searchParams.get('with');

      if (!content || !receiverId) return fail(400, { message: 'Missing content or receiver' });

      const myId = locals.user.id;
      // ... (message limit logic remains the same) ...
      const existingMessages = await db
         .select({ id: message.id })
         .from(message)
         .where(or(
            and(eq(message.sender, myId), eq(message.receiver, receiverId)),
            and(eq(message.sender, receiverId), eq(message.receiver, myId))
         ))
         .orderBy(asc(message.dateCreated));
      if (existingMessages.length >= 10) {
         const oldestMessageId = existingMessages[0].id;
         await db.delete(message).where(eq(message.id, oldestMessageId));
      }

      // New message insert: isRead will automatically default to 0 (unread)
      await db.insert(message).values({ id: generateId(), content, sender: myId, receiver: receiverId });

      return { success: true };
   },

   deleteMessage: async ({ request, locals, platform }) => {
      // ... (deleteMessage logic remains the same) ...
      if (!locals.user) return fail(401);
      const db = getDb(platform?.env); // ← IMPORTANT
      const data = await request.formData();
      const messageId = data.get('messageId')?.toString();
      if (!messageId) return fail(400);

      const [msg] = await db
         .select()
         .from(message)
         .where(and(eq(message.id, messageId), eq(message.sender, locals.user.id)));

      if (msg) {
         await db.delete(message).where(eq(message.id, messageId));
      }

      return { success: true };
   }
};
