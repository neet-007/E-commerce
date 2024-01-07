import React from 'react'
import './itemcard.css'
const ItemCard = ({variation, mainText, secondoryText, onClick, imgUrl, itemTitle='item title', itemCategory='item category', price='350.0'}) => {
  let bold;
  let BAW;
  let category;
  variation === 'category' ? bold = 'f-large fw-bold' : bold = ''
  variation === 'category-BAW' ? BAW = {filter:'grayscale(100%)'} : ''
  variation === 'category-inline' ? category = 'itemcard__img-inline-category' : variation === 'category-inline-border' ? category = 'itemcard__img-inline-category-border' : ''
  return (
    <article className={`itemcard__main-article cursor-pointer`} onClick={onClick}>
        <picture className='itemcard__img'>
          <img src={imgUrl ? imgUrl:"/src/assets/iphone.png"} alt="item-pic"
              style={BAW}/>
              { (variation === 'category-inline' || variation === 'category-inline-border') &&
                <span className={`${category} fw-bold`}>
                {mainText}
                </span>
              }
        </picture>
        <div className='itemcard__title-category'>
            { (variation !== 'category-inline' && variation !=='category-inline-border') &&
              <p className={`${bold}`}>{itemTitle}</p>
            }
            { variation === 'full' &&
            <p className='text-muted'>{itemCategory}</p>
            }
        </div>
        { variation === 'full' &&
        <span className='itemcard__price'>
            SAR {price}
        </span>
        }
    </article>
  )
}

export default ItemCard