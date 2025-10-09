
import Footer from '../component/footer/footer';
import Navbar from '../component/navbar/Navbar';
import Payment from '../component/Payment';
import Loader from '../component/Loader';
import AccDetails from '../component/AccDetails';
import { useAuth } from '../component/AuthContext';
import Cards from '../component/Cards';
import imageLoader from "../assets/image/Logo.png" 


const Dashboard = () => {
 const {userData, logout, loading} = useAuth()
 if (!userData) return (
 <div className="h-screen flex justify-center items-center w-full text-center overlay">
  <div className="flex flex-col items-center justify-center">
   
    <img
      src={imageLoader}
      alt="sideView"
      className="w-[60px] md:w-[80px] rounded-full mb-3 animate-pulseGrow"
    />
    <h2 className="text-white text-[14px] font-bold font-lora">
      Bank With Ease.
    </h2>
  </div>
</div>
)

    return ( 
        <>
        


          {userData &&(
            <div className=''>
             
              <div>
                <Navbar userData={userData} />
                {userData?(
                  <div className=''>
                <Payment />
                <Cards />
                <AccDetails userData={userData} logout={logout}  />
                </div>
                ):(
                  <div className="flex justify-center">
                  <Loader />
                  </div>
                )}
                

                <Footer  userData={userData} />
                </div>
                
            </div>

             )}

        </>
     );
}
 
export default Dashboard;