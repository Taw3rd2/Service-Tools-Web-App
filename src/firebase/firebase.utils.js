import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import 'firebase/storage';

const config = {
  apiKey: "AIzaSyALt3V0U_9A6DZBmducVWvAchE3XUG6qdY",
  authDomain: "vuefs-cust.firebaseapp.com",
  databaseURL: "https://vuefs-cust.firebaseio.com",
  projectId: "vuefs-cust",
  storageBucket: "vuefs-cust.appspot.com",
  messagingSenderId: "464183442563",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

//new content takes a collection name and an array of objects
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });
  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });
  return transformedCollection;
};

export const convertEventSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    let event = doc.data();
    event.id = doc.id;
    event.start = event.start.toDate();
    event.end = event.end.toDate();
    event.dateCreated = event.dateCreated.toDate();
    event.dateModified = event.dateModified.toDate();
    event.dateScheduled = event.dateScheduled.toDate();
    return event;
  });
  return transformedCollection;
};

export const convertLabelSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    let label = doc.data();
    label.id = doc.id;
    label.labelDate = label.labelDate.toDate();
    return label;
  });
  return transformedCollection;
};

// export const convertInventorySnapshotToMap = (collections) => {
//   const transformedCollection = collections.docs.map((doc) => {
//     let part = doc.data();
//     part.id = doc.id;
//     part.partDataDate = part.partDataDate.toDate().toLocaleString();
//     return part;
//   })
//   return transformedCollection;
// }

firebase.initializeApp(config);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

const projectStorage = firebase.storage();
export { projectStorage };

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export default firebase;
