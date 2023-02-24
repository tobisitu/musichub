import {auth, db, storage} from 'utils/firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useRouter} from 'next/router';
import {useEffect, useState, useRef} from 'react';
import CurrencyInput from 'react-currency-input-field';
import { addDoc, collection, doc, serverTimestamp, updateDoc, writeBatch } from 'firebase/firestore';
import {toast} from 'react-toastify';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import jsonData from '../roster.json';
import { async } from '@firebase/util';

export default function addArtist() {

    // Form states

    const [image, setImage] = useState('');
    // console.log('image', image)
    
    const uploadImage =  () => {
        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
            const percent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            },
            (err) => console.log(err),
            async () => {
                // console.log('image????!', image, '...artist.photoURL', artist.photoURL)

                // Previous Image Exists
                if(artist.photoURL != ''){
                    // No replacement image 
                    if (image == null || !image) {
                        console.log('image == null... artist => ', artist)
                        const docRef = doc(db, 'artists', artist.id);
                        const updatedArtist = {...artist, timestamp: serverTimestamp()};
                        updateDoc(docRef, updatedArtist);
                        
                        setArtist({
                            name:'',
                            photoURL: '',
                            rate: '',
                            streams: ''
                        });
                        toast.success('Artist has been successfully updated 😉', {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 1500,
                        });
                        return route.push('/');
                    } 
                    else {
                        // New Replacement Image being uploaded 
                        // download url
                        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                            artist.photoURL = url;
                            console.log('image != null...artist => ', artist)
                            const docRef = doc(db, 'artists', artist.id);
                            const updatedArtist = {...artist, timestamp: serverTimestamp()};
                            updateDoc(docRef, updatedArtist);
                            
                            setArtist({
                                name:'',
                                photoURL: '',
                                rate: '',
                                streams: ''
                            });
                            toast.success('Artist has been successfully updated 😉', {
                                position: toast.POSITION.TOP_CENTER,
                                autoClose: 1500,
                            });
                            return route.push('/');
                        });     

                    }
                    

                } else{
                    // No Previous Image
                    if(image == null || !image) {
                        // No custom iimage? Assigned default anonymous img
                        artist.photoURL = 'https://firebasestorage.googleapis.com/v0/b/musichub-c78a0.appspot.com/o/images%2Fanonymous-avatar-icon-25.jpg?alt=media&token=4d4e1526-96de-400c-92b5-3653827b3897';

                        const collectionRef = collection(db, 'artists');
                        addDoc(collectionRef, {
                            ...artist,
                            timestamp: serverTimestamp(),
                            user: user.uid,
                            avatar: user.photoURL,
                            userName: user.displayName,
                        })
                        
                        setArtist({
                            name:'',
                            photoURL: '',
                            rate: '',
                            streams: ''
                        });
                        toast.success('Artist has been successfully added 😉', {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 1500,
                        });
                        return route.push('/');
                    
                        
                    } else{
                        // New Customized Image being uploaded to brand new artist profile
                        // download url
                        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        artist.photoURL = url;
                            const collectionRef = collection(db, 'artists');
                            addDoc(collectionRef, {
                                ...artist,
                                timestamp: serverTimestamp(),
                                user: user.uid,
                                avatar: user.photoURL,
                                userName: user.displayName,
                            })
                            
                            setArtist({
                                name:'',
                                photoURL: '',
                                rate: '',
                                streams: ''
                            });
                            toast.success('Artist has been successfully added 😉', {
                                position: toast.POSITION.TOP_CENTER,
                                autoClose: 1500,
                            });
                            return route.push('/');
                        });     
                    }
                    
                }
            }
        );
    }

    const [artist, setArtist] = useState(
        { 
            name:'',
            photoURL: '',
            rate: '',
            streams: ''
        })

        const [user, loading] = useAuthState(auth);
        const route =  useRouter();
        const routeArtist = route.query;

        // Submit Artist
        const submitArtist = async (e) => {
            e.preventDefault();
            
             
            if (!artist.name ){
                toast.error(`Name field is required 🥺`), {
                    position: toast.POSITION.TOP_CENTER,
                    autoclose: 1500,
                }
            }
            
            if (!artist.rate ){
                toast.error(`Rate field is required 🥺`), {
                    position: toast.POSITION.TOP_CENTER,
                    autoclose: 1500,
                }
            }

            if (!artist.streams  ){
                toast.error(`Streams field is required 🥺`), {
                    position: toast.POSITION.TOP_CENTER,
                    autoclose: 1500,
                }
            }

            if (!artist.name || !artist.rate || !artist.streams  ){
                
                return;
            }
            
            uploadImage();
        }

        
    
        // UPLOAD NEW ARTISTS - initial JSON
        
        const data  = jsonData.data;
         const insertJson = () => {
            console.log('in insertJson()...')
            // console.log('data', data)
            try {
                // const batch = db.batch();
                data.forEach(element => {
                    // console.log('element', element);
                    const collectionRef2 = collection(db, 'artists');
                    artist.name = element.artist,
                    artist.photoURL = 'https://firebasestorage.googleapis.com/v0/b/musichub-c78a0.appspot.com/o/images%2Fanonymous-avatar-icon-25.jpg?alt=media&token=4d4e1526-96de-400c-92b5-3653827b3897',
                    artist.rate = element.rate,
                    artist.streams = element.streams

                    addDoc(collectionRef2, {
                        ...artist,
                        timestamp: serverTimestamp(),
                        user: user.uid,
                        avatar: user.photoURL,
                        userName: user.displayName,
                    })
                });
              } catch (err) {
                console.log('Error : ' + err);
              }
        }
        const [num, setNum] = useState(0);

        useEffect(() => {
            //  only runs once
            console.log('useEffect ran');
            // insertJson(); 
        }, []); //  empty dependencies array


        // Check user 
        const checkUser = async() => {
            if (loading) return;
            if (!user) route.push('auth/login');
            if (routeArtist.id) {
                console.log('routeArtist', routeArtist)
                setArtist({
                    name: routeArtist.name,
                    photoURL: routeArtist.photoURL,
                    rate: routeArtist.rate,
                    streams: routeArtist.streams,
                    id: routeArtist.id
                })
            }
        }

        const cancel = async() => {
            route.push('/')
        }

        useEffect(() => {
            checkUser();
        }, [user, loading]);

    return(
        <div className='my-20 p-12  rounded-lg max-w-md  mx-auto'>
            <form onSubmit={submitArtist}>
                <h1 className="text-2xl text-center font-bold">
                    {artist.hasOwnProperty('id') ? "Edit your Artist" : "Add a new Artist"}
                </h1>
                <div className='py-2 flex flex-col item-center gap-4'> 
                    <label className="text-md font-medium py-2">
                        Name:
                        <input type="text" name="name" 
                        value={artist.name}
                        onChange= {(e) => setArtist({...artist, name: e.target.value })}
                        className="p-2 text-md border border-blue-lighter rounded-lg w-full" />
                    </label>
                     <label>
                        Photo:
                        <input type="file" name="artistPhotoURL"
                        onChange= {(e) => {setImage(e.target.files[0])}}
                        className="p-2 text-md border border-blue-lighter rounded-lg w-full" />
                    </label>
                    <label>
                        Payment Rate ($ per stream):
                        <input type="number" name="rate" placeholder={0.25}
                        value={artist.rate}
                        onChange= {(e) => setArtist({...artist, rate: e.target.value })}
                        className="p-2 text-md border border-blue-lighter rounded-lg w-full" />
                    </label>
                    <label>
                        Number of Streams:
                        <input type="number" name="streams"
                        value={artist.streams}
                        onChange= {(e) => setArtist({...artist, streams: e.target.value })}
                        className="p-2 text-md border border-blue-lighter rounded-lg w-full" />
                    </label>
                </div>
                <button type='submit' className= "w-full mt-5 p-2 my-2 rounded-md text-md font-semibold  bg-teal-500 text-white hover:bg-teal-700 ">Submit</button>

                <button type='button' onClick={() => cancel()} className= "w-full mt-1 p-2 my-2 rounded-md text-md font-semibold  bg-red-500 text-white hover:bg-red-700 ">Cancel</button>
            </form>
        </div>
    )
}