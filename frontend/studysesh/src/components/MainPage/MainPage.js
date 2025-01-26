import React,  { useEffect, useState }from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import config from '../../config/config';
import styles from './MainPage.module.css';
import axios from 'axios';
import LoginButton from "../../login";
import Profile from '../../profile';
import LogoutButton from '../../logout';

function MainPage() {
  const [id, setId] = useState(-1);
  const [course, setCourse] = useState(null);
  const [library, setLibrary] = useState(null);
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/sessions/?format=json`)
      .then(response => {
        setId(response.data[0].User);
        setCourse(response.data[0].Course);
        setLibrary(response.data[0].Library);
        console.log('Fetched Session:', {id}, {course}, {library});  
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
        {isAuthenticated ? (
            <LogoutButton className={styles.logoutButton} />
          ) : (
            <LoginButton className={styles.loginButton} />
          )}
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
        <div className={styles.middleColumn}>
        <div className={styles.menuImageContainer}>
            <img src="/images/TempImage.jpg" alt="middleImage" className={styles.menuImage}/>
          </div>
          <div className={styles.sessionButtonContainer}>
            <button className={styles.sessionButton}>
              <img src="/images/ic_round-plus.svg" alt="plusSymbol" className={styles.plusSymbol}/>
            </button>
          </div>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.menuImageContainer}>
            <img src="/images/TempImage.jpg" alt="rightImage" className={styles.menuImage}/>
          </div>
          <div className={styles.libraryButtonContainer}>
            <button className={styles.libraryButton}>Search by Library</button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default MainPage;
