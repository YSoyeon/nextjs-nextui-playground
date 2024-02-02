import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

const SignController = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <button onClick={() => signOut()}>로그아웃</button>
      ) : (
        <button onClick={() => signIn()}>로그인</button>
      )}
    </div>
  );
};

export default SignController;
