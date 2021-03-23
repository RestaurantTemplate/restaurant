import firebase from './config';
export function addBranchStore(branchstore_user,branchstore){ 
    const firestoreBranchStore = firebase.firestore().collection('Users').doc(branchstore)
    console.log('firebase',firestoreBranchStore);
    firestoreBranchStore.add({
        name: branchstore_user.name
    })
    .then(function(docRef) {
        console.log("Tutorial created with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding Tutorial: ", error);
    })
}
