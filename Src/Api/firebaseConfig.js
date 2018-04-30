import React  from 'react';
import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyB7csdev-aYPsbJBfVurwH6LpDMqPr0zKk",
  authDomain: "cosmeticrn-001.firebaseapp.com",
  databaseURL: "https://cosmeticrn-001.firebaseio.com",
  projectId: "cosmeticrn-001",
  storageBucket: "cosmeticrn-001.appspot.com",
  messagingSenderId: "743017334348"
};

export const firebaseApp = firebase.initializeApp(config);
