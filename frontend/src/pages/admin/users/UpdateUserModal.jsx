import React, { useState } from 'react'
import { useUpdateUserRoleMutation } from '../../../redux/features/auth/authApi'

const UpdateUserModal = ({user,onClose,onRoleUpdate}) => {
    const [role,setRole] = useState(user?.role)
    const [updateUserRole]= useUpdateUserRoleMutation()
    const handleUpdateRole=async ()=> {
        try {
            await updateUserRole({userId:user?._id,role}).unwrap()
            alert("Role Updated Successfully!");
            onRoleUpdate();
            onClose();
        } catch (error) {
            console.log("Failed to Update user role!!");
            
        }
    }
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-5'>
        <div className="bg-white p-4 rounded shadow-lg w-1/3">
          <h2 className="text-xl-mb-4">Edit User</h2>
          <div className="mb-4 space-y-4">
            <label className='block text-sm font-medium text-gray-700'>Email</label>
            <input type="text" value={user?.email} readOnly className=' w-full mt-1 bg-bgPrimary block shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-5 focus:outline-none' />
          </div>
          <div className="mb-4 space-y-4">
            <label className='block text-sm font-medium text-gray-700'>Role</label>
            <select className='w-full mt-1 bg-bgPrimary block shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-5 focus:outline-none' value={role} onChange={(e)=>setRole(e.target.value)}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
          </div>
          <div className='flex justify-end pt-5'>
            <button onClick={onClose} className='bg-gray-600 text-white px-4 rounded py-2 mr-2'>Cancel</button>
            <button onClick={handleUpdateRole} className='bg-indigo-600 text-white px-4 rounded py-2 mr-2'>Save</button>
          </div>
        </div>
    </div>
  )
}

export default UpdateUserModal