import React from 'react'
import DashboardHeader from '../components/DashboardHeader';
import DashboardSideBar from '../components/DashboardSideBar';
import AllCoupons from '../components/AllCoupons';

const ShopAllEvents = () => {
 return (
     <>
       <DashboardHeader />
       <div className="flex min-h-screen bg-gray-100">
         {/* Sidebar */}
         <div className="w-[260px] 800px:w-[330px] bg-white shadow-md">
           <DashboardSideBar active={9} />
         </div>
 
         {/* Main Content */}
         <div className="flex-1 p-6 flex justify-center items-start">
           <AllCoupons />
         </div>
       </div>
     </>
   );
}

export default ShopAllEvents