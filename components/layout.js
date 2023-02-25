import Nav from './Nav';

export default function Layout({children}){
    return(
        <div className='bg-gradient-to-t from-orange-300 h-screen w-screen overflow-scroll px-8 '>
            <div className="">
                <div className="mx-6 sm:max-w-6xl max-w-2xl  md:mx-auto mb-8">
                    <Nav/>
                </div>
            </div>
            <div>
            <div className="mx-6 sm:max-w-6xl max-w-2xl  md:mx-auto font-quicksand ">
                <main>{children}</main>
            </div>
            </div>
        </div>
        
    )
}