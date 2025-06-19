import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

 const firebaseConfig = {
    apiKey: "AIzaSyC6mIdHmcmjVjYcLKPQ8P4g5uZ4PLqppPs",
    authDomain: "bdnosql-32880.firebaseapp.com",
    projectId: "bdnosql-32880",
    storageBucket: "bdnosql-32880.firebasestorage.app",
    messagingSenderId: "656244186956",
    appId: "1:656244186956:web:f38e1e50cf8f79a74fb9e9"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
