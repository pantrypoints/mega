import { redirect, fail } from '@sveltejs/kit';
import { requests, services, wishes, products } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { RequestEvent } from '@sveltejs/kit';

type ItemType = 'request' | 'service' | 'wish' | 'product';

export function createDeleteAction(type: ItemType) {
  // Map item type to table
  const table = type === 'request' ? requests 
    : type === 'service' ? services 
    : type === 'wish' ? wishes 
    : products;
  
  // Map item type to redirect path
  const redirectPath = type === 'request' ? '/requests' 
    : type === 'service' ? '/services' 
    : type === 'wish' ? '/wishes' 
    : '/products';
  
  // Map item type to display name
  const itemName = type === 'request' ? 'request' 
    : type === 'service' ? 'service' 
    : type === 'wish' ? 'wish' 
    : 'product';
  
  // Map item type to action name
  const actionName = type === 'request' ? 'deleteRequest' 
    : type === 'service' ? 'deleteService' 
    : type === 'wish' ? 'deleteWish' 
    : 'deleteProduct';
  
  return {
    [actionName]: async ({ params, locals, platform }: RequestEvent) => {
      if (!locals.user) {
        redirect(302, '/login');
      }

      const db = locals.db;
      const itemId = params.id;

      if (!itemId) {
        return fail(400, { message: `Invalid ${itemName} ID` });
      }

      try {
        // Verify ownership
        const existingItem = await db
          .select()
          .from(table)
          .where(eq(table.id, itemId))
          .limit(1);

        if (existingItem.length === 0) {
          return fail(404, { message: `${itemName.charAt(0).toUpperCase() + itemName.slice(1)} not found` });
        }

        if (existingItem[0].userId !== locals.user.id) {
          return fail(403, { message: 'You do not have permission to delete this item' });
        }

        // Delete the item
        await db.delete(table).where(eq(table.id, itemId));
        
      } catch (err) {
        console.error(`Database delete error for ${itemName}:`, err);
        return fail(500, { message: `Could not delete ${itemName}` });
      }

      redirect(303, redirectPath);
    }
  };
}




// import { redirect, fail } from '@sveltejs/kit';
// import { requests, services } from '$lib/server/db/schema';
// import { eq } from 'drizzle-orm';
// import type { RequestEvent } from '@sveltejs/kit';

// type ItemType = 'request' | 'service';


// export function createDeleteAction(type: ItemType) {
//   const table = type === 'request' ? requests : services;
//   const redirectPath = type === 'request' ? '/requests' : '/services';
//   const itemName = type === 'request' ? 'request' : 'service';
//   const actionName = type === 'request' ? 'deleterequest' : 'deleteService';
  
//   return {
//     [actionName]: async ({ params, locals, platform }: RequestEvent) => {
//       if (!locals.user) {
//         redirect(302, '/login');
//       }

//       const db = locals.db;
//       const itemId = params.id;

//       if (!itemId) {
//         return fail(400, { message: `Invalid ${itemName} ID` });
//       }

//       try {
//         // Verify ownership
//         const existingItem = await db
//           .select()
//           .from(table)
//           .where(eq(table.id, itemId))
//           .limit(1);

//         if (existingItem.length === 0) {
//           return fail(404, { message: `${itemName.charAt(0).toUpperCase() + itemName.slice(1)} not found` });
//         }

//         if (existingItem[0].userId !== locals.user.id) {
//           return fail(403, { message: 'You do not have permission to delete this item' });
//         }

//         // Delete
//         await db.delete(table).where(eq(table.id, itemId));
        
//       } catch (err) {
//         console.error(`Database delete error for ${itemName}:`, err);
//         return fail(500, { message: `Could not delete ${itemName}` });
//       }

//       redirect(303, redirectPath);
//     }
//   };
// }