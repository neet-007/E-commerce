import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { UserProvider } from './context/Context.jsx'
const queryclient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <BrowserRouter>
      <QueryClientProvider client={queryclient}>
          <React.StrictMode>
            <App />
          </React.StrictMode>,
      </QueryClientProvider>
    </BrowserRouter>
  </UserProvider>
)
