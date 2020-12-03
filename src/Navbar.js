import React from 'react'
import PropTypes from 'prop-types'

const Navbar = ({onNewGame}) => {
  return (  
    <header>
      <h2><a>Memory Game</a></h2>
      <nav>
        <li><a>New Game</a></li>
      </nav>
    </header>
  )
}

export default Navbar
