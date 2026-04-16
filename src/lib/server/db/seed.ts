import { getDb } from './index';
import { user, products, services, posts, transactions, wishes, requests } from './schema';
import { nanoid } from 'nanoid';
import bcrypt from 'bcryptjs';
import { sql } from 'drizzle-orm';

const db = getDb();


async function seed() {
  console.log("🌱 Seeding database...");


  try {
    // 2. DISABLE Foreign Key Checks (The Fix for Turso)
    // Note: For Turso/libSQL, we use this raw SQL command
    await db.run(sql`PRAGMA foreign_keys = OFF`);

    console.log("🧹 Clearing existing data...");

    // --- 1. CLEAR TABLES ---
    // The order matters: Children first, then Parents.
    // 3. Clear EVERYTHING (Order doesn't matter now because FK is OFF)
    // await db.delete(tracker); 
    await db.delete(transactions);
    await db.delete(wishes); 
    await db.delete(requests); 
    await db.delete(products);
    await db.delete(services);
    await db.delete(posts);
    await db.delete(user);


    // Utility: hash password
    const hash = (pwd: string) => bcrypt.hashSync(pwd, 10);

    // --- 2. CREATE USERS ---
    const users = [
      {id: nanoid(), username: "jose", codename: "jose", slug: "jose", pin: hash("123123"), passwordHash: hash("123123"), 
        avatar: "/jose.jpg", gender: "male", dateOfBirth: "1995-01-05", email: "jose@example.com", phone: "+123456789", city: "Manila", 
        status: "wwc",  seeking: "rr",
        rel: "on",
        nationality: "ph",
        ethnicity: "southeast_asian",
        heart: 3,
        brain: 1,
        body: 3,
        luna: 4,
        mercury: 1,
        saturn: 1,
        apollo: 4,
        jupiter: 1,
        venus: 2,
        mars: 0
      },
      {id: nanoid(), username: "jing", codename: "jing", slug: "jing", pin: hash("123123"), passwordHash: hash("123123"), 
        avatar: "/jing.jpg", gender: "male", dateOfBirth: "1995-01-05", email: "jing@example.com", phone: "+123456789", city: "Manila",
        status: "wwc",  seeking: "rr",
        rel: "on",
        nationality: "ph",
        ethnicity: "southeast_asian",
        heart: 3,
        brain: 3,
        body: 3,
        luna: 2,
        mercury: 3,
        saturn: 1,
        apollo: 3,
        jupiter: 1,
        venus: 0,
        mars: 1
      },
      {id: nanoid(), username: "jun", codename: "jun", slug: "jun", pin: hash("123123"), passwordHash: hash("123123"), 
        avatar: "/jun.jpg", gender: "male", dateOfBirth: "1980-09-08", email: "jundalisay@yahoo.com", phone: "+639..", city: "Manila",
        status: "sepwc",  seeking: "rr",
        rel: "on",
        nationality: "ph",
        ethnicity: "southeast_asian",
        heart: 3,
        brain: 4,
        body: 2,
        luna: 4,
        mercury: 3,
        saturn: 1,
        apollo: 1,
        jupiter: 2,
        venus: 2,
        mars: 0
      },
      {id: nanoid(), username: "anh", codename: "anh", slug: "anh", pin: hash("123123"), passwordHash: hash("123123"), 
        avatar: "/anh.jpg", gender: "female", dateOfBirth: "1990-11-23", email: "anh@example.com", phone: "+1029384756", city: "Manila", 
        status: "wwc",  seeking: "rr",
        rel: "on",
        nationality: "vn",
        ethnicity: "southeast_asian",
        heart: 1,
        brain: 1,
        body: 4,
        luna: 1,
        mercury: 1,
        saturn: 3,
        apollo: 4,
        jupiter: 1,
        venus: 4,
        mars: 2       
       }
    ];
    
    await db.insert(user).values(users);
    console.log("✔ Users inserted");


    // --- 3. CREATE PRODUCTS ---
    const insertedProducts = await db.insert(products).values([
      {
        name: "Organic Honey",
        measure: "liter",
        points: 20.0,
        amount: 10.0,
        category: "0409.00.05",
        photo1: "/honey.jpg",
        photo2: "/honey2.jpg",
        description: "Pure, local, and organic honey from the mountains.",
        headline: "The Sweetest Deal!",
        userId: users[0].id // Jose
      },
      {
        name: "Tomatoes",
        measure: "kilo",
        points: 2,
        amount: 10.0,
        category: "0702.00.00",
        photo1: "/tomatoes.jpg",
        description: "Home grown tomatoes.",
        headline: "Fresh and Healthy!",
        userId: users[1].id
      },
      {name: "Stainless Vacuum Black Tumbler", measure: "piece", points: 2, category: "9617.00.00", photo1: "/tumbler.jpg", description: "Stainless Vacuum Black Tumbler with Canva logo.", headline: "From a Canva event", userId: users[2].id },
      {name: "Foldable Blue Umbrella", measure: "piece", points: 10, category: " 6601.99.00", photo1: "/umbrella.jpg", description: "Foldable Blue Umbrella.", headline: "Huawei brand", userId: users[2].id },
      {name: "Colored Foldable Hand Fans", measure: "piece", points: 4, category: "3926.90", photo1: "/fan.jpg", description: "Foldable hand fans made of plastic and cloth", headline: "Attractive colors available!", userId: users[3].id },
      {
        name: "Pencils 12 pcs per pack",
        measure: "pack",
        points: 1,
        amount: 2.0,
        category: "9609.10.00",
        photo1: "/pencils.jpg",
        description: "Jot brand Pencils at 12 pcs per pack",
        headline: "Extra pencils from our class",
        userId: users[1].id
      },
      {
        name: "Stationary Set",
        measure: "pack",
        points: 0.5,
        amount: 2.0,
        category: "9609.10.00",
        photo1: "/stationary.jpg",
        description: "Pack includes eraser, sharperner, pencil and notepad",
        headline: "Extra Stationary from our class",
        userId: users[1].id
      },
      {
        name: "Post it",
        measure: "pack",
        points: 0.5,
        amount: 2.0,
        category: "4811.41.10",
        photo1: "/postit.jpg",
        description: "Small size",
        headline: "Extra Post it from our class",
        userId: users[1].id
      },      
    ]).returning({ id: products.id }); 

    console.log("✔ Products inserted");


    // --- 4. CREATE SERVICES (You need service IDs for the post links) ---
    const insertedServices = await db.insert(services).values([
      {name: "Flutter App Development", measure: "project", points: 100.0, category: "541511", photo1: "/flutter.jpg", 
          photo2: "/flutter2.jpg", description: "Cross-platform mobile app development (Android/iOS).", headline: "Your App Idea, Realized.", userId: users[2].id },
      {name: "Website Development", measure: "project", points: 100.0, category: "541511", photo1: "/website.jpg", description: "Websites made on Cloudflare and Github.", headline: "Your Website Realized.", userId: users[2].id },          
      {name: "Agricultural Consultation Services", measure: "day", points: 30.0, category: " 541690", photo1: "/planter.jpg", description: "Agricultural extension services for small plots", headline: "Professional agriultural consultation", userId: users[1].id },
      {name: "Office Cleaning Services", measure: "day", points: 10.0, category: "561720", photo1: "/office2.jpg", description: "We do office cleaning.", headline: "Professional Office Cleaning.", userId: users[0].id },
      {name: "Yoga lessons", measure: "hour", points: 10.0, category: "713940", photo1: "/yoga.jpg", description: "We do ashtanga yoga.", headline: "Ashtanga yoga is part of the 8 limbs of yoga.", userId: users[3].id }
    ]).returning({ id: services.id }); // Get the IDs of the newly inserted services


    // --- CREATE WISHES ---
    const wishesToInsert = [
      {name: "Wired Headset with Mic", measure: "unit", points: 6.0, category: "8518.30.00", photo1: "/headset.jpg", description: "I need a Wired Headset with Mic for Zoom calls.", headline: "Wired Headset with Mic for Zoom calls", userId: users[2].id }
    ];
    
    await db.insert(wishes).values(wishesToInsert);


    // --- CREATE REQYESTS ---
    const reqsToInsert = [
      {name: "Caregiver to care for my father", measure: "shift", points: 20.0, category: "624120", photo1: "/nurse.jpg", description: "I need a Caregiver to care for my father.", headline: "Caregiver needed", userId: users[2].id }
    ];
    
    await db.insert(requests).values(reqsToInsert);


    // --- 5. CREATE POSTS ---
    const postsToInsert = [
      // NEW: Jose's Honey Post
      {
        content: `Fresh batch of organic honey just arrived! 🍯 Directly from the mountains. Check it out [here](/products/${insertedProducts[0].id}). ![image](/honey.jpg)`,
        userId: users[0].id,
      },
      // Existing Yoga Post (Corrected index to 5 for Yoga)
      {
        content: `We have new Yoga classes available! Please [send me a message](/users/${users[3].slug}) Check it out [here](/services/${insertedServices[4].id}) ![image](/yoga.jpg)`,
        userId: users[3].id,
      },
      // Existing Flutter Post
      {
        content: `I'm free to make Flutter apps for Android! Please [send me a message](/users/${users[2].slug}) Check it out [here](/services/${insertedServices[0].id}) ![image](/flutter2.jpg)`,
        userId: users[2].id,
      },
    ];
    // Insert all posts in one transaction
    await db.insert(posts).values(postsToInsert);

  } catch (error) {
    console.error("❌ Seeding failed during execution:", error);
    throw error;
  } finally {
    // 4. ALWAYS re-enable Foreign Key Checks
    await db.run(sql`PRAGMA foreign_keys = ON`);
    console.log("✨ Seeding complete! Users, Products, Services, and Posts created.");    
  }
}


// --------------------------------------------------------
// THE FIX: Call the async function and handle errors
// --------------------------------------------------------
seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1); // Exit with a non-zero code to indicate failure
});
