import { Card, CardHeader, Spinner } from '@nextui-org/react';
import React, { Suspense } from 'react';

type Props = {
  header: {
    title: string;
    description: string;
  };
  children: React.ReactNode;
};
const ReportCard = ({ header, children }: Props) => {
  return (
    <Card className="w-[800px] rounded">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">{header.title}</p>
          <p className="text-small text-default-500">{header.description}</p>
        </div>
      </CardHeader>
      <Suspense
        fallback={
          <div className="w-full flex justify-center p-3">
            <Spinner />
          </div>
        }
      >
        <div className="py-2.5">{children}</div>
      </Suspense>
    </Card>
  );
};

export default ReportCard;
