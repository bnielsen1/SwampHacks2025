import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourseSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");  // Search term input
  const [courses, setCourses] = useState([]);  // State to store course suggestions
  const [sessions, setSessions] = useState([]);  // State to store sessions related to selected course
  const [showSuggestions, setShowSuggestions] = useState(false);  // Toggle for showing suggestions
  const [selectedCourseCode, setSelectedCourseCode] = useState(null);  // Track selected course code

  // Handle the change in input field
  const searchBoxChange = (event) => {
    setSearchTerm(event.target.value);  // Update the state with the new input value
  };

  // Fetch courses based on the search term
  useEffect(() => {
    if (searchTerm.length >= 3) {  // Only fetch if search term has 3 or more characters
      setShowSuggestions(true);  // Show suggestions when fetching data
      axios
        .get(`http://localhost:8000/api/courses/${searchTerm}`)
        .then((response) => {
          setCourses(response.data);  // Update the state with the courses returned from API
        })
        .catch((error) => {
          console.error("Error fetching courses", error);
          setCourses([]);  // Clear courses if there's an error
        });
    } else {
      setCourses([]);  // Clear courses if the search term is too short
      setShowSuggestions(false);  // Hide suggestions
    }
  }, [searchTerm]);  // Trigger this effect every time the searchTerm changes

  // Fetch sessions based on the selected course code
  useEffect(() => {
    if (selectedCourseCode) {
      axios
        .get(`http://localhost:8000/api/sessions/course/${selectedCourseCode}`)
        .then((response) => {
          setSessions(response.data);  // Set the sessions for the selected course code
        })
        .catch((error) => {
          console.error("Error fetching sessions", error);
          setSessions([]);  // Clear sessions if there's an error
        });
    }
  }, [selectedCourseCode]);  // Trigger this effect when the selectedCourseCode changes

  // Handle the focus event to show suggestions
  const handleFocus = () => {
    setShowSuggestions(true);  // Show suggestions when the input field is focused
  };

  // Handle the blur event to hide suggestions
  const handleBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);  // Hide suggestions after a short delay (to allow click)
    }, 100);
  };

  // Handle selection of a suggestion (course code)
  const handleSuggestionClick = (course) => {
    setSelectedCourseCode(course.code);  // Set the selected course code
    setSearchTerm(course.code);  // Set the search term to the selected course code
    setShowSuggestions(false);  // Hide the suggestion dropdown
  };

  return (
    <div>
      <h2>Search Courses Example</h2>

      {/* Search input field */}
      <input
        type="text"
        placeholder="Type to search courses..."
        value={searchTerm}  // Bind the input value to the searchTerm state
        onChange={searchBoxChange}  // Call searchBoxChange when input changes
        onFocus={handleFocus}  // Show suggestions on focus
        onBlur={handleBlur}  // Hide suggestions on blur
      />

      {/* Autocomplete dropdown */}
      {showSuggestions && courses.length > 0 && (
        <div className="autocomplete-suggestions">
          <ul>
            {courses.map((course) => (
              <li
                key={course._id}  // Unique key for each suggestion
                onMouseDown={() => handleSuggestionClick(course)}  // Handle suggestion click
              >
                {course.code} - {course.name}  {/* Display the course code and name */}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* If no courses found, display a message */}
      {showSuggestions && courses.length === 0 && (
        <div>No courses found.</div>
      )}

      {/* Sessions for selected course */}
      {selectedCourseCode && sessions.length > 0 && (
        <div>
          <h3>Sessions for {selectedCourseCode}</h3>
          <ul>
            {sessions.map((session) => (
              <li key={session._id.$oid}>User: {session.User} - Library: {session.Library} - Course {session.Course}</li>
            ))}
          </ul>
        </div>
      )}

      {/* If no sessions found, display a message */}
      {selectedCourseCode && sessions.length === 0 && (
        <div>No sessions found for this course.</div>
      )}
    </div>
  );
};

export default CourseSearch;
