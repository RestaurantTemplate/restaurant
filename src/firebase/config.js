import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

var admin = require('firebase-admin')

var serviceAccount = require('../ServiceAccountKey.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

const config = {
    //firebase config
    apiKey: 'AIzaSyBdWAi5YG-JOEwAzYbOXwe9TX11jFnPKbM',
    authDomain: 'ez-restaurant.firebaseapp.com',
    databaseURL: 'https://ez-restaurant-default-rtdb.firebaseio.com',
    projectId: 'ez-restaurant',
    storageBucket: 'ez-restaurant.appspot.com',
    messagingSenderId: '491710541754',
    appId: '1:491710541754:web:65d7822af8b35920a27783',
    measurementId: 'G-NG3FGD09TQ',
}
class Firebase {
    constructor() {
        firebase.initializeApp(config)
        this.auth = firebase.auth()
        this.db = firebase.firestore()
        this.storage = firebase.storage()
    }
    // generateToken
    async generateToken(uid) {
        const token = await admin.auth().createCustomToken(uid)
        return token
    }

    // loginWithToken
    async loginWithToken(token) {
        const user = await firebase.auth().signInWithCustomToken(token)
        return user
    }

    //login
    async login(email, password) {
        const user = await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch((err) => {
                console.log(err)
                return err
            })
        return user
    }

    //logout
    async logout() {
        const logout = await firebase
            .auth()
            .signOut()
            .catch((err) => {
                console.log('logout error:', err)
                return err
            })
        return logout
    }

    async getUserState() {
        return new Promise((resolve) => {
            this.auth.onAuthStateChanged(resolve)
        })
    }

    getOrders = () =>
        firebase
            .firestore()
            .collection('Restaurants')
            .doc('jhWrzDEa4RKqBG2vifmm')
            .collection('Orders')
            .orderBy('created_at', 'asc')

    addOrders = (order) => {
        const firestoreOrder = firebase
            .firestore()
            .collection('Restaurants')
            .doc('jhWrzDEa4RKqBG2vifmm')
            .collection('Orders')

        //    console.log('id', firestoreOrder.doc().id)
        return firestoreOrder.add(order)
    }

    removeOrders = (id) => {
        const firestoreOrder = firebase
            .firestore()
            .collection('Restaurants')
            .doc('jhWrzDEa4RKqBG2vifmm')
            .collection('Orders')
            .doc(id)
            .delete()
        return firestoreOrder
    }

    addQueues = (queue) => {
        const firestoreQueues = firebase
            .firestore()
            .collection('Restaurants')
            .doc('jhWrzDEa4RKqBG2vifmm')
            .collection('Queues')

        //    console.log('id', firestoreOrder.doc().id)
        return firestoreQueues.add(queue)
    }

    getQueues = () =>
        firebase
            .firestore()
            .collection('Restaurants')
            .doc('jhWrzDEa4RKqBG2vifmm')
            .collection('Queues')
            .orderBy('created_at', 'asc')

    removeQueue = (id) => {
        const firestoreOrder = firebase
            .firestore()
            .collection('Restaurants')
            .doc('jhWrzDEa4RKqBG2vifmm')
            .collection('Queues')
            .doc(id)
            .delete()
        return firestoreOrder
    }

    getNotifications = (customerId) =>
        firebase
            .firestore()
            .collection('Restaurants')
            .doc('jhWrzDEa4RKqBG2vifmm')
            .collection('Notifications')
            .orderBy('created_at', 'desc')

    getUserInfo = (id) => firebase.firestore().collection('Users').doc(id).get()

    addCustomer = (customer) => {
        let customerData = {
            type: customer.type,
            created_at: customer.created_at,
            updated_at: customer.updated_at,
        }
        return firebase
            .firestore()
            .collection('Users')
            .doc(customer.uid)
            .set(customerData)
    }

    removeCustomerInUsers = (customerId) =>
        firebase.firestore().collection('Users').doc(customerId).delete()

    updateCustomerTable = (branchstore,tableNumber, customerId) =>
        firebase
            .firestore()
            .collection('Restaurants')
            .doc('jhWrzDEa4RKqBG2vifmm')
            .collection('Tables')
            .doc('TABLE_' + tableNumber)
            .update({ customer_id: customerId })

    getTable = () =>
        firebase
            .firestore()
            .collection('Restaurants')
            .doc('jhWrzDEa4RKqBG2vifmm')
            .collection('Tables')
            .orderBy('table_number', 'asc')

    // getOrderSummary = (id) =>
    //     firebase
    //         .firestore()
    //         .collection('Restaurants')
    //         .doc('jhWrzDEa4RKqBG2vifmm')
    //         .collection('Customers')
    //         .doc(id)
    //         .collection('Orders')
    //         .orderBy('created_at', 'desc')
    //         .get()

    addHistories = (history) =>
        firebase
            .firestore()
            .collection('Restaurants')
            .doc('jhWrzDEa4RKqBG2vifmm')
            .collection('Histories')
            .add(history)

    getHistories = () => {
        // const start = new Date('2021-04-01');
        // const end = new Date('2021-04-28');
        return firebase
            .firestore()
            .collection('Restaurants')
            .doc('jhWrzDEa4RKqBG2vifmm')
            .collection('Histories')
            .orderBy('created_at', 'asc')
        // .where('created_at', '>=', start)
        // .where('created_at', '<=', end)
        // .get()
    }

    getAllHistories = (branchstore) =>
        firebase
            .firestore()
            .collection('Restaurants')
            .doc(branchstore)
            .collection('Histories')

    getSales = (year) =>
        firebase
            .firestore()
            .collection('Restaurants')
            .doc('jhWrzDEa4RKqBG2vifmm')
            .collection('Sales')
            .doc(year)

    getMainDishes = () =>
        firebase
            .firestore()
            .collection('Restaurants')
            .doc('jhWrzDEa4RKqBG2vifmm')
            .collection('MainDishes')
            .get()

    getDesserts = () =>
        firebase
            .firestore()
            .collection('Restaurants')
            .doc('jhWrzDEa4RKqBG2vifmm')
            .collection('Desserts')
            .get()

    getAppetizers = () =>
        firebase
            .firestore()
            .collection('Restaurants')
            .doc('jhWrzDEa4RKqBG2vifmm')
            .collection('Appetizers')
            .get()

    getDrinks = () =>
        firebase
            .firestore()
            .collection('Restaurants')
            .doc('jhWrzDEa4RKqBG2vifmm')
            .collection('Drinks')
            .get()

    addOrder = (order) =>
        firebase
            .firestore()
            .collection('Restaurants')
            .doc('jhWrzDEa4RKqBG2vifmm')
            .collection('Orders')
            .add(order)

    alertToCustomer = (alert) =>
        firebase
            .firestore()
            .collection('Restaurants')
            .doc('jhWrzDEa4RKqBG2vifmm')
            .collection('Notifications')
            .add(alert)

    getDataFromCustomer = (customerId) =>
        firebase
            .firestore()
            .collection('Restaurants')
            .doc('jhWrzDEa4RKqBG2vifmm')
            .collection('Customers')
            .doc(customerId.toString())
            .get()

    // addOrderToCustomerOrders = (customerId, order) =>
    //     firebase
    //         .firestore()
    //         .collection('Restaurants')
    //         .doc('jhWrzDEa4RKqBG2vifmm')
    //         .collection('Customers')
    //         .doc(customerId.toString())
    //         .update(order)

    updatedCustomerOrders = (customerId, orders) =>
        firebase
            .firestore()
            .collection('Restaurants')
            .doc('jhWrzDEa4RKqBG2vifmm')
            .collection('Customers')
            .doc(customerId.toString())
            .update({ orders: orders })

    updatedCustomerNotificaitons = (customerId, notifications) =>
        firebase
            .firestore()
            .collection('Restaurants')
            .doc('jhWrzDEa4RKqBG2vifmm')
            .collection('Customers')
            .doc(customerId.toString())
            .update({ notifications: notifications })

    addCustomerToRestaurant = (uid) =>
        firebase
            .firestore()
            .collection('Restaurants')
            .doc('jhWrzDEa4RKqBG2vifmm')
            .collection('Customers')
            .doc(uid)
            .set({})

    removeCustomer = (customerId) =>
        firebase
            .firestore()
            .collection('Restaurants')
            .doc('jhWrzDEa4RKqBG2vifmm')
            .collection('Customers')
            .doc(customerId)
            .delete()
}

export default new Firebase()
