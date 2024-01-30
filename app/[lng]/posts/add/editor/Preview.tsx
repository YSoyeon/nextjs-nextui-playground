import React from 'react';

type Props = {
  content: string;
};
const Preview = ({ content }: Props) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');

  return <div className="h-[480px] leading-relaxed" dangerouslySetInnerHTML={{ __html: content }} />;
};
export default Preview;
