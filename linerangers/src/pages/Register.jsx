import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const Register = () => {
    const [username,setUsername] =useState('')
    const [password,setPassword] =useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [pin,setPin] = useState('')
    const url = import.meta.env.VITE_APP_URL

    const handleUsernameChange =(event)=>{
        setUsername(event.target.value)
    }

    const handlePasswordChange =(event)=>{
        setPassword(event.target.value)
    }

    const handleConfirmPasswordChange =(event)=>{
        setConfirmPassword(event.target.value)
    }

    const handlePinChange =(event)=>{
        setPin(event.target.value)
    }

    const handleRegister= async()=>{

        if(password === confirmPassword){
            try{
                const response =  await axios.post(url+'register',{username,password,pin})
                Swal.fire({
                    title: "สมัครสมาชิกสำเร็จ",
                    icon: "success"      
                })
                console.log(response.data)
            }catch(err){
                Swal.fire({
                    title: "สมัครสมาชิกไม่สำเร็จ",
                    icon: "error"      
                })
            }
        }else{
            Swal.fire({
                title: "สมัครสมาชิกไม่สำเร็จ",
                icon: "error"      
            })
        }
       
    }
    return (
        <div className="container mx-auto">
            <div className='flex flex-col text-white mx-5  md:grid grid-cols-2 gap-4'>
                <div className="w-full"><img className='rounded-xl  md:w-7/8  ' src="https://cdn-cf-east.streamable.com/image/06rxr5.jpg?Expires=1705790580&Signature=TCaMQpOST2MZ0Wjvd8ULAtSCCjf5ts9Sp-Vt~9cmwqlQZ1GpwGdXXMCUnj3BRLJH8zkR9tL9Lzk4V4Lm9TkGo9gOoRKR6DWVXJFW8DnVrnov2reieG5dYtB61Gg1jei1elYCoY9jdwSN3Utcj7fgI5XA7ChPYJsbg7jl67WpN09mRcOuQ8id0h~sLrerU6OAUknADQvPQRBeQVdOu406j1l8d6WIq69Q6pW~2~6cqR3I8xaZGHH6Iuyy6BoGQxg2KP7vPXYvys46U0vSPY5SHWmVs4Wh-cSzkTcTQGEgDD4pbonJOhdpU1gFLnpPJRQFu2V2HKTwRhy~OYRws3HjXQ__&Key-Pair-Id=APKAIEYUVEN4EVB2OKEQ" alt="" /></div>

                <div className="flex flex-col justify-center  border  rounded-md p-5 md:w-full">
                    <p className='text-3xl'>Theprachaball Rangers</p>
                    <p className='text-amber-500 text-2xl'>สมัครสมาชิก</p>

                    <p className='text-xl'>Username</p>
                    <input onChange = {handleUsernameChange}className='rounded-xl bg-gray-500 h-10' type="text" />
                    <div className='grid grid-cols-2 gap-2'>
                        <p className='text-xl'>Password</p>
                        <p className='text-xl'>Confirm Password</p>
                        <input onChange = {handlePasswordChange}type="password" className='rounded-xl bg-gray-500 h-10 w-full' />
                        <input onChange = {handleConfirmPasswordChange}type="password" className='rounded-xl bg-gray-500 h-10 w-full' />


                    </div>
                    <p className='text-xl'>Pin (6 letters)</p>
                    <input onChange = {handlePinChange} type="password" className='rounded-xl bg-gray-500 h-10' />
                    <button onClick = {handleRegister} className='bg-amber-500 rounded-xl h-10 text-xl mt-5'>สมัครสมาชิก</button>
                    <Link to='/login'><span className='text-xl my-3 underline'>มีบัญชีแล้ว เข้าสู่ระบบเลย!!</span></Link>
                </div>

            </div>
        </div>
    )
}

export default Register
