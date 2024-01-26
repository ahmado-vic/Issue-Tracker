'use client';
import { Avatar, DropdownMenu } from '@radix-ui/themes';
import { clsx } from 'clsx';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBug } from 'react-icons/fa';

function Navbar() {
  const pathname = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ];
  return (
    <nav className='flex gap-6 border-b mb-5 p-4 items-center justify-between'>
      <div className='flex gap-3 items-center'>
        <Link href='/'>
          <FaBug />
        </Link>
        <ul className='flex gap-4'>
          {links.map(link => (
            <li key={link.label}>
              <Link
                className={clsx({
                  'text-zinc-800': pathname === link.href,
                  'text-zinc-500': pathname !== link.href,
                  'hover:text-zinc-800 transition-all': true,
                })}
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        {status === 'unauthenticated' && (
          <button onClick={() => signIn()}>Login</button>
        )}
        {status === 'authenticated' && (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Avatar
                radius='full'
                src={session?.user?.image as string}
                fallback='A'
                className='cursor-pointer'
              />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item>Name: {session.user?.name}</DropdownMenu.Item>
              <DropdownMenu.Item>
                Email: {session.user?.email}
              </DropdownMenu.Item>
              <DropdownMenu.Separator></DropdownMenu.Separator>
              <DropdownMenu.Item onClick={() => signOut()} color='red'>
                Logout
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
