import firebase from './config';

import moment from 'moment'
export function uploadImageDrink(id,image){ 
    return firebase.storage.ref(`/Restaurants/${id}/Drinks/${image.name}`);
}
export  async function addDrinks(item,id){ 
    let drink = {
        name: item.name,
        desc: item.desc,
        image_url: item.image_url,
        price: item.price,
        created_at: moment(new Date()).format('DD/MM/YY HH:mm:ss'),
        updated_at: moment(new Date()).format('DD/MM/YY HH:mm:ss'),
    }
    return await firebase.db.collection('Restaurants').doc(id).collection('Drinks').add(drink)
}
export  function getAllDrinks(id){ 
    return firebase.db.collection('Restaurants').doc(id).collection('Drinks')
}
export  function removeDrinks(branchstore,id){
    const firestoreDrinks = firebase
        .db
        .collection('Restaurants')
        .doc(branchstore)
        .collection('Drinks')
        .doc(id)
        .delete()
    return firestoreDrinks;
}