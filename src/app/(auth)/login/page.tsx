'use client'
import { useDispatch } from 'react-redux';
import { authGoogle } from '@/lib/features/authSlice';
import { AppDispatch } from '@/lib/store';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import { StatusCodes } from 'http-status-codes';
import { useRouter } from 'next/navigation';

const Login = () => {

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLoginGoogle = (res: CredentialResponse) => {
    dispatch(authGoogle(res)).then((res: any) => {
      if (res?.payload.meta.code == StatusCodes.OK) {
        router.push('/register?google=true');
        toast.success('Google Account Verified');
      } else {
        toast.error('Login Failed')
      }
    });
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <GoogleLogin
          onSuccess={(res) => handleLoginGoogle(res)}
          onError={() => {
            toast.error('Login Failed')
          }}
        />
      </div>

    </>
  )
}

export default Login