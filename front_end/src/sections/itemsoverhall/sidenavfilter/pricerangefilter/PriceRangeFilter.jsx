import React, { useState } from 'react'
import './pricerangefilter.css'
const PriceRangeFilter = ({minPrice, maxPrice, setPrice}) => {
  const [minPriceFilter, setMinPriceFilter] = useState(minPrice)
  const [maxPriceFilter, setMaxPriceFilter] = useState(maxPrice)

  const togglePrice = (e) => {
    const inputValue = parseFloat(e.target.value);

    if (e.target.name === 'price-range-min') {
      if (inputValue >= maxPriceFilter) {
        setMinPriceFilter(maxPriceFilter);
      } else {
        setMinPriceFilter(inputValue);
      }
    } else if (e.target.name === 'price-range-max') {
      if (minPriceFilter <= inputValue) {
        setMaxPriceFilter(inputValue);
      } else {
        setMaxPriceFilter(minPriceFilter);
      }
    }
  };
  return (
    <div>
    <span className='pricerangefilter__input-span'>
        <input className='pricerangefilter__input-span-1' type="range" name='price-range-min' min={minPrice} max={maxPrice - 1}  value={minPriceFilter} onChange={(e) => togglePrice(e)} onMouseUp={() => setPrice({minPrice:minPriceFilter, maxPrice:maxPriceFilter})}/>
        <input className='pricerangefilter__input-span-2' type="range" name='price-range-max' min={minPrice + 1} max={maxPrice}  value={maxPriceFilter} onChange={(e) => togglePrice(e)} onMouseUp={() => setPrice({minPrice:minPriceFilter, maxPrice:maxPriceFilter})}/>
    </span>
    <span className='flex-group-between'>
        <p>{minPriceFilter}</p>
        <p>{maxPriceFilter}</p>
    </span>
    </div>
  )
}

export default PriceRangeFilter


/*const fill = (from, sliderColor='#C6C6C6', rangeColor='#25daa5', controlSlider) => {
    const rangeDistance = to.max-to.min;
    const fromPosition = from.value - to.min;
    const toPosition = to.value - to.min;
    controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${(fromPosition)/(rangeDistance)*100}%,
      ${rangeColor} ${((fromPosition)/(rangeDistance))*100}%,
      ${rangeColor} ${(toPosition)/(rangeDistance)*100}%,
      ${sliderColor} ${(toPosition)/(rangeDistance)*100}%,
      ${sliderColor} 100%)`;
}*/