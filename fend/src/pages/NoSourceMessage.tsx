import React from 'react'

const helpMessage = 'No source artifact selected.'

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
