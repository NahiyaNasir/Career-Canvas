import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import useAdmin from '../../../../Hooks/useAdmin';

const LoginUserProfile = () => {

  const { user } = useContext(AuthContext)
  const { isAdmin } = useAdmin()

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div
        className="bg-white rounded-md space-y-2 shadow-md min-w-[50%] px-4 py-8 flex items-center justify-center flex-col">
        <img
          src="https://img.freepik.com/free-photo/handsome-man-with-glasses_144627-18666.jpg?t=st=1722611499~exp=1722615099~hmac=cde3d70c79e64336ce0f8d5f88de5fabc9d64ba95983ff1f84b6d9dba91df349&w=360"
          alt="image"
          className="w-[100px] h-[100px] rounded-full object-cover"
        />

        <h1 className="text-2xl font-[500] leading-[24px] mt-4"> {user?.displayName}</h1>
        <p className=" text-gray-500 text-xl font-semibold">{user?.email}</p>
        <p className=" text-gray-500 text-xl font-semibold">
          {isAdmin ? (
            <h1> Role: <span> Admin.</span></h1>
          ) : (
            <h1> Role: <span> User.</span></h1>
          )}
        </p>

      </div>
    </div>
  );
};

export default LoginUserProfile;