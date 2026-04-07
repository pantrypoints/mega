import { error } from '@sveltejs/kit';
import { requests, services, wishes, products, user } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

type ItemType = 'request' | 'wish' | 'service' | 'product';


export function createItemDetailLoader(type: ItemType) {
  const table = type === 'request' ? requests 
    : type === 'wish' ? wishes 
    : type === 'service' ? services 
    : products;
    
  const itemName = type === 'request' ? 'request' 
    : type === 'wish' ? 'wish' 
    : type === 'service' ? 'service' 
    : 'product';


  
  return (async ({ params, locals }) => {
    const db = locals.db;
    const currentUserId = locals.user?.id || null;
    const itemId = params.id;
    
    if (!itemId) {
      throw error(404, `Invalid ${itemName} ID.`);
    }
    
    try {
      // Join table with user table to get owner information
      const result = await db
        .select({
          // Select all item fields
          item: table,
          // Select owner information
          owner: {
            id: user.id,
            username: user.username,
            avatar: user.avatar,
            slug: user.slug,
          }
        })
        .from(table)
        .leftJoin(user, eq(table.userId, user.id))
        .where(eq(table.id, itemId))
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




