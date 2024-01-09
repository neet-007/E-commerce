import React from 'react'
import './summery.css'
import { Truck, ChevronDown } from 'react-bootstrap-icons'
import AppButton from '../../appbutton/AppButton'
import SummeryItems from './summeryitems/SummeryItems'
import { useNavigate } from 'react-router-dom'
import { useMakeOrder } from '../../../querysandmutaions/queriesandmutaions'
import { useOrder } from '../../../hooks/useOrder'
import Loader from '../../loader/Loader'


const toggleSummery = () => {
    const summery = document.getElementById('summery__main-article-1')
    window.getComputedStyle(summery).maxHeight === '0px' ? summery.style.maxHeight = '100%' : summery.style.maxHeight = '0px'
}

const Summery = ({className, checkOut, subtotal, data}) => {
  const navigate = useNavigate()
  //const {mutateAsync:makeOrder , isPending, isError ,error} = useMakeOrder()
  const {userOrderOptions, isPending, isError, error} = useOrder('add')

  const handleClick = () => {
    {
        userOrderOptions()
    }
  }
  const standartDelivery = 100

  if (isPending) return <Loader/>
  if (isError){
    console.log(error)
    return <h1>ERROR</h1>
  }
  return (
    <article className={`summery__main-article ${className}`}>
        <span className='flex-group-between align-items-center'>
            <p className='f-large'>Summery</p>
            <span className='flex-group gap-1 summery__title-span'>
                <p className='upper fw-bold'>
                    sar 750.00
                </p>
                <ChevronDown size={20} onClick={toggleSummery}/>
            </span>
        </span>
        <div className='summery__main-article-1 cap' id='summery__main-article-1'>
            <div className='flex-group-between'>
                <p>subtotal</p>
                <p>SAR {subtotal}</p>
            </div>
            <div className="b-bottom"></div>
            <div className='flex-group-between'>
                <p>standart delivery</p>
                <p>SAR {standartDelivery}</p>
            </div>
            <div className="b-bottom"></div>
            <div className='flex-group-between'>
                <p>total</p>
                <p>SAR {subtotal + standartDelivery}</p>
            </div>
            <div className="b-bottom"></div>
            <SummeryItems data={data}/>
            {!checkOut &&
            <span className='flex-group gap-1'>
                <Truck/>
                <p>
                    Delivery Fee will be calculated at checkout
                </p>
            </span>
            }
            {!checkOut &&
            <AppButton name={'Checkout'} onClick={handleClick}/>
            }
        </div>
    </article>
  )
}

export default Summery