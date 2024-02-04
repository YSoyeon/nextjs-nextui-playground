import React from 'react'
import { Button, Card, Link } from '@nextui-org/react'
import { getPosts } from '@/lib/get-posts'

// async function getPosts() {
// 	const res = await fetch("http://localhost:4444/posts");
// 	return res.json();
// }

// const session = null

export default async function Page() {
  const posts: PostType[] = await getPosts()

  // if (session == null) {
  // 	throw new Error("no session provided");
  // }



  return (
    <div className="mt-10 flex flex-col gap-4">
      {posts.map((post) => (
        <Link key={post.id} href={`/posts/${post.id}`}>
          <Card className="cursor-pointer p-8">
            {post.id}
            {post.title}
          </Card>
        </Link>
      ))}

      <Link href="/posts/add">
        <Button>+</Button>
      </Link>
    </div>
  )
}
