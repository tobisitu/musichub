import Nav from './Nav';

export default function Layout({children}){
    return(
        <div>
            <div className="bg-orange-700">
                <div className="mx-6 md:max-w-2xl md:mx-auto">
                    <Nav/>
                </div>
            </div>
            <div className="mx-6 md:max-w-2xl md:mx-auto font-quicksand">
                <main>{children}</main>
            </div>
        </div>
        
    )
}