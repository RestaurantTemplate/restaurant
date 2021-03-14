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
  }

  getCurrentUser = () => this.auth.currentUser;

  signInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  signOut = () => this.auth.signOut();

  // createBurger = (ingredients, name, price) =>
  //   this.db.collection("menu").doc(name).set({
  //     ingredients,
  //     name,
  //     price,
  //   });

  // placeOrder = (order, uuid) => {
  //   const d = app.firestore.Timestamp.fromDate(new Date()).seconds.toString();
  //   return this.db
  //     .collection("orders")
  //     .doc(uuid)
  //     .collection("order")
  //     .doc(d)
  //     .set(order);
  // };

  fetchOrders = () => this.db.collection("Restaurants").doc("ORfpUYXcivMoLs1ObM8R").collection("Orders").orderBy("created_at", "asc");

  fetchQueues = () => this.db.collection("Restaurants").doc("ORfpUYXcivMoLs1ObM8R").collection("Queues").orderBy("created_at", "asc");

}

export default Firebase;
