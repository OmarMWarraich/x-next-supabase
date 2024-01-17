'use client'

import React from 'react'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

type Props = {
    children?: React.ReactNode
}

const AuthButton = (props: Props) => {
    const supabase = createClientComponentClient()
    const handleSignIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: 'http://localhost:3000/auth/callback'
            }
        })
    }

    const handleSignOut = async () => {
        await supabase.auth.signOut()
    }
    
  return (
    <>
        <button onClick={handleSignIn}>
        Sign in
        </button>
        <button onClick={handleSignOut}>
        Sign Out
        </button>
    </>
  )
}

export default AuthButton