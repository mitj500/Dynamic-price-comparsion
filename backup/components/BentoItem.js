import React from 'react'

export default function BentoItem(props) {
    let styles = {
        borderRadius: '20px',
        position: 'absolute'
    }
  return (
      <img src={'imgs/'+props.item + props.id+'.png'} alt="img" height='200' width='200' style={styles}/>
  )
}
