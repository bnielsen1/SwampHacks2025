import React, { useState } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

const CreateSession = () => {
  const { user } = useAuth0();
  //const [user, setUser] = useState('');
  const [course, setCourse] = useState('');
  const [library, setLibrary] = useState('');
  const [date, setDate] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [description, setDescription] = useState('');
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log('Submitted hours:', hours); // Log the hours on submission
    const data = {
      user: user.name,
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
    }
  };

  return (
    <div className="create-session">
      <h1>Create Session</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="user">User:</label>
          <p>{user.name}</p>
          {/* <input
            type="text"
            id="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          /> */}
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
        </div>
        <div>
          <label htmlFor="library">Library:</label>
          <input
            type="text"
            id="library"
            value={library}
            onChange={(e) => setLibrary(e.target.value)}
            required
          />
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
