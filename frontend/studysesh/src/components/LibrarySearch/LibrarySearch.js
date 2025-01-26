
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./LibrarySearch.module.css";
import axios from "axios";

function LibrarySearch() {
  const [libraries, setLibraries] = useState([]); // State to store library suggestions
  const [sessions, setSessions] = useState([]); // State to store sessions related to the selected library
  const [selectedLibraryCode, setSelectedLibraryCode] = useState(null); // Track selected library code
  const [showDropdown, setShowDropdown] = useState(true); // Toggle for showing dropdown
  const { isAuthenticated } = useAuth0();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupSession, setPopupSession] = useState(null);
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  const handleOpenPopup = (session) => {
    setPopupSession(session);
    setIsPopupVisible(true);
  }
  
  const handleClosePopup = () => {
    setPopupSession(null);
    setIsPopupVisible(false);
  }

  // Fetch libraries when the component loads
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/libraries")
      .then((response) => {
        setLibraries(response.data); // Update the state with the libraries returned from the API
      })
      .catch((error) => {
        console.error("Error fetching libraries", error);
        setLibraries([]); // Clear libraries if there's an error
      });
  }, []); // This useEffect runs only once when the component is mounted

  // Fetch sessions based on the selected library code
  useEffect(() => {
    if (selectedLibraryCode) {
      axios
        .get(`http://localhost:8000/api/sessions/library/${selectedLibraryCode}`)
        .then((response) => {
          setSessions(response.data); // Set the sessions for the selected library code
        })
        .catch((error) => {
          console.error("Error fetching sessions", error);
          setSessions([]); // Clear sessions if there's an error
        });
    }
  }, [selectedLibraryCode]); // Trigger this effect when the selectedLibraryCode changes

  // Handle selection of a suggestion (library code)
  const handleSuggestionClick = (library) => {
    setSelectedLibraryCode(library.Library); // Set the selected library code
    setShowDropdown(false); // Hide the dropdown
  };

  // Handle "Pick Another Library" button click
  const handlePickAnotherLibrary = () => {
    setShowDropdown(true); // Show the dropdown
    setSelectedLibraryCode(null); // Clear the selected library code
    setSessions([]); // Clear sessions
  };

  return (
    <div className={styles.App}>
      <div className={styles.header}>
        <div className={styles.logoCircle}>
          <img
            src="/images/mdi_library-outline.svg"
            alt="logo"
            className={styles.logo}
          />
        </div>
        <div className={styles.searchBarContainer}>
          <div className={styles.title}>Library Search</div>
          <div className={styles.searchBar}>
            {/* Autocomplete dropdown */}
            {showDropdown && libraries.length > 0 && (
              <div className={styles.autocompleteSuggestions}>
                <ul>
                  {libraries.map((library) => (
                    <li
                      key={library._id.$oid} // Unique key for each suggestion
                      onMouseDown={() => handleSuggestionClick(library)} // Handle suggestion click
                    >
                      {library.Library}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* If no libraries found, display a message */}
            {showDropdown && libraries.length === 0 && (
              <div className={styles.notFound}>No libraries found.</div>
            )}

            {/* "Pick Another Library" button */}
            {!showDropdown && (
              <button
                onClick={handlePickAnotherLibrary}
                className={styles.libraryButton}
              >
                Pick Another Library
              </button>
            )}
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button
            onClick={() => navigateTo("/")}
            className={styles.logoutButton}
          >
            Return
          </button>
        </div>
      </div>
      <div className={styles.sessionsContainer}>
        {/* Sessions for selected library */}
        {selectedLibraryCode && sessions.length > 0 && (
          <div>
            <h3 className={styles.sessionsTitle}>
              Sessions for {selectedLibraryCode}
            </h3>
            <ul className={styles.sessionsList}>
              {sessions.map((session) => (
                <li className={styles.sessionItem} key={session._id.$oid} onClick={() => handleOpenPopup(session)}>
                  <div className={styles.sessionInfo}>
                    <div>User: {session.User}</div>
                    <div>Library: {session.Library}</div>  
                    <div>Course {session.Course}</div>
                  </div>
                  <div className={styles.pfp}>
                    <img src={session.PFP} alt="pfp" className={styles.pfp}/>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* If no sessions found, display a message */}
        {selectedLibraryCode && sessions.length === 0 && (
          <div className={styles.notFound}>No sessions found for this library.</div>
        )}

        {isPopupVisible && (
          <div className={styles.popupOverlay} onClick={handleClosePopup}>
            <div className={styles.popupContent}>
            <h3 className={styles.popupTitle}>{popupSession.Course}</h3>
            
            <div className={styles.popupContainer}>
              <div className={styles.popupDetails}>
                <div className={styles.popupUserContainer}>
                  <div className={styles.popupUserTag}>
                    User
                  </div>
                  <div className={styles.popupUser}>
                    {popupSession.User}
                  </div>
                </div>
                <div className={styles.popupLibraryContainer}>
                  <div className={styles.popupLibraryTag}>
                    Library
                  </div>
                  <div className={styles.popupLibrary}>
                    {popupSession.Library}
                  </div>
                </div>
                <div className={styles.popupTimeContainer}>
                  <div className={styles.popupTimeTag}>
                    Time
                  </div>
                  <div className={styles.popupTime}>
                    {popupSession.Date.toString()}
                  </div>
                </div>
                <div className={styles.popupDescription}>
                  <p>{popupSession.Description}</p>
                </div>
  
              </div>
              
              <div className={styles.popupPicture}>
                <img src={popupSession.PFP} alt="pfp" className={styles.popupPfp}/>
              </div>
            </div>
            
          </div> 
  
        </div>
        )}
      </div>
    </div>
  );
}

export default LibrarySearch;

