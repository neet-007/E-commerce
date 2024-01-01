import React from 'react'
import './footer.css'
import DropdownMenu from '../../components/dropdownmenu/DropdownMenu'
import { ABOUT_NIKE, GET_HELP_ITEMS, NIKE_APPS, POLICY_ITEMS } from '../../constants'
import { Facebook, GeoAlt, Instagram, Twitter, Youtube } from 'react-bootstrap-icons'
const Footer = () => { 
  return (
    <footer className='footer f-small'>
        <ul className='footer__email flex-group-column gap-1'>
          <li className='upper'>find a store</li>
          <li className='upper'>signup email</li>
        </ul>
        <DropdownMenu className='footer__group1 dropdownmenu__container'
                      name={'get help'}
                      list={GET_HELP_ITEMS}/>
        <DropdownMenu className='footer__group2 dropdownmenu__container'
                      name={'about nike'}
                      list={[ABOUT_NIKE]}/>
        <DropdownMenu className='footer__group3 dropdownmenu__container'
                      name={'nike apps'}
                      list={[NIKE_APPS]}/>
        <ul className='footer__social-media'>
          <span><Twitter size={20} color='black'/></span>
          <span><Facebook size={20} color='black'/></span>
          <span><Youtube size={20} color='black'/></span>
          <span><Instagram size={20} color='black'/></span>
        </ul>
        <span className='footer__location flex-group-between f-small'>
          <span> <GeoAlt/> saudi arabia</span>
          <span>|</span>
          <span>السعودية</span>
        </span>
        <ul className='footer__policy flex-group gap-1 f-small'>
          {POLICY_ITEMS.map(item => {
            return <li key={item} className='cap'>{item}</li>
          })}
        </ul>
    </footer>
  )
}

export default Footer