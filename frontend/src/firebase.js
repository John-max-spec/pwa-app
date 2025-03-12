// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyAXk8XjR8XhzoU1YI3ob4522jSROLlQO1I",
    authDomain: "wathuti-244.firebaseapp.com",
    projectId: "wathuti-244",
    storageBucket: "wathuti-244.firebasestorage.app",
    messagingSenderId: "142718231848",
    appId: "1:142718231848:web:1af313322abbad0d941c1d",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
