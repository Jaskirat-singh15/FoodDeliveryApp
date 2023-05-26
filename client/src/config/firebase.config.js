import { getApp, getApps, initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCigm6CQcpmjnIdOcK5IjeKAevmhFx2a_E",
    authDomain: "feastexpress-4b58f.firebaseapp.com",
    projectId: "feastexpress-4b58f",
    storageBucket: "feastexpress-4b58f.appspot.com",
    messagingSenderId: "409899611509",
    appId: "1:409899611509:web:0e8496499fd9c9de6acf3c"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };