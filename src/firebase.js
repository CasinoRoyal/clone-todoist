import * as firebase from "firebase/app";
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD0fUkMPZtyDkKTXrxbakPmQrL9lUjq208",
  authDomain: "app-todoist-clone.firebaseapp.com",
  databaseURL: "https://app-todoist-clone.firebaseio.com",
  projectId: "app-todoist-clone",
  storageBucket: "app-todoist-clone.appspot.com",
  messagingSenderId: "614783182750",
  appId: "1:614783182750:web:9f102ad4fb0d657935d88f"
};

firebase.initializeApp(firebaseConfig);

export {firebaseConfig as firebase};