import React, { useEffect, useState } from 'react';
import firebase from '../services/firebase-config.js';
import { useAuth } from './use-auth.js';

const useCalendarEvents = () => {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    if (auth.user === false || auth.user === null || auth.user.uid === null) {
      return;
    }
    const unsubscribe = firebase
      .firestore()
      .collection('calendar_events')
      .doc(auth.user.uid)
      .collection('events')
      .onSnapshot((snapshot) => {
        if (!snapshot.empty) {
          setCalendarEvents(snapshot.docs);
        }
      });
    return () => unsubscribe();
  }, [auth]);
  return calendarEvents;
};

export default useCalendarEvents;
