'use client';

import Select from 'react-select';
import { dummyData } from './dummyData';

const page = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">ReactSelect</h1>
      <Select
        options={dummyData}
        onChange={(e) => {
          console.log(e);
        }}
      />
    </div>
  );
};

export default page;
