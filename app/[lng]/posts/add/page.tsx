import React from 'react';
import Editor from './editor/Editor';
import Severity from './severity/Severity';
import { Card, CardHeader } from '@nextui-org/react';

const Page = () => {
  return (
    <div className="flex justify-center mt-5">
      <div className="flex flex-col gap-5 items-center">
        <h1 className="text-xl font-bold">Submit Report</h1>
        <Card className="w-[800px] rounded">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md">Severity(optional)</p>
              <p className="text-small text-default-500">Estimate the severity of this issue.</p>
            </div>
          </CardHeader>
          <Severity />
        </Card>
        <Card className="w-[800px] rounded">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md">Proof of Concept</p>
              <p className="text-small text-default-500">
                The proof of concept is the most important part of your report submission. Clear, reproducible steps
                will help us validate this issue as quickly as possible.
              </p>
            </div>
          </CardHeader>
          <Editor />
        </Card>
      </div>
    </div>
  );
};

export default Page;
