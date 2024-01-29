import React from 'react'
import Card from './Card'
const CardList = (props) => {
  let cards = props.cards
  
  return (
    <div className='grid grid-cols-2 gap-2 md:grid-cols-4' >
        {cards.map((card)=>(
            <Card key={card.id} id={card.id} name={card.name} quantity={card.quantity} price={card.price} />
        ))}
        
    </div>
  )
}

export default CardList
