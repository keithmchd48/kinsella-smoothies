import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAXrTL178khNHvbAgkgHqrl9auB99oc00U",
  authDomain: "udemy-kinsella-smoothies.firebaseapp.com",
  databaseURL: "https://udemy-kinsella-smoothies.firebaseio.com",
  projectId: "udemy-kinsella-smoothies",
  storageBucket: "udemy-kinsella-smoothies.appspot.com",
  messagingSenderId: "221692908338",
  appId: "1:221692908338:web:f75b231baeab1ede68bd2b",
  measurementId: "G-03ZV2H0QJL"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();

// export firestore database
export default firebaseApp.firestore()
