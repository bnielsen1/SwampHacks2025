import React,  { useEffect, useState }from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config/config';
import styles from './MainPage.module.css';
import axios from 'axios';
import LoginButton from "../../login";
import Profile from '../../profile';
import LogoutButton from '../../logout';

function MainPage() {
  const [id, setId] = useState(-1);
  const [building, setBuilding] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/sessions`)
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
      <div className={styles.header}>
        <div className={styles.logoCircle}>
          <img src="/images/mdi_library-outline.svg" alt="logo" className={styles.logo}/>
        </div>
        <div className={styles.title}>
        StudySesh
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.loginButton}>
            Log In
          </button>
        </div>
      </div>
      <div className={styles.threecolumns}>
        <div className={styles.leftColumn}>
          <div className={styles.menuImageContainer}>
            <img src="/images/TempImage.jpg" alt="leftImage" className={styles.menuImage}/>
          </div>
          <div className={styles.courseButtonContainer}>
            <button className={styles.courseButton}>Search by Course</button>
          </div>          
        </div>
        <div className={styles.middleColumn}>Column 2</div>
        <div className={styles.rightColumn}>
          Column 3
        <p>{id}</p>
        <p>{building}</p>
        </div>
      </div>

      <LoginButton />
      <LogoutButton />
      <div className="three-columns">
        <div className="column">Column 1</div>
        <div className="column">Column 2</div>
        <div className="column">Column 3</div>
      </div>
      <Profile />
    </div>
  )
};

export default MainPage;
