import React, { memo } from 'react'
import './sidenavfilter.css'
import CheckBoxFilter from './checkboxfilter/CheckBoxFilter'
import BigCheckBox from '../../../components/bigcheckbox/BigCheckBox'
import { X } from 'react-bootstrap-icons'
import AppButton from '../../../components/appbutton/AppButton'
import PriceRangeFilter from './pricerangefilter/PriceRangeFilter'
const SideNavFilter = ({className, data={}, setSearchParams, setSortQuery, setPrice, setFilterQuery}) => {

  const menuClose = () => {
    const menu = document.getElementById('sidenavfilter__main-ul')
    menu.style.display = 'none'
  }
  return (
    <ul className={`${className} sidenavfilter__main-ul`} id='sidenavfilter__main-ul'>
        <span className='flex-group-between align-items-baseline sidenavfilter__title'>
            <p className='cap f-large fw-bold m-b-2'>filter</p>
            <span className='sidenavfilter__x-span' onClick={menuClose}><X size={30}/></span>
        </span>
        <li>{data.categories.length !== 0 &&
            <CheckBoxFilter title={'category'} data={data.categories} setSearchParams={setSearchParams}/>
            }
        </li>
        <li>{data.sub_categories.length !== 0 &&
            <CheckBoxFilter title={'subCategory'} data={data.sub_categories} setSearchParams={setSearchParams}/>
            }
        </li>
        <li>{data.shoe_size.length !== 0 &&
            <BigCheckBox items={data.shoe_size} title={'shoe size'} setFilterQuery={setFilterQuery} existingFilter={data.shoe_size_filter}/>
            }
        </li>
        <li>{data.clothing_size.length !== 0 &&
            <BigCheckBox items={data.clothing_size} title={'clothing size'} setFilterQuery={setFilterQuery} existingFilter={data.clothing_size_filter}/>
            }
        </li>
        <li>
            <PriceRangeFilter minPrice={data.min_price} maxPrice={data.max_price} setPrice={setPrice}/>
        </li>
        <li>{data.colors.length !== 0 &&
            <BigCheckBox title={'colors'} items={data.colors} setFilterQuery={setFilterQuery} existingFilter={data.colors_filter}/>
            }
        </li>

        <span className='flex-group sidenavfilter__buttons'>
            <AppButton name={'clear'} color={'white'}/>
            <AppButton name={'apply'} color={'black'}/>
        </span>
    </ul>
  )
}

export default SideNavFilter