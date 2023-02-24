import Link from "next/link";
import {GiMusicalNotes} from 'react-icons/gi';
import {useRouter} from 'next/router';
import { auth } from "@/utils/firebase";
import {useAuthState} from 'react-firebase-hooks/auth';
import {FiUserPlus} from 'react-icons/fi';
import {FaSignOutAlt} from 'react-icons/fa';
import {TfiDashboard} from 'react-icons/tfi';
import { Fragment, useEffect, useState} from 'react'
import { Menu, Transition } from '@headlessui/react';

export default function Nav(){

    const route = useRouter();
    // console.log('route', route)
    const [user, loading] = useAuthState(auth);
    // console.log('user', user)

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    // Get user's data
    useEffect(() => {
        // See if user is logged in
       const getData = async() => {
           if (loading) return;
           if(!user) return route.push('auth/login');
       }
       getData();
   }, [user, loading])

    return(
        <nav className="sm:flex sm:justify-between  sm:items-center py-4 relative">
            <Link href="/">
                <button className="font-gloock sm:text-4xl text-amber-500 text-4xl mx-auto  grid justify-self-center " >musicHUB</button>
            </Link>
            <button className={ ((route.pathname != '/dashboard') && (route.pathname != '/') ) ? "hidden" : ""  + 'bg-amber-500 rounded-full  w-16 h-16 flex justify-center items-center absolute sm:-bottom-20  -bottom-16 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-default shadow-xl'}>
                <GiMusicalNotes className='text-4xl text-orange-700 animate-spin-slow '/>
            </button>
            <ul className="sm:flex sm:items-center gap-10 mt-2 mx-auto grid justify-self-center sm:justify-self-end sm:mx-0">
                {user && (
                    <div className="flex flex-row mx-auto items-center sm:gap-6 gap-2 mb-5">
                        <Link href={'/add-artist'} className=" py-2 px-4 text-sm border-solid border-2 border-amber-500 text-white hover:bg-amber-500 text-center" >
                            <button className="flex items-center mx-auto gap-2">
                                <FiUserPlus/>
                                Add Artist
                            </button>
                        </Link>

                    <Menu as="div" className="relative inline-block text-left">
                        <div className="py-1 text-right">
                            <Menu.Button className="border-solid border-2  border-amber-500 text-white hover:bg-amber-500  rounded-full  hover:grayscale mx-auto  sm:mb-0 ">
                                <img src= {user.photoURL} alt= {'photo of ' + user.displayName} className='rounded-full w-12 cursor-pointer'></img>
                            </Menu.Button>

                        </div>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute sm:right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                                <Menu.Item>
                                {({ active }) => (
                                    <Link href={'/add-artist'} className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm') + ' flex items-center gap-2'}>
                                            <FiUserPlus/>
                                            Add Artist
                                    </Link> 
                                )}
                                </Menu.Item>
                                <Menu.Item>
                                {({ active }) => (
                                    <Link href={'/dashboard'} className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm')+ ' flex items-center gap-2'}>
                                            <TfiDashboard/> Dashboard
                                    </Link> 
                                )}
                                </Menu.Item>
                                <hr/>
                                <div className="py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                        <button
                                            onClick={() => auth.signOut()}
                                            className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block w-full px-4 py-2 text-left text-sm'
                                            )+ ' flex items-center gap-2'}
                                        >
                                            <FaSignOutAlt/>Sign out
                                        </button>
                                        )}
                                    </Menu.Item>
                                </div>
                            </div>
                            </Menu.Items>
                        </Transition>
                        </Menu>
                    </div>
                )}
                
            </ul>
        </nav>
    );
}