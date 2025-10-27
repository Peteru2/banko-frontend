 import React from 'react'
 import Navbar from '../component/navbar/Navbar'
 import Footer from '../component/footer/footer'
 
 const Layout = ({children}) => {
   return (
     <div>
        <Navbar/>
        {children}
        <Footer />

     </div>
   )
 }
 
 export default Layout