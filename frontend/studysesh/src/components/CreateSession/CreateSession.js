import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
    }
  };

  return (
    <div className="create-session">
      <h1>Create Session</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="user">User:</label>
          {/* Only show the user's name if authenticated */}
          <p>{isAuthenticated ? user.name : 'Guest'}</p>
        </div>
        <div>
          <label htmlFor="course">Course:</label>
          <input
            type="text"
            id="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          />
          {errors.course && (
            <p className="text-red-600 text-sm mt-1">{errors.course}</p>
          )}
        </div>
        <div>
          <label htmlFor="library">Library:</label>
          <select
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
            <p className="text-red-600 text-sm mt-1">{errors.library}</p>
          )}
        </div>
        
          <div>
          <label htmlFor="date">End Time:</label>
          <input
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
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Session</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default CreateSession;
