import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Expense from '../Components/Admin/Expense';

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/home', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setIsAuthenticated(true);
        } catch (error) {
          console.log(error);
          navigate('/');
        }
      };
      fetchData();
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return null;
  }
  

  return (
    <div  >
      <div className='w-screen '  style={{ backgroundColor: "rgb(171, 202, 242)", height: "91vh" }}>
      <Expense />
      </div>
    </div>
  );
}

export default Home;
