import React, { Suspense } from 'react';
import Editor from './editor/Editor';
import Severity from './severity/Severity';
import { Card, CardHeader, Spinner } from '@nextui-org/react';
import Weakness from './weakness/Weakness';
import ReportCard from './ReportCard';

const Page = () => {
  const contents: {
    title: string;
    description: string;
    content: React.ReactNode;
  }[] = [
    {
      title: 'Weakness',
      description:
        'Select the type of the potential issue you have discovered. Can&apos;t pick just one? Select the best match or submit a separate report for each distinct weakness.',
      content: <Weakness />,
    },
    {
      title: 'Severity(optional)',
      description: 'Estimate the severity of this issue.',
      content: <Severity />,
    },
    {
      title: 'Proof of Concept',
      description:
        'The proof of concept is the most important part of your report submission. Clear, reproducible steps will help us validate this issue as quickly as possible.',
      content: <Editor />,
    },
  ];

  return (
    <div className="flex justify-center mt-5">
      <div className="flex flex-col gap-5 items-center">
        <h1 className="text-xl font-bold">Submit Report</h1>
        {contents.map((value, i) => (
          <ReportCard
            key={i}
            header={{
              title: value.title,
              description: value.description,
            }}
          >
            {value.content}
          </ReportCard>
        ))}
      </div>
    </div>
  );
};

export default Page;
