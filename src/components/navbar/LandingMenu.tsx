import React, {useCallback, useState} from 'react';
import {AiOutlineMenu} from "react-icons/ai";
import MenuItem from "./MenuItem";

import useLoginModal from "../../hooks/useLoginModal";
import useRegisterModal from "../../hooks/useRegisterModal";
import {useNavigate} from "react-router-dom";
import Avatar from "../Avatar";
import {signout} from '../../firebase';

interface LandingMenuProps {
    currentUser?: any | null;
}

const LandingMenu: React.FC<LandingMenuProps> = ({currentUser}) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const logout = useCallback(() => {
        signout()
        toggleOpen()
        navigate("/")
    }, [toggleOpen, navigate]);


    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full transition cursor-pointer capitalize hover:bg-neutral-500">
                    {currentUser?.role}
                </div>
                <div onClick={toggleOpen} className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row
                items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                    <AiOutlineMenu/>
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.photoURL}/>
                    </div>
                </div>
                {isOpen && (
                    <div
                        className="absolute rounded-xl shadow-md w-[60vw] md:w-[20vw] bg-white overflow-hidden right-0 top-12 text-sm">
                        <div className="flex flex-col cursor-pointer">
                            {currentUser ? (
                                    <>
                                        <div className="text-xs font-sans p-2 flex items-center hover:bg-emerald-200">
                                            {currentUser.email}
                                        </div>
                                        <hr/>
                                        {currentUser?.role === 'admin' && (
                                            <MenuItem onClick={() => {
                                                navigate('/admin')
                                            }} label="Dashboard"/>
                                        )}
                                        {currentUser?.role === 'sales' && (
                                            <MenuItem onClick={() => navigate('/sales')} label="Dashboard"/>
                                        )}
                                        {currentUser?.role === 'customer' && (
                                            <MenuItem onClick={() => navigate('/customer')} label="Dashboard"/>
                                        )}

                                        <hr/>
                                        <MenuItem onClick={() => logout()} label="Logout"/>
                                    </>
                                ) :
                                (<>
                                        <MenuItem onClick={loginModal.onOpen} label="Login"/>
                                        <MenuItem onClick={registerModal.onOpen} label="Sign Up"/>
                                    </>
                                )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LandingMenu;