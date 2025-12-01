import type { PageServerLoad } from './$types';
import { getDb } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { like, asc, desc } from 'drizzle-orm';


export const load: PageServerLoad = async ({ platform, url }) => {
  try {
    const db = getDb(platform?.env);
    
    const searchQuery = url.searchParams.get('search') || '';
    const sortBy = url.searchParams.get('sort') || 'dateCreated';
    const sortDirection = url.searchParams.get('direction') || 'desc';

    let query = db.select().from(user);

    // Apply search filter
    if (searchQuery) {
      query = query.where(
        like(user.username, `%${searchQuery}%`)
      ) as any;
    }

    // Apply sorting
    const sortColumn = sortBy === 'username' ? user.username : user.dateCreated;
    const sortFn = sortDirection === 'asc' ? asc : desc;
    
    query = query.orderBy(sortFn(sortColumn)) as any;

    const users = await query;

    return {
      users: users || [],
      search: searchQuery,
      sort: sortBy,
      direction: sortDirection,
      error: null
    };
  } catch (err) {
    console.error('Error loading users:', err);
    return {
      users: [],
      search: '',
      sort: 'dateCreated',
      direction: 'desc',
      error: 'Failed to load users. Please try again later.'
    };
  }
};

