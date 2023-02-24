import Head from 'next/head';
import Artist from '../components/artist';
import React, {useEffect, useState} from 'react';
import {db} from "../utils/firebase"
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

export default function Home() {

  // Create a state with all your artists 
  const [allArtists, setAllArtists] = useState([]);
  const getArtists = async () => {
    const collectionRef = collection(db, 'artists');
    const q = query(collectionRef, orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllArtists(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
    });
    return unsubscribe;
  };

  useEffect(() => {
    getArtists();
  }, []);

  return (
    <>
      <Head>
        <title>musicHUB</title>
        <meta name="description" content="created to help keep track of artists' performance" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='my-20 text-lg font-medium'>
        <h1 className='font-medium text-xl text-center '>Stay Connected</h1>
        <h3 className="text-sm text-center ">See how musicHUB Artists around the world are doing.</h3>

        <div className="flex flex-col my-10">
          <div className="-my-2  sm:-mx-6 lg:-mx-8">
            <div className="py-2  sm:px-6 lg:px-8">
              <div className="shadow  border-b border-gray-200 sm:rounded-lg h-screen max-h-[60vh] overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200 ">
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
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Managed by
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {allArtists?.map(artist => {
                      
                      return (
                        <Artist {...artist} key={artist.id}>
                        </Artist>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
