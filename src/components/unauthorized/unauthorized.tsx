import { signOut } from 'auth-astro/client';
import React, { useEffect } from 'react';

const Unauthorized  = () => {
    return (
        <div className="flex justify-center items-center h-screen w-[calc(100vw-300px)] ">
            <h1 className='scroll-m-20 text-1xl font-extrabold tracking-tight lg:text-2xl'>Unauthorized</h1>
        </div>
    );
}

export  {Unauthorized};
