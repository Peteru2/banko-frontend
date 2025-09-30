
import Footer from '../component/footer/footer';
import Navbar from '../component/navbar/Navbar';
import Payment from '../component/Payment';
import Loader from '../component/Loader';
import AccDetails from '../component/AccDetails';
import { useAuth } from '../component/AuthContext';
import Cards from '../component/Cards';
const Dashboard = () => {
 const {userData, logout, setUserData} = useAuth()
    return ( 
        <>
          {userData &&(
            <div className='flex justify-center'>
             
              <div>
                <Navbar userData={userData} />
                {userData?(
                  <div className=''>
                <Payment />
                <Cards />
                <AccDetails userData={userData} logout={logout}  />
                </div>
                ):(
                  <Loader />
                )}
                

                <Footer  userData={userData} />
                </div>
            </div>

             )}
        </>
     );
}
 
export default Dashboard;