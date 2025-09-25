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

export async function getEventWithWines(id: number) {
  const database = db();
  if (!database) return null;
  
  try {
    // Get event details
    const eventResult = await database.select().from(events).where(eq(events.id, id));
    const event = eventResult[0];
    
    if (!event) return null;
    
    // Get wines for this event
    const winesResult = await database.select().from(wines).where(eq(wines.eventId, id));
    
    return {
      ...event,
      wines: winesResult
    };
  } catch (error) {
    console.error('Error fetching event with wines:', error);
    return null;
  }
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

export async function updateMember(id: number, member: Partial<NewMember>): Promise<Member | null> {
  const database = db();
  if (!database) return null;
  const result = await database
    .update(members)
    .set({ ...member, updatedAt: new Date() })
    .where(eq(members.id, id))
    .returning();
  return result[0];
}

export async function deleteMember(id: number): Promise<boolean> {
  const database = db();
  if (!database) return false;
  try {
    await database.delete(members).where(eq(members.id, id));
    return true;
  } catch (error) {
    console.error('Error deleting member:', error);
    return false;
  }
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

export async function updateWine(id: number, wine: Partial<NewWine>): Promise<Wine | null> {
  const database = db();
  if (!database) return null;
  const result = await database
    .update(wines)
    .set({ ...wine, updatedAt: new Date() })
    .where(eq(wines.id, id))
    .returning();
  return result[0];
}

export async function deleteWine(id: number): Promise<boolean> {
  const database = db();
  if (!database) return false;
  try {
    await database.delete(wines).where(eq(wines.id, id));
    return true;
  } catch (error) {
    console.error('Error deleting wine:', error);
    return false;
  }
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

// Helper function to add sample wines for events
async function addSampleWines(database: any, eventId: number, eventTitle: string) {
  const sampleWinesData: { [key: string]: any[] } = {
    "French Rouges": [
      {
        eventId,
        name: "Luccianus Amphore",
        producer: "Luccianus",
        vintage: 2020,
        region: "Languedoc",
        country: "France",
        grapeVariety: "Syrah/Grenache",
        price: 1450,
        rating: 9.2,
        notes: "Exceptional elegance with notes of dark fruits, herbs, and mineral complexity. Perfect balance and long finish.",
        isWinner: true
      },
      {
        eventId,
        name: "Château de Beaucastel Côtes du Rhône",
        producer: "Château de Beaucastel",
        vintage: 2019,
        region: "Rhône Valley",
        country: "France",
        grapeVariety: "Grenache/Syrah",
        price: 1380,
        rating: 8.8,
        notes: "Classic Rhône character with red fruits, spices, and earthy undertones.",
        isWinner: false
      },
      {
        eventId,
        name: "Domaine de la Côte d'Or Rouge",
        producer: "Domaine de la Côte d'Or",
        vintage: 2020,
        region: "Burgundy",
        country: "France",
        grapeVariety: "Pinot Noir",
        price: 1200,
        rating: 8.5,
        notes: "Silky texture with cherry and violet notes. Refined and food-friendly.",
        isWinner: false
      }
    ],
    "Italian Renaissance": [
      {
        eventId,
        name: "Tenuta Ulissse Don Antonio",
        producer: "Tenuta Ulissse",
        vintage: 2019,
        region: "Abruzzo",
        country: "Italy",
        grapeVariety: "Montepulciano",
        price: 1150,
        rating: 9.0,
        notes: "Rich and complex with dark cherry, chocolate, and spice notes. Excellent structure.",
        isWinner: true
      },
      {
        eventId,
        name: "Antinori Chianti Classico Riserva",
        producer: "Antinori",
        vintage: 2018,
        region: "Tuscany",
        country: "Italy",
        grapeVariety: "Sangiovese",
        price: 1200,
        rating: 8.7,
        notes: "Classic Chianti with bright acidity, cherry flavors, and herbal notes.",
        isWinner: false
      }
    ],
    "Malbec Discovery": [
      {
        eventId,
        name: "BenMarco Expresivo 2021",
        producer: "BenMarco",
        vintage: 2021,
        region: "Mendoza",
        country: "Argentina",
        grapeVariety: "Malbec",
        price: 1350,
        rating: 9.1,
        notes: "Bold and rich with blackberry, plum, and vanilla notes. Excellent concentration.",
        isWinner: true
      },
      {
        eventId,
        name: "Catena Zapata Malbec",
        producer: "Catena Zapata",
        vintage: 2019,
        region: "Mendoza",
        country: "Argentina",
        grapeVariety: "Malbec",
        price: 1400,
        rating: 8.9,
        notes: "High-altitude Malbec with intense fruit and mineral complexity.",
        isWinner: false
      }
    ]
  };

  const winesForEvent = sampleWinesData[eventTitle] || [];
  
  for (const wine of winesForEvent) {
    await database.insert(wines).values(wine);
    console.log(`  🍷 Added wine: ${wine.name}`);
  }
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
        const result = await database.insert(events).values(event).returning();
        console.log(`✅ Added event: ${event.title}`);
        
        // Add sample wines for completed events
        if (event.status === 'completed' && result[0]) {
          await addSampleWines(database, result[0].id, event.title);
        }
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
