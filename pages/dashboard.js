import { auth, db } from "@/utils/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {BsFillTrashFill, BsFillPencilFill} from 'react-icons/bs'
import {FaLongArrowAltLeft} from 'react-icons/fa'; 
import {useRouter} from 'next/router';
import {useEffect, useState} from "react";
import { collection, onSnapshot, query, orderBy, where, doc, deleteDoc } from "firebase/firestore";
import Artist from "@/components/artist";
import Link from "next/link";
import { toast } from "react-toastify";

export default function Dashboard(){

    const route = useRouter();
    const [user,loading] = useAuthState(auth);
    const [artists,setArtists] = useState([]);
    // console.log('user', user)

    // Delete Artist
    const deleteArtist = async (id) => {
        const docRef = doc(db, 'artists', id,)
        await deleteDoc(docRef);
        toast.success('Artist has been successfully deleted ❌ ❌ ❌', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
        });
    }

    // Get user's data
    useEffect(() => {
         // See if user is logged in
        const getData = async() => {
            if (loading) return;
            if(!user) return route.push('auth/login');
            const collectionRef = collection(db, 'artists');
            const q = query(collectionRef, where('user', '==', user.uid), orderBy('timestamp', 'desc'));
            const unsubscribe = onSnapshot(q, (snapshot => {
                setArtists(snapshot.docs.map((doc) => ({...doc.data(), id:doc.id})))
            }));
            return unsubscribe;
        }
        getData();
    }, [user, loading])
 

    return(
        <div className="my-4">
            <Link href={'/'} className=" py-2 px-4 text-gray-500  text-center font-medium text-lg " >
                <button className="uppercase text-left p-4 flex items-center gap-2 hover:text-amber-700">
                    <FaLongArrowAltLeft className="text-xl "/>
                    Home
                </button>
            </Link>
            <h1 className="font-medium text-xl text-center">Your Dashboard</h1>
            <h3 className="text-sm text-center">Manage your artists.</h3>
            <div className="flex flex-col my-4">
                <div className="-my-2  sm:-mx-6 lg:-mx-8">
                    <div className="py-2  sm:px-6 lg:px-8">
                    <div className="shadow  border-b border-gray-200 sm:rounded-lg h-screen max-h-[55vh] overflow-y-auto ">
                        <table className="min-w-full divide-y divide-gray-200 table-auto ">
                        <thead className="bg-sky-100 sticky top-0">
                            <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Artist
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Rate
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Streams
                            </th>
                            <th scope="col" className="relative px-2 py-3">
                                <span className="sr-only">More</span>
                            </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {artists.map((artist) => {
                                return (<Artist {...artist} key={artist.id}>
                                    <div className="flex  gap-4 ">
                                        <Link href={{pathname: '/add-artist', query: artist}}>
                                            <button className='border border-solid  text-amber-500 border-amber-500 rounded-lg w-8 px-2 py-2 flex justify-center items-center text-center  hover:bg-amber-500 hover:text-white'>
                                                < BsFillPencilFill />
                                            </button>
                                        </Link>

                                        <button className='border border-solid  text-red-500 border-red-500 rounded-lg w-8 px-2 py-2 flex justify-center items-center text-center  hover:bg-red-500 hover:text-white'
                                        onClick={() => deleteArtist(artist.id)}>
                                            <BsFillTrashFill/>
                                        </button>
                                    </div>
                                </Artist>);
                            })}
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}