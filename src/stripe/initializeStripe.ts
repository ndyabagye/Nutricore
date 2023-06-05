import {Stripe, loadStripe} from "@stripe/stripe-js"

let stripePromise: Stripe | null;

const initializeStripe = async () => {
    if(!stripePromise){
        stripePromise = await loadStripe(
            "pk_test_51NFZpdFA4aYvQKYFE1SznhqRmUK78LGMB2RhDuD7cfB67liHzfO5qS2umKpcSJeW7iRpFWWEzmfqdzovcMXh93Ed00JtunOXce"
        );
    }

    return stripePromise;
}

export default initializeStripe;