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
    <div className="w-full p-10">
      <div className="flex flex-col gap-4">
        {data.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <Card className="w-full p-8 cursor-pointer">
              {post.id}
              {post.title}
            </Card>
          </Link>
        ))}
        <Link key={'add-item'} href={`/posts/add`}>
          <Card className="w-full p-8 cursor-pointer text-center	">+</Card>
        </Link>
      </div>
    </div>
  );
};

export default Page;
