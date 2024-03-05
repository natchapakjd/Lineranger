import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderHistory = ({ username }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchOrder();
    }, []);

    const fetchOrder = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_APP_URL + `order/${username}`);
            setData(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='container p-5'>
            <p className='text-3xl'>ประวัติการซื้อสินค้า</p>
            <p className='text-amber-500 text-xl'>Buy history</p>
            <table className='border-collapse w-full  mx-auto border border-slate-400 my-2' >
                <thead >
                    <tr>
                        <th className='border border-slate-300'>id</th>
                        <th className='border border-slate-300'>ชื่อสินค้า</th>
                        <th className='border border-slate-300'>วันที่ซื้อ</th>
                        <th className='border border-slate-300'>จำนวน</th>
                        <th className='border border-slate-300'>ราคารวม</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, i) => (
                        <tr key={i}>
                            <td className='border border-slate-300'>{i + 1}</td>
                            <td className='border border-slate-300'>{item.name}</td>
                            <td className='border border-slate-300'>{item.date}</td>
                            <td className='border border-slate-300'>{item.quantity}</td>
                            <td className='border border-slate-300'>{item.total_price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default OrderHistory
