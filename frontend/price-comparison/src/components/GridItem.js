import React, { useContext } from 'react'
import { UserContext } from '../App'

export default function GridItem(props) {
  const { theme, toggleTheme } = useContext(UserContext)

    let styles = {
        backgroundColor: props.bgColor, 
        borderRadius: '20px', 
        position: 'relative',
        zIndex: '1',
        top: [1,4,7].includes(props.id) ? "-3vh" : "3vh"
    }
  return (
    <div>
      <img src={'imgs/'+props.hrefs} alt='img' height='160' width='160' style={styles}/>
    </div>
  )
}
