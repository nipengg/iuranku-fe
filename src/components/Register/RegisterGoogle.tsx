'use client';
import { RootState } from '@/lib/store'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const RegisterGoogle = () => {

    const router = useRouter();
    const user = useSelector((state: RootState) => state.auth.user);

    const checkUserState = () => {
        if (user.name == "" || user.email == "") {
            router.back();
        }
    }

    useEffect(() => {
      checkUserState();
    }, [])
    

    return (
        <div>Register Google</div>
    )
}

export default RegisterGoogle