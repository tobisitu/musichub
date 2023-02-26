import Nav from './Nav';

export default function Layout({children}){
    return(
        <div className='bg-gradient-to-t from-orange-300 h-screen w-screen overflow-scroll sm:px-8 px-2'>
            <div className="">
                <div className="sm:mx-6 mx-2 sm:max-w-6xl max-w-2xl  md:mx-auto mb-2">
                    <Nav/>
                </div>
            </div>
            <div>
            <div className="sm:mx-6 mx-2 sm:max-w-6xl max-w-2xl  md:mx-auto font-quicksand ">
                <main>{children}</main>
            </div>
            </div>
        </div>
        
    )
}