import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import moment from 'moment';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
};

firebase.initializeApp(config);
export default firebase;

const db = firebase.firestore();

/** USERS TABLE */

export const createUser = (user) => db
  .collection('users')
  .doc(user.id)
  .set({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  },
  { merge: true });

export const updateUser = (userId, user) => db
  .collection('users')
  .doc(userId)
  .update({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });

export const updateUserSettings = (userId, settings) => db
  .collection('users')
  .doc(userId)
  .update({
    periodLength: parseInt(settings.periodLength),
    cycleLength: parseInt(settings.cycleLength),
  });

/** CALENDAR_EVENTS TABLE */

export const createCalendarEvent = (event, userId) => {
  const date = moment(event.date).format('YYYY-MM-DD');
  return db
    .collection('calendar_events')
    .doc(userId)
    .collection('events')
    .doc(date)
    .set({
      title: event.title,
      // menstruation: event.menstruation,
      // flow: event.flow,
      // moods: event.moods,
      notes: event.notes,
    });
};
