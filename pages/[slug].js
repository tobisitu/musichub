import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {  auth, db } from "@/utils/firebase";
import { toast } from "react-toastify";
import {BiBarChart, BiTransfer} from 'react-icons/bi';
import {BsPiggyBank, BsArrowLeft} from 'react-icons/bs';
import {FaLongArrowAltLeft} from 'react-icons/fa'; 
import { doc, deleteDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";

export default function Details() {
    const router = useRouter();
    const routeData = router.query;
    const [currentUser,loading] = useAuthState(auth);
    const [artist, setArtist] = useState('');
    const [allArtists, setAllArtists] = useState([]);
    console.log('routeData', routeData)
    console.log('currentUser', currentUser)

    function separateNumber(givenNumber) {
      
        let nfObject = new Intl.NumberFormat('en-US');
        let output = nfObject.format(givenNumber);
      
        return output;
      
    }

      // Delete Artist
      const deleteArtist = async (id) => {
        const docRef = doc(db, 'artists', id,)
        await deleteDoc(docRef);
        toast.success('Artist has been successfully deleted ❌ ❌ ❌', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
        });
        router.push('/');
    }

    const editArtist = async () => {
        router.push({ pathname: `/add-artist`, query: routeData });
    }

    // See if currentUser is logged in
    const getData = async() => {
        if (loading) return;
        if(!currentUser) return router.push('auth/login');
        console.log('hmm', currentUser?.uid != routeData.user)
    }

    // Get currentUser's data
    useEffect(() => {
        getData();
    }, [currentUser, loading])
    
    return(
       <div>
            <Link href={'/'} className=" py-2 px-4 text-gray-500  text-center font-medium text-lg " >
                <button className="uppercase text-left p-4 flex items-center gap-2 hover:text-amber-700">
                    <FaLongArrowAltLeft className="text-xl "/>
                    Back
                </button>
            </Link>
            <div className='  rounded-lg max-w-2xl mx-auto  grid justify-self-center  h-screen max-h-[70vh] mb-8'>
            <div className=" text-center justify-center items-center  p-8  flex flex-col place-content-center">
                <img src={routeData.photoURL} alt={'photo of '+ routeData.name} className=" h-40 w-40 border-solid border-2  border-orange-700 text-white  rounded-full mb-4 "/>
                <div className="flex flex-col gap-2">
                    <h1 className=" font-gloock text-5xl text-orange-700 mb-2">{routeData.name}</h1>
                    <p className={((currentUser) && (currentUser?.uid == routeData.user) ? ' bg-green-100 text-green-800  ' : ' bg-yellow-100 text-yellow-800 ') + "text-sm px-4 rounded-full"}>
                        <span className=" font-bold">
                            {routeData.userName} &nbsp;
                        </span>
                        Management
                    </p>
                    <div className={((currentUser) && (currentUser?.uid != routeData.user) ? 'hidden ' : '' ) + 'mt-2'}>
                        <button className= 'border border-solid  text-amber-500 border-amber-500 rounded-lg w-full px-1 py-1 flex justify-center items-center text-center hover:bg-amber-500 hover:text-white' onClick={() => editArtist()}>
                            Edit
                        </button>

                        <button className= 'mt-1 border border-solid  text-red-500 border-red-500 rounded-lg w-full px-1 py-1 flex justify-center items-center text-center  hover:bg-red-500 hover:text-white'
                            onClick={() => deleteArtist(routeData.id)}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="flex flex-col justify-center items-center ">
                <h1 className="text-xl font-medium uppercase text-gray-500 mb-2">Performance</h1>
                <p>April 2006 - today</p>
            </div>

            <div className=" border-none  flex-row grid grid-cols-3 align-top ">
                <div className="flex flex-col text-center justify-center items-center gap-1 p-4 self-start">
                    <BiBarChart className='text-8xl text-orange-700 text-center border border-solid border-amber-100 bg-amber-50 shadow-sm rounded-full p-4 mb-2 '></BiBarChart>
                    <h1 className='text-xl text-orange-700 text-center '>{separateNumber(routeData.streams)}</h1>
                    <p className='mt-0 text-sm text-gray-500 text-center '>
                        streams
                    </p>
                </div>
                <div className="flex flex-col text-center justify-center items-center gap-1 p-4 self-start">
                    <BiTransfer className='text-8xl text-orange-700 text-center border border-solid border-amber-100 bg-amber-50 shadow-sm rounded-full p-4 mb-2'></BiTransfer>
                    <h1 className='text-xl text-orange-700 text-center '>${separateNumber(routeData.rate)} </h1>
                    <p className='mt-0 text-sm text-gray-500 text-center '>
                        per Stream
                    </p>
                </div>
                <div className="flex flex-col text-center justify-center items-center gap-1 p-4 self-start">
                    <BsPiggyBank className='text-8xl text-orange-700 text-center border border-solid border-amber-100 bg-amber-50 shadow-sm rounded-full p-4 mb-2'></BsPiggyBank>
                    <h1 className='text-xl text-orange-700 text-center '>${separateNumber((routeData.streams * routeData.rate).toFixed(2))}</h1>
                    <p className='mt-0 text-sm text-gray-500 text-center '>
                        made in total 
                    </p>
                </div>

            </div>
        </div>
       </div>
    )
}