import React, { useState } from 'react'
import Header from '../components/Header'
import styles from '../styles/styles'
import ProfileSidebar from '../components/ProfileSidebar'
import ProfileContent from '../components/ProfileContent'

const ProfilePage = () => {
  const [active, setActive] = useState(1)
  return (
    <>
      <Header/>
      <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
        <div className="w-[50px] md:w-[335px]">
          <ProfileSidebar active={active} setActive={setActive} />
        </div>
        <ProfileContent active={active} setActive={setActive}/>
      </div>
    </>
  )
}

export default ProfilePage