import Link from "next/link";
import {GiMusicalNotes} from 'react-icons/gi';
import {useRouter} from 'next/router';
import { auth } from "@/utils/firebase";
import {useAuthState} from 'react-firebase-hooks/auth';

export default function Nav(){

    const route = useRouter();
    // console.log('route', route)
    const [user, loading] = useAuthState(auth);
    // console.log('user', user)

    return(
        <nav className="sm:flex sm:justify-between  sm:items-center py-4 relative">
            <Link href="/">
                <button className="font-gloock sm:text-4xl text-amber-500 text-4xl mx-auto  grid justify-self-center " >musicHUB</button>
            </Link>
            <button className={ ((route.pathname != '/dashboard') && (route.pathname != '/') ) ? "hidden" : ""  + 'bg-amber-500 rounded-full sm:w-20 sm:h-20  w-16 h-16 flex justify-center items-center absolute sm:-bottom-20  -bottom-16 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-default shadow-xl'}>
                <GiMusicalNotes className='text-4xl text-orange-700 animate-spin-slow '/>
            </button>
            <ul className="sm:flex sm:items-center gap-10 mt-2 mx-auto grid justify-self-center sm:justify-self-end sm:mx-0">
                {!user && (
                    <Link href={'/auth/login'} className="py-2 px-4 text-sm border-solid border-2 border-amber-500 text-white text-center hover:bg-amber-500  " >Join Now</Link>
                )}
                {user && (
                    <div className="sm:flex sm:items-center sm:gap-6  grid   gap-2 mb-5">
                        <Link href={'/add-artist'} className=" py-2 px-4 text-sm border-solid border-2 border-amber-500 text-white hover:bg-amber-500 text-center" >
                            Add Artist
                        </Link>

                        <Link href={'/dashboard'} className=" border-solid border-2  border-amber-500 text-white hover:bg-amber-500  rounded-full  hover:grayscale mx-auto mb-4 sm:mb-0" >
                        <img src= {user.photoURL} alt= {'photo of ' + user.displayName} className='rounded-full sm:w-12 w-14 cursor-pointer'></img>
                    </Link>
                    </div>
                )}
                
            </ul>
        </nav>
    );
}