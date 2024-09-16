import React from 'react'

const Login = () => {
  return <div className='flex flex-col items-center justify-center min-w-96 mx auto'>
    <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-capacity-0'>
      <h1 className='text-3xl font-semibold text-center text-gray-300'> 
        Login
        <span className='text-blue-500'> to ChatApp</span>
         </h1>
         <form>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-black'>Username</span>
            </label>
            <input type='text' placeholder='Enter username' className='w-full input input-bordered h-10' />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-black'>Password</span>
            </label>
            <input type='text' placeholder='Enter password' className='w-full input input-bordered h-10' />
          </div>

          <a href='#' className="text-sm text-black hover:underline hover:text-blue-600 mt-2 inline-block">{"Don't"} have an account? </a>
         <div>
          <button className='btn btn-block btn-sm mt-2'>Login</button>
         </div>
         </form>
    </div>

  </div>
}

export default Login;