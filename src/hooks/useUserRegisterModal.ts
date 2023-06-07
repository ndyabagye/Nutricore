import { create } from "zustand";

interface UserRegisterModalStore{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useUserRegisterModal = create<UserRegisterModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));

export default useUserRegisterModal;