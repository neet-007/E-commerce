import {React, useState} from 'react'
import './login.css'
import AppButton from '../../../components/appbutton/AppButton'
import { useNavigate } from 'react-router-dom'
import CSRF from '../../../components/CSRF'
import { useLogin } from '../../../querysandmutaions/queriesandmutaions'
import Loader from '../../../components/loader/Loader'
const LogIn = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
      email:'',
      password:'',
    })
    const {email, password} = formData
    const {mutateAsync:login , isPending, isError} = useLogin()
    const onchange = (e) => {
      setFormData(prevData => {
         return {...prevData, [e.target.name]:e.target.value}
      })
    }
    const handleSubmit = (e) => {
      e.preventDefault()
      login({email, password}).then(res => {
        console.log(res)
        if (res['success']){
          navigate('/')
        }else if (res.data['error']){
          alert(`login failed ${res.data['error']}`)
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
                  <CSRF/>
                  <h1 className='cap f-large fw-bold'>Login</h1>
                  <span>
                  <label htmlFor="email">email</label>
                  <input type="email" name="email" id="email" placeholder='email'
                         value={email} onChange={(e) => onchange(e)}/>
                  </span>
                  <span>
                  <label htmlFor="password">password</label>
                  <input type="password" name="password" id="password" placeholder='password'
                         value={password} onChange={(e) => onchange(e)}/>
                  </span>

                  <AppButton name={'login'} type='submit'/>
          </form>
      </section>
    )
}

export default LogIn