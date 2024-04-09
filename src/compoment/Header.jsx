// import React from 'react';


const Header = () => {
    return (
        <header className="pl-2 flex w-full h-[55px] py-[6px] items-center border-b-[1px] fixed z-10 bg-opacity-65 backdrop-blur">
            <a href="" className="flex items-center">
                <img className="inline-block h-[32px]" src="https://geekup.vn/Icons/geekup-logo-general.svg" alt="" />
                <h1 className="font-semibold pl-[6px] text-gray-500">Test</h1>
            </a>
            <span className="px-6 text-blue-600 text-[14px] font-normal cursor-pointer">To do</span>
        </header>

    );
};

export default Header;