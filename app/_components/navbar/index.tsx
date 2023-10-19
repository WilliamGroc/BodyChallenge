"use client";

import styles from './styles.module.css';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Navbar() {
  const session = useSession();
  const authenticated = session?.status === 'authenticated';

  return <header className="bg-white h-20">
    <nav className={`h-full flex justify-between items-center w-full ${styles.nav}`}>
      <div>
        <Link href="/" className="text-ct-dark-600 text-2xl font-semibold">
          Body Challenge
        </Link>
      </div>
      <ul className="flex items-center gap-4">
        <li>
          <Link href="/" className="text-ct-dark-600">
            Home
          </Link>
        </li>
        {!authenticated && (
          <>
            <li>
              <Link href="/auth/signin" className="text-ct-dark-600">
                Login
              </Link>
            </li>
            <li>
              <Link href="/auth/signup" className="text-ct-dark-600">
                Register
              </Link>
            </li>
          </>
        )}
        {authenticated && (
          <>
            <li>
              <Link href="/profile" className="text-ct-dark-600">
                Profile
              </Link>
            </li>
            <li className="cursor-pointer" onClick={()  => signOut()}>
              Logout
            </li>
          </>
        )}
      </ul>
    </nav>
  </header>
}