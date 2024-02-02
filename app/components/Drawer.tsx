import React, { useEffect } from 'react';

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
};
const Drawer = ({ isOpen, children }: Props) => {
  return (
    <div
      className={`fixed inset-y-0 right-0 w-64 bg-white text-white p-4 transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform ease-in-out duration-300 border-2 z-50`}
    >
      {children}
    </div>
  );
};

export default Drawer;
