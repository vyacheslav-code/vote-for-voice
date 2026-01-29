import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_ANON_KEY in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Sample phrases to seed the database
const samplePhrases = [
  "The early bird catches the worm",
  "Actions speak louder than words",
  "When life gives you lemons, make lemonade",
  "Don't cry over spilled milk",
  "A picture is worth a thousand words",
  "Better late than never",
  "The grass is always greener on the other side",
  "You can't judge a book by its cover",
  "There's no place like home",
  "Time flies when you're having fun",
  "Practice makes perfect",
  "All good things must come to an end",
  "Two heads are better than one",
  "The pen is mightier than the sword",
  "Where there's smoke, there's fire",
  "Strike while the iron is hot",
  "Knowledge is power",
  "Fortune favors the bold",
  "Every cloud has a silver lining",
  "Rome wasn't built in a day"
];

async function seed() {
  console.log('Starting to seed the database...');

  // Check if phrases already exist
  const { data: existingPhrases } = await supabase
    .from('phrases')
    .select('id')
    .limit(1);

  if (existingPhrases && existingPhrases.length > 0) {
    console.log('Database already has phrases. Skipping seed.');
    console.log('If you want to re-seed, delete existing phrases first.');
    return;
  }

  // Insert phrases
  const phrasesToInsert = samplePhrases.map(text => ({ text, votes: 0 }));

  const { data, error } = await supabase
    .from('phrases')
    .insert(phrasesToInsert)
    .select();

  if (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }

  console.log(`Successfully seeded ${data?.length || 0} phrases!`);
  console.log('You can now start voting at http://localhost:4321/vote');
}

seed().catch(console.error);
