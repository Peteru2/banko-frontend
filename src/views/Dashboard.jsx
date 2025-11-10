
import Payment from '../component/Payment';
import AccDetails from '../component/AccDetails';
import { useAuth } from '../auth/AuthContext';
import Cards from '../component/Cards';
import imageLoader from "../assets/image/Logo.png"
import Layout from './Layout';
import { useState, useEffect } from 'react';
import WelcomeModal from '../component/WelcomeModal';

const Dashboard = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  const { userData, loading } = useAuth()

  useEffect(() => {
    const hasSeen = localStorage.getItem("hasSeenWelcome");
    if (!hasSeen) setShowWelcome(true);
  }, []);

  const closeModal = () => {
    localStorage.setItem("hasSeenWelcome", "true");
    setShowWelcome(false);
  };
  if (loading) return (
    <div className="h-screen flex justify-center items-center w-full text-center bg-grayLight dark:bg-darkGray">
      <div className="flex flex-col items-center justify-center">

        <img
          src={imageLoader}
          alt="loading.."
          className="w-[60px] md:w-[80px] border border-private rounded-full mb-3 animate-pulseGrow"
        />
        <h2 className="text-public dark:text-white text-[14px] font-bold font-lora">
          Bank With Ease.
        </h2>
      </div>
    </div>
  )

  return (
    <>

   

      {userData && (


        <Layout >
   <div className="p-4">
      {showWelcome && <WelcomeModal onClose={closeModal} />}
    </div>

          <Payment />
          <Cards />
          <AccDetails />



        </Layout>

      )}

    </>
  );
}

export default Dashboard;