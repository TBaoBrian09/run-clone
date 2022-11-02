import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg style={{ width: 23, height: 8 }} viewBox="0 0 23 8" {...props}>
      <path d="M22.8217 4.35355C23.017 4.15829 23.017 3.84171 22.8217 3.64645L19.6397 0.464466C19.4445 0.269204 19.1279 0.269204 18.9326 0.464466C18.7374 0.659728 18.7374 0.976311 18.9326 1.17157L21.761 4L18.9326 6.82843C18.7374 7.02369 18.7374 7.34027 18.9326 7.53553C19.1279 7.7308 19.4445 7.7308 19.6397 7.53553L22.8217 4.35355ZM0.443359 4.5L22.4682 4.5V3.5L0.443359 3.5L0.443359 4.5Z"/>
    </Svg>
  )
}

export default Icon
