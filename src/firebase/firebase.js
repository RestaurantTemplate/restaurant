import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
// };

const firebaseConfig = {
  apiKey: "AIzaSyBdWAi5YG-JOEwAzYbOXwe9TX11jFnPKbM",
  authDomain: "ez-restaurant.firebaseapp.com",
  databaseURL: "https://ez-restaurant-default-rtdb.firebaseio.com",
  projectId: "ez-restaurant",
  storageBucket: "ez-restaurant.appspot.com",
  messagingSenderId: "491710541754",
  appId: "1:491710541754:web:65d7822af8b35920a27783",
  measurementId: "G-NG3FGD09TQ"
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
    this.db = app.firestore();

    this.auth.useDeviceLanguage();
    this.googleProvider = new app.auth.GoogleAuthProvider();
  }

  getCurrentUser = () => this.auth.currentUser;

  createUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  signInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  signOut = () => this.auth.signOut();

  // how does it respond if there's no email matching in the system
  passwordReset = (email) => this.auth.sendPasswordResetEmail(email);

  passwordUpdate = (password) => this.auth.currentUser.updatePassword(password);

  /* SIGN IN WITH AUTH PROVIDERS */
  signInWithPopup = (authProvider) => {
    let provider = "";

    switch (authProvider) {
      case "google":
        provider = this.googleProvider;
        break;

      default:
        provider = null;
        break;
    }

    if (provider) {
      return this.auth.signInWithPopup(provider);
    }
  };

  createBurger = (ingredients, name, price) =>
    this.db.collection("menu").doc(name).set({
      ingredients,
      name,
      price,
    });

  fetchBurgers = () => this.db.collection("menu").get();

  fetchOrders = (uuid) =>
    this.db.collection("orders").doc(uuid).collection("order").get();

  placeOrder = (order, uuid) => {
    const d = app.firestore.Timestamp.fromDate(new Date()).seconds.toString();
    return this.db
      .collection("orders")
      .doc(uuid)
      .collection("order")
      .doc(d)
      .set(order);
  };
}

export default Firebase;
