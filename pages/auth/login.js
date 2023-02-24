import {FcGoogle} from 'react-icons/fc';
import {GiMusicalNotes} from 'react-icons/gi';
import {signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import { auth } from '@/utils/firebase';
import {useRouter} from 'next/router';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useEffect} from 'react';

export default function Login(){

    const route = useRouter();
    const [user, loading] = useAuthState(auth);

    // Sign in with google
    const googleProvider = new GoogleAuthProvider();
    const GoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            route.push('/');
        } catch (error) {
            console.log('error(s): ', error)
        }
    }

    // run everytime user changes
    useEffect(() => {
        if (user) {
            route.push('/');
        } else{
            console.log('logged in')
        }
    }, [user]);

    return(
        <div className=" mt-32 text-gray-700 ">
            <div className="mb-10 flex flex-col items-center flex-items gap-4  ">
                <button className='bg-amber-500 rounded-full w-32 h-32 m-5 flex justify-center items-center text-center '>
                    <GiMusicalNotes className='text-6xl text-orange-700 '/>
                </button>
                <h1 className="text-5xl font-gloock font-semibold text-center ">musicHUB</h1>
                <h2 className="text-2xl font-medium text-center ">for the Artists and their Art</h2>
                <p className=" text-md font-medium text-center uppercase">Stats, Payment, Support and more</p>
            </div>
            <div className="py-4">
                <p className=" text-md font-medium text-center p-4 ">Sign in to get started today!</p>
                <button 
                onClick={GoogleLogin}
                className="text-white bg-amber-500 w-full font-medium text-lg rounded-md flex align middle p-4 gap-2 hover:bg-amber-700">
                    <FcGoogle className='text-2xl'/> Sign in with Google</button>
            </div>
        </div>
    )
}