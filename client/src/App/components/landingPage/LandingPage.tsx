import React, { useRef, useEffect, MutableRefObject, useState } from 'react';
import WelcomeSection from './welcomeSection';
import { collection, getDocs, getFirestore } from "firebase/firestore"; 


export const LandingPage = () => {

  return (
      <WelcomeSection position={'absolute'} />
      
  );
}
