import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyBuUpOwRSwAp1VInEIbU9moLVQmLAhoJn4',
  authDomain: 'health-forms-p1.firebaseapp.com',
  databaseURL: 'https://health-forms-p1.firebaseio.com',
  projectId: 'health-forms-p1',
  storageBucket: 'health-forms-p1.appspot.com',
  messagingSenderId: '51221005898',
  appId: '1:51221005898:web:61c34e9d1e357aa919c8b3',
  measurementId: 'G-E75KKNQK5Y'
}

firebase.initializeApp(firebaseConfig)
firebase.analytics()
