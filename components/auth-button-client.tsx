'use client'

import React from 'react'

import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

const AuthButtonClient = ({ session }: { session:  Session | null }) => {
    const supabase = createClientComponentClient<Database>()
    const router = useRouter()

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
        router.refresh()
    }
    
  return session ? 
        (<button onClick={handleSignOut}>
        Sign Out
        </button>) : 
        (<button onClick={handleSignIn}>
        Sign In
        </button>)
}

export default AuthButtonClient