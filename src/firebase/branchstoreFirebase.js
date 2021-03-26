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
