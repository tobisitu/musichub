import { auth } from "@/utils/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useEffect, useState} from "react";
import { useRouter } from "next/router";


export default function Artist({children, avatar, userName, name, streams, photoURL, rate, user, id, timestamp }){
    const [currentUser,loading] = useAuthState(auth);
    const route = useRouter();
    // console.log('children', children);
    // console.log('currentUser', currentUser.uid);
    // console.log('user', user);
    
    // // See if user is logged in
    // const getData = async() => {
    //     if (loading) return;
    //     if(!currentUser) return route.push('auth/login');
    // }

    // // Get user's data
    // useEffect(() => {
    //     getData();
    // }, [user, loading])

      // Get user's data
      useEffect(() => {
         // See if user is logged in
        const getData = async() => {
            if (loading) return;
            if(!currentUser) return route.push('auth/login');
        }

        getData();
    }, [user, loading])

    var handleRowClick = (row) =>  {
        route.push({ pathname: `/${id}`, query: 
        { 
            avatar: avatar,
            id: id,
            name: name,
            photoURL: photoURL,
            rate: rate,
            streams: streams,
            timestamp: timestamp,
            user: user,
            userName: userName,
        }
         });
    }
    
    return(
        <>
            <tr  className=" hover:cursor-pointer hover:bg-amber-50 hover:shadow-md " onClick={()=> handleRowClick(id)} >
               <td className="px-6 py-4 whitespace-nowrap" >
                    <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 border-solid border-2  border-orange-700 text-white  rounded-full " src={photoURL} alt={'photo of '+ name} />
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{name}</div>
                    </div>
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {rate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {streams}
                </td>
                <td className={(children? 'hidden ':'')+'px-6 py-4 whitespace-nowrap'}>
                    <span
                    className={( currentUser && currentUser.uid == user ? 'px-2 bg-green-100 text-green-800':'px-2 bg-yellow-100 text-yellow-800') +' inline-flex text-xs leading-5 font-semibold rounded-full '}
                    >
                        {userName}
                    </span>
                </td>
                
                <td className={ (!children? 'hidden':'') + ' px-2 py-4 whitespace-nowrap '}>
                    {children}
                </td>
            </tr>
            
        </>
    )
}