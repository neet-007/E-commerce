import React from 'react'
import './navbar.css'
import { NAVBAR_ITEMS } from '../../constants'
import {List} from 'react-bootstrap-icons'
import CartIcon from '../carticon/CartIcon'
import SearchBar from '../../sections/search/searchbar/SearchBar'
import { useNavigate } from 'react-router-dom'

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
        <li className='navbar__li cursor-pointer cap fw-bold'>
            {name}
        </li>
    )
}
const Navbar = ({isAuthenticated, cartCount}) => {

  const navigate = useNavigate()
  return (
    <nav className='navbar__nav'>
        <div onClick={() => {navigate('/')}}>
            <svg className='cursor-pointer' width={'3rem'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="nike"><path fill="#263238" fillRule="evenodd" d="m7.998 7.567-2.758.722c-.974.241-1.826.562-2.647.281-1.116-.482-1.096-1.736-.264-3.07-1.471 1.214-4.118 5.096-.538 5.488.456.06 1.268-.1 2.15-.471l4.057-1.665L16 5.58 8.992 7.306l-.994.261z" clipRule="evenodd"></path></svg>
        </div>
        <ul className='navbar__ul'>
            {NAVBAR_ITEMS.map(item => {
                return <NavItem key={item} name={item}/>
            })}
        </ul>
        <span className='flex-group align-items-center gap-1'>
            {!isAuthenticated &&
            <span className='cap flex-group f-small align-items-center gap-1'>
                <button className='invisible-button cap' onClick={() => navigate('/signup')}>signup</button>
                <span className='f-large'>\</span>
                <button className='invisible-button cap' onClick={() => navigate('/login')}>login</button>
            </span>
            }
            <SearchBar onClick={() => toggleSearchComponent()}/>
            <CartIcon onClick={() => navigate('/cart')} cartCount={cartCount}/>
            <div className='navbar__mobile-list'>
                <List size={30} onClick={(e) => {toggleSideNav(e)}}
                      className='cursor-pointer'/>
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