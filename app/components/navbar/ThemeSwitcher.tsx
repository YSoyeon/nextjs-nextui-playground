'use client';

import { Switch } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import React from 'react';
import SunIcon from '../icon/SunIcon';
import MoonIcon from '../icon/MoonIcon';

const ThemeSwitcher = () => {
  const { setTheme } = useTheme();

  return (
    <Switch
      defaultSelected={false}
      size="lg"
      color="secondary"
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <SunIcon className={className} />
        ) : (
          <MoonIcon className={className} />
        )
      }
      onValueChange={(value) => {
        if (value) {
          setTheme('light');
        } else {
          setTheme('dark');
        }
      }}
    ></Switch>
  );
};

export default ThemeSwitcher;
