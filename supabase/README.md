# Database Setup

## Instructions

1. Go to https://app.supabase.com and create a new project
2. Wait for the project to be provisioned
3. Go to the SQL Editor in your project dashboard
4. Copy the contents of `schema.sql` and run it in the SQL editor
5. Go to Settings > API to get your project URL and anon key
6. Copy `.env.example` to `.env` and fill in your credentials
7. Run the seed script to add initial phrases:
   ```bash
   npm run seed
   ```

## Tables

### phrases
- `id`: UUID primary key
- `text`: The phrase text (unique)
- `votes`: Number of votes received
- `created_at`: Timestamp

### vote_records
- `id`: UUID primary key
- `winner_id`: Reference to winning phrase
- `loser_id`: Reference to losing phrase
- `voted_at`: Timestamp
