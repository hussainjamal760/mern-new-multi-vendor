import React from 'react'
import DashboardHeader from '../components/DashboardHeader'
import DashboardSideBar from '../components/DashboardSideBar'

const ShopDashboardPage = () => {
  return (
        <>
            <DashboardHeader/>
           <div className="flex items-center justify-between w-full">
            <div className="w-[260px] 800px:w-[330px]">
                <DashboardSideBar active={1} />
            </div>
      </div>
        </>
    )
}

export default ShopDashboardPage