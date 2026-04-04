import { getDb } from '$lib/server/db';
import { requests } from '$lib/server/db/schema';
import { getResourceList } from '$lib/server/list';

export const load = async (event) => {
    const data = await getResourceList({ db: getDb(event.platform?.env), table: requests, url: event.url });
    return { ...data };
};

