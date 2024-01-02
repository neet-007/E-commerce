import React from 'react'
import './loader.css'
import { ArrowClockwise } from 'react-bootstrap-icons'
function Loader() {
  return (
    <section className='loader'>
        <ArrowClockwise size={50} className='loader__loader'/>
    </section>
  )
}

export default Loader