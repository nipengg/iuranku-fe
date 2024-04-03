'use client'
import { useDispatch, useSelector } from 'react-redux';
import { authGoogle, login } from '@/lib/features/authSlice';
import { AppDispatch, RootState } from '@/lib/store';
import { TokenResponse, useGoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import { StatusCodes } from 'http-status-codes';
import { useRouter } from 'next/navigation';
import GoogleButton from 'react-google-button';
import { STATUS_SIGNIN } from '@/constant';
import { useState } from 'react';
import { UserLoginForm, UserLoginFormInitial } from '@/model/Master/UserModel';

const Login = () => {

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const auth = useSelector((state: RootState) => state.auth);
  const [loginForm, setLoginForm] = useState<UserLoginForm>({ ...UserLoginFormInitial });

  /* Set Change Form */
  const handleChange = (e: any) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value
    })
  }

  /* Login Manual */
  const handleLogin = (e: any) => {
    e.preventDefault();
    dispatch(login(loginForm)).then((res: any) => {
      if (res.payload.meta.code == StatusCodes.OK) {
        router.push('/dashboard');
        toast.success(`Welcome Back ${res.payload.result.user.name}`);
      } else {
        toast.error(`${res.payload.meta.message}. ${res.payload.result.message}`)
      }
    });
  }

  /* Google Login */
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse: TokenResponse) => {
      dispatch(authGoogle(tokenResponse)).then((res: any) => {
        if (res.payload?.meta?.code == StatusCodes.OK || res.status == StatusCodes.OK) {
          if (res.payload.meta.message == STATUS_SIGNIN.Authenticated) {
            router.push('/dashboard');
            toast.success('Sign In!');
          } else {
            router.push('/register?google=true');
            toast.success('Google Account Verified');
          }
        } else {
          toast.error('Login Failed')
        }
      })
    },
    onError: errorResponse => toast.error(`Login Failed, ${errorResponse}`),
  });

  return (
    <>

      <div className='grid grid-cols-1 sm:grid-cols-3 h-screen w-full'>
        <div className='bg-custom-green-primary col-span-2 flex flex-col justify-center'>

        </div>
        <div className='bg-custom-green-primary flex flex-col justify-center'>
          <form className='max-w-[400px] w-full mx-auto rounded-lg h-full flex justify-center items-center mt-5 mb-5 bg-custom-yellow-primary p-8 px-8'>
            <div className='w-full'>
              <h2 className='text-black text-2xl font-bold text-center'>IuranKu</h2>
              <div className='flex flex-col text-black py-2'>
                <label>Email</label>
                <input
                  className='rounded-lg mt-2 p-2 hover:ring-2 hover:ring:bg-custom-green-primary focus:outline-none focus:ring-2 focus:ring:border-custom-green-primary'
                  type="email"
                  placeholder='Enter your Email'
                  required
                  name='email'
                  onChange={handleChange}
                />
              </div>
              <div className='flex flex-col text-black py-2'>
                <label>Password</label>
                <input
                  className='p-2 rounded-lg mt-2 hover:ring-2 hover:ring:bg-custom-green-primary focus:outline-none focus:ring-2 focus:ring:border-custom-green-primary'
                  type="password"
                  placeholder='Enter your Password'
                  required
                  name='password'
                  onChange={handleChange}
                />
              </div>
              <div className='flex justify-between text-sm text-black py-2'>
                <p className='flex items-center'>
                  <input
                    className='mr-2'
                    type="checkbox"
                    checked={loginForm.remember}
                    name='remember'
                    onChange={(e: any) => {
                      setLoginForm({
                        ...loginForm,
                        remember: e.target.checked ? true : false
                      })
                    }}
                  />
                  Remember Me
                </p>
                <a className="text-blue-500 underline hover:text-blue-800 hover:underline" href="#">
                  Forgot Password?
                </a>
              </div>
              <button
                className={`w-full my-5 py-2 ${auth.isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-custom-green-primary shadow-md'} hover:bg-custom-green-dark text-white font-semibold rounded-lg`}
                disabled={auth.isLoading ? true : false}
                onClick={handleLogin}
              >
                {auth.isLoading ? 'Loading...' : 'Sign In'}
              </button>
              <div className="text-sm mb-4 flex items-center">
                <hr className="flex-grow border-gray-400 mr-2" />
                <span className="mx-2">or</span>
                <hr className="flex-grow border-gray-400 ml-2" />
              </div>
              <GoogleButton
                type="light"
                style={{ width: '100%' }}
                onClick={(e) => {
                  e.preventDefault();
                  googleLogin();
                }}
                disabled={auth.isLoading ? true : false}
                label={auth.isLoading ? 'Loading...' : 'Sign in with Google'}
              />
              <div className="text-sm mt-6 text-center">
                Do not have an account? <a href='#' className='text-blue-500 underline hover:text-blue-800 hover:underline'>Register Here</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login