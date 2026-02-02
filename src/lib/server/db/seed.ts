import { getDb } from './index';
import { user, products, services, posts } from './schema';
import { nanoid } from 'nanoid';
import bcrypt from 'bcryptjs';
import { sql } from 'drizzle-orm';

const db = getDb();



async function seed() {
  console.log("🌱 Seeding database...");

  // --- 1. CLEAR TABLES ---
  // Ensure child tables are deleted first due to foreign key constraints
  await db.delete(products);
  await db.delete(services);
  await db.delete(posts);
  await db.delete(user);

  // Utility: hash password
  const hash = (pwd: string) => bcrypt.hashSync(pwd, 10);

  // --- 2. CREATE USERS ---
  const users = [
    {id: nanoid(), username: "jose", codename: "jose", pin: hash("111111"), passwordHash: hash("123123"), avatar: "/jose.jpg", gender: "male", dateOfBirth: "1995-01-05", email: "jose@example.com", phone: "+123456789", city: "Manila", country: "Philippines" },
    {id: nanoid(), username: "jing", codename: "jing", pin: hash("111111"), passwordHash: hash("123123"), avatar: "/jing.jpg", gender: "male", dateOfBirth: "1995-01-05", email: "jing@example.com", phone: "+123456789", city: "Manila", country: "Philippines" },
    {id: nanoid(), username: "ehmil", codename: "ehmil", pin: hash("222222"), passwordHash: hash("123123"), avatar: "/ehmil.jpg", gender: "male", dateOfBirth: "1992-05-10", email: "ehmil@example.com", phone: "+987654321", city: "Manila", country: "Philippines" },
    {id: nanoid(), username: "lam", codename: "lam", pin: hash("030493"), passwordHash: hash("030493"), avatar: "/lam.jpg", gender: "female", dateOfBirth: "1993-04-03", email: "lam.nguye n.34.vn@gmail.com", phone: "+84328784517", city: "Manila", country: "Philippines" },
    {id: nanoid(), username: "jun", codename: "jun", pin: hash("123123"), passwordHash: hash("123123"), avatar: "/jun.jpg", gender: "male", dateOfBirth: "1980-09-08", email: "jundalisay@yahoo.com", phone: "+639..", city: "Manila", country: "Philippines" },
    {id: nanoid(), username: "anh", codename: "anh", pin: hash("444444"), passwordHash: hash("123123"), avatar: "/anh.jpg", gender: "female", dateOfBirth: "1990-11-23", email: "anh@example.com", phone: "+1029384756", city: "Manila", country: "Philippines" }
  ];
  
  await db.insert(user).values(users);
  console.log("✔ Users inserted");


  // --- 3. CREATE PRODUCTS ---
  const productsToInsert = [
    {name: "Organic Honey", measure: "liter", points: 20.0, category: "0409.00.05", photo1: "/honey.jpg", 
        photo2: "/honey2.jpg", description: "Pure, local, and organic honey from the mountains.", headline: "The Sweetest Deal!", userId: users[0].id },
    {name: "Tomatoes", measure: "kilo", points: 2, category: "0702.00.00", photo1: "/tomatoes.jpg", description: "Home grown tomatoes.", headline: "Fresh and Healthy!", userId: users[4].id },
    {name: "Colored Foldable Hand Fans", measure: "piece", points: 4, category: "3926.90", photo1: "/fan.jpg", description: "Foldable hand fans made of plastic and cloth", headline: "Attractive colors available!", userId: users[5].id }
  ];
  
  await db.insert(products).values(productsToInsert);

  // --- 4. CREATE SERVICES (You need service IDs for the post links) ---
  const insertedServices = await db.insert(services).values([
    {name: "Cargo Flight Service", measure: "km", points: 50.0, category: "481112", photo1: "/bamboo.jpg", 
        photo2: "/airfreight.jpg", description: "Air cargo service to and from Vietnam.", headline: "Fast International Shipping", userId: users[3].id },
    {name: "Flutter App Development", measure: "project", points: 100.0, category: "541511", photo1: "/flutter.jpg", 
        photo2: "/flutter2.jpg", description: "Cross-platform mobile app development (Android/iOS).", headline: "Your App Idea, Realized.", userId: users[4].id },
    {name: "Agricultural Consultation Services", measure: "day", points: 30.0, category: " 541690", photo1: "/planter.jpg", description: "Agricultural extension services for small plots", headline: "Professional agriultural consultation", userId: users[4].id },
    {name: "Office Cleaning Services", measure: "day", points: 10.0, category: "561720", photo1: "/office2.jpg", description: "We do office cleaning.", headline: "Your App Idea, Realized.", userId: users[0].id },
    {name: "Yoga lessons", measure: "hour", points: 10.0, category: "713940", photo1: "/office2.jpg", description: "We do office cleaning.", headline: "Your App Idea, Realized.", userId: users[0].id }
  ]).returning({ id: services.id }); // Get the IDs of the newly inserted services


  // --- 5. CREATE POSTS ---
  const postsToInsert = [
    {// Post 1: Cargo Flights (owned by Pratap/users[0]) 
      content: `# ✨ We are adding new cargo flights to and from Vietnam! Please [send me a message](/users/${users[0].id}) ## Check it out [here](/services/${insertedServices[0].id}) ![image](https://picsum.photos/400/300?random=airplane)`,
      userId: users[3].id,
    },
    {// Post 2: Flutter Apps (owned by Dharma/users[1]) 
      content: `# I'm free to make Flutter apps for Android! Please [send me a message](/users/${users[1].id}) ## Check it out [here](/services/${insertedServices[1].id}) ![image](https://picsum.photos/400/300?random=android)`,
      userId: users[4].id,
    },
  ];

  // Insert all posts in one transaction
  await db.insert(posts).values(postsToInsert);

  console.log("✨ Seeding complete! Users, Products, Services, and Posts created.");
}

// --------------------------------------------------------
// THE FIX: Call the async function and handle errors
// --------------------------------------------------------
seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1); // Exit with a non-zero code to indicate failure
});


