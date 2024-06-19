import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import EditProfile from './EditProfile'
import UpdatePassword from './UpdatePassword'
import DeleteAccount from './DeleteAccount'

const index = () => {
  return (
   <>
    <h1 className='mb-14 text-3xl font-medium text-richblack-5 '>Edit Profile</h1>

    {/* change profile pircture */}
    <ChangeProfilePicture/>

    {/* profile */}
    <EditProfile/>

    {/* update password */}
    <UpdatePassword/>

    {/* delete account */}
    <DeleteAccount/>
    
   </>
  )
}

export default index