import { db } from '../lib/database';
import { events, members } from '../lib/schema';

// Your existing event data
const existingEvents = [
  {
    title: "French Rouges",
    date: new Date("2025-08-15"),
    theme: "French Red Wines",
    budget: "1,500 THB",
    participants: 12,
    winner: "Luccianus Amphore",
    excerpt: "An evening dedicated to the elegance of French Burgundy wines, featuring exceptional reds from Bordeaux to Burgundy.",
    location: "O'Shea's Irish Pub",
    status: "completed" as const
  },
  {
    title: "Italian Renaissance",
    date: new Date("2025-07-20"),
    theme: "Italian Red Wines",
    budget: "1,200 THB",
    participants: 15,
    winner: "Tenuta Ulissse Don Antonio",
    excerpt: "A journey through Italy's diverse wine regions, showcasing Tuscany, Piedmont, and Veneto's finest expressions of terroir.",
    location: "Casa Boo",
    status: "completed" as const
  },
  {
    title: "Malbec Discovery",
    date: new Date("2024-01-18"),
    theme: "Malbec from Argentina or Anywhere",
    budget: "1,400 THB",
    participants: 14,
    winner: "BenMarco Expresivo 2021",
    excerpt: "Exploring the bold and rich world of Argentine Malbec, from Mendoza's high-altitude vineyards to Bangkok's sophisticated palate.",
    location: "O'Shea's Irish Pub",
    status: "completed" as const
  }
];

// Sample members data
const sampleMembers = [
  {
    name: "Alex Chen",
    email: "alex@bangkokwineclub.com",
    role: "admin" as const,
    isActive: true
  },
  {
    name: "Sarah Martinez",
    email: "sarah@bangkokwineclub.com", 
    role: "organizer" as const,
    isActive: true
  },
  {
    name: "James Richardson",
    email: "james@bangkokwineclub.com",
    role: "organizer" as const,
    isActive: true
  }
];

export async function migrateData() {
  const database = db();
  if (!database) {
    console.error('Database not available for seeding');
    return {
      success: false,
      error: 'Database connection not available'
    };
  }

  try {
    console.log('🍷 Starting data migration...');

    // Check if data already exists
    const existingEventsInDb = await database.select().from(events);
    const existingMembersInDb = await database.select().from(members);

    if (existingEventsInDb.length > 0) {
      console.log('📊 Events already exist in database. Skipping event migration.');
    } else {
      // Insert events
      console.log('📅 Migrating events...');
      for (const event of existingEvents) {
        await database.insert(events).values(event);
        console.log(`✅ Added event: ${event.title}`);
      }
    }

    if (existingMembersInDb.length > 0) {
      console.log('👥 Members already exist in database. Skipping member migration.');
    } else {
      // Insert members
      console.log('👥 Migrating members...');
      for (const member of sampleMembers) {
        await database.insert(members).values(member);
        console.log(`✅ Added member: ${member.name}`);
      }
    }

    console.log('🎉 Data migration completed successfully!');
    
    // Return summary
    const totalEvents = await database.select().from(events);
    const totalMembers = await database.select().from(members);
    
    return {
      success: true,
      eventsCount: totalEvents.length,
      membersCount: totalMembers.length
    };

  } catch (error) {
    console.error('❌ Migration failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// This function is called from the DataMigration component
// No need for direct execution code in browser environment
