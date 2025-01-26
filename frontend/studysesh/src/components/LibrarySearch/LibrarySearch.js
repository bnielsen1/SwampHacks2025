import React,  { useEffect, useState }from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import config from '../../config/config';
import styles from './CourseSearch.module.css';
import axios from 'axios';
import LoginButton from "../../login";
import Profile from '../../profile';
import LogoutButton from '../../logout';
import SendEmailButton from '../../sendDataButton';
import CourseCard from '../../courseCard';

function LibrarySearch() {

  return (
    <>
        <CourseCard />
    </>
  )
};

export default LibrarySearch;