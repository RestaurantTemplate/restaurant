import firebase from './config';

import moment from 'moment'
export function uploadImageMaindish(id,image){ 
    return firebase.storage.ref(`/Restaurants/${id}/Main Dishes/${image.name}`);
}
export  async function addMaindish(item,id){ 
    let maindish = {
        name: item.name,
        desc: item.desc,
        image_url: item.image_url,
        price: item.price,
        created_at: moment(new Date()).format('DD/MM/YY HH:mm:ss'),
        updated_at: moment(new Date()).format('DD/MM/YY HH:mm:ss'),
    }
    return await firebase.db.collection('Restaurants').doc(id).collection('MainDishes').add(maindish)
}
export  function getAllMaindishes(id){ 
    return firebase.db.collection('Restaurants').doc(id).collection('MainDishes')
}
export  function removeMaindishes(branchstore,id){
    const firestoreMaindishes = firebase
        .db
        .collection('Restaurants')
        .doc(branchstore)
        .collection('MainDishes')
        .doc(id)
        .delete()
    return firestoreMaindishes;
}