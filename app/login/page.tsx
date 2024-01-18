import AuthButtonClient from '@/components/auth-button-client'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const Login = async (props: Props) => {
    const supabase = createServerComponentClient<Database>({ cookies })

    const { data: { session } } = await supabase.auth.getSession()

    if (session) {
        redirect('/')
    }
  return (
    <AuthButtonClient session={session} />
  )
}

export default Login