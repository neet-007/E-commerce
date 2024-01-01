import React from 'react'
import './carousel.css'
import ItemCard from '../itemcard/ItemCard'
import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons'

const scroll = (dir, childrenCount, id) =>{
    const carousel = document.getElementById(`carousel__items${id}`)
    if (dir === 'right'){
        carousel.scrollBy({
            left:window.innerWidth/childrenCount ,
            behavior:'smooth'
        })
    }else if (dir === 'left'){
        carousel.scrollBy({
            left: - window.innerWidth/childrenCount ,
            behavior:'smooth'
        })
    }
}
const Carousel = ({itemVartion, id}) => {
  return (
    <section className='carousel__wrapper'>
        <div className='carousel__title-control'>
            <h3>carousel title</h3>
            <span className='carousel__control'>
                <button className='carousel__control-button'
                        onClick={() => {scroll('left', 3, id)}}><ArrowLeft size={20}/></button>
                <button className='carousel__control-button'
                        onClick={() => {scroll('right', 3, id)}}><ArrowRight size={20}/></button>
            </span>
        </div>
        <article className='carousel__items x-snap'
                 id={`carousel__items${id}`}>
            <ItemCard variation={itemVartion} mainText={'dsad'}/>
            <ItemCard variation={itemVartion} mainText={'dsad'}/>
            <ItemCard variation={itemVartion} mainText={'dsad'}/>
            <ItemCard variation={itemVartion} mainText={'dsad'}/>
            <ItemCard variation={itemVartion} mainText={'dsad'}/>
        </article>
    </section>
  )
}

export default Carousel