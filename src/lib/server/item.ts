import { error } from '@sveltejs/kit';
import { requests, services, wishes, products, user } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { getDb } from '$lib/server/db';
import type { PageServerLoad } from './$types';

type ItemType = 'request' | 'wish' | 'service' | 'product';






// Remove 'platform' from the outer function arguments
export function createItemDetailLoader(type: ItemType) {
  const table = type === 'request' ? requests 
    : type === 'wish' ? wishes 
    : type === 'service' ? services 
    : products;
    
  const itemName = type;
  
  // SvelteKit passes { params, locals, platform } to this inner function
  return (async ({ params, locals, platform }) => {
    // 1. Get the DB using the platform env available at RUNTIME
    const db = getDb(platform?.env); 
    
    const currentUserId = locals.user?.id || null;
    const itemId = params.id;

    if (!itemId) {
      throw error(404, `Invalid ${itemName} ID.`);
    }

    // Convert string ID from URL to Number for the DB query
    const numericId = parseInt(itemId, 10);



// export function createItemDetailLoader(type: ItemType) {
//   const table = type === 'request' ? requests 
//     : type === 'wish' ? wishes 
//     : type === 'service' ? services 
//     : products;
    
//   const itemName = type === 'request' ? 'request' 
//     : type === 'wish' ? 'wish' 
//     : type === 'service' ? 'service' 
//     : 'product';
  
//   return (async ({ params, locals }) => {
//     // const db = locals.db;
//     const db = getDb(platform?.env);
//     const currentUserId = locals.user?.id || null;
//     const itemId = params.id;
    
//     if (!itemId) {
//       throw error(404, `Invalid ${itemName} ID.`);
//     }
    
    try {
      // Define which fields to select based on item type
      let selectFields: any;
      
      if (type === 'wish' || type === 'product') {
        // Wishes and Products have amount column
        selectFields = {
          item: {
            id: table.id,
            name: table.name,
            measure: table.measure,
            points: table.points,
            amount: (table as any).amount,
            dateAmountChange: (table as any).dateAmountChange,
            category: table.category,
            photo1: table.photo1,
            photo2: table.photo2,
            photo3: table.photo3,
            description: table.description,
            headline: table.headline,
            status: table.status,
            userId: table.userId,
            dateCreated: table.dateCreated,
            dateModified: table.dateModified
          },
          owner: {
            id: user.id,
            username: user.username,
            avatar: user.avatar,
            slug: user.slug,
          }
        };
      } else {
        // Services and Requests don't have amount column
        selectFields = {
          item: {
            id: table.id,
            name: table.name,
            measure: table.measure,
            points: table.points,
            category: table.category,
            photo1: table.photo1,
            photo2: table.photo2,
            photo3: table.photo3,
            description: table.description,
            headline: table.headline,
            status: table.status,
            userId: table.userId,
            dateCreated: table.dateCreated,
            dateModified: table.dateModified
          },
          owner: {
            id: user.id,
            username: user.username,
            avatar: user.avatar,
            slug: user.slug,
          }
        };
      }

    // Convert itemId to a number for auto-increment tables
    const numericId = parseInt(itemId, 10);
    
    if (isNaN(numericId)) {
        throw error(400, "Invalid ID format. ID must be a number.");
    }

      const result = await db
        .select(selectFields)
        .from(table)
        .leftJoin(user, eq(table.userId, user.id))
        // .where(eq(table.id, itemId))
        .where(eq(table.id, numericId)) // Use numericId here
        .limit(1);
      
      const data = result[0];
      
      if (!data || !data.item) {
        throw error(404, `${itemName.charAt(0).toUpperCase() + itemName.slice(1)} not found.`);
      }
      
      const item = data.item;
      const owner = data.owner;
      
      // Check if current user is the owner
      const isOwner = currentUserId !== null && currentUserId === item.userId;
      
      // Use actual avatar from database, with fallback
      const ownerAvatar = owner?.avatar || '/user.svg';
      
      // Determine max photos based on type
      const maxPhotos = type === 'request' ? 6 : 3;
      const photos = [];
      for (let i = 1; i <= maxPhotos; i++) {
        const photo = item[`photo${i}`];
        if (photo) photos.push(photo);
      }
      
      return {
        [itemName]: {
          ...item,
          photos
        },
        owner: {
          id: owner?.id || item.userId,
          username: owner?.username || 'Unknown User',
          avatar: ownerAvatar,
          slug: owner?.slug
        },
        isOwner,
        currentUserId,
      };
      
    } catch (e) {
      console.error("Database query failed:", e);
      throw error(500, `Could not load ${itemName} data due to a server error.`);
    }
  }) satisfies PageServerLoad;
}



