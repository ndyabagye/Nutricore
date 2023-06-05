import {useState, useEffect} from 'react';
import {db} from '../firebase'
import isUserPremium from "./isUserPremium";
import firebase from "firebase/compat";

export default function usePremiumStatus(user: firebase.User){
    const [premiumStatus , setPremiumStatus] = useState<boolean>(false);

    useEffect(()=>{
        if(user){

        const checkPremiumStatus = async function(){
             setPremiumStatus(await isUserPremium())
        }
        checkPremiumStatus()
        }
    },[user])

    return premiumStatus;
}