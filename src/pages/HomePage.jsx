import axios from 'axios';
import React, { useEffect, useState } from 'react';

// import routes from '../routes';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` }
  }
  return {};
};

const HomePage = (props) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const headers = getAuthHeader();
    const route = '/api/v1/data';
    const fetchData = async () => {
      const response = await axios.get(route, { headers });
      setData(response.data);
    }
    fetchData();
  });
  return (
  <div>
    <h1>Home Page</h1>
  </div>
)
};

export default HomePage;
