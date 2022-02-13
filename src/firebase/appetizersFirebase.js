import firebase from './config';

import moment from 'moment'
export function uploadImageAppetizer(id,image){ 
    return firebase.storage.ref(`/Restaurants/${id}/Appetizers/${image.name}`);
}
export  async function addAppetizers(item,id){ 
    let appetizers = {
        name: item.name,
        desc: item.desc,
        foodEnable:item.foodEnable,
        image_url: item.image_url,
        price: item.price,
        created_at: moment(new Date()).format('DD/MM/YY HH:mm:ss'),
        updated_at: moment(new Date()).format('DD/MM/YY HH:mm:ss'),
    }
    return await firebase.db.collection('Restaurants').doc(id).collection('Appetizers').add(appetizers)
}
export  async function editAppetizers(item,id,appetizersid){ 
    let maindish = {
        name: item.name,
        desc: item.desc,
        foodEnable:item.foodEnable,
        image_url: item.image_url,
        price: item.price,
        created_at: moment(new Date()).format('DD/MM/YY HH:mm:ss'),
        updated_at: moment(new Date()).format('DD/MM/YY HH:mm:ss'),
    }
    return await firebase.db.collection('Restaurants').doc(id).collection('Appetizers').doc(appetizersid).update(maindish)
}
export  function getAllAppetizers(id){ 
    return firebase.db.collection('Restaurants').doc(id).collection('Appetizers')
}
export  function removeAppetizers(branchstore,id){
    const firestoreAppetizers = firebase
        .db
        .collection('Restaurants')
        .doc(branchstore)
        .collection('Appetizers')
        .doc(id)
        .delete()
    return firestoreAppetizers;
}