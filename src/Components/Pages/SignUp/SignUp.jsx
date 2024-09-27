import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import Lottie from 'lottie-react';
import signup_Animation from "../../../../public/lotti-animation/signup-animation.json"
import 'animate.css';
import { useContext, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SignUp = () => {


  const {createUser, signInWithGoogle}=useContext(AuthContext)
const [signUpError,setSignUpError]=useState('')
const navigate=useNavigate()
  

const handleSignUp = e => {
 e.preventDefault();

    const email = e.target.email.value;
    const pass = e.target.pass.value;
    const name = e.target.name.value;
    console.log(name, email, pass);

  if(pass.length<5){
toast.error('Password Must be 5 Character')
return
  }
  else if(!/[A-Z]/.test(pass)){
    toast.error('Password must have One Capital letter!!')
    return
  }
  else if(!/[a-z]/.test(pass)){
    toast.error('Password must have One Small letter!!')
    return
  }
  else if(!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(pass)){
    toast.error('Password must have One Special Character!!')
    return
  }
  createUser(email,pass)
  .then(result=>{
    console.log(result.user)
    toast.success('User Created Successfully!!')
    navigate('/')
  })
  .catch(error=>{
toast.error(error.message)
  })

  }

  // google
  const handleGoogle=()=>{
    signInWithGoogle()
    .then(result=>{
      console.log(result)
      toast.success('User Created Successfully!!')
      navigate('/')
    
    })
    .catch(error=>console.log(error))
    }

  return (
    <div className="flex items-center py-6 md:py-10 lg:py-16 justify-center">
      <div className="lg:w-full lg:max-w-6xl flex flex-col-reverse lg:flex-row-reverse bg-white rounded-lg overflow-hidden shadow-lg">
        
        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8 bg-green-500 bg-opacity-5">
          <h2 className="animate__animated animate__bounceIn text-3xl font-bold lg:mt-8 mb-2">
            Welcome To <span className='text-green-500 text-4xl'>Career Canvas!</span>
          </h2>
          <p className=" text-lg font-semibold">
            The faster you Sign Up, the faster you can build your resume.
          </p>
          
          <form onSubmit={handleSignUp} className="mt-6">
            <div className="mb-4 animate__animated animate__lightSpeedInLeft">
              <label className="block text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                
                placeholder="Enter your Name"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
              />
            </div>

            

            <div className="mb-4 animate__animated animate__lightSpeedInLeft">
              <label className="block text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Enter your Email"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
              />
            </div>

            <div className="mb-4 animate__animated animate__lightSpeedInRight">
              <label className="block text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="pass"
                required
                placeholder="Enter your Password"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
              />
            </div>

            <button
              type="submit"
              className="animate__animated animate__lightSpeedInLeft w-full text-black font-bold py-2 px-4 rounded-lg border border-green-500 shadow-md hover:bg-green-500 hover:text-white hover:shadow-lg "
            >
              Sign Up
            </button>

            <button onClick={handleGoogle}
              className="animate__animated animate__lightSpeedInRight mt-4 w-full text-green-600 bg-white border border-green-500 font-bold py-2 px-4 rounded-lg hover:bg-green-500 hover:text-white flex items-center justify-center"
            >
              <FaGoogle className="mr-3 text-green-800" />
              Sign Up with Google
            </button>
          </form>

          <p className="mt-6 text-center font-bold">
            Already have an account?{' '}
            <Link to="/signin" className="font-bold text-green-500">
              Sign In
            </Link>
          </p>
          
        </div>

        {/* Lottie Animation Section */}
        <div className="animate__animated animate__bounceIn w-full lg:w-1/2 flex justify-center items-center p-6 lg:p-10 bg-green-500 bg-opacity-5">
          <Lottie animationData={signup_Animation} className="w-full h-full max-h-[400px] md:max-h-[500px] lg:max-h-[600px]" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;