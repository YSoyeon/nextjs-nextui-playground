import React, { useEffect } from 'react';

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
};
const Drawer = ({ isOpen, children }: Props) => {
  useEffect(() => {
    console.log('isopeen');
    console.log(isOpen);
  }, [isOpen]);
  return (
    <div className={`fixed top-600 ${isOpen ? '-right-20' : '-right-50'} bg-white shadow-black ease-in z-10`}>
      {children}
    </div>
  );
};

export default Drawer;
