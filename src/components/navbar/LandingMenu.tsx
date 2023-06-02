import React, {useCallback, useState} from 'react';
import {AiOutlineMenu} from "react-icons/ai";
import MenuItem from "./MenuItem";

import useLoginModal from "../../hooks/useLoginModal";
import useRegisterModal from "../../hooks/useRegisterModal";
import {getAuth} from "firebase/auth";
import {useNavigate} from "react-router-dom";

interface UserMenuProps {
    // currentUser?: SafeUser | null;
}

const LandingMenu: React.FC<UserMenuProps> = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const navigate = useNavigate();

    const auth = getAuth();

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-500 transition cursor-pointer">
                    User Menu
                </div>
                <div onClick={toggleOpen} className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row
                items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                    <AiOutlineMenu/>
                    <div className="hidden md:block">
                        Image
                        {/*<Avatar src={currentUser?.image}/>*/}
                    </div>
                </div>
                {isOpen && (
                    <div
                        className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                        <div className="flex flex-col cursor-pointer">
                            {auth.currentUser ? (
                                    <>
                                        <MenuItem onClick={() => navigate('/admin')} label="Admin"/>
                                        <MenuItem onClick={() => navigate('/sales')} label="Sales"/>
                                        <MenuItem onClick={() => navigate('/customer')} label="Customer"/>
                                        <hr/>
                                        <MenuItem onClick={()=> auth.signOut()} label="Logout"/>
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