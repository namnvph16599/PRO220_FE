import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white border-gray-200 px-2 sm:px-4 py-2.5">
            <div className="container flex flex-wrap items-center justify-between mx-auto">
                <div className="mb-6 md:mb-0">
                    <Link to="/" className="flex items-center">
                        <img src="/images/logo.png" className="mr-3 sm:h-16" alt="Dodoris Logo" />
                        <span className="self-center text-xl text-[#02b875] font-bold whitespace-nowrap">DODORIS</span>
                    </Link>
                    <span></span>
                </div>
                <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-4 mt-6">
                    <div>
                        <h2 className="mb-6 text-lg font-semibold text-gray-900 uppercase">Về Dodoris</h2>
                        <ul className="">
                            <li className="mb-4  text-base rounded md:bg-transparent md:p-0 hover:text-[#02b875]">
                                <Link href="https://flowbite.com/" className="hover:underline">
                                    Flowbite
                                </Link>
                            </li>
                            <li className="mb-4  text-base rounded md:bg-transparent md:p-0 hover:text-[#02b875]">
                                <Link href="https://tailwindcss.com/" className="hover:underline">
                                    Tailwind CSS
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-lg font-semibold text-gray-900 uppercase">Chính sách</h2>
                        <ul className="">
                            <li className="mb-4  text-base rounded md:bg-transparent md:p-0 hover:text-[#02b875]">
                                <Link href="https://github.com/themesberg/flowbite" className="hover:underline ">
                                    Github
                                </Link>
                            </li>
                            <li className="mb-4  text-base rounded md:bg-transparent md:p-0 hover:text-[#02b875]">
                                <Link href="https://discord.gg/4eeurUVvTy" className="hover:underline">
                                    Discord
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-lg font-semibold text-gray-900 uppercase">Liên hệ</h2>
                        <ul className="">
                            <li className="mb-4  text-base rounded md:bg-transparent md:p-0 hover:text-[#02b875]">
                                <Link href="#" className="hover:underline">
                                    <span>
                                        <svg
                                            className="w-4 h-4 inline mr-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            ></path>
                                        </svg>
                                        0376021530
                                    </span>
                                </Link>
                            </li>
                            <li className="mb-4  text-base rounded md:bg-transparent md:p-0 hover:text-[#02b875]">
                                <Link href="#" className="hover:underline">
                                    <span>
                                        <svg
                                            className="w-4 h-4 inline mr-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                            ></path>
                                        </svg>
                                        0376021530@gmail.com
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-lg font-semibold text-gray-900 uppercase">Theo dõi chúng tôi tại</h2>
                        <ul className=" flex space-x-6 sm:justify-center sm:mt-0">
                            <li className="mb-4  text-base rounded md:bg-transparent md:p-0 hover:text-[#02b875]">
                                <Link href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path
                                            fillRule="evenodd"
                                            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="sr-only">Facebook page</span>
                                </Link>
                            </li>
                            <li className="mb-4  text-base rounded md:bg-transparent md:p-0 hover:text-[#02b875]">
                                <Link href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path
                                            fillRule="evenodd"
                                            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="sr-only">Facebook page</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8 text-center" />
            <div className="sm:block sm:text-center ">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 block text-center">
                    © 2022{' '}
                    <Link to="/" className="hover:underline">
                        Dodoris™
                    </Link>
                    . All Rights Reserved.
                </span>
            </div>
        </footer>
    );
};

export default Footer;
