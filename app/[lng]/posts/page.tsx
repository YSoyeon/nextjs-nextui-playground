'use client';

import React, { useEffect, useState } from 'react';
import { Card, Link } from '@nextui-org/react';

const Page = () => {
  const [data, setData] = useState<PostType[]>([]);

  const getData = async () => {
    const res = await fetch('http://localhost:4444/posts');
    res.json().then((data) => {
      console.log(data);
      setData(data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="mt-10 flex flex-col gap-4">
      {data.map((post) => (
        <Link key={post.id} href={`/posts/${post.id}`}>
          <Card className="p-8 cursor-pointer">
            {post.id}
            {post.title}
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default Page;
