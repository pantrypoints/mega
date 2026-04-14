import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { user, products, services, wishes, requests } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';

const ADMIN_PASSWORD = '123123';

export const load: PageServerLoad = async ({ url, cookies, platform }) => {
  // Check if authenticated
  const isAuthenticated = cookies.get('admin_auth') === 'true';
  
  if (!isAuthenticated) {
    return { 
      authenticated: false,
      data: null 
    };
  }

  const { getDb } = await import('$lib/server/db');
  const db = getDb(platform?.env);

  // Pagination params
  const page = parseInt(url.searchParams.get('page') || '1');
  const tab = url.searchParams.get('tab') || 'users';
  const perPage = 50;
  const offset = (page - 1) * perPage;

  try {
    let data: any = {};

    // Load data based on active tab
    switch (tab) {
      case 'users': {
        const allUsers = await db
          .select()
          .from(user)
          .orderBy(desc(user.dateCreated))
          .limit(perPage)
          .offset(offset);
        
        // Remove password hash from results
        const usersWithoutPassword = allUsers.map(({ passwordHash, ...rest }) => rest);
        
        data.users = usersWithoutPassword;
        break;
      }
      
      case 'products': {
        data.products = await db
          .select()
          .from(products)
          .orderBy(desc(products.dateCreated))
          .limit(perPage)
          .offset(offset);
        break;
      }
      
      case 'services': {
        data.services = await db
          .select()
          .from(services)
          .orderBy(desc(services.dateCreated))
          .limit(perPage)
          .offset(offset);
        break;
      }
      
      case 'wishes': {
        data.wishes = await db
          .select()
          .from(wishes)
          .orderBy(desc(wishes.dateCreated))
          .limit(perPage)
          .offset(offset);
        break;
      }
      
      case 'requests': {
        data.requests = await db
          .select()
          .from(requests)
          .orderBy(desc(requests.dateCreated))
          .limit(perPage)
          .offset(offset);
        break;
      }
    }

    return {
      authenticated: true,
      data,
      currentTab: tab,
      currentPage: page,
      perPage
    };
  } catch (error) {
    console.error('Admin load error:', error);
    return {
      authenticated: true,
      data: {},
      currentTab: tab,
      currentPage: page,
      perPage
    };
  }
};

export const actions: Actions = {
  login: async ({ request, cookies }) => {
    const formData = await request.formData();
    const password = formData.get('password')?.toString();

    if (password === ADMIN_PASSWORD) {
      cookies.set('admin_auth', 'true', {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 8 // 8 hours
      });
      return { success: true };
    }

    return fail(401, { message: 'Invalid password' });
  },

  logout: async ({ cookies }) => {
    cookies.delete('admin_auth', { path: '/' });
    throw redirect(303, '/admin');
  },

  exportCSV: async ({ request, platform }) => {
    const { getDb } = await import('$lib/server/db');
    const db = getDb(platform?.env);

    const formData = await request.formData();
    const exportType = formData.get('type')?.toString();

    let data: any[] = [];
    let headers: string[] = [];

    try {
      switch (exportType) {
        case 'users': {
          const allUsers = await db.select().from(user).orderBy(desc(user.dateCreated));
          // Remove password hash
          data = allUsers.map(({ passwordHash, ...rest }) => rest);
          headers = Object.keys(data[0] || {});
          break;
        }
        
        case 'products': {
          data = await db.select().from(products).orderBy(desc(products.dateCreated));
          headers = Object.keys(data[0] || {});
          break;
        }
        
        case 'services': {
          data = await db.select().from(services).orderBy(desc(services.dateCreated));
          headers = Object.keys(data[0] || {});
          break;
        }
        
        case 'wishes': {
          data = await db.select().from(wishes).orderBy(desc(wishes.dateCreated));
          headers = Object.keys(data[0] || {});
          break;
        }
        
        case 'requests': {
          data = await db.select().from(requests).orderBy(desc(requests.dateCreated));
          headers = Object.keys(data[0] || {});
          break;
        }
      }

      // Generate CSV
      const csvRows = [];
      csvRows.push(headers.join(','));

      for (const row of data) {
        const values = headers.map(header => {
          const value = row[header];
          const escaped = ('' + value).replace(/"/g, '""');
          return `"${escaped}"`;
        });
        csvRows.push(values.join(','));
      }

      const csvContent = csvRows.join('\n');

      return {
        success: true,
        csv: csvContent,
        filename: `${exportType}_${new Date().toISOString().split('T')[0]}.csv`
      };
    } catch (error) {
      console.error('Export error:', error);
      return fail(500, { message: 'Export failed' });
    }
  }
};

