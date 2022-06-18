import './index.css'
import React from 'react'
import Header from './components/layout/Header'
import Menu from './components/layout/Menu'
import Content from './components/layout/Content'
import Dashboard from './pages/Dashboard'

export default props => 
  <div className="container min-h-screen m-auto flex-col h-auto flex justify-center items-center py-16">
    <Header></Header>
    <div className="w-full flex flex-col md:flex-row justify-center items-start">
      <Menu></Menu>
      {window.location.pathname === '/dashboard' ?
        <Dashboard></Dashboard>
        : 
        <Content></Content>
      }
    </div>
  </div>