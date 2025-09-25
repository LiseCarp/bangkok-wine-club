import { db } from './database';
import { events, members, wines, wineRatings, eventAttendance } from './schema';
import { eq, desc, and } from 'drizzle-orm';
import type { Event, NewEvent, Member, NewMember, Wine, NewWine } from './schema';

// Event functions
export async function getAllEvents(): Promise<Event[]> {
  const database = db();
  if (!database) {
    console.warn('Database not available, returning empty array');
    return [];
  }
  return await database.select().from(events).orderBy(desc(events.date));
}

export async function getEventById(id: number): Promise<Event | undefined> {
  const database = db();
  if (!database) return undefined;
  const result = await database.select().from(events).where(eq(events.id, id));
  return result[0];
}

export async function createEvent(event: NewEvent): Promise<Event | null> {
  const database = db();
  if (!database) return null;
  const result = await database.insert(events).values(event).returning();
  return result[0];
}

export async function updateEvent(id: number, event: Partial<NewEvent>): Promise<Event | null> {
  const database = db();
  if (!database) return null;
  const result = await database
    .update(events)
    .set({ ...event, updatedAt: new Date() })
    .where(eq(events.id, id))
    .returning();
  return result[0];
}

// Member functions
export async function getAllMembers(): Promise<Member[]> {
  const database = db();
  if (!database) return [];
  return await database.select().from(members).orderBy(members.name);
}

export async function getMemberById(id: number): Promise<Member | undefined> {
  const database = db();
  if (!database) return undefined;
  const result = await database.select().from(members).where(eq(members.id, id));
  return result[0];
}

export async function createMember(member: NewMember): Promise<Member | null> {
  const database = db();
  if (!database) return null;
  const result = await database.insert(members).values(member).returning();
  return result[0];
}

// Wine functions
export async function getWinesByEvent(eventId: number): Promise<Wine[]> {
  const database = db();
  if (!database) return [];
  return await database.select().from(wines).where(eq(wines.eventId, eventId));
}

export async function createWine(wine: NewWine): Promise<Wine | null> {
  const database = db();
  if (!database) return null;
  const result = await database.insert(wines).values(wine).returning();
  return result[0];
}

export async function getWinningWineByEvent(eventId: number): Promise<Wine | undefined> {
  const database = db();
  if (!database) return undefined;
  const result = await database
    .select()
    .from(wines)
    .where(and(eq(wines.eventId, eventId), eq(wines.isWinner, true)));
  return result[0];
}

// Statistics functions
export async function getEventStats() {
  const database = db();
  if (!database) {
    return {
      totalEvents: 0,
      totalMembers: 0,
      totalWines: 0,
    };
  }
  
  const totalEvents = await database.select().from(events);
  const totalMembers = await database.select().from(members).where(eq(members.isActive, true));
  const totalWines = await database.select().from(wines);
  
  return {
    totalEvents: totalEvents.length,
    totalMembers: totalMembers.length,
    totalWines: totalWines.length,
  };
}

// Seed function to populate with existing data
export async function seedDatabase() {
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
      // Insert initial events (matching your current data)
      const initialEvents = [
        {
          title: "French Rouges",
          date: new Date("2025-08-15"),
          theme: "French Red Wines",
          budget: "1,500 THB",
          location: "O'Shea's Irish Pub",
          excerpt: "An evening dedicated to the elegance of French Burgundy wines, featuring exceptional reds from Bordeaux to Burgundy.",
          status: "completed" as const,
          participants: 12,
          winner: "Luccianus Amphore"
        },
        {
          title: "Italian Renaissance",
          date: new Date("2025-07-20"),
          theme: "Italian Red Wines",
          budget: "1,200 THB",
          location: "Casa Boo",
          excerpt: "A journey through Italy's diverse wine regions, showcasing Tuscany, Piedmont, and Veneto's finest expressions of terroir.",
          status: "completed" as const,
          participants: 15,
          winner: "Tenuta Ulissse Don Antonio"
        },
        {
          title: "Malbec Discovery",
          date: new Date("2024-01-18"),
          theme: "Malbec from Argentina or Anywhere",
          budget: "1,400 THB",
          location: "O'Shea's Irish Pub",
          excerpt: "Exploring the bold and rich world of Argentine Malbec, from Mendoza's high-altitude vineyards to Bangkok's sophisticated palate.",
          status: "completed" as const,
          participants: 14,
          winner: "BenMarco Expresivo 2021"
        }
      ];

      console.log('📅 Migrating events...');
      for (const event of initialEvents) {
        await database.insert(events).values(event);
        console.log(`✅ Added event: ${event.title}`);
      }
    }

    if (existingMembersInDb.length > 0) {
      console.log('👥 Members already exist in database. Skipping member migration.');
    } else {
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
