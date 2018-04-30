import { firebaseApp } from './firebaseConfig';

export function _Register(email, fullname, password, callback) {

    firebaseApp.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {

            firebaseApp.auth().currentUser.updateProfile({
                displayName: fullname
            })

            firebaseApp.database().ref('users').child(user.uid).update({ ...user })
                .then(() => callback(true, null, null))
                .catch((error) => {
                    
                })

            callback(true, user, null);
        })
        .catch((error) => {
            callback(false, null, error);
        })
}

export function _CreateUser(user, callback) {
    firebaseApp.database().ref('users').child(user.uid).update({ ...user })
        .then(() => callback(true, null, null))
        .catch((error) => {
            callback(false, null, { message: error });
        })
}