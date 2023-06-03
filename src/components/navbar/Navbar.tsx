import React from "react";
import Container from "../Container";
import {Link} from 'react-router-dom'
import LandingMenu from "./LandingMenu";

interface NavbarProps {
    landing: Boolean
}

const Navbar: React.FC<NavbarProps> = ({landing}) => {
    return (
        <div className={`fixed w-full z-10 shadow-sm ${landing ? 'bg-emerald-50' : 'bg-white'}`}>
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                        <Link to='/'>
                            Home
                        </Link>
                        <LandingMenu/>
                    </div>
                </Container>
            </div>
        </div>
    )
}


export default Navbar;