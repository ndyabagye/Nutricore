import  React, {useCallback, useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {toast} from 'react-hot-toast';
import useLoginModal from '../../hooks/useLoginModal';
import useRegisterModal from '../../hooks/useRegisterModal';
import {useNavigate} from "react-router-dom";
import Input from "../Inputs/Input";
import Heading from "../Heading";
import Modal from "./Modal";
import { signIn } from "../../firebase";


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
        setIsLoading(true);
        try {
            const res = await signIn(data.email, data.password);
            if (res?.success === true) {
                toast.success("User logged in  successfully");
                console.log("The user is", res)
                loginModal.onClose();
                navigate('/admin')
            } else if (res.error) {
                toast.error("Something went wrong")
                console.log(res.error);
            }
            setIsLoading(false)
        } catch (error) {
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