import firebase from './config';
const auth = firebase.auth;
const adminAuth = firebase.adminAuth
const db = firebase.storage;

export const getUser = async(branchid) => {
    try {
        return await firebase.getAlluser(branchid);
    } catch (err) {
        console.error(err);
        alert(err.message);
        return [];
    }
};
