import { signIn, signOut, useSession } from 'next-auth/react';
import React, { useEffect } from 'react';

const SignController = () => {
  const { data: session } = useSession();

  useEffect(() => {
    console.log(session);
  }, [session]);

  return (
    <div>
      {session ? <button onClick={() => signOut()}>로그아웃</button> : <button onClick={() => signIn()}>로그인</button>}
    </div>
  );
};

export default SignController;
