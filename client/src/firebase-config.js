import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAqo3VW-HKdTHgzXdhsdNIf0j0xieq1Qaw",
  authDomain: "appli-biblio-study.firebaseapp.com",
  projectId: "appli-biblio-study",
  storageBucket: "appli-biblio-study.appspot.com",
  messagingSenderId: "237707371714",
  appId: "1:237707371714:web:c347f0179b5845fe59475b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)