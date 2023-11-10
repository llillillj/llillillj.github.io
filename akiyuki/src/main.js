import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_DATABASE_URL,
//   storageBucket: process.env.FIREBASE_PROJECT_ID,
//   messagingSenderId: process.env.FIREBASE_STORAGE_BUCKET,
//   appId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   measurementId: process.env.FIREBASE_APP_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyAfBN-4FRmYe9oPhAeu_jdtPHGUYUzVWYE",
  authDomain: "githubpages-ab948.firebaseapp.com",
  projectId: "githubpages-ab948",
  storageBucket: "githubpages-ab948.appspot.com",
  messagingSenderId: "1073180935972",
  appId: "1:1073180935972:web:4e75b0c3471083599515b1",
  measurementId: "G-N5BS8QDXXN"
};

console.log(process.env.FIREBASE_PROJECT_ID)

const firebaseApp = initializeApp(firebaseConfig);

export { firebaseApp }

const vueObj = createApp(App)

vueObj.use(Quasar, quasarUserOptions)
vueObj.use(router)
vueObj.mount('#app')
