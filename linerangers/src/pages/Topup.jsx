import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
import copy from 'clipboard-copy';

const Topup = () => {
    const [file, setFile] = useState(null);
    const [balance, setBalance] = useState(0)
    const [username, setUsername] = useState(null)
    const [transRef, setTransref] = useState(null)
    const [accountNumber, setAccountNumber] = useState(null)
    const [name, setName] = useState(null)
    const [bank, setBank] = useState(null)

    const url = import.meta.env.VITE_APP_URL
    const token = localStorage.getItem('token')
    const decoded = jwtDecode(token)

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    useEffect(() => {
        setUsername(decoded.username)
    }, [])
    const handleCopyClick = () => {
        const valueToCopy = "1460232208";
        copy(valueToCopy);
    };


    const setNewBalance = async () => {
        try {
            const response = await axios.put(url + `topup/${username}`, { balance });
            console.log(response.data);
        } catch (err) {
            console.error(err);
        }
    };
    const handleUpload = async () => {
        if (!file) {
            console.error('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(import.meta.env.VITE_SLIP_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${import.meta.env.VITE_SLIP_AUTHORIZATION}`,
                },
                body: formData,
            });
            if (response.status === 200) {
                const responseData = await response.json();
                setBalance(responseData.data.amount.amount)
                setTransref(responseData.data.transRef)
                setAccountNumber(responseData.data.receiver.account.bank.account)
                setBank(responseData.data.receiver.bank.short)
                setName(responseData.data.receiver.account.name.th)
                try {
                    if (name === 'นายณัชภัค จ' && accountNumber === '14xxxx2208' && bank === 'KTB') {
                        const responseBalance = await axios.put(url + `topup/${username}`, { balance, transRef });
                        console.log(responseBalance.data);
                        Swal.fire({
                            title: "เติมเงินเรียบร้อยแล้ว",
                            icon: "success"
                        });
                    } else {
                        Swal.fire({
                            title: "โปรดใส่รูปที่ถูกต้อง",
                            icon: "error"
                        });
                    }

                } catch (err) {
                    console.error('อัพโหลดไฟล์ไม่สำเร็จ', error);
                    Swal.fire({
                        title: "อัพโหลดไฟล์ไม่สำเร็จ",
                        icon: "error"
                    });
                }

            } else {
                console.error('Error uploading file:', response.statusText);
                Swal.fire({
                    title: "อัพโหลดไฟล์ไม่สำเร็จ",
                    icon: "error"
                });
            }
        } catch (error) {
            console.error('อัพโหลดไฟล์ไม่สำเร็จ', error);
            Swal.fire({
                title: "อัพโหลดไฟล์ไม่สำเร็จ",
                icon: "error"
            });
        }
    };

    return (
        <div className='container mx-auto md:w-1/2'>
            <div className='flex flex-col text-white m-5'>
                <p className='text-2xl md:md:text-3xl'>เติมเงิน-Top up</p>
                <div className="flex flex-col items-center  gap-1  md:grid grid-cols-3 gap-4">
                    <div className='border text-xl  w-full text-center md:text-2xl my-2'>เติมเงินอั่งเปา</div>
                    <div className='border border-amber-500 text-xl  w-full text-center md:text-2xl my-2'>ธนาคารเช็คสลิป</div>
                    <div className='border text-xl  w-full text-center md:text-2xl my-2'>Redeem</div>
                </div>
                <img className=' text-center mb-5 mt-5 rounded-xl' src="https://media.discordapp.net/attachments/1189585217057476608/1197955704590438530/1.jpg?ex=65bd2630&is=65aab130&hm=2949d1e5f11840dca4ea2d536ab329b547248c92c9cd3373f0734017ac2f4336&=&format=webp" alt="" />
                <p className='text-left text-xl md:text-2xl'>กรุงไทย(KTB)</p>
                <p className='text-left text-xl md:text-xl'>ชื่อบัญชี : ณัชภัค จริงดี</p>
                <div className='flex'>
                    <input
                        className='rounded-xl text-white bg-gray-500 text-center w-full h-10 text-md md:text-xl'
                        type="text"
                        value="1460232208"
                        readOnly
                    />
                    <button
                        className='rounded-md bg-blue-500 text-white text-center w-1/4 h-10 text-md md:text-xl'
                        onClick={handleCopyClick}
                    >
                        คัดลอกเลขบัญชี
                    </button>
                </div>

                <p className='text-left text-md md:text-xl'>กรอกQR Code</p>
                <input className='rounded-xl  w-full h-10 text-md md:text-xl' type="file" onChange={handleFileChange} />
                {file ? <img className="w-1/2" src={URL.createObjectURL(file)}></img> : null}
                <p className='text-center text-md md:text-xl'>ค่าธรรมเนียม 2.3%</p>
                <button onClick={handleUpload} className='bg-amber-500  hover:border rounded-md  w-full h-10 text-md md:text-xl'>ยืนยันการเติมเงิน</button>


            </div>
        </div>
    )
}

export default Topup
