import { doSignOut } from '../../firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';

const DashBoard = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  const handleSignOut = async () => {
    try {
      await doSignOut();
      navigate('/'); // Redirect to login after sign-out
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  return (
    <div className='flex justify-end'>
      <button 
        onClick={handleSignOut}
        className="px-2 py-2  bg-slate-400 text-black border rounded-lg hover:bg-red-700"
      >
        Sign Out
      </button>
    </div>
  );
};

export default DashBoard;