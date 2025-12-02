// src/lib/server/db/seed.ts

import { getDb } from './index'; 
import { user, products, services, posts } from './schema';
import { nanoid } from 'nanoid';
import bcrypt from 'bcryptjs';
import { sql } from 'drizzle-orm';

// ------------------------------------
// 🔥 IMAGE PLACEHOLDERS
// ------------------------------------

const AVATARS = [
    'https://i.pravatar.cc/150?img=34', // Alice
    'https://i.pravatar.cc/150?img=53', // Bob
    'https://i.pravatar.cc/150?img=22', // Carla
];

// Reusable function to generate 6 unique product/service photos
const generatePhotos = (seed: string) => [
    `https://picsum.photos/seed/${seed}A/800/600`,
    `https://picsum.photos/seed/${seed}B/800/601`,
    `https://picsum.photos/seed/${seed}C/800/602`,
    `https://picsum.photos/seed/${seed}D/800/603`,
    `https://picsum.photos/seed/${seed}E/800/604`,
    `https://picsum.photos/seed/${seed}F/800/605`,
];

const PRODUCT_IMAGE_SETS = [
    generatePhotos('widget'), // For Product A
    generatePhotos('tea'),    // For Product B
    generatePhotos('guide'),  // For Product C
];

const SERVICE_IMAGE_SETS = [
    generatePhotos('consult'), // For Service A
    generatePhotos('review'),  // For Service B
    generatePhotos('train'),   // For Service C
];

// Initialize the DB instance
const db = getDb();

async function seed() {
    console.log("🌱 Seeding database...");

    // --- 1. CLEAR TABLES ---
    await db.delete(products);
    await db.delete(services);
    await db.delete(posts); 
    await db.delete(user);

    // Utility: hash password
    const hash = (pwd: string) => bcrypt.hashSync(pwd, 10);

    // -------------------------
    // 2. USER DATA (Updated with AVATARS)
    // -------------------------

    const users = [
        {
            id: nanoid(),
            username: "alice",
            codename: "alpha-wolf",
            pin: "1111",
            passwordHash: hash("password123"),
            avatar: AVATARS[0], // <-- Hotlinked Avatar
            gender: "female",
            dateOfBirth: "1995-01-05",
            email: "alice@example.com",
            phone: "+123456789",
            city: "Manila",
            country: "Philippines",
            heart: 80, brain: 75, body: 65,
            luna: 50, mercury: 60, saturn: 40,
            apollo: 70, jupiter: 55, venus: 80, mars: 45
        },
        {
            id: nanoid(),
            username: "bob",
            codename: "beta-eagle",
            pin: "2222",
            passwordHash: hash("password123"),
            avatar: AVATARS[1], // <-- Hotlinked Avatar
            gender: "male",
            dateOfBirth: "1992-05-10",
            email: "bob@example.com",
            phone: "+987654321",
            city: "Manila",
            country: "Philippines",
            heart: 60, brain: 85, body: 70,
            luna: 45, mercury: 75, saturn: 65,
            apollo: 55, jupiter: 60, venus: 45, mars: 80
        },
        {
            id: nanoid(),
            username: "carla",
            codename: "gamma-panther",
            pin: "3333",
            passwordHash: hash("password123"),
            avatar: AVATARS[2], // <-- Hotlinked Avatar
            gender: "female",
            dateOfBirth: "1990-11-23",
            email: "carla@example.com",
            phone: "+1029384756",
            city: "Manila",
            country: "Philippines",
            heart: 90, brain: 60, body: 85,
            luna: 55, mercury: 50, saturn: 45,
            apollo: 80, jupiter: 70, venus: 60, mars: 50
        }
    ];

    await db.insert(user).values(users);
    console.log("✔ Users inserted");

    // -------------------------
    // 3. SEED RELATIONAL DATA (Products, Services, Posts)
    // -------------------------

    await db.transaction(async (tx) => {
        for (const u of users) {
            const userId = u.id;

            // Helper function to merge base data with photo data
            const addPhotos = (baseData: any, photoSet: string[]) => ({
                ...baseData,
                photo1: photoSet[0],
                photo2: photoSet[1],
                photo3: photoSet[2],
                photo4: photoSet[3],
                photo5: photoSet[4],
                photo6: photoSet[5],
            });


            // --- A. PRODUCTS (3 per user) ---
            const baseProducts = [
                {
                    name: `Premium Widget A`,
                    measure: "kg",
                    points: 10,
                    category: "1001",
                    description: "Ultra-durable, premium quality item for daily use.",
                    headline: "🏆 Bestselling Gear",
                    userId: userId
                },
                {
                    name: `Organic Tea Blend`,
                    measure: "pcs",
                    points: 20,
                    category: "1002",
                    description: "Hand-picked organic blend for maximum relaxation.",
                    headline: "🌱 Natural & Fresh",
                    userId: userId
                },
                {
                    name: `Digital Guide Book`,
                    measure: "box",
                    points: 30,
                    category: "1003",
                    description: "Complete digital guide to mastering any skill.",
                    headline: "💡 Instant Download",
                    userId: userId
                }
            ];
            
            // Map base data to include the photo URLs
            const userProducts = baseProducts.map((p, i) => addPhotos(p, PRODUCT_IMAGE_SETS[i]));


            const insertedProducts = await tx.insert(products).values(userProducts).returning({ id: products.id, name: products.name });

            // --- B. SERVICES (3 per user) ---
            const baseServices = [
                {
                    name: `1-Hour Consultation`,
                    measure: "hour",
                    points: 15,
                    category: "5411",
                    description: "Deep dive consultation on strategy and execution.",
                    headline: "📞 Direct Access",
                    userId: userId
                },
                {
                    name: `Expert Code Review`,
                    measure: "hour",
                    points: 25,
                    category: "7399",
                    description: "Thorough review of your codebase with actionable feedback.",
                    headline: "💻 Flawless Execution",
                    userId: userId
                },
                {
                    name: `Personalized Training`,
                    measure: "job",
                    points: 35,
                    category: "8999",
                    description: "Customized training program tailored to your needs.",
                    headline: "💪 Achieve Your Goals",
                    userId: userId
                }
            ];
            
            // Map base data to include the photo URLs
            const userServices = baseServices.map((s, i) => addPhotos(s, SERVICE_IMAGE_SETS[i]));


            const insertedServices = await tx.insert(services).values(userServices).returning({ id: services.id, name: services.name });

            // --- C. POST (1 per user) ---
            
            const postContent = `
# ✨ New Arrivals from ${u.username}!

Hey everyone! I'm ${u.codename} and I've just stocked up my shop with some amazing items and services. Don't miss out on these exclusive offers!

## 🛒 Featured Product
**[${insertedProducts[0].name}](/products/${insertedProducts[0].id})**
> ${userProducts[0].description}

## 🚀 Top Service
**[${insertedServices[0].name}](/services/${insertedServices[0].id})**
> ${userServices[0].description}

---

Check out my full collection:
* [All Products here!](/products)
* [Book a Service now!](/services)

Happy shopping! 🛍️
            `;

            await tx.insert(posts).values({
                content: postContent,
                userId: userId
            });

        }
    });

    console.log("✔ Products, services, and posts inserted within a transaction.");
    console.log("🌱 Database seeding complete!");
}

seed().catch((e) => {
    console.error(e);
    process.exit(1);
});