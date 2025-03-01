import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDhKs1NidMz3wkiZOAWaXCipRN5AiwYgJs",
  authDomain: "netflix-clone-38793.firebaseapp.com",
  projectId: "netflix-clone-38793",
  storageBucket: "netflix-clone-38793.firebasestorage.app",
  messagingSenderId: "523145344284",
  appId: "1:523145344284:web:0470b335ac9476f7b0f6d9"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try {
      const res =  await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "user"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
    } catch (error) {
        console.log(error);
       toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const login = async (email, password)=>{
    try {
       await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
        
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};