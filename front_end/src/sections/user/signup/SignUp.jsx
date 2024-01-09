import React, { useState } from 'react'
import './signup.css'
import CSRF from '../../../components/CSRF'
import AppButton from '../../../components/appbutton/AppButton'
import { useNavigate } from 'react-router-dom'
import { useRegister } from '../../../querysandmutaions/queriesandmutaions'
import Loader from '../../../components/loader/Loader'
import { useUserContext } from '../../../context/Context'

const SignUp = () => {
  const navigate = useNavigate()
  const {isAuthenticated} = useUserContext()
  const [formData, setFormData] = useState({
    email:'',
    username:'',
    password:'',
    re_password:''
  })
  const {email, username, password, re_password} = formData

  const {mutateAsync:register , isError, isPending} = useRegister()

  if (isAuthenticated) return navigate('/')
  const onchange = (e) => {
    setFormData(prevData => {
       return {...prevData, [e.target.name]:e.target.value}
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    register({email, username, password, re_password}).then(res => {
      if (res['success']) {
        navigate('/login')
      }else if (res.data['error']){
        alert(`signup faild ${res.data['error']}`)
      }else{
        alert('something went wrong please try again')
      }
    })
  }

  if (isPending) return <Loader/>
  if (isError) return <h1>ERROR</h1>
  return (
    <section className='signup__section'>
        <form onSubmit={handleSubmit} className='signup__form'>
                <h1 className='cap f-large fw-bold'>signup</h1>
                <span>
                <label htmlFor="email">email</label>
                <input type="email" name="email" id="email" placeholder='email'
                       value={email} onChange={(e) => onchange(e)}/>
                </span>
                <span>
                <label htmlFor="username">username</label>
                <input type="text" name="username" id="username" placeholder='username'
                       value={username} onChange={(e) => onchange(e)}/>
                </span>
                <span>
                <label htmlFor="password">password</label>
                <input type="password" name="password" id="password" placeholder='password'
                       value={password} onChange={(e) => onchange(e)}/>
                </span>
                <span>
                <label htmlFor="re_password">re password</label>
                <input type="password" name="re_password" id="re_password" placeholder='repassword'
                       value={re_password} onChange={(e) => onchange(e)}/>
                </span>

                <AppButton name={'signup'} type={'submit'}/>
        </form>
    </section>
  )
}

export default SignUp