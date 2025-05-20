import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton,SignUpButton } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'
import { LayoutDashboard } from 'lucide-react'
const Header = () => {
  return (
    <div className='fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b'> 
    <nav className='container mx-auto px-4 py-4 flex items-center justify-between'>
      <Link href='/'>
        <Image
        src={"/logo.png"}
        alt="finsight logo"
        height={60}
        width={200}
        className="h-12 w-auto object-contain"
        />
      </Link>
        <div>
          <SignedIn>
            <Link href={"/dashboard"}>
            < Button varaint="outline">
              <LayoutDashboard/>
              <span>Dashboard</span>
            </Button>
            </Link>
          </SignedIn>

        <SignedOut>
            <SignInButton forceRedirectUrl='/dashboard'>
              <Button variant="outline">Login</Button>
            </SignInButton>
        </SignedOut>
        <SignedIn>
            <UserButton />
        </SignedIn>
        </div>
        </nav>
    </div>
  )
}

export default Header