import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

const SignController = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <button type="button" onClick={() => signOut()}>
          로그아웃
        </button>
      ) : (
        <button type="button" onClick={() => signIn()}>
          로그인
        </button>
      )}
    </div>
  );
};

export default SignController;
