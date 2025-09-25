import { db } from './database';
import { events, members, wines, wineRatings, eventAttendance } from './schema';
import { eq, desc, and } from 'drizzle-orm';
import type { Event, NewEvent, Member, NewMember, Wine, NewWine } from './schema';

// Event functions
export async function getAllEvents(): Promise<Event[]> {
  return await db.select().from(events).orderBy(desc(events.date));
}

export async function getEventById(id: number): Promise<Event | undefined> {
  const result = await db.select().from(events).where(eq(events.id, id));
  return result[0];
}

export async function createEvent(event: NewEvent): Promise<Event> {
  const result = await db.insert(events).values(event).returning();
  return result[0];
}

export async function updateEvent(id: number, event: Partial<NewEvent>): Promise<Event> {
  const result = await db
    .update(events)
    .set({ ...event, updatedAt: new Date() })
    .where(eq(events.id, id))
    .returning();
  return result[0];
}

// Member functions
export async function getAllMembers(): Promise<Member[]> {
  return await db.select().from(members).orderBy(members.name);
}

export async function getMemberById(id: number): Promise<Member | undefined> {
  const result = await db.select().from(members).where(eq(members.id, id));
  return result[0];
}

export async function createMember(member: NewMember): Promise<Member> {
  const result = await db.insert(members).values(member).returning();
  return result[0];
}

// Wine functions
export async function getWinesByEvent(eventId: number): Promise<Wine[]> {
  return await db.select().from(wines).where(eq(wines.eventId, eventId));
}

export async function createWine(wine: NewWine): Promise<Wine> {
  const result = await db.insert(wines).values(wine).returning();
  return result[0];
}

export async function getWinningWineByEvent(eventId: number): Promise<Wine | undefined> {
  const result = await db
    .select()
    .from(wines)
    .where(and(eq(wines.eventId, eventId), eq(wines.isWinner, true)));
  return result[0];
}

// Statistics functions
export async function getEventStats() {
  const totalEvents = await db.select().from(events);
  const totalMembers = await db.select().from(members).where(eq(members.isActive, true));
  const totalWines = await db.select().from(wines);
  
  return {
    totalEvents: totalEvents.length,
    totalMembers: totalMembers.length,
    totalWines: totalWines.length,
  };
}

// Seed function to populate with existing data
export async function seedDatabase() {
  // Insert initial events (matching your current data)
  const initialEvents = [
    {
      title: "French Rouges",
      date: new Date("2025-08-15"),
      theme: "French Red Wines",
      budget: "1,500 THB",
      location: "O'Shea's Irish Pub",
      excerpt: "An evening dedicated to the elegance of French Burgundy wines, featuring exceptional reds from Bordeaux to Burgundy.",
      status: "completed",
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
      status: "completed",
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
      status: "completed",
      participants: 14,
      winner: "BenMarco Expresivo 2021"
    }
  ];

  for (const event of initialEvents) {
    await createEvent(event);
  }

  console.log('Database seeded with initial events!');
}
