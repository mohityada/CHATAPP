import React, { useState } from 'react'
import GenderCheckbox from './GenderCheckbox';
import { Link } from 'react-router-dom';
import { sign } from 'jsonwebtoken';
import useSignup from '../../components/hooks/useSignup';

const SignUp = () => {

  const [inputs, setInputs] = useState({
    fullName: '',
    userName: '',
    password: '',
    confirmPassword: '',
    gender: '',
  }
  );

  const {loading, signup} = useSignup();
  
  const handleCheckboxChange = (gender) => {
    setInputs({...inputs, gender})
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("inpust sending : " + inputs.fullName + "," + inputs.gender);
    await signup(inputs);
  };

  return <div className='flex flex-col items-center justify-center min-w-96 mx auto'>
    <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-capacity-0'>
      <h1 className='text-3xl font-semibold text-center text-gray-300'> 
        SignUp
        <span className='text-blue-500'> to ChatApp</span>
         </h1>
         <form onSubmit={handleSubmit}>
         
         <div>
            <label className='label p-2'>
              <span className='text-base label-text text-black'>Full Name</span>
            </label>
            <input type='text' placeholder='Mohit Yadav' className='w-full input input-bordered h-10'
                value={inputs.fullName}
                onChange={(e) => setInputs({...inputs, fullName: e.target.value})}
             />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-black'>UserName</span>
            </label>
            <input type='text' placeholder='mohitiyo' className='w-full input input-bordered h-10' 
              value={inputs.userName}
              onChange={(e) => setInputs({...inputs, userName: e.target.value})}
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-black'>Password</span>
            </label>
            <input type='password' placeholder='Enter password' className='w-full input input-bordered h-10' 
                value={inputs.password}
                onChange={(e) => setInputs({...inputs, password: e.target.value})}
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-black'>Confirm Password</span>
            </label>
            <input type='password' placeholder='Confirm password' className='w-full input input-bordered h-10'
              value={inputs.confirmPassword}
              onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})}
            />
          </div>

          <GenderCheckbox onCheckboxChange = {handleCheckboxChange} selectedGender={inputs.gender} />
          
          <Link to='/login' className="text-sm text-black hover:underline hover:text-blue-600 mt-2 inline-block">Already have an account? 
          </Link>
         <div>
          <button className='btn btn-block btn-sm mt-2' disabled = {loading} >
            {loading ? <span className='loading loading-spinner'> </span> : "Sign Up" } </button>
         </div>
         </form>
    </div>

  </div>
}

export default SignUp;