import firebase from './config';


export  function getCustomerOrder(branchStore){
    return firebase.db.collection('Restaurants').doc(branchStore).collection('Orders')
}
export  function getCustomerQueues(branchStore){
    return firebase.db.collection('Restaurants').doc(branchStore).collection('Queues')
}
export  function getCustomerNotifications(branchStore){
    return firebase.db.collection('Restaurants').doc(branchStore).collection('Notifications')
}
