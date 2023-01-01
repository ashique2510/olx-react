import { initializeApp } from "firebase/app";
import {getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'
import 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyAEKvG_vSoo8Ke9PcfW-qW9ah2JRIjyPJY",
    authDomain: "olx-sample-project.firebaseapp.com",
    projectId: "olx-sample-project",
    storageBucket: "olx-sample-project.appspot.com",
    messagingSenderId: "701681436274",
    appId: "1:701681436274:web:b6f3a61cc9d7d3519364eb",
    measurementId: "G-MSCSTBRZWT"
  };


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app)