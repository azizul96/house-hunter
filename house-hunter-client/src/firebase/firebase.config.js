
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDuPX3dNc2g9ODrPpuzo89Psa-GsFqCmgE",
  authDomain: "house-hunter-9eca8.firebaseapp.com",
  projectId: "house-hunter-9eca8",
  storageBucket: "house-hunter-9eca8.appspot.com",
  messagingSenderId: "345001937635",
  appId: "1:345001937635:web:711423a0f1d1a76c73d3d6"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;