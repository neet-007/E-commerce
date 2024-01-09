import React, { useEffect, useState } from 'react'
import './sidenavfilter.css'
import CheckBoxFilter from './checkboxfilter/CheckBoxFilter'
import BigCheckBox from '../../../components/bigcheckbox/BigCheckBox'
import { X } from 'react-bootstrap-icons'
import AppButton from '../../../components/appbutton/AppButton'
const SideNavFilter = ({className, data={}}) => {
  const [filterQuery, setFilterQuery] = useState('')

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
        <li>
            <CheckBoxFilter title={'category'} data={data.categories} setFilterQuery={setFilterQuery}/>
        </li>
        <li>
            <CheckBoxFilter title={'sub-category'} data={data.sub_categories} setFilterQuery={setFilterQuery}/>
        </li>
        <li>
            <BigCheckBox items={['dsa', 'dsa', 'sad', 'sd']}/>
        </li>
        <li>
            <label htmlFor="pricerange">do later{data.max_price}{data.min_price}</label>
            <input type="range" name='price-range' id='price-range'/>
        </li>
        <li>
            <CheckBoxFilter title={'category'} data={['sda', 'dsad', 'dsadad']} setFilterQuery={setFilterQuery}/>
        </li>

        <span className='flex-group sidenavfilter__buttons'>
            <AppButton name={'clear'} color={'white'}/>
            <AppButton name={'apply'} color={'black'}/>
        </span>
    </ul>
  )
}

export default SideNavFilter