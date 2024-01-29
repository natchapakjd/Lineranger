import axios from 'axios';
import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';

const Shop = () => {
    const [selectedproductType, setSelectedProductType] = useState('');
    const [type, setType] = useState([])
    const [product, setProduct] = useState([])


    const url = import.meta.env.VITE_APP_URL
    useEffect(() => {
        fetchType()
    },[])

    useEffect(()=>{
        fetchProduct()
    },[selectedproductType])
    
    const fetchProduct = async ()=>{
        try {
            const response = await axios.get(url+`product/${selectedproductType}`)
            setProduct(response.data)
        } catch (err) {
            console.log(err)
        }
    }
    const fetchType = async () => {
        try {
            const response = await axios.get(url + 'product_type')

            setType(response.data)
        } catch (err) {
            console.log(err)
        }
    }
    
    const handleSelectedProductTypeChange = (event) => {
        setSelectedProductType(event.target.value);
    };

    return (
        <div className='container  mx-auto md:w-1/2'>
            <div className='mx-5 mb-5'>
                <div>
                    <label className='text-white text-2xl'>Select Product Type:</label>
                    <br/>
                    <select
                        className='text-xl w-full rounded-xl h-10 md:text-xl bg-gray-500 text-white'
                        value={selectedproductType}
                        onChange={handleSelectedProductTypeChange}
                    >
                        {type.map((t) => (<option key={t.id} className=' text-xl' value={t.name}>{t.name}</option>))}
                        
                    </select>
                    <p className='text-amber-500 text-xl'>รายการสินค้า</p>
                    <img className='mb-5'src="https://media.discordapp.net/attachments/1189585217057476608/1197477065226719303/sato1.png?ex=65bb686c&is=65a8f36c&hm=8cee0123f23499688af5e8febead2833a2f806bc97f6681310a965f803f589a3&=&format=webp&quality=lossless&width=1440&height=444" alt="" />

                
                    <CardList  cards={product}/>
                </div>
                
            </div>

            
        </div>
    );
};

export default Shop;
