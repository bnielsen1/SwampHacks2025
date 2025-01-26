import React,  { useEffect, useState }from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config/config';
import styles from './MainPage.module.css';
import axios from 'axios';

function MainPage() {
  const [id, setId] = useState(-1);
  const [building, setBuilding] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/sessions/?format=json`)
      .then(response => {
        setId(response.data[0].id);
        setBuilding(response.data[0].building);
        console.log('Fetched Session:', response.data[0].id, response.data[0].building);  
      })
      .catch(error => {
        console.error('Error fetching session:', error);
      });
  }, [])

  return (
    <div className={styles.App}>
      <div className={styles.title}>
        StudySesh
      </div>
      <div className={styles.threecolumns}>
        <div className={styles.column}>
          Column 1
          <p>{id}</p>
          <p>{building}</p>
        </div>
        <div className={styles.column}>Column 2</div>
        <div className={styles.column}>Column 3</div>
      </div>
    </div>
  )
};

export default MainPage;
