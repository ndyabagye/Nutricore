import React, {useCallback, useState} from 'react';
import {AiOutlineMenu} from "react-icons/ai";
import MenuItem from "./MenuItem";

import useLoginModal from "../../hooks/useLoginModal";
import useRegisterModal from "../../hooks/useRegisterModal";
import {auth} from "../../utils/firebase";
import {useNavigate} from "react-router-dom";
import Avatar from "../Avatar";

interface UserMenuProps {
    // currentUser?: SafeUser | null;
}

const LandingMenu: React.FC<UserMenuProps> = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const [user, setUser] = useState(auth.currentUser);

    const logout = useCallback(() => {
        auth.signOut()
        setUser(null);
        toggleOpen()
        navigate("/")
    }, [toggleOpen, auth, navigate]);


    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full transition cursor-pointer">
                     Menu
                </div>
                <div onClick={toggleOpen} className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row
                items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                    <AiOutlineMenu/>
                    <div className="hidden md:block">
                        <Avatar/>
                    </div>
                </div>
                {isOpen && (
                    <div
                        className="absolute rounded-xl shadow-md w-[60vw] md:w-[20vw] bg-white overflow-hidden right-0 top-12 text-sm">
                        <div className="flex flex-col cursor-pointer">
                            {user ? (
                                    <>
                                        <div className="text-sm font-sans p-2 flex items-center hover:bg-emerald-200">
                                            {user.email}
                                        </div>
                                        <hr/>
                                        <MenuItem onClick={() => {
                                            navigate('/admin')
                                        }} label="Admin"/>
                                        <MenuItem onClick={() => navigate('/sales')} label="Sales"/>
                                        <MenuItem onClick={() => navigate('/customer')} label="Customer"/>
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