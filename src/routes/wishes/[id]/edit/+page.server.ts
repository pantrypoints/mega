import { createEditLoader, createEditAction } from '$lib/server/editproduct';
import type { Actions } from './$types';

export const load = createEditLoader('wish');

export const actions: Actions = {
  default: createEditAction('wish')
};
