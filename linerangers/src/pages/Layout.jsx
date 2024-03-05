import React from 'react'
import CardList from '../components/CardList';
import BoxList from '../components/BoxList';
import Footer from '../components/Footer';
import axios from 'axios';
import { useEffect ,useState } from 'react';

const Layout = () => {
    
    const url = import.meta.env.VITE_APP_URL
    const [product, setProduct] = useState([])

    useEffect(() => {
       fetchProduct()
    }, [])


    const fetchProduct = async ()=>{
        try {
            const response = await axios.get(url + 'product')
            setProduct(response.data)
        } catch (err) {
            console.log(err)
        }

    }
    const sampleBoxs = [
        { title: 'จำนวนผู้ใช้ทั้งหมดของเรา', quantity: '2536 คน' },
        { title: 'ขายสินค้าไปแล้วกว่า', quantity: '50 รายการ' },
        { title: 'สินค้าพร้อมจำหน่าย', quantity: '201 รายการ' }
    ]

    return (
        <div className='container w-11/12 mx-auto '>
            <p className='text-white text-2xl'>โปรโมชั่นและข่าวสาร</p>
            <p className='text-amber-500 text-xl'>โปรโมชั่นและข่าวสาร</p>

            <div className="flex flex-col items-center mb-5 gap-2 md:flex-row justify-between" >
                <img className="hover:border border-amber-500 rounded md:w-1/2" src="https://media.discordapp.net/attachments/1189585217057476608/1196743644963676220/Untitled-2.png?ex=65b8bd5f&is=65a6485f&hm=6a3bbc7797862eba33c87d232b925f5f4b1708101d52055d94b57134a5e28d71&=&format=webp&quality=lossless" alt="" />
                <img className="hover:border border-amber-500 rounded md:w-1/2" src="https://media.discordapp.net/attachments/1189585217057476608/1196743644963676220/Untitled-2.png?ex=65b8bd5f&is=65a6485f&hm=6a3bbc7797862eba33c87d232b925f5f4b1708101d52055d94b57134a5e28d71&=&format=webp&quality=lossless" alt="" />
            </div>
            <div className="flex justify-between  my-5">
                <div className='text-white text-2xl'><p className='text-white text-2xl'>หมวดหมู่แนะนำ</p> <p className='text-xl text-amber-500 text-xl'>Category Recommended</p></div>
                <div className='flex  items-center text-white text-2xl '>เลือกดูทั้งหมด</div>
            </div>
            <div className="flex flex-col md:grid grid-rows-2 grid-cols-2 gap-2">
                <img className="hover:border  rounded-xl md:w-400" src="https://media.discordapp.net/attachments/1189585217057476608/1196744895206010950/sato.png?ex=65b8be89&is=65a64989&hm=1c9e57ebaf0d7675e2ce9f2cc062425cbe583bbac88128ecd2b0bed99857ac06&=&format=webp&quality=lossless&width=1440&height=444" alt="" />
                <img className="hover:border  rounded-xl md:w-400" src="https://media.discordapp.net/attachments/1189585217057476608/1197477065226719303/sato1.png?ex=65bb686c&is=65a8f36c&hm=8cee0123f23499688af5e8febead2833a2f806bc97f6681310a965f803f589a3&=&format=webp&quality=lossless&width=1440&height=444" alt="" />
                <img className="hover:border  rounded-xl md:w-400" src="https://media.discordapp.net/attachments/1189585217057476608/1197477056867483668/sato3.png?ex=65bb686a&is=65a8f36a&hm=30cd0a775bda528fb2d9af310787950ae2b92e698c15146608ab0738de8b3821&=&format=webp&quality=lossless&width=1440&height=444" alt="" />
                <img className="hover:border  rounded-xl  md:w-400" src="https://media.discordapp.net/attachments/1189585217057476608/1197477048025882635/sato2.png?ex=65bb6868&is=65a8f368&hm=8de2105722d1ccf7510bd4a2d3e77fc7630069447c9d0ade613c08a572e598ca&=&format=webp&quality=lossless&width=1440&height=444" alt="" />
            </div>

            <div className="flex justify-between  my-5 ">
                <div className='text-white text-2xl'><p className='text-white text-2xl'>สินค้าแนะนำ</p> <p className='text-xl text-amber-500 text-xl'>Product Recommended</p></div>
                <div className='flex  items-center text-white text-2xl '>เลือกดูทั้งหมด</div>
            </div>

            <CardList cards={product} />


            <div className="flex justify-between  my-5">
                <div className='text-white text-2xl'><p className='text-white text-2xl'>เกี่ยวกับเรา</p> <p className='text-xl text-amber-500'>About us</p></div>

            </div>

            <div className="flex flex-col items-center mb-5 gap-2  md:grid grid-cols-2 justify-between " >
                <BoxList boxs={sampleBoxs} />
                <iframe className='w-full h-full'
                    src="https://www.youtube.com/embed/tgbNymZ7vqY">
                </iframe>
            </div>
        </div>

    )
}

export default Layout
