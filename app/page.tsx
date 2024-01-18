import AuthButtonServer from '@/components/auth-button-server'
import Likes from '@/components/likes'
import NewTweet from '@/components/new-tweet'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  const { data } = await supabase.from('tweets').select('*, author: profiles(*), likes(user_id)')

  const tweets =
    data?.map((tweet) => ({
      ...tweet,
      author: Array.isArray(tweet.author) ? tweet.author[0] : tweet.author,
      user_has_liked_tweet: !!tweet.likes.find(
        (like) => like.user_id === session.user.id
      ),
      likes: tweet.likes.length,
    })) ?? [];

  return (
    <>
      <AuthButtonServer />
      <NewTweet />
      {
        tweets?.map((tweet) => (
          <div key={tweet.id}>
            <p>{tweet.author.name} {tweet.author.username}</p>
            <h2>{tweet.title}</h2>
            <Likes tweet={tweet} />
          </div>
        ))
      }
    </>
  )
}
