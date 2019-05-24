import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
        apiKey: "AIzaSyAMizom8zmgMvkLKrfqgubk6fD78iL4Mmg",
        authDomain: "city-for-all.firebaseapp.com",
        databaseURL: "https://city-for-all.firebaseio.com",
        projectId: "city-for-all",
        storageBucket: "city-for-all.appspot.com",
        messagingSenderId: "488517614291",
        appId: "1:488517614291:web:3f4ae93fa4b7fd9c"
};

firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;