import React from 'react'
import './mainherotext.css'
import AppButton from '../../appbutton/AppButton'
const MainHeroText = () => {
  return (
    <article className='mainherotext__main-article flex-group-column gap-1'>
        <p className='text-muted cap mainherotext__top'>nike style by</p>
        <p className='f-xlarge fw-bold upper'>nike v2k run</p>
        <p className='text-muted cap'>Meet the new silhouette with a retro twist.</p>
        <AppButton widthFit name={'shop'} className={'mainherotext__top'}/>
    </article>
  )
}

export default MainHeroText