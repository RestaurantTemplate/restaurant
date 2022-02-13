import firebase from './config';

import moment from 'moment'
export function uploadImageDessert(id,image){ 
    return firebase.storage.ref(`/Restaurants/${id}/Desserts/${image.name}`);
}
export  async function addDesserts(item,id){ 
    let dessert = {
        name: item.name,
        desc: item.desc,
        foodEnable:item.foodEnable,
        image_url: item.image_url,
        price: item.price,
        created_at: moment(new Date()).format('DD/MM/YY HH:mm:ss'),
        updated_at: moment(new Date()).format('DD/MM/YY HH:mm:ss'),
    }
    return await firebase.db.collection('Restaurants').doc(id).collection('Desserts').add(dessert)
}
export  async function editDesserts(item,id,dessertsid){ 
    let maindish = {
        name: item.name,
        desc: item.desc,
        foodEnable:item.foodEnable,
        image_url: item.image_url,
        price: item.price,
        created_at: moment(new Date()).format('DD/MM/YY HH:mm:ss'),
        updated_at: moment(new Date()).format('DD/MM/YY HH:mm:ss'),
    }
    return await firebase.db.collection('Restaurants').doc(id).collection('Desserts').doc(dessertsid).update(maindish)
}
export  function getAllDesserts(id){ 
    return firebase.db.collection('Restaurants').doc(id).collection('Desserts')
}
export  function removeDesserts(branchstore,id){
    const firestoreDesserts = firebase
        .db
        .collection('Restaurants')
        .doc(branchstore)
        .collection('Desserts')
        .doc(id)
        .delete()
    return firestoreDesserts;
}