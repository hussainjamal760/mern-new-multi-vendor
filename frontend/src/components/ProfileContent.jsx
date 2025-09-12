import React, { useState } from 'react'
import { backend_url } from '../server'
import { useSelector } from 'react-redux'
import { AiOutlineCamera } from "react-icons/ai"

const ProfileContent = ({ active, setActive }) => {
  const { user } = useSelector((state) => state.user)


  const [fullname, setFullname] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [zipcode, setZipcode] = useState("")
  const [phone, setPhone] = useState("")
  const [address1, setAddress1] = useState("")
  const [address2, setAddress2] = useState("")


  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <div className="w-full">
        {active === 1 && (
          <div className="flex flex-col items-center w-full gap-6">
            
            <div className="relative">
              <img
                src={
                  user?.avatar?.url
                    ? `${backend_url}${user.avatar.url}`
                    : "avatar"
                }
                alt="profile"
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-gray-500"
              />

              <div className="w-[35px] h-[35px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <AiOutlineCamera size={20} />
              </div>
            </div>

            <form 
              className="w-full max-w-2xl flex flex-col gap-4"
              onSubmit={handleSubmit}
            >
              {/* Row 1: Fullname + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  name="fullname" 
                  placeholder="Full Name"
                  value={fullname}
                  onChange={(e)=>setFullname(e.target.value)}
                  className="border border-gray-400 p-2 rounded w-full"
                />
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  className="border border-gray-400  p-2 rounded w-full"
                />
              </div>

              {/* Row 2: Phone + Zipcode */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  name="phone" 
                  placeholder="Phone Number"
                  value={phone}
                 onChange={(e)=>setPhone(e.target.value)}
                  className="border border-gray-400  p-2 rounded w-full"
                />
                <input 
                  type="text" 
                  name="zipcode" 
                  placeholder="Zip Code"
                  value={zipcode}
                  onChange={(e)=>setZipcode(e.target.value)}
                  className="border border-gray-400  p-2 rounded w-full"
                />
              </div>

              {/* Row 3: Address1 */}
              <input 
                type="text" 
                name="address1" 
                placeholder="Address Line 1"
                value={address1}
                onChange={(e)=>setAddress1(e.target.value)}
                className="border border-gray-400  p-2 rounded w-full"
              />

              {/* Row 4: Address2 */}
              <input 
                type="text" 
                name="address2" 
                placeholder="Address Line 2"
                value={address2}
                onChange={(e)=>setAddress2(e.target.value)}
                className="border border-gray-400  p-2 rounded w-full"
              />

              {/* Submit Button */}
              <button 
                type="submit"
                className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition w-full"
              >
                Update
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  )
}

export default ProfileContent
