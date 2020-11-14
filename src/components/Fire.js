import firebase from 'firebase';
import '@firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC5M7W1w7oDPBrF44Z7SGud6XwNAwqN1bo",
    authDomain: "todolist-df3e0.firebaseapp.com",
    databaseURL: "https://todolist-df3e0.firebaseio.com",
    projectId: "todolist-df3e0",
    storageBucket: "todolist-df3e0.appspot.com",
    messagingSenderId: "145075542817",
    appId: "1:145075542817:web:5b77302a6b20c344f3bc60"
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);

export default class Fire {
    constructor(callback) {
        this.init(callback);
    }

    init(callback) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback(null);
            }
            else {
                firebase.auth().signInAnonymously().catch(error => {
                    callback(error);
                })
            }
        })
    }

    get ref() {
        return firebase.firestore().collection("lists")
    }

    getLists(callback) {
        let ref = this.ref.orderBy("name");
        this.unsubscribe = ref.onSnapshot(snapshot => {
            let lists = [];
            snapshot.forEach(doc => {
                lists.push({ id: doc.id, ...doc.data() });
            });
            callback(lists);
        }, function (error) {
            console.error(error);
        });
    }

    addList(list) {
        let ref = this.ref;
        ref.add(list);
    }

    deleteList(list) {
        let ref = this.ref;
        ref.doc(list.id).delete();
    }

    updateList(list){
        let ref = this.ref;
        ref.doc(list.id).update(list);
    }

    detach(){
        this.unsubscribe();
    }

}