importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

const firebaseConfig = {
    apiKey: "AIzaSyDOyl40X13727Pp6ffrt-fqJ1sU7Z3CEKE",
    authDomain: "bookytore.firebaseapp.com",
    projectId: "bookytore",
    storageBucket: "bookytore.appspot.com",
    messagingSenderId: "526697782987",
    appId: "1:526697782987:web:ffd3d106d25cc8630dc54e",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log("[firebase-messaging-sw.js] Received background message", payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
    };

    // Show the notification
    self.registration.showNotification(notificationTitle, notificationOptions);
});
