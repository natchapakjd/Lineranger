import React, { useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useState } from 'react'
import Changepassword from '../components/Changepassword'
import TopupHistory from '../components/TopupHistory'
import OrderHistory from '../components/OrderHistory'
import axios from 'axios'
const EditUser = () => {
    const [username,setUsername] = useState(null)
    const [selectedBox,setSetselectedBox] =useState('เปลี่ยนรหัสผ่าน')
    const [totalTopupBalance ,setTotalTopupBalance] =useState(0)
    const [totalBalance ,setTotalBalance] = useState(0)
    const token = localStorage.getItem('token')
    const decoded = jwtDecode(token)



    
    useEffect(()=>{
        setUsername(decoded.username)
        fetchTotalTopupBalance()
        fetchTotalBalance()
    })
    const handleSelectedBox =(title)=>{
        setSetselectedBox(title)
    }

    const fetchTotalBalance = async()=>{
        try{
            const response  =await axios.get(import.meta.env.VITE_APP_URL +`member/${username}`)
            setTotalBalance(response.data[0].balance)
        }catch(err){
            console.log(err)
        }
    }
    const fetchTotalTopupBalance = async()=>{
        try{
            const response = await axios.post(import.meta.env.VITE_APP_URL + `transaction/${username}`)
            setTotalTopupBalance(response.data[0].amount)
        }catch(err){
            console.log(err)
        }
    }
    const boxData = [
        { title: "เปลี่ยนรหัสผ่าน" },
        { title: "ประวัติการเติมเงิน" },
        { title: "ประวัติการซื้อสินค้า" },
        { title: "ประวัติการสั่งซื้อ" },
    ]

    const components = {
        'เปลี่ยนรหัสผ่าน': <Changepassword username={username} />,
        'ประวัติการเติมเงิน': <TopupHistory username={username} />,
        'ประวัติการซื้อสินค้า' : <OrderHistory username = {username}/>
        // Add more components for other box titles if needed
    };

    

    return (
        <div className='container text-white  mx-auto md:w-7/8 text-xl'>
            <div className='flex flex-col m-5  md:grid grid-cols-2 gap-4'>
                <div className='my-1 border rounded-xl'>
                    <div className='flex '>                        
                        <img className='w-1/4 flex' src="https://media.discordapp.net/attachments/1189585217057476608/1196747000268472330/Untitled-1.png?ex=65b8c07f&is=65a64b7f&hm=4dd9bc35fa05ae636d49e3b300ab0d6dea40e2f576ad1d50dbcddf9b62d3dd1e&=&format=webp&quality=lossless" alt="" />
                    </div>
                </div>

                <div className='my-1'>
                    
                    <p className='text-amber-500 md:mt-10'>ชื่อผู้ใช้ : {decoded.username}</p>
                    <p>ยอดเงินคงเหลือ : {totalBalance} ฿</p>
                    <p>ยอดการเติมเงินทั้งหมด : {totalTopupBalance} ฿</p>
                </div>
                <div className='my-1'>
                    {boxData.map((box, index) => (
                        <ul key={index} onClick={() => handleSelectedBox(box.title)} className='border hover:bg-amber-500 w-full p-2 rounded-xl m-1'>
                            <li>{box.title}</li>
                        </ul>
                    ))}
                </div>
                <div className='my-1 border rounded-xl'>
                    
                              {components[selectedBox]}


                </div>
            </div>


        </div>
    )
}

export default EditUser
