import { useState, useEffect } from 'react';
import axios from 'axios';

const useTasks = () => {
  const [tasks, setTasks] = useState([]);


  useEffect(() => {
    const he = async () => {
      const res = await fetch(`http://127.0.0.1:8000/api/projects`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'mail@ex.com'
        }
      });
      const data = await res.json();
      console.log(data)
    }
    he();
  }, []);

}

//process.env.REACT_APP_BACKEND_URL