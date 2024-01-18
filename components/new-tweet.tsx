import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import React from 'react'

type Props = {}

const NewTweet = (props: Props) => {
    // const addTweet = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault()
    //     const target = event.target as typeof event.target & {
    //         title: { value: string }
    //     }
    //     const title = target.title.value
    //     console.log(title)
    // }

    const addTweet = async(formData: FormData) => {
        "use server";
        const title = String(formData.get('title'))
        const supabase = createServerActionClient<Database>({ cookies })
        const { data: { user } } = await supabase.auth.getUser()
        if(user){
            await supabase.from('tweets').insert({ title, user_id: user.id })
        }
    }
  return (
    <form action={addTweet}>
        <input name="title" className='bg-inherit border border-blue-500'/>
    </form>
  )
}

export default NewTweet