import React from 'react'
import { CSRFTOKEN } from '../lib/axios/axios'
import Cookies from 'js-cookie'

const CSRF = () => {
    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            let cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].trim();

                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    const getCSRFToken = () => {
        const name = 'csrftoken=';
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i].trim();
            if (cookie.indexOf(name) === 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return 'aa';
    };
  CSRFTOKEN().then(res => console.log(getCSRFToken()))
  return (
    <div style={{display:'none'}}/>
  )
}

export default CSRF