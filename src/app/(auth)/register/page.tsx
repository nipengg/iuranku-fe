'use client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import RegisterGoogle from './RegisterGoogle';
import RegisterRegular from './RegisterRegular';
import { Suspense } from 'react'

const Register = () => {
  const searchParams = useSearchParams();
  const registerGoogle = searchParams.get('google');

  return (
    <>
      <Suspense>
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
      </Suspense>
    </>
  )
}

export default Register