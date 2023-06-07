import {collection, getDocs} from "firebase/firestore";
import {toast} from "react-hot-toast";
import {db} from "../firebase.js";

const collectionRef =  collection(db, 'users');

export const fetchFirestoreUsers = async () => {
    await getDocs(collectionRef).then((user) => {
        let userData = user.docs.map((doc) => ({...doc.data(), id: doc?.id}));

        return userData
    }).catch((err) => {
        console.log(err);
        toast.error(err.message)
    })
};
