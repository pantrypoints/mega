import { getDb } from '$lib/server/db';
import { products } from '$lib/server/db/schema';
import { getResourceList } from '$lib/server/list';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async (event) => {

    // Uses the DRY helper to handle search, sort, and table selection
    const data = await getResourceList({ 
        db: getDb(event.platform?.env), 
        table: products, 
        url: event.url 
    });

    return { ...data };
};


