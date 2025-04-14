import React from 'react';
import PostRunForm from '../components/PostRunForm'; // Ensure the correct path to your form component
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase-config'; // Ensure the correct path
import { useAuth } from '../context/AuthContext'; // Ensure the correct path

const PostRun = () => {
  const { currentUser, userData } = useAuth();
console.log("Current User: ", currentUser);
console.log("User Data: ", userData);
  const handleFormSubmit = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "run"), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const initialFormData = {
    userFirstName: userData.displayName,
    userId: currentUser.uid,
    userProfilePic: userData.photoURL,
  };
  return (
    <div>
      <PostRunForm handleFormSubmit={handleFormSubmit} initialFormData={initialFormData}/>
    </div>
  );
};

export default PostRun;