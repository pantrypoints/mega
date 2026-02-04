

// Inside a settings or profile update action
// export const actions = {
//     updateSlug: async ({ request, locals }) => {
//         const session = locals.session;
//         if (!session) return fail(401);

//         const data = await request.formData();
//         const newSlug = (data.get('slug') as string).toLowerCase();

//         // Validate slug format (same as username)
//         if (!/^[a-z0-9_-]{3,31}$/.test(newSlug)) {
//             return fail(400, { message: 'Invalid slug format' });
//         }

//         // Check if the slug is already taken by SOMEONE ELSE
//         const existing = await db
//             .select()
//             .from(table.user)
//             .where(eq(table.user.slug, newSlug))
//             .limit(1);

//         if (existing.length > 0 && existing[0].id !== session.userId) {
//             return fail(400, { message: 'This slug is already in use' });
//         }

//         await db.update(table.user)
//             .set({ slug: newSlug })
//             .where(eq(table.user.id, session.userId));

//         return { success: true };
//     }
// };

