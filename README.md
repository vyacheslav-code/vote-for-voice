# Vote for Voice

A simple voting platform for phrases, inspired by [roundest-mon](https://github.com/t3dotgg/roundest-mon). Users compare two phrases and vote for their favorite. Results are aggregated and displayed on a leaderboard.

## Tech Stack

- **Frontend**: [Astro](https://astro.build) (SSR)
- **Database**: [Supabase](https://supabase.com) (PostgreSQL)
- **Styling**: Plain CSS (no frameworks)
- **Language**: TypeScript

## Features

- 🗳️ Simple voting interface with two phrases
- 📊 Real-time leaderboard with vote percentages
- 🎨 Beautiful gradient design
- ⚡ Fast page loads (minimal JavaScript)
- 🔄 Plain HTML forms (works without JS!)
- 📱 Responsive design

## Project Structure

```
vote-for-voice/
├── src/
│   ├── layouts/
│   │   └── Layout.astro          # Base HTML layout
│   ├── lib/
│   │   ├── supabase.ts           # Supabase client
│   │   └── database.types.ts     # Database type definitions
│   └── pages/
│       ├── index.astro           # Redirects to /vote
│       ├── vote.astro            # Voting page
│       ├── results.astro         # Results leaderboard
│       └── api/
│           └── vote.ts           # Vote submission endpoint
├── scripts/
│   └── seed.ts                   # Database seeding script
├── supabase/
│   ├── schema.sql                # Database schema
│   └── README.md                 # Database setup instructions
└── package.json
```

## Setup Instructions

### 1. Prerequisites

- Node.js 20+ (recommended)
- A [Supabase](https://supabase.com) account

### 2. Clone and Install

```bash
cd vote-for-voice
npm install
```

### 3. Set Up Supabase

1. Go to https://app.supabase.com and create a new project
2. Wait for the project to be provisioned (~2 minutes)
3. Go to the **SQL Editor** in your project dashboard
4. Copy the contents of `supabase/schema.sql` and run it
5. Go to **Settings > API** to get your credentials:
   - Project URL
   - Anon/Public key

### 4. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

### 5. Seed the Database

```bash
npm run seed
```

This will add 20 sample phrases to get you started.

### 6. Run the Development Server

```bash
npm run dev
```

Open http://localhost:4321 in your browser!

## How It Works

### Voting Flow

1. User visits `/vote`
2. Server fetches 2 random phrases from Supabase
3. User clicks on their favorite phrase
4. Form submits to `/api/vote` (POST)
5. Server increments the winner's vote count
6. Server redirects back to `/vote` with a new pair

### Database Schema

**phrases table:**
- `id` (UUID): Primary key
- `text` (TEXT): The phrase content
- `votes` (INTEGER): Vote count (default: 0)
- `created_at` (TIMESTAMP): Creation timestamp

**vote_records table:**
- `id` (UUID): Primary key
- `winner_id` (UUID): Reference to winning phrase
- `loser_id` (UUID): Reference to losing phrase
- `voted_at` (TIMESTAMP): Vote timestamp

## Customization

### Adding Your Own Phrases

Edit `scripts/seed.ts` and modify the `samplePhrases` array:

```typescript
const samplePhrases = [
  "Your custom phrase here",
  "Another phrase",
  // ... more phrases
];
```

Then run `npm run seed` again.

### Styling

All styles are contained within the `.astro` files. No CSS files needed!

Edit the `<style>` sections in:
- `src/pages/vote.astro` - Voting page
- `src/pages/results.astro` - Results page
- `src/layouts/Layout.astro` - Global styles

## Deployment

### Option 1: Vercel (Recommended)

1. Install Vercel adapter:
   ```bash
   npx astro add vercel
   ```

2. Push to GitHub

3. Import on [Vercel](https://vercel.com)

4. Add environment variables in Vercel dashboard

### Option 2: Netlify

1. Install Netlify adapter:
   ```bash
   npx astro add netlify
   ```

2. Push to GitHub

3. Import on [Netlify](https://netlify.com)

4. Add environment variables in Netlify dashboard

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run seed` - Seed database with sample phrases

## Architecture Decisions

### Why Astro?

- Minimal JavaScript shipped to the browser
- Server-side rendering by default
- Simple API routes
- Great DX for content-focused apps

### Why Plain HTML Forms?

- Works without JavaScript
- Faster page loads
- Better accessibility
- Simpler code

### Why Supabase?

- Easy PostgreSQL setup
- Built-in REST API
- Row Level Security
- Real-time capabilities (for future features)

## Future Improvements

- [ ] User authentication (track who voted)
- [ ] Phrase submissions by users
- [ ] Categories/tags for phrases
- [ ] Social sharing
- [ ] Real-time vote updates (WebSockets)
- [ ] Analytics dashboard

## License

MIT

## Acknowledgments

Inspired by [roundest-mon](https://github.com/t3dotgg/roundest-mon) by Theo Browne.
