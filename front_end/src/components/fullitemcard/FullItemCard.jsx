import React from 'react'
import './fullitemcard.css'
import AppButton from '../appbutton/AppButton'
import BigCheckBox from '../bigcheckbox/BigCheckBox'
const FullItemCard = ({itemTitle, category, price, description}) => {
  return (
    <article className='fullitemcard__main-article'>
        <div className='fullitemcard__img'>
            <img src="src/assets/iphone.png" alt="" />
            <img src="src/assets/iphone.png" alt="" />
            <img src="src/assets/iphone.png" alt="" />
            <img src="src/assets/iphone.png" alt="" />
        </div>
        <div className='fullitemcard__second-column flex-group-column gap-1'>
            <div className='fullitemcard__main-text'>
                <h5 className='cap f-large fw-bold'>{itemTitle}</h5>
                <p className='cap'>{category}</p>
                <p className='upper fw-bold m-t-1'>sar {price}</p>
            </div>
            <div className='flex-group align-items-center justify-content-center gap-1 fullitemcard__small-img'>
                <img src="src/assets/iphone.png" alt="" />
                <img src="src/assets/iphone.png" alt="" />
            </div>
            <span className='fullitemcard__sub-text'>
                <span className='flex-group-between'>
                    <p className='cap'>select size</p>
                    <p className='cap text-muted'>size guide</p>
                </span>
                <span className='flex-group gap-1 upper'>
                    <p>eu</p>
                    <span>|</span>
                    <p>uk</p>
                    <span>|</span>
                    <p>us</p>
                </span>
            </span>
            <BigCheckBox items={[12, 45, 45, 32, 54]}/>
            <AppButton name={'add to bag'} className={'fullitemcard__button'}/>
            <p>{description}</p>
        </div>
    </article>
  )
}

export default FullItemCard