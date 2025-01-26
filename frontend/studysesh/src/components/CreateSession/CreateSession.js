import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './CreateSession.module.css';
import { useAuth0 } from "@auth0/auth0-react";

const CreateSession = () => {
  const { user, isAuthenticated } = useAuth0();
  const [course, setCourse] = useState('');
  const [library, setLibrary] = useState('');
  const [libraries, setLibraries] = useState([]);
  const [date, setDate] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };
  
  // Fetch libraries from backend
  useEffect(() => {
    const fetchLibraries = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/libraries'); // Replace with your backend API URL
        setLibraries(response.data);
      } catch (error) {
        console.error('Error fetching libraries:', error);
      }
    };

    fetchLibraries();
  }, []);

  // Course validation
  const validateCourse = async (Course) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/courses/${Course}`);
      return (Course === response.data[0].code);
    } catch (error) {
      console.error("Error validating course:", error);
      return false;
    }
  };

  const [description, setDescription] = useState('');
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    // Validate course
    const isValidCourse = await validateCourse(course);
    if (!isValidCourse) {
      setErrors((prev) => ({ ...prev, course: "Invalid course name." }));
      setLoading(false);
      return;
    }

    // Validate library
    if (!library) {
      setErrors((prev) => ({ ...prev, library: "Library is required." }));
      setLoading(false);
      return;
    }

    // Prepare data for submission
    const data = {
      user: isAuthenticated ? user.name : 'Unknown User',  // Handle undefined user
      course: course,
      library: library,
      date: date,
      pfp: user.picture,
      description: description
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/create-session/', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setResponseMessage(response.data.message);
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('An error occurred while creating the session.');
    } finally {
      setLoading(false);
      navigateTo("/");
    }
  };

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
          <button onClick={() => navigateTo('/')} className={styles.logoutButton}>Return</button>
        </div>
      </div>
      <div className={styles.bodyContainer}>
        <div className={styles.formContainer}>
          <h1 className={styles.createTitle}>Create Session</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.userContainer}>
              <label className={styles.userTag} htmlFor="user">User:</label>
              {/* Only show the user's name if authenticated */}
              <p className={styles.userBox}>{isAuthenticated ? user.name : 'Guest'}</p>
            </div>
            <div className={styles.courseContainer}>
              <label className={styles.courseTag} htmlFor="course">Course:</label>
              <input
                className={styles.courseBox}
                type="text"
                id="course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                required
              />
              {errors.course && (
                <p className={styles.errorTag}>{errors.course}</p>
              )}
            </div>
            <div className={styles.libraryContainer}>
              <label className={styles.libraryTag} htmlFor="library">Library:</label>
              <select
                className={styles.libraryBox}
                id="library"
                value={library}
                onChange={(e) => setLibrary(e.target.value)}
                required
              >
                <option value="">Select a Library</option>
                {libraries.map((lib) => (
                  <option key={lib.Library} value={lib.Library}>
                    {lib.Library}
                  </option>
                ))}
              </select>
              {errors.library && (
                <p className={styles.errorTag}>{errors.library}</p>
              )}
            </div>
              <div className={styles.dateContainer}>
                <label className={styles.dateTag} htmlFor="date">End Time:</label>
                <input
                  className={styles.dateBox}
                  type="datetime-local"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
            </div> 
            <div>
              <input
                type="hidden"
                id="pfp"
                value={user.picture} // You can set this dynamically if needed
              />
            </div>
            <div className={styles.descriptionContainer}>
              <label className={styles.descriptionTag} htmlFor="description">Description:</label>
              <input
                className={styles.descriptionBox}
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <button className={styles.createButton} type="submit">Submit</button>
          </form>
        </div>
      </div>
      
    </div>
  );
};

export default CreateSession;
