import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';
import useLoginModal from '../../hooks/useLoginModal';
import useRegisterModal from '../../hooks/useRegisterModal';
import Heading from "../Heading";
import Input from "../Inputs/Input";
import { AiFillGithub } from "react-icons/ai";
import Button from "../Button";
import { FcGoogle } from "react-icons/fc";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

import { signUp } from "../../firebase";



const RegisterModal = () => {
    const navigate = useNavigate()
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    ; const {
        register, handleSubmit, formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        try {
            const res = await signUp(data.email, data.password, 'customer');
            if (res?.success === true) {
                toast.success("User created successfully");
                registerModal.onClose();
                navigate('/admin')
            } else if (res.error) {
                toast.error("Something went wrong")
                console.log(res.error);
            }
            setIsLoading(false)
        } catch (error) {
            console.log(error);
        }
    };


    const toggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen()
    }, [loginModal, registerModal])


    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome to Nutricore" subtitle="Create an account" />
            <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
            <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required />
            <Input id="password" label="Password" type="password" disabled={isLoading} register={register}
                errors={errors} required />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            {/*<Button outline label="Continue with Google" icon={FcGoogle} onClick={()=> signIn('google')}/>*/}
            {/*<Button outline label="Continue with Github" icon={AiFillGithub} onClick={()=> signIn('github')}/>*/}

            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="justify-center flex flex-row items-center gap-2">
                    <div>Already have an account?</div>
                    <div className="text-neutral-800 cursor-pointer hover:underline" onClick={toggle}>Log in</div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel='Continue'
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )

}

export default RegisterModal;