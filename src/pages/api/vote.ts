import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    // Parse form data
    const formData = await request.formData();
    const winnerId = formData.get('winner_id')?.toString();
    const loserId = formData.get('loser_id')?.toString();

    if (!winnerId || !loserId) {
      return new Response('Missing winner_id or loser_id', { status: 400 });
    }

    if (winnerId === loserId) {
      return new Response('Winner and loser cannot be the same', { status: 400 });
    }

    // Increment winner's vote count
    const { error: winnerError } = await supabase.rpc('increment_votes', {
      phrase_id: winnerId
    });

    // If the RPC doesn't exist, use update instead
    if (winnerError) {
      // Fallback: Fetch current votes and increment
      const { data: winnerPhrase } = await supabase
        .from('phrases')
        .select('votes')
        .eq('id', winnerId)
        .single();

      if (winnerPhrase) {
        await supabase
          .from('phrases')
          .update({ votes: winnerPhrase.votes + 1 })
          .eq('id', winnerId);
      }
    }

    // Record the vote (optional - for analytics)
    await supabase.from('vote_records').insert({
      winner_id: winnerId,
      loser_id: loserId
    });

    // Redirect back to vote page
    return redirect('/vote', 303);
  } catch (error) {
    console.error('Error processing vote:', error);
    return new Response('Internal server error', { status: 500 });
  }
};
