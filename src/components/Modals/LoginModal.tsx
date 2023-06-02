import React, {useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {toast} from 'react-hot-toast';
import useLoginModal from '../../hooks/useLoginModal';
import useRegisterModal from '../../hooks/useRegisterModal';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {useNavigate} from "react-router-dom";


const LoginModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()
;    const {
        register, handleSubmit, formState: {errors}
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        try {
            const auth = getAuth();

            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
            if(userCredential.user){
                navigate('/admin')
            }
            toast.success("User logged in successfully");
        } catch (error) {
            toast.error("Something went wrong")
            console.log(error);
        }
    }
}
// const LoginModal = () => {
//     return (
//         <div>
//
//         </div>
//     );
// };

export default LoginModal;