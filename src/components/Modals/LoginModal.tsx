import  {useCallback, useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {toast} from 'react-hot-toast';
import useLoginModal from '../../hooks/useLoginModal';
import useRegisterModal from '../../hooks/useRegisterModal';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {useNavigate} from "react-router-dom";
import Input from "../Inputs/Input";
import Heading from "../Heading";
import Modal from "./Modal";


const LoginModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()
    ;const {
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
            console.log("The logged in user", userCredential);
            if (userCredential.user) {
                navigate('/admin')
            }
            loginModal.onClose()
            toast.success("User logged in successfully");
        } catch (error) {
            toast.error("Something went wrong")
            console.log(error);
        }
    }

    const toggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    }, [loginModal, registerModal]);


    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title='Welcome back' subtitle="Login to account"/>
            <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required/>
            <Input id="password" label="Password" type="password" disabled={isLoading} register={register}
                   errors={errors} required/>
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr/>
            {/*<Button outline label="Continue with Google" icon={FcGoogle} onClick={() => signIn('google ')}/>*/}
            {/*<Button outline label="Continue with Github" icon={AiFillGithub} onClick={() => signIn('github')}/>*/}
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="justify-center flex flex-row items-center gap-2">
                    <div>First time using Nutricore?</div>
                    <div className="text-neutral-800 cursor-pointer hover:underline" onClick={toggle}>Create
                        an account
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel='Continue'
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )


}
// const LoginModal = () => {
//     return (
//         <div>
//
//         </div>
//     );
// };

export default LoginModal;