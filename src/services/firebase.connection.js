import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDeaNTlTprG1N5z1rMPlUWuq0dLlELkTEQ",
    authDomain: "expenses-manager-44c18.firebaseapp.com",
    databaseURL: "https://expenses-manager-44c18.firebaseio.com",
    projectId: "expenses-manager-44c18",
    storageBucket: "expenses-manager-44c18.appspot.com",
    messagingSenderId: "203761151980",
    appId: "1:203761151980:web:f63af4587152cc2f761ac9",
    measurementId: "G-VTSR5M136R"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
