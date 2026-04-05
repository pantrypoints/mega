import { createItemDetailLoader } from '$lib/server/item';
import { createDeleteAction } from '$lib/server/delete';
import type { Actions } from './$types';

export const load = createItemDetailLoader('request');

export const actions: Actions = {
  ...createDeleteAction('request')
};