'use client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import RegisterGoogle from './RegisterGoogle';
import RegisterRegular from './RegisterRegular';

const Register = () => {
  const searchParams = useSearchParams();
  const registerGoogle = searchParams.get('google');

  return (
    <>
      {
        registerGoogle ?
          <>
            <RegisterGoogle />
          </>
          :
          <>
            <RegisterRegular />
          </>
      }
    </>
  )
}

export default Register