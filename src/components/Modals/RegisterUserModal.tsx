import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';
import Heading from "../Heading";
import Input from "../Inputs/Input";
import Modal from "./Modal";
import { signUpNewUser } from "../../firebase";
import useUserRegisterModal from "../../hooks/useUserRegisterModal";



const RegisterUserModal = () => {
    const userRegisterModal = useUserRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
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
            const res = await signUpNewUser(data.email, data.password, data.name,  'sales');
            if (res?.success === true) {
                toast.success("User created successfully");
                userRegisterModal.onClose();

            } else if (res.error) {
                toast.error("Something went wrong")
                console.log(res.error);
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };


    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Need Help Distributing ?" subtitle="Create New Sales Person" />
            <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
            <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required />
            <Input id="password" label="Password" type="password" disabled={isLoading} register={register}
                   errors={errors} required />
        </div>
    )

    // const footerContent = (
    //     <div className="flex flex-col gap-4 mt-3">
    //         <hr />
    //         {/*<Button outline label="Continue with Google" icon={FcGoogle} onClick={()=> signIn('google')}/>*/}
    //         {/*<Button outline label="Continue with Github" icon={AiFillGithub} onClick={()=> signIn('github')}/>*/}
    //
    //         <div className="text-neutral-500 text-center mt-4 font-light">
    //             <div className="justify-center flex flex-row items-center gap-2">
    //                 <div>Already have an account?</div>
    //                 <div className="text-neutral-800 cursor-pointer hover:underline" onClick={toggle}>Log in</div>
    //             </div>
    //         </div>
    //     </div>
    // );

    return (
        <Modal
            disabled={isLoading}
            isOpen={userRegisterModal.isOpen}
            title="Register User"
            actionLabel='Continue'
            onClose={userRegisterModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
        />
    )

}

export default RegisterUserModal;