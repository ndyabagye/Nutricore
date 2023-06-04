import React from 'react';
// import placeholder from './placeholder.jpg';
interface AvatarProps{
    src?: string | null | undefined
}
const Avatar: React.FC<AvatarProps> = ({src}) => {
    return (
        <div>
            <img src={src || '/placeholder.jpg'} alt="Avatar" className="rounded-full h-7 w-7"/>
        </div>
    );
};

export default Avatar;