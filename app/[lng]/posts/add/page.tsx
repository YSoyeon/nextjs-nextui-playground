import React from 'react';
import Editor from './Editor';

const Page = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col gap-5 items-center">
        <h1 className="text-xl font-bold">ADD POST</h1>
        <div>
          <Editor />
        </div>
      </div>
    </div>
  );
};

export default Page;
