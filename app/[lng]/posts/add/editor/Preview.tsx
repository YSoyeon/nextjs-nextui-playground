'use client';

import React from 'react';
import { useDisclosure } from '@nextui-org/react';

type Props = {
  content: string;
};
const Preview = ({ content }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleClick = async () => {
    const response = await fetch('/api/file');
    const blob = await response.blob();
    console.log('blob');
    console.log(blob);
    //const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    //link.href = url;
    link.href = '/api/file';
    link.download = 'test.pdf';
    link.click();
    //window.URL.revokeObjectURL(url);
  };

  const post = async () => {
    await fetch('/api/file', { method: 'POST', body: JSON.stringify({ content: 'post test' }) });
  };

  return (
    <div className="w-full flex flex-col">
      <button onClick={post}>post test button</button>
      <button onClick={handleClick}>download</button>
      <a download href="/posts/add/editor/api/app.pdf">
        download pdf
      </a>
      <div className="w-[700px] h-[480px] leading-relaxed" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};
export default Preview;
