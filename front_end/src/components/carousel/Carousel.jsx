import React from 'react'
import './carousel.css'
import ItemCard from '../itemcard/ItemCard'
import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons'
import { images } from '../../constants'
import { useNavigate } from 'react-router-dom'

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
const mouseScroll = (e, id) => {
    let mousedown = false
    const carousel = document.getElementById(`carousel__items${id}`)
    carousel.addEventListener('mousedown', () => mousedown = true)
    if(mousedown) console.log(console.log(e.clientX))
}
const Carousel = ({itemVartion, id, data}) => {
  const navigate = useNavigate()
  return (
    <section className='carousel__wrapper'>
        <div className='carousel__title-control'>
            <h3 className='f-large fw-bold'>carousel title</h3>
            {itemVartion !== 'category' && <span className='carousel__control'>
                <button className='carousel__control-button'
                        onClick={() => {scroll('left', 3, id)}}><ArrowLeft size={20}/></button>
                <button className='carousel__control-button'
                        onClick={() => {scroll('right', 3, id)}}><ArrowRight size={20}/></button>
            </span>
            }
        </div>
        <article className='carousel__items x-snap'
                 id={`carousel__items${id}`}>
            {data ?
            data.map((item, i) => {
                return <ItemCard key={item.id} variation={itemVartion} itemTitle={item.name} itemCategory={item.category.name} price={item.price}
                                 mainText={item.name} secondoryText={item.description} imgUrl={images[i]} onClick={() => navigate(`/item/${item.id}`)}/>
            })
            : ''}
        </article>
    </section>
  )
}

export default Carousel