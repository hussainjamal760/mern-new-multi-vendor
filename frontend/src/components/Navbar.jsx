import React from 'react'
import { Link } from 'react-router-dom'
import { navItems } from '../static/data'
import styles from '../styles/styles'

const Navbar = ({ active }) => {
  return (
    <div className={`flex items-center ${styles.noramlFlex}`}>
      {navItems &&
        navItems.map((i, index) => (
          <Link
            key={index}
            to={i.url}
            className={`${
              active === index + 1
                ? "text-[#17dd1f]"
                : "text-white 800px:text-[#fff]"
            } font-[500] px-6 cursor-pointer`}
          >
            {i.title}
          </Link>
        ))}
    </div>
  )
}

export default Navbar
