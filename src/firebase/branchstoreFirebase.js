import firebase from './config';

import moment from 'moment'
export  async function  addBranchStore(branchstore_user,id){ 
    let branchStore = {
        name: branchstore_user.name,
        created_at: moment(new Date()).format('DD/MM/YY HH:mm:ss'),
        updated_at: moment(new Date()).format('DD/MM/YY HH:mm:ss'),
        owner_id:id
    }
    return await firebase.db.collection('Restaurants').add(branchStore)
}
export  async function editBranchStore(branchstore_user,id,idValue){ 
    let branchStore = {
        name: branchstore_user.name,
        created_at: moment(new Date()).format('DD/MM/YY HH:mm:ss'),
        updated_at: moment(new Date()).format('DD/MM/YY HH:mm:ss'),
        owner_id:id
    }
    return await firebase.db.collection('Restaurants').doc(idValue).update(branchStore)
}
export  function getAllBranchStore(){ 
    return firebase.db.collection('Restaurants')
}
export  function removeBranchStore(id){
    const firestoreOrder = firebase
        .db
        .collection('Restaurants')
        .doc(id)
        .delete()
    return firestoreOrder;
}
