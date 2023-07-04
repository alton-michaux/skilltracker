import React from "react"
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const { user_id } = useParams();

  return(
    <div className="text-center">User Profile</div>
  )
}

export default UserProfile
