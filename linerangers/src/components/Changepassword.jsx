import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
const Changepassword = ({username}) => {
    const [newPassword, setNewPassword]  = useState(null)
    const [newReCheckPassword, setNewReCheckPassword]  = useState(null)
    

    useEffect(()=>{
    },[])
    const handleNewPasswordChange =(event)=>{
        setNewPassword(event.target.value)
    }
    const handleNewReCheckPasswordChange =(event)=>{
        setNewReCheckPassword(event.target.value)
    }
    
    const handleChangePassword = async()=>{
        try{
            if(newPassword === newReCheckPassword){
                const response = await axios.post(import.meta.env.VITE_APP_URL +'change-password',{newPassword,username})
                console.log(response.data)
                Swal.fire({
                    title : "สำเร็จ",
                    text :"เปลี่ยนรหัสผ่านสำเร็จ",
                    icon: "success"

                })
            }else{
                Swal.fire({
                    title : "ไม่สำเร็จ",
                    text :"เปลี่ยนรหัสผ่านไม่สำเร็จ",
                    icon: "error"

                })
            }
           
        }catch(err){
            Swal.fire({
                title : "ไม่สำเร็จ",
                text :"เปลี่ยนรหัสผ่านไม่สำเร็จ",
                icon: "error"

            })
            console.log(err)
        }
    }
   
    return (
        <div>
            <div className="flex flex-col justify-center  rounded-md p-5 md:w-full">
                <p className='text-3xl'>เปลี่ยนรหัสผ่าน</p>
                <p className='text-amber-500 text-xl'>Changepassword</p>
                

                <p   className='text-xl'>รหัสผ่านใหม่</p>
                <input onChange={handleNewPasswordChange} type="password" className='rounded-xl bg-gray-500 h-10' />

                <p className='text-xl'>รหัสผ่านใหม่อีกครั้ง</p>
                <input  onChange={handleNewReCheckPasswordChange}type="password" className='rounded-xl bg-gray-500 h-10' />

                <button  onClick = {handleChangePassword} className='bg-amber-500 rounded-xl h-10 text-xl mt-5'>เปลี่ยนรหัสผ่าน</button>
            </div>

        </div>
    )
}

export default Changepassword
