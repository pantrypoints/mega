import type { getDb } from '$lib/server/db';

declare global {
    namespace App {
        interface Platform {
            env: {
                DATABASE_URL: string;
                DATABASE_AUTH_TOKEN: string;
                // Add other env vars as needed
            };
            cf: CfProperties;
            ctx: ExecutionContext;
        }
        interface Locals {
            db: ReturnType<typeof getDb>;
            user: import('$lib/server/auth').SessionValidationResult['user'];
            session: import('$lib/server/auth').SessionValidationResult['session'];
        }
    }
}

export {};




// ORIG
// declare global {
// 	namespace App {
//         interface Platform {
//             env: Env
//             cf: CfProperties
//             ctx: ExecutionContext
//         }

//         interface Locals {
// 			user: import('$lib/server/auth').SessionValidationResult['user'];
// 			session: import('$lib/server/auth').SessionValidationResult['session'];
// 		}
//     } // interface Error {}
// 	// interface Locals {}
// } // interface PageData {}
// // interface PageState {}

// // interface Platform {}
// export {};




