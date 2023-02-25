import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {  auth, db } from "@/utils/firebase";
import { toast } from "react-toastify";
import {BiBarChart, BiTransfer} from 'react-icons/bi';
import {BsPiggyBank, BsCoin} from 'react-icons/bs';
import {BsFillTrashFill, BsFillPencilFill, BsCalendar4Week} from 'react-icons/bs'
import {MdOutlineDone} from 'react-icons/md';
import {FaCoins} from 'react-icons/fa';
import {FaLongArrowAltLeft} from 'react-icons/fa'; 
import { doc, deleteDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";

export default function Details() {
    const router = useRouter();
    const routeData = router.query;
    // let routeData = router.query;
    const [currentUser,loading] = useAuthState(auth);
    const [artist, setArtist] = useState('');
    const [allArtists, setAllArtists] = useState([]);
    // console.log('routeData', routeData)
    // console.log('currentUser', currentUser)

    function separateNumber(givenNumber) {
      
        let nfObject = new Intl.NumberFormat('en-US');
        let output = nfObject.format(givenNumber);
      
        return output;
      
    }

    var getTotalPay = () =>  {  
        return ((routeData.rate*routeData.streams).toFixed(2))
    }

    var getMonthlyPay = () =>  {  
        let today = new Date();
        let startDate = new Date('april 2006');
        var diff = Math.floor(today.getTime() - startDate.getTime());
        var day = 1000 * 60 * 60 * 24;
        var days = Math.floor(diff/day);
        var months = Math.floor(days/31);
        // console.log( months, 'months')

        var total = getTotalPay();
        // console.log(separateNumber(total/months))
        return ((total/months).toFixed(2))

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

   

    // Get currentUser's data
    useEffect(() => {
         // See if currentUser is logged in
        const getData = async() => {
            if (loading) return;
            if(!currentUser) return router.push('auth/login');
            
        }
        getData();
    }, [currentUser, loading])
    
    return(
       <div className="m-4">
            <div className= ' flex justify-between gap-2 mt-6 mb-8'>
                <Link href={'/'} className=" text-gray-500 text-center font-medium " >
                    <button className="uppercase text-left px-4 py-2 flex items-center gap-2 hover:text-amber-700">
                        <FaLongArrowAltLeft className="text-xl "/>
                        Home
                    </button>
                </Link>

                
                <div className= 'flex flex-row gap-4'>
                <button className = {((currentUser) && (currentUser?.uid != routeData.user) ? 'hidden ' : '' ) + 'border border-none  text-amber-500 border-amber-500 rounded-lg px-4  py-1 flex justify-center items-center text-center hover:bg-amber-500 hover:text-white gap-2'} onClick={() => editArtist()}>
                    <BsFillPencilFill/>
                    {/* Edit */}
                </button>

                <button className= {((currentUser) && (currentUser?.uid != routeData.user) ? 'hidden ' : '' ) +'border border-none  text-red-500 border-red-500 rounded-lg px-4 py-1 flex justify-center items-center text-center  hover:bg-red-500 hover:text-white gap-2'}
                    onClick={() => deleteArtist(routeData.id)}>
                        <BsFillTrashFill/>
                    {/* Delete */}
                </button>
                </div>
            </div>

            <div className='  rounded-lg max-w-2xl mx-auto  grid justify-self-center  h-screen max-h-[70vh] mb-8 '>
            <div className=" text-center justify-center items-center  flex flex-col place-content-center gap-4">
                <img src={routeData.photoURL} alt={'photo of '+ routeData.name} className=" h-40 w-40 border-solid border-2  border-orange-700 text-white  rounded-full mb-4 "/>
                <div className="flex flex-col gap-2">
                    <h1 className=" font-gloock text-5xl text-orange-700 mb-2">{routeData.name}</h1>
                    <p className={((currentUser) && (currentUser?.uid == routeData.user) ? ' bg-green-100 text-green-800  ' : ' bg-yellow-100 text-yellow-800 ') + "text-sm px-4 rounded-full"}>
                        <span className=" font-bold">
                            {routeData.userName} &nbsp;
                        </span>
                        Management
                    </p>
                    <p className={(routeData.completed  == 'true' ? ' bg-green-300 text-gray-800  ' : ' bg-red-100 text-red-800 ') + "text-sm px-4 rounded-full"}>
                        Payment Status:
                        <span className=" font-bold">
                            &nbsp; {routeData.completed == 'true' ? "Complete" : "Incomplete"}
                        </span>
                    </p>
                </div>
            </div>
            
            <div className="mt-8 flex flex-col justify-center items-center ">
                <h1 className="text-xl font-medium uppercase text-gray-500 mb-2">Performance</h1>
                <p>April 2006 - today</p>
            </div>

            <div className=" border-none  flex-row grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 align-top ">
                <div className="flex flex-col text-center justify-center items-center gap-1 p-4 self-start">
                    <BiBarChart className='sm:text-8xl text-9xl text-orange-700 text-center border border-solid border-amber-100 bg-amber-50 shadow-sm rounded-full p-4 mb-2 '></BiBarChart>
                    <h1 className='sm:text-xl text-2xl text-orange-700 text-center '>{separateNumber(routeData.streams)}</h1>
                    <p className='mt-0 sm:text-sm text-md text-gray-500 text-center '>
                        streams
                    </p>
                </div>
                <div className="flex flex-col text-center justify-center items-center gap-1 p-4 self-start">
                    <BiTransfer className='sm:text-8xl text-9xl text-orange-700 text-center border border-solid border-amber-100 bg-amber-50 shadow-sm rounded-full p-4 mb-2'></BiTransfer>
                    <h1 className='sm:text-xl text-2xl text-orange-700 text-center '>${separateNumber(routeData.rate)} </h1>
                    <p className='mt-0 sm:text-sm text-md text-gray-500 text-center '>
                        per stream
                    </p>
                </div>
                <div className="flex flex-col text-center justify-center items-center gap-1 p-4 self-start">
                    <BsPiggyBank className='sm:text-8xl text-9xl text-orange-700 text-center border border-solid border-amber-100 bg-amber-50 shadow-sm rounded-full p-4 mb-2'></BsPiggyBank>
                    <h1 className='sm:text-xl text-2xl text-orange-700 text-center '>${separateNumber(getTotalPay())}</h1>
                    <p className='mt-0 sm:text-sm text-md text-gray-500 text-center '>
                         in total 
                    </p>
                </div>
                <div className="flex flex-col text-center justify-center items-center gap-1 p-4 self-start">
                    <BsCoin className='sm:text-8xl text-9xl text-orange-700 text-center border border-solid border-amber-100 bg-amber-50 shadow-sm rounded-full p-4 mb-2'></BsCoin>
                    <h1 className='sm:text-xl text-2xl text-orange-700 text-center '>${separateNumber(getMonthlyPay())}</h1>
                    <p className='mt-0 sm:text-sm text-md text-gray-500 text-center '>
                        per month 
                    </p>
                </div>
            </div>
        </div>
       </div>
    )
}