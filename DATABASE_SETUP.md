# Bangkok Wine Club - Database Setup Guide

## 🗄️ Neon Database Integration

This guide will help you set up your Neon PostgreSQL database with your Bangkok Wine Club project.

## 📋 Prerequisites

- Neon account with a database created
- Netlify deployment configured

## 🚀 Setup Steps

### 1. Get Your Neon Connection String

1. Go to your [Neon Dashboard](https://console.neon.tech)
2. Select your project
3. Go to "Connection Details"
4. Copy the connection string (it looks like this):
   ```
   postgresql://username:password@ep-example-123456.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```

### 2. Set Environment Variables

#### For Local Development:
Create a `.env.local` file in your project root:
```bash
VITE_DATABASE_URL=postgresql://your-connection-string-here
VITE_ADMIN_USERNAME=your-admin-username
VITE_ADMIN_PASSWORD=your-secure-password
```

#### For Netlify Deployment:
1. Go to your Netlify site dashboard
2. Navigate to "Site settings" → "Environment variables"
3. Add these variables:
   - **Key**: `VITE_DATABASE_URL` | **Value**: Your Neon connection string
   - **Key**: `VITE_ADMIN_USERNAME` | **Value**: Your admin username
   - **Key**: `VITE_ADMIN_PASSWORD` | **Value**: Your secure password

### 3. Initialize Your Database

Run these commands to set up your database schema:

```bash
# Generate migration files
npm run db:generate

# Push schema to your database
npm run db:push
```

### 4. Seed Your Database (Optional)

To populate your database with the existing event data:

```typescript
import { seedDatabase } from '@/lib/db-utils';

// Run this once to seed your database
await seedDatabase();
```

### 5. View Your Database

You can use Drizzle Studio to view and manage your database:

```bash
npm run db:studio
```

This will open a web interface at `http://localhost:4983`

## 📊 Database Schema

Your database includes these tables:

- **events** - Wine tasting events
- **members** - Club members
- **wines** - Wines brought to events
- **wine_ratings** - Individual member ratings
- **event_attendance** - Event attendance tracking

## 🔧 Usage in Components

You can now use the database hooks in your React components:

```typescript
import { useEvents, useStats } from '@/hooks/useDatabase';

function EventsList() {
  const { data: events, isLoading } = useEvents();
  const { data: stats } = useStats();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Total Events: {stats?.totalEvents}</h2>
      {events?.map(event => (
        <div key={event.id}>{event.title}</div>
      ))}
    </div>
  );
}
```

## 🛠️ Available Scripts

- `npm run db:generate` - Generate migration files
- `npm run db:migrate` - Run migrations
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Drizzle Studio

## 🔒 Security Notes

- Never commit your `.env.local` file to version control
- Use environment variables for all database credentials
- The Neon connection string includes authentication, keep it secure
- **Admin Panel Protection**: Set strong credentials via environment variables
- **Default Credentials**: Username: `admin`, Password: `wine2024` (change these!)
- **Session Management**: Admin sessions expire after 24 hours

## 🚨 Troubleshooting

1. **Connection Error**: Verify your connection string is correct
2. **Environment Variable Not Found**: Make sure `VITE_DATABASE_URL` is set
3. **Migration Issues**: Try `npm run db:push` to sync schema directly

## 📝 Next Steps

1. Set your environment variables
2. Run `npm run db:push` to create tables
3. Optionally seed your database
4. Start using the database hooks in your components!

Your Bangkok Wine Club is now ready to store and manage data in your Neon database! 🍷
