import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAn2dW0oUiDwV9Iac-6AKPyp3AJjaBy9ww',
  authDomain: 'crwn-db-93c5a.firebaseapp.com',
  databaseURL: 'https://crwn-db-93c5a.firebaseio.com',
  projectId: 'crwn-db-93c5a',
  storageBucket: 'crwn-db-93c5a.appspot.com',
  messagingSenderId: '710126089949',
  appId: '1:710126089949:web:4ee89b09562e075a4f4d34',
};

//Проверяет, если пользователя нет в БД, то создает его и сохраняет
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = Date.now();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

//Добавление коллекции в БД
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  //Либо сохранит полностью все данные в базу, либо не сохранит ничего, если произошел какой-нибудь форс-мажор, например обрыв соединения
  const batch = firestore.batch();

  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollections = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollections.reduce((acc, currentValue) => {
    acc[currentValue.title.toLowerCase()] = currentValue;
    return acc;
  }, {});
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
