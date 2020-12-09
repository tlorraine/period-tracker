import React, {
  useState, useEffect,
} from 'react';
import firebase from '../services/firebase-config.js';
import { useAuth } from './use-auth.js';

const useUser = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const auth = useAuth();

  useEffect(() => {
    if (auth.user === false || auth.user === null || auth.user.uid === null) {
      return;
    }
    const unsubscribe = firebase
      .firestore()
      .collection('users')
      .doc(auth.user.uid)
      .onSnapshot(
        (snapshot) => {
          setLoading(false);
          setUser(snapshot.data());
        },
        (err) => {
          setError(err);
        },
      );

    return () => unsubscribe();
  }, [auth]);

  return user;
};

export default useUser;
