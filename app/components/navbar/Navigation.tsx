'use client';

import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';
import SignController from './SignController';

const Navigation = ({ lng }: { lng: any }) => {
  const path = usePathname();

  const [pathName, setPathName] = useState('');

  useEffect(() => {
    const pathArr = path.split('/');

    if (pathArr.length === 1) {
      setPathName('');
    } else {
      setPathName(pathArr[1]);
    }
  }, [path]);

  return (
    <Navbar className="bg-gray-800">
      <NavbarBrand>
        <Link color="secondary" href="/">
          <p className="font-bold text-inherit">TEST</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarItem isActive={pathName === ''}>
          <Link color="secondary" href="/">
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathName === 'posts'}>
          <Link color="secondary" href="/posts">
            Posts
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathName === 'calendar'}>
          <Link color="secondary" href="/calendar">
            Autocomplete
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <ThemeSwitcher />
          <LanguageSwitcher lng={lng} />
          <SignController />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Navigation;
