import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');

      // Redirect if token is missing
      if (!token) {
        console.warn('No token found');
        navigate('/');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/auth/home', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('✅ User fetched:', response.data);

        // optionally: set user data to state here
      } catch (error) {
        console.error('❌ Auth error:', error.response?.data || error.message);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Home</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200 cursor-pointer"
      >
        Log Out
      </button>
    </div>
  );
}

export default Home;
