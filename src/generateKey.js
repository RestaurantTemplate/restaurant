var admin = require('firebase-admin')

var serviceAccount = require('./ServiceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const uid = 'table2'

admin.auth().createCustomToken(uid)
.then((customToken) => {
    console.log(customToken);
})
.catch((error) => {
    console.log('Error creating custom token: ', error)
}) 