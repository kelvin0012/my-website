import { useState } from 'react'
import { HeadNav } from './components/HeadNav.jsx'
import './App.css'
import { SideNav } from './components/SideNav.jsx'
import { Home } from './components/Home.jsx'
import { Projects } from './components/Projects.jsx'
import { Skills } from './components/Skills.jsx'


function App() {
  return (
    <div className="App">
      <div className="HeadNav">
        <HeadNav/>
      </div>
      <div className="SideNav">
        <SideNav/>
      </div>
      <div className="Main">
          <Home/>
          <Projects/>
          <Skills/>
          {/* <Contact/> */}
      </div>
      {/* <footer>
        Designed and Made by Kelvin Gian | 2024
      </footer> */}
    </div>
  )
}

export default App
