importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyA0yxDVJk9Io8JCvc_jV5WYtzVeWN1PW40",
  authDomain: "printjob-1c832.firebaseapp.com",
  projectId: "printjob-1c832",
  storageBucket: "printjob-1c832.appspot.com",
  messagingSenderId: "170232948293",
  appId: "1:170232948293:web:77d3106008aba3429be52c",
  measurementId: "G-BQPFHZKV8H",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
