import './index.css'
import React from 'react'
import Header from './components/layout/Header'
import Menu from './components/layout/Menu'
import Content from './components/layout/Content'

export default props => 
  <div className="container min-h-screen m-auto flex-col h-auto flex justify-center items-center py-16">
    <Header></Header>
    <div className="w-full flex flex-row justify-center items-start">
      <Menu></Menu>
      <Content></Content>
    </div>
  </div>