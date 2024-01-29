import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LuMenu } from "react-icons/lu";


const Navbar = () => {
    const [toggle, setToggle] = useState(false);

    const handleToggleChange = () => {
        setToggle(!toggle);
    };
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        setTimeout(()=>{
            window.location.href = '/login'
        },300)
    };

    return (
        <>
            <nav className='bg-black text-white p-4'>
                <div className="container mx-auto flex justify-between items-center">
                    <div className='text-3xl'><img className="w-1/8 md:w-1/6" src="https://media.discordapp.net/attachments/1189585217057476608/1196747000268472330/Untitled-1.png?ex=65b8c07f&is=65a64b7f&hm=4dd9bc35fa05ae636d49e3b300ab0d6dea40e2f576ad1d50dbcddf9b62d3dd1e&=&format=webp&quality=lossless" alt="" /></div>
                    <ul className='flex ml-4 space-x-14 text-xl '>
                        <li><Link className='hover:bg-amber-500 text-white rounded hidden text-amber-500 md:block ' to='/'>หน้าแรก</Link></li>
                        <li><Link className='hover:bg-amber-500 text-white rounded hidden text-amber-500 md:block ' to='/topup'>เติมเงิน</Link></li>
                        <li><Link className='hover:bg-amber-500 text-white rounded hidden text-amber-500 md:block ' to='/shop'>สินค้าทั่วไป</Link></li>
                        <li><Link className='hover:bg-amber-500 text-white rounded hidden text-amber-500 md:block ' to='https://www.facebook.com/rebron.inwrebron.9' target="_blank">ติดต่อเรา</Link></li>
                        {token ? <li onClick={handleLogout}><Link className='hover:bg-amber-500 text-white rounded hidden text-amber-500  md:block' to='/login'>ล็อกเอ้า</Link></li> : null}
                        {token ? null : <li><Link className='hover:bg-amber-500 text-white rounded hidden text-amber-500 md:block ' to='/login'>ล็อกอิน/เข้าสู่ระบบ</Link></li>}
                        <li><a href="#" className='text-white text-4xl rounded block md:hidden' onClick={handleToggleChange}><LuMenu /></a></li>

                    </ul>
                </div>
            </nav>

            {toggle ?
                <ul className='flex-col mx-auto bg- text-white text-xl text-center'>
                    <li><Link className='hover:bg-amber-500 text-white rounded block text-amber-500 md:hidden ' to='/'>หน้าแรก</Link></li>
                    <li><Link className='hover:bg-amber-500 text-white rounded block text-amber-500 md:hidden ' to='/topup'>เติมเงิน</Link></li>
                    <li><Link className='hover:bg-amber-500 text-white rounded block text-amber-500 md:hidden ' to='/shop'>สินค้าทั่วไป</Link></li>
                    <li><Link className='hover:bg-amber-500 text-white rounded block text-amber-500  md:hidden ' to='/'>สั่งซื้อ</Link></li>
                    <li><Link className='hover:bg-amber-500 text-white rounded block text-amber-500 md:hidden ' to='https://www.facebook.com/rebron.inwrebron.9'>ติดต่อเรา</Link></li>
                    {token ? <li onClick={handleLogout}><Link className='hover:bg-amber-500 text-white rounded block text-amber-500  md:hidden' to='/login'>ล็อกเอ้า</Link></li> : null}
                    {token ? null : <li><Link className='hover:bg-amber-500 text-white rounded block text-amber-500 md:hidden ' to='/login'>ล็อกอิน/เข้าสู่ระบบ</Link></li>}

                </ul>
                : null}
        </>
    );
};

export default Navbar;
