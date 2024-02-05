import React from 'react';

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
};
const Drawer = ({ isOpen, children }: Props) => (
  <div
    className={`fixed inset-y-0 right-0 w-64 transform bg-white p-4 text-white ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    } z-50 border-2 transition-transform duration-300 ease-in-out`}
  >
    {children}
  </div>
);

export default Drawer;
