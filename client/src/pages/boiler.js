import axios from 'axios';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const [data, setData] = useState([]);
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
          setData(response.data);
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
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload()
  };

  return (
    <div>
      Welcome to Homepage
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default MyComponent;
