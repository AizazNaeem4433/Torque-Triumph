import Link from 'next/link';
import React from 'react';
import { ModeToggle } from './Modetoggle';

function Navbar() {
  return (
    <nav className='w-full flex items-center justify-between max-w-4xl mx-auto px-4 py-5'>
      <Link href="/" className='font-bold text-3xl'>
        Cars<span className='text-orange-600'>blog</span>
      </Link>
      <div className='ml-auto'>
        <ModeToggle />
      </div>
    </nav>
  );
}

export default Navbar;
