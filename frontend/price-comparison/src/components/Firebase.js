import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDWS1Xk-pvd0gCfGroyqUsxicvLXB9GcQU",
  authDomain: "price-comparison-cade1.firebaseapp.com",
  projectId: "price-comparison-cade1",
  storageBucket: "price-comparison-cade1.appspot.com",
  messagingSenderId: "748318921481",
  appId: "1:748318921481:web:0032b41e2c068a2c71b9d8"
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()

const auth = getAuth()

export const authWithGoogle = async() => {
    let user = null;

    await signInWithPopup(auth, provider)
    .then((result) => {
        user = result.user
    })
    .catch((err) => {
        console.log(err)
    })

    return user;
}