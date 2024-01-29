import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const url = import.meta.env.VITE_APP_URL
   
    
    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleLogin = async () => {
        try {
            const response = await axios.post(url + 'login', { username, password })
            Swal.fire({
                title: "เข้าสู่ระบบสำเร็จ",
                icon: "success"
            });

            const { token } = response.data;
            localStorage.setItem("token", token);
            setTimeout(()=>{
                window.location.href = '/'
            },300)

            console.log(response.data)
        } catch (err) {
            Swal.fire({
                title: "เข้าสู่ระบบไม่สำเร็จ โปรดลองใหม่อีกครั้ง",
                icon: "error"
            });
            console.log(err)
        }
    }
    return (
        <div className="container mx-auto">
            <div className='flex flex-col text-white mx-5  md:grid grid-cols-2 gap-4'>
                <div className="w-full"><img className='rounded-xl  md:w-7/8  ' src="https://cdn-cf-east.streamable.com/image/06rxr5.jpg?Expires=1705790580&Signature=TCaMQpOST2MZ0Wjvd8ULAtSCCjf5ts9Sp-Vt~9cmwqlQZ1GpwGdXXMCUnj3BRLJH8zkR9tL9Lzk4V4Lm9TkGo9gOoRKR6DWVXJFW8DnVrnov2reieG5dYtB61Gg1jei1elYCoY9jdwSN3Utcj7fgI5XA7ChPYJsbg7jl67WpN09mRcOuQ8id0h~sLrerU6OAUknADQvPQRBeQVdOu406j1l8d6WIq69Q6pW~2~6cqR3I8xaZGHH6Iuyy6BoGQxg2KP7vPXYvys46U0vSPY5SHWmVs4Wh-cSzkTcTQGEgDD4pbonJOhdpU1gFLnpPJRQFu2V2HKTwRhy~OYRws3HjXQ__&Key-Pair-Id=APKAIEYUVEN4EVB2OKEQ" alt="" /></div>

                <div className="flex flex-col justify-center  border  rounded-md p-5 md:w-full">
                    <p className='text-3xl'>Theprachaball Rangers</p>
                    <p className='text-amber-500 text-2xl'>เข้าสู่ระบบ</p>

                    <p className='text-xl'>Username</p>
                    <input onChange={handleUsernameChange} className='rounded-xl bg-gray-500 h-10' type="text" />
                    <p className='text-xl'>Password</p>
                    <input type="password" onChange={handlePasswordChange} className='rounded-xl bg-gray-500 h-10' />
                    <button onClick={handleLogin} className='bg-amber-500 rounded-xl h-10 text-xl mt-5'>เข้าสู่ระบบ</button>
                    <Link to='/register'><span className='text-xl my-3 underline'>ยังไม่มีบัญชี สมัครสมาชิกเลย!!</span></Link>
                </div>

            </div>
        </div>

    )
}

export default Login
