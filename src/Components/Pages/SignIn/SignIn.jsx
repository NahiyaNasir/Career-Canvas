import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import Lottie from 'lottie-react';
import signinAnimation from "../../../../public/lotti-animation/signin-animation.json"
import 'animate.css';
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { toast } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';




const SingIn = () => {

  const { signIn, signInWithGoogle } = useContext(AuthContext)
  const navigate = useNavigate()


  const handleLogin = e => {
    e.preventDefault();

    const email = e.target.email.value;
    const pass = e.target.pass.value;
    console.log(email, pass);

    signIn(email, pass)
      .then((result) => {
        console.log(result.user)
        toast.success('Login Successful!!')
        navigate('/')
      })
      .catch((error) => {
        console.log(error)
        toast.error(' Login Unsuccessful!!')
      })

  }

  // google Login

  const handleGoogle = () => {
    signInWithGoogle()
      .then(result => {
        console.log(result)
        toast.success('Login Successful!!')
        navigate('/')

      })
      .catch(() => {
        toast.error(' Login Unsuccessful!!')
      }
      )
  }



  return (
    <div className="flex  items-center py-6 md:py-10 lg:py-16 justify-center ">
      <div className=" lg:w-full lg:max-w-6xl flex flex-col-reverse lg:flex-row bg-white rounded-lg  ">

        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8 bg-green-500 bg-opacity-5">
          <h2 className="animate__animated animate__bounceIn text-3xl font-bold text-green-500 lg:mt-8 mb-2">Welcome back!</h2>
          <p className="text-black text-lg font-semibold">The faster you login, the faster you can build your resume.</p>
          <form onSubmit={handleLogin} className="mt-6">
            <div className="mb-4 animate__animated animate__lightSpeedInLeft">
              <label className="block  text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
              />
            </div>
            <div className="mb-4 animate__animated animate__lightSpeedInRight">
              <label className="block  text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="pass"
                required
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
              />
            </div>
            <div className="flex items-center justify-between mb-4 animate__animated animate__lightSpeedInLeft">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-green-500" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-green-500 hover:underline">Forgot Password?</a>
            </div>
            <button
              type="submit"
              className="animate__animated animate__lightSpeedInRight w-full text-black font-bold py-2 px-4 rounded-lg border border-green-500 shadow-md hover:bg-green-500 hover:text-white hover:shadow-lg transition-all duration-300"
            >
              Sign In
            </button>

            <button onClick={handleGoogle} className="animate__animated animate__lightSpeedInLeft mt-4 w-full text-black font-bold py-2 px-4 rounded-lg border border-green-500 shadow-md hover:bg-green-500 hover:text-white hover:shadow-lg transition-all duration-300 flex items-center justify-center">
              <FaGoogle className='mr-3 text-green-500 hover:text-black' />
              Sign In with Google
            </button>
          </form>
          <p className="mt-6 text-center font-bold">
            Don’t have an account?{' '}
            <Link to="/signup" className="font-bold text-green-500">Sign Up</Link>
          </p>
        </div>

        {/* Lottie Animation Section */}
        <div className="animate__animated animate__bounceIn w-full lg:w-1/2 flex justify-center items-center p-6 lg:p-10 bg-green-500 bg-opacity-5">
          <Lottie animationData={signinAnimation} className="w-full h-full max-h-[400px] md:max-h-[500px] lg:max-h-[600px]" />
        </div>
      </div>
    </div>
  );
};

export default SingIn;