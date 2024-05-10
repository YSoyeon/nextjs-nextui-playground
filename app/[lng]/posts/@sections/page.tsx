'use client';

import React, { useEffect } from 'react';

const NAME = '';
export default async function Page() {
  useEffect(() => {
    if (!NAME) {
      throw Error('error!!');
    }
  }, []);

  return <div> test component </div>;
}
