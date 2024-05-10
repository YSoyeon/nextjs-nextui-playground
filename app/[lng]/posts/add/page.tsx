import React from 'react';
import Editor from './editor/Editor';
import Severity from './severity/Severity';
import Weakness from './weakness/Weakness';
import ReportCard from './ReportCard';

function Page() {
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
    <div className="mt-5 flex justify-center">
      <div className="flex flex-col items-center gap-5">
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
}

export default Page;
