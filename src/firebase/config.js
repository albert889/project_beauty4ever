// // Import the functions you need from the SDKs you need
// import {initializeApp} from 'firebase/app';
// import {getAuth} from 'firebase/auth';
// import {getFirestore} from 'firebase/firestore';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: 'AIzaSyCWfJjS2b9NqcNrtOCl5xSu1IPAsDuUWqM',
//   authDomain: 'beauty4ever-d6601.firebaseapp.com',
//   projectId: 'beauty4ever-d6601',
//   storageBucket: 'beauty4ever-d6601.appspot.com',
//   messagingSenderId: '123826404727',
//   appId: '1:123826404727:web:f2b4b941fdf89c6c3ab572',
//   measurementId: 'G-EQ512KHR3W',
// };

// const Fire = initializeApp(firebaseConfig);
// const auth = getAuth(Fire);
// const db = getFirestore(Fire);
// export {Fire, auth, db};
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
    apiKey: 'AIzaSyBWwniUWPN1BgoT0vt1ehj2XXvy7Xx1IPA',
    authDomain: 'beauty4ever-75bb9.firebaseapp.com',
    projectId: 'beauty4ever-75bb9',
    storageBucket: 'beauty4ever-75bb9.appspot.com',
    messagingSenderId: '365946164322',
    appId: '1:365946164322:web:af3308ddb5fdada25d2d3b',
    measurementId: 'G-S65TW60XXE',
    databaseURL: 'beauty4ever-75bb9-default-rtdb.asia-southeast1.firebasedatabase.app',
};
const Fire = initializeApp(firebaseConfig);
const Auth = getAuth(Fire);
const Database = getFirestore(Fire, {
    experimentalAutoDetectLongPolling: true,
    experimentalForceLongPolling: true,
});
const RealDatabase = getDatabase(Fire);
export {Fire, Auth, Database, RealDatabase};
