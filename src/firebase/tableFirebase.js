import firebase from './config';

import moment from 'moment'
export  async function  addTable(item,restaurants){ 
    const list = await firebase.db.collection('Restaurants').doc(restaurants).collection('Tables').where('table_number','==',item.table_number).get();
    if(list.docs.length > 0){
        return null;
    }
    const listvalue = await firebase.db.collection('Restaurants').doc(restaurants).collection('Tables').where('name', '==' , item.name).get();
    if(listvalue.docs.length > 0){
        return null;
    }
    let table = {
        name: item.name,
        customer_id : '',
        table_number : item.table_number,
    }
    return await firebase.db.collection('Restaurants').doc(restaurants).collection('Tables').add(table)
}
export  async function editTable(item,idValue,restaurants){ 
    const list = await firebase.db.collection('Restaurants').doc(restaurants).collection('Tables').where('table_number','==',item.table_number).get();
    console.log('list:',list.docs);
    if(list.docs.length > 0  ){
        if(list.docs.length === 1){
            if(list.docs[0].id !== idValue){
                return null;
            }            
        }
        else{
            return null;            
        }
    }
    const listvalue = await firebase.db.collection('Restaurants').doc(restaurants).collection('Tables').where('name', '==' , item.name).get();
    if(listvalue.docs.length > 0  ){
        if(listvalue.docs.length === 1){
            if(listvalue.docs[0].id !== idValue){
                return null;
            }            
        }
        else{
            return null;            
        }
    }
    let table = {
        name: item.name,
        customer_id : '',
        table_number : item.table_number,
    }
    return await firebase.db.collection('Restaurants').doc(restaurants).collection('Tables').doc(idValue).update(table)
}
export  function getAllTable(restaurants){ 
    return  firebase.db.collection('Restaurants').doc(restaurants).collection('Tables')
}
export  function removeTable(id,restaurants){
    const firestoreTable = firebase
        .db
        .collection('Restaurants')
        .doc(restaurants)
        .collection('Tables')
        .doc(id)
        .delete()
    return firestoreTable;
}
