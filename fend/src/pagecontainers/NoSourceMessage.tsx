import React from 'react'

const helpMessage = 'no traced artifacts have been found'

/* Responsibility: Dummy page used when user is selecting source artifacts.
 *
 */
export default function NoSourceMessage () {
  return (
    <div className="textAlignCenter">
      <h3 className="verticallyCenter" >{helpMessage}</h3>
    </div>
  )
}
