import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'
import Swal from 'sweetalert2';
const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [count, setCount] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [username, setUsername] = useState(null)
    const [balance,setBalance] =useState(0)

    const token = localStorage.getItem('token')
    const decoded = jwtDecode(token)
    console.log(count, totalPrice, balance, username)

    useEffect(() => {
        setUsername(decoded.username)
        fetchProductDetails();
    }, []);
    useEffect(() => {
        calculateTotalPrice();
        fetchBalance()
    }, [product, count,balance]);

    const fetchBalance = async ()=>{
        try {
            const response = await axios.get(import.meta.env.VITE_APP_URL + `member/${username}`);
            setBalance(response.data[0].balance);
        } catch (err) {
            console.log(err);
        }
    }
    const fetchProductDetails = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_APP_URL + `shop/${id}`);
            setProduct(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const calculateTotalPrice = () => {
        if (product.length > 0) {
            const initialPrice = product[0].price;
            const calculatedTotalPrice = count * initialPrice;
            setTotalPrice(calculatedTotalPrice);
        }
    };

    const increaseCount = () => {
        setCount(count + 1);
    };

    const decreaseCount = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const handleChangeCount = (event) => {
        const newCount = parseInt(event.target.value, 10);
        if (!isNaN(newCount) && newCount >= 1) {
            setCount(newCount);
        }
    };


    const acceptOrder = async () => {
        try {
            if (count <= product[0].quantity && balance-totalPrice >= 0) {

                try {
                    const response = await axios.post(import.meta.env.VITE_APP_URL + 'order', { totalPrice, username, count, id })
                    Swal.fire({
                        title: "สั่งซื้อสินค้าสำเร็จ",
                        icon: "success"
                    });
                    window.location.href ='/shop'

                } catch (err) {
                    console.log(err)
                }

            } else {
                Swal.fire({
                    title: "สั่งซื้อสินค้าไม่สำเร็จ",
                    text: "กรุณาเช็คยอดเงิน/จำนวนสินค้าคงเหลือ",
                    icon: "error"
                });
            }
        } catch (err) {
            console.log(err)
            Swal.fire({
                title: "สั่งซื้อสินค้าไม่สำเร็จ",
                text: "กรุณาเช็คยอดเงิน/จำนวนสินค้าคงเหลือ",
                icon: "error"
            });
        }
    }

    return (
        <div className='container mx-auto text-white md:w-1/2'>
            <div className='flex flex-col mx-10 items-center gap-4 md:grid grid-cols-2 m-5 md:w-full'>
                <div className='flex justify-center md:w-full'>
                    <img className='w-1/2 rounded-xl hover:border border-amber-500 md:w-full' src="https://th.bing.com/th/id/R.7e19157a365b43333851950eb11b71ab?rik=d8AL09pSmuwpvg&pid=ImgRaw&r=0" alt="" />
                </div>
                <div className='w-2/3'>
                    {product.map((p) => (
                        <div className='my-2' key={p.id}>
                            <p className='text-2xl md:text-4xl'>{p.name}</p>
                            <p className='text-xl md:text-xl'>ไอดียังไม่เชื่อม กรุณาเตรียมเมลให้พร้อมเเล้วรับไอดี ภายใน 24 ชั่วโมง</p>

                            <div className="flex justify-between">
                                <p className='text-xl md:text-xl'>ราคา : {p.price}</p>
                                <p className='text-xl md:text-xl'>เหลือ {p.quantity} ชิ้น</p>
                            </div>

                            <div className='flex justify-between'>
                                <button className='bg-amber-500 hover:border rounded-md w-10 h-10 text-2xl' onClick={increaseCount}>+</button>
                                <input className='text-white-500 text-center rounded-full w-full bg-gray-500 text-2xl mx-2' type="text" value={count} onChange={handleChangeCount} />
                                <button className='bg-amber-500 hover:border rounded-md w-10 h-10 text-2xl' onClick={decreaseCount}>-</button>
                            </div>
                            <p className='text-xl mt-5 md:text-xl'>ราคารวม: {totalPrice} บาท</p>
                            <button onClick={acceptOrder} className='bg-amber-500 hover:border text-xl w-full my-5 h-10 rounded-md ' >
                                สั่งซื้อตอนนี้เลย
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
