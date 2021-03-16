import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const config = {
  //firebase config
    apiKey: "AIzaSyBdWAi5YG-JOEwAzYbOXwe9TX11jFnPKbM",
    authDomain: "ez-restaurant.firebaseapp.com",
    databaseURL: "https://ez-restaurant-default-rtdb.firebaseio.com",
    projectId: "ez-restaurant",
    storageBucket: "ez-restaurant.appspot.com",
    messagingSenderId: "491710541754",
    appId: "1:491710541754:web:65d7822af8b35920a27783",
    measurementId: "G-NG3FGD09TQ"
}
class Firebase{

    constructor(){
        firebase.initializeApp(config);
        this.auth = firebase.auth();
        this.db = firebase.firestore();
        this.storage = firebase.storage();
    }

    //login
    async login(email, password){
        const user = await firebase.auth().signInWithEmailAndPassword(email, password).catch(err => {
            console.log(err);
            return err;
        });
        return user;
    }

    //logout
    async logout(){
        const logout = await firebase.auth().signOut().catch(err => {
            console.log(err);
            return err;
        });
        return logout;
    }

    async getUserState(){
        return new Promise(resolve=> {
            this.auth.onAuthStateChanged(resolve);
        });
    }

    getOrders = () => firebase.firestore().collection("Restaurants").doc("ORfpUYXcivMoLs1ObM8R").collection("Orders").orderBy("created_at", "asc")
    
    getQueues = () => this.db.collection("Restaurants").doc("ORfpUYXcivMoLs1ObM8R").collection("Queues").orderBy("created_at", "asc");

}

export default new Firebase();