import React from 'react'
import './navbar.css'
import { NAVBAR_ITEMS } from '../../constants'
import {List} from 'react-bootstrap-icons'
import CartIcon from '../carticon/CartIcon'
import SearchBar from '../../sections/search/searchbar/SearchBar'

const toggleSideNav = (e) => {
    e.preventDefault()
    const sideNav = document.getElementsByClassName('navbar__ul--mobile')[0]
    const overlay = document.getElementsByClassName('navbar__overlay')[0]
    sideNav.style.right === '0px' ? (sideNav.style.right = '-100%' , overlay.style.display = 'none') : (sideNav.style.right = '0', overlay.style.display = 'block')
}
const toggleSearchComponent = () => {
    const serachComponent = document.getElementsByClassName('searchcomponent__article')[0]
    !serachComponent.classList.contains('searchcomponent__article_show') ? serachComponent.classList.add('searchcomponent__article_show') : serachComponent.classList.remove('searchcomponent__article_show')
}
const NavItem = ({name}) => {
    return (
        <li className='navbar__li cursor-pointer'>
            {name}
        </li>
    )
}
const Navbar = () => {
  return (
    <nav className='navbar__nav'>
        <h1 className='fw-regular f-regular'>E-commerce</h1>
        <ul className='navbar__ul'>
            {NAVBAR_ITEMS.map(item => {
                return <NavItem key={item} name={item}/>
            })}
        </ul>
        <span className='flex-group align-items-center gap-1'>
            <CartIcon/>
            <SearchBar onClick={() => toggleSearchComponent()}/>
            <div className='navbar__mobile-list'>
                <List size={30} onClick={(e) => {toggleSideNav(e)}}/>
                <div className='navbar__overlay'></div>
                <ul className='navbar__ul--mobile'>
                    {NAVBAR_ITEMS.map(item => {
                        return <NavItem key={item} name={item}/>
                    })}
                </ul>
            </div>
        </span>
    </nav>
  )
}

export default Navbar