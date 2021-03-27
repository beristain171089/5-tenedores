import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDpQjb-jE8Yq_L9e4HNK2brekBlrlLRznQ",
    authDomain: "tenedores-4db67.firebaseapp.com",
    databaseURL: "https://tenedores-4db67.firebaseio.com",
    projectId: "tenedores-4db67",
    storageBucket: "tenedores-4db67.appspot.com",
    messagingSenderId: "76836590044",
    appId: "1:76836590044:web:bb2f51a372397cf0ad7f19"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);