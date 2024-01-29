import React from 'react'
import { Link } from 'react-router-dom';

const Card = (props) => {
  return (
    <div className='flex flex-col  text-white border border-white rounded-md md:p-2' >
      <img className="rounded-xl" src="https://media.discordapp.net/attachments/1189585217057476608/1197806250872799232/1682428591122.jpg?ex=65bc9b00&is=65aa2600&hm=d2850d9a14a51bebf5892159fca3c15583828a603134dcc13590ecb9ffbbb395&=&format=webp&width=676&height=676" alt="" />
      <p className='text-xl'>{props.name}</p>
      <div className="flex justify-between text-xl">
        <p>{props.quantity}</p>
        <p>{props.price} บาท</p>
      </div>
      <Link className='bg-amber-500  text-center hover:border text-xl rounded-md md:p-2' to={`/shop/${props.id}`}>
          สั่งซื้อตอนนี้เลย
      </Link>
    </div>
  )
}

export default Card
