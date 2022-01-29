import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import config from './firebaseConfig.json'
import axios from 'axios';
class Firebase {
    constructor() {
        firebase.initializeApp(config)
        this.auth = firebase.auth()
        this.db = firebase.firestore()
        this.storage = firebase.storage()
        this.getStaffWithBranchId = this.getStaffWithBranchId.bind(this)
        this.createtaffWithBranchId = this.createtaffWithBranchId.bind(this)
    }
    // generateToken
    async generateToken(uid) {
        const token = await axios.post('http://localhost:9000/token', {'uid':uid})
        console.log('token:',token)
        return token.data
    }
    async getAlluser(uid) {
        return await axios.post(`http://localhost:9000/AllUser`,uid)
        // .then(res => {
        //     console.log('res:',res)
        //     return
        // })
    }
    // loginWithToken
    async loginWithToken(token) {
        const user = await firebase.auth().signInWithCustomToken(token)
        return user
    }
    async getStaffWithBranchId(brandId){
        var users = ''
        await firebase.firestore().collection('Users').get().then(async(querySnapshot) => {
            await querySnapshot.forEach((doc) => {
                if(doc.data().branchstore === brandId && doc.data().type === 'staff'){
                    users = doc.id
                }
            });
        });
        return users
    }
    async createtaffWithBranchId(brandId){
        return await firebase.firestore().collection('Users').add({
            branchstore:brandId,
            type:"staff"
        })
        .then((value) => {
            // console.log('sadfsdf:',value)
            return value
        });
    }
    async getBranchName(brandId){
        return await firebase.firestore().collection('Restaurants').doc(brandId).get().then((doc)=>{
            return doc.data()
        })
    }
    async createStaff(email, password, branchId) {
        return await axios.post(`http://localhost:9000/AddUser`,{'email':email,'password':password,'branchId':branchId})
    }
    async deleteStaff(uid) {
        return await axios.post(`http://localhost:9000/DeleteUser`,{'uid':uid})
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

    getOrders = (branch_id) =>
        firebase
            .firestore()
            .collection('Restaurants')
            .doc(branch_id)
            .collection('Orders')
            .orderBy('created_at', 'asc')

    addOrders = (branch_id,order) => {
        const firestoreOrder = firebase
            .firestore()
            .collection('Restaurants')
            .doc(branch_id)
            .collection('Orders')

        //    console.log('id', firestoreOrder.doc().id)
        return firestoreOrder.add(order)
    }

    removeOrders = (branch_id,id) => {
        const firestoreOrder = firebase
            .firestore()
            .collection('Restaurants')
            .doc(branch_id)
            .collection('Orders')
            .doc(id)
            .delete()
        return firestoreOrder
    }

    addQueues = (branch_id,queue) => {
        const firestoreQueues = firebase
            .firestore()
            .collection('Restaurants')
            .doc(branch_id)
            .collection('Queues')

        //    console.log('id', firestoreOrder.doc().id)
        return firestoreQueues.add(queue)
    }

    getQueues = (branch_id) =>
        firebase
            .firestore()
            .collection('Restaurants')
            .doc(branch_id)
            .collection('Queues')
            .orderBy('created_at', 'asc')

    removeQueue = (branch_id,id) => {
        const firestoreOrder = firebase
            .firestore()
            .collection('Restaurants')
            .doc(branch_id)
            .collection('Queues')
            .doc(id)
            .delete()
        return firestoreOrder
    }

    getNotifications = (branch_id,customerId) =>
        firebase
            .firestore()
            .collection('Restaurants')
            .doc(branch_id)
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

    updateCustomerTable = (branch_id,tableNumber, customerId) =>
        firebase
            .firestore()
            .collection('Restaurants')
            .doc(branch_id)
            .collection('Tables')
            .doc('TABLE_' + tableNumber)
            .update({ customer_id: customerId })

    getTable = (branch_id) =>
        firebase
            .firestore()
            .collection('Restaurants')
            .doc(branch_id)
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

    addHistories = (branch_id,history) =>
        firebase
            .firestore()
            .collection('Restaurants')
            .doc(branch_id)
            .collection('Histories')
            .add(history)

    getHistories = (branch_id) => {
        // const start = new Date('2021-04-01');
        // const end = new Date('2021-04-28');
        return firebase
            .firestore()
            .collection('Restaurants')
            .doc(branch_id)
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

    // getSales = (branch_id,year) =>
    //     firebase
    //         .firestore()
    //         .collection('Restaurants')
    //         .doc(branch_id)
    //         .collection('Sales')
    //         .doc(year)

    getMainDishes = (branch_id) =>
        firebase
            .firestore()
            .collection('Restaurants')
            .doc(branch_id)
            .collection('MainDishes')
            .get()

    getDesserts = (branch_id) =>
        firebase
            .firestore()
            .collection('Restaurants')
            .doc(branch_id)
            .collection('Desserts')
            .get()

    getAppetizers = (branch_id) =>
        firebase
            .firestore()
            .collection('Restaurants')
            .doc(branch_id)
            .collection('Appetizers')
            .get()

    getDrinks = (branch_id) =>
        firebase
            .firestore()
            .collection('Restaurants')
            .doc(branch_id)
            .collection('Drinks')
            .get()

    addOrder = (branch_id,order) =>
        firebase
            .firestore()
            .collection('Restaurants')
            .doc(branch_id)
            .collection('Orders')
            .add(order)

    alertToCustomer = (branch_id,alert) =>
        firebase
            .firestore()
            .collection('Restaurants')
            .doc(branch_id)
            .collection('Notifications')
            .add(alert)

    getDataFromCustomer = (branch_id,customerId) =>
        firebase
            .firestore()
            .collection('Restaurants')
            .doc(branch_id)
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

    updatedCustomerOrders = (branch_id,customerId, orders) =>
        firebase
            .firestore()
            .collection('Restaurants')
            .doc(branch_id)
            .collection('Customers')
            .doc(customerId.toString())
            .update({ orders: orders })

    // updatedCustomerNotificaitons = (branch_id,customerId, notifications) =>
    //     firebase
    //         .firestore()
    //         .collection('Restaurants')
    //         .doc(branch_id)
    //         .collection('Customers')
    //         .doc(customerId.toString())
    //         .update({ notifications: notifications })

    addCustomerToRestaurant = (branch_id,uid) =>
        firebase
            .firestore()
            .collection('Restaurants')
            .doc(branch_id)
            .collection('Customers')
            .doc(uid)
            .set({})

    removeCustomer = (branch_id,customerId) =>
        firebase
            .firestore()
            .collection('Restaurants')
            .doc(branch_id)
            .collection('Customers')
            .doc(customerId)
            .delete()
    
    addRecommended = (branch_id, item) =>
        firebase
            .firestore()
            .collection('Restaurants')
            .doc(branch_id)
            .collection('Recommended')
            .doc(item.id)
            .add(item)
}

export default new Firebase()
