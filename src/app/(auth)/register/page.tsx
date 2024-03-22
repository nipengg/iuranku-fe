'use client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import RegisterGoogle from '@/components/Register/RegisterGoogle';
import RegisterRegular from '@/components/Register/RegisterRegular';

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