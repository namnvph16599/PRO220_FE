import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white border-gray-200 px-2 sm:px-4 py-2.5">
            <div className="container flex flex-wrap items-center justify-between mx-auto">
                <div className="mb-6 md:mb-0">
                    <Link to="/" className="flex items-center">
                        <img src="/images/mylogo.png" className="mr-3 sm:h-16" alt="Dodoris Logo" />
                        <span className="self-center text-xl text-[#02b875] font-bold whitespace-nowrap">DODORIS</span>
                    </Link>
                    <span></span>
                </div>
                <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-4 mt-6">
                    <div>
                        <h2 className="mb-6 text-lg font-semibold text-gray-900 uppercase">Về Dodoris</h2>
                        <ul className="">
                            <li className="mb-4  text-base rounded md:bg-transparent md:p-0 hover:text-[#02b875]">
                                <Link to="https://flowbite.com/" className="hover:underline">
                                    Flowbite
                                </Link>
                            </li>
                            <li className="mb-4  text-base rounded md:bg-transparent md:p-0 hover:text-[#02b875]">
                                <Link to="https://tailwindcss.com/" className="hover:underline">
                                    Tailwind CSS
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-lg font-semibold text-gray-900 uppercase">Chính sách</h2>
                        <ul className="">
                            <li className="mb-4  text-base rounded md:bg-transparent md:p-0 hover:text-[#02b875]">
                                <Link to="https://github.com/themesberg/flowbite" className="hover:underline ">
                                    Github
                                </Link>
                            </li>
                            <li className="mb-4  text-base rounded md:bg-transparent md:p-0 hover:text-[#02b875]">
                                <Link to="https://discord.gg/4eeurUVvTy" className="hover:underline">
                                    Discord
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-lg font-semibold text-gray-900 uppercase">Liên hệ</h2>
                        <ul className="">
                            <li className="mb-4  text-base rounded md:bg-transparent md:p-0 hover:text-[#02b875]">
                                <Link to="#" className="hover:underline">
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
                                <Link to="#" className="hover:underline">
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
                                <Link to="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                    <img src="/images/facebook.png" className="sm:h-12" alt="Facebook Logo" />
                                </Link>
                            </li>
                            <li className="mb-4  text-base rounded md:bg-transparent md:p-0 hover:text-[#02b875]">
                                <Link to="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                    <img src="/images/zalo.png" className="sm:h-12" alt="Zalo Logo" />
                                </Link>
                            </li>
                            <li className="mb-4  text-base rounded md:bg-transparent md:p-0 hover:text-[#02b875]">
                                <Link to="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                    <img src="/images/youtube.png" className="sm:h-12" alt="Youtube Logo" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8 text-center" />
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
