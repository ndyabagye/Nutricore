import {collection, addDoc, onSnapshot,  db} from "../firebase";
import getStripe from "./initializeStripe"

export async function createCheckoutSession(uid: string){
    //create a new checkout session in the subcollection inside this users document

    const checkoutSessionRef = collection(db, "users", uid, "checkout_sessions");
    const newCheckoutSession = {
        price: "price_128726812637812",
        success_url: window.location.origin,
        cancel_url: window.location.origin,
    };

    try {
        const docRef = await addDoc(checkoutSessionRef, newCheckoutSession);
        console.log("Checkout session created with ID: ", docRef.id);
    } catch (error) {
        console.error("Error creating checkout session: ", error);
    }

    // wait for the checkout session to get attached by the extension
    onSnapshot(checkoutSessionRef, async (snap)=>{
        const {sessionId} = snap.data();

        if (sessionId) {
            // We have a session, let's redirect to check-out
            // Init Stripe
            const stripe = await getStripe();
            stripe.redirectToCheckout({ sessionId });
        }
    })
}
