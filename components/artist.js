import { auth, db } from "@/utils/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useEffect, useState} from "react";
import { useRouter } from "next/router";
import {FcCancel} from 'react-icons/fc';
import {MdOutlineDone} from 'react-icons/md';
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";

export default function Artist({children, avatar, userName, name, streams, photoURL, rate, user, id, timestamp, payout, completed }){
    const [currentUser,loading] = useAuthState(auth);
    const [isComplete, toggleComplete] = useState(completed)
    // console.log('isComplete', isComplete);
    const route = useRouter();
    // console.log('children', children);
    // console.log('currentUser', currentUser.uid);
    // console.log('user', user);

      // Get user's data
      useEffect(() => {
         // See if user is logged in
        const getData = async() => {
            if (loading) return;
            if(!currentUser) return route.push('auth/login');
        }

        getData();
    }, [user, loading])


    var handleRowClick = () =>  {
        route.push({ pathname: '/${id}', query: 
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
            payout: payout,
            completed: isComplete
        }
         });
        //  console.log('route CLICKED ', route)
    }
    
    var handleCheckBox = async () =>  {
        const docRef = doc(db, 'artists', id)
        // console.log('toggled -> docRef: ', docRef);
        let test = toggleComplete(current => !current);
        // console.log('toggled -> isComplete: ', isComplete);
        completed = !isComplete;
        let artist = {
            name: name,
            photoURL: photoURL,
            rate: rate,
            streams: streams,
            id: id,
            payout: payout,
            completed: !isComplete
        }
        const updatedArtist = {...artist, timestamp: serverTimestamp()};
        // console.log('toggled -> updatedArtist: ', updatedArtist);
        updateDoc(docRef, updatedArtist);
    }

    var getTotalPay = () =>  {  
        if (payout > 0) {
            return ((payout).toFixed(2));
        } else {
            return 0;
        }
    }

    function separateNumber(givenNumber) {
      
        let nfObject = new Intl.NumberFormat('en-US');
        let output = nfObject.format(givenNumber);
      
        return output;
      
    }
    var getMonthlyPay = () =>  {  
        let today = new Date();
        let startDate = new Date('april 1 2006');
        var diff = Math.floor(today.getTime() - startDate.getTime());
        var day = 1000 * 60 * 60 * 24;
        var days = Math.floor(diff/day);
        var months = Math.floor(days/31);
        var total = getTotalPay() 
        var monthly = total/months
        // console.log('monthly',monthly)
        return ((monthly).toFixed(2))

    }

   

    return(
        <>
            <tr  className=" hover:cursor-pointer hover:bg-amber-50 hover:shadow-md "  >
               <td className="px-6 sm:py-3 py-2 whitespace-nowrap" onClick={()=> handleRowClick(id)}>
                    <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 border-solid border-2  border-orange-700 text-white  rounded-full " src={photoURL} alt={'photo of '+ name} />
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{name}</div>
                    </div>
                    </div>
                </td>
                <td className="px-6 sm:py-3 py-2 whitespace-nowrap text-sm text-gray-500" onClick={()=> handleRowClick(id)}>
                    {rate}
                </td>
                <td className="px-6 sm:py-3 py-2 whitespace-nowrap text-sm text-gray-500"  onClick={()=> handleRowClick(id)}>
                    {separateNumber(streams)}
                </td>
                <td className="px-6 sm:py-3 py-2 whitespace-nowrap text-sm text-gray-500" onClick={()=> handleRowClick(id)}>
                    ${separateNumber(getTotalPay())}
                </td>
                <td className="px-6 sm:py-3 py-2 whitespace-nowrap text-sm text-gray-500" onClick={()=> handleRowClick(id)}>
                    ${separateNumber(getMonthlyPay())}
                   {/* { getMonthlyPay()} */}
                </td>
                <td className="px-6 sm:py-3 py-2 whitespace-nowrap text-sm text-gray-500">
                    <input type='checkbox' disabled={currentUser.uid != user } checked={isComplete} onChange={() => handleCheckBox()}/>
                </td>
                <td className={(children? 'hidden ':'')+'px-6 sm:py-3 py-2 whitespace-nowrap'} onClick={()=> handleRowClick(id)}>
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