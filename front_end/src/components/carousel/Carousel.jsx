import React from 'react'
import './carousel.css'
import ItemCard from '../itemcard/ItemCard'
import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons'

const scroll = (dir, childrenCount) =>{
    const carousel = document.getElementsByClassName('carousel__items')[0]
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
const Carousel = () => {
  return (
    <section className='carousel__wrapper'>
        <div className='carousel__title-control'>
            <h3>carousel title</h3>
            <span className='carousel__control'>
                <button className='carousel__control-button'
                        onClick={() => {scroll('left', 3)}}><ArrowLeft size={20}/></button>
                <button className='carousel__control-button'
                        onClick={() => {scroll('right', 3)}}><ArrowRight size={20}/></button>
            </span>
        </div>
        <article className='carousel__items x-snap'>
            <ItemCard/>
            <ItemCard/>
            <ItemCard/>
            <ItemCard/>
            <ItemCard/>
        </article>
    </section>
  )
}

export default Carousel