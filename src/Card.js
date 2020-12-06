import React from 'react'
import PropTypes from 'prop-types';
import {useSpring, animated} from 'react-spring'

const Card = (props) => {
  const { x } = useSpring({
    from: { x: 0 },
    to: { x: 1 }
  });
  let style = {}
  if (props.showing) {
    style.backgroundColor = props.backgroundColor;
  }
  return (
    <animated.div
      onClick={props.onClick}
      className="card-container"
      style={style}
    />
  )
}

Card.propTypes = {
  showing: PropTypes.bool.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}


export default Card;