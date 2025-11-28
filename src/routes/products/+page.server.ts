// src/routes/products/+page.server.ts
import type { PageServerLoad, Actions } from './$types';
import { products, user } from '$lib/server/db/schema';
import { eq, like, asc, desc, sql } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals, url }) => {
  const db = locals.db;
  
  // Get query parameters
  const search = url.searchParams.get('search') || '';
  const sortBy = url.searchParams.get('sort') || 'dateCreated';
  const sortOrder = url.searchParams.get('order') || 'desc';

  // Build query
  let query = db
    .select({
      id: products.id,
      name: products.name,
      measure: products.measure,
      points: products.points,
      category: products.category,
      photo1: products.photo1,
      headline: products.headline,
      dateCreated: products.dateCreated,
      username: user.username
    })
    .from(products)
    .leftJoin(user, eq(products.userId, user.id))
    .$dynamic();

  // Apply search filter
  if (search) {
    query = query.where(like(products.name, `%${search}%`));
  }

  // Apply sorting
  const sortColumn = sortBy === 'name' ? products.name 
    : sortBy === 'points' ? products.points 
    : products.dateCreated;
  
  query = query.orderBy(sortOrder === 'asc' ? asc(sortColumn) : desc(sortColumn));

  const allProducts = await query;

  return {
    products: allProducts,
    search,
    sortBy,
    sortOrder
  };
};