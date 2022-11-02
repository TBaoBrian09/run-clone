import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg style={{ width: 8, height: 26 }} viewBox="0 0 8 26" {...props}>
        <path d="M3.64645 25.3536C3.84171 25.5488 4.15829 25.5488 4.35355 25.3536L7.53553 22.1716C7.7308 21.9763 7.7308 21.6597 7.53553 21.4645C7.34027 21.2692 7.02369 21.2692 6.82843 21.4645L4 24.2929L1.17157 21.4645C0.976312 21.2692 0.659729 21.2692 0.464467 21.4645C0.269205 21.6597 0.269205 21.9763 0.464467 22.1716L3.64645 25.3536ZM3.5 2.18557e-08L3.5 25L4.5 25L4.5 -2.18557e-08L3.5 2.18557e-08Z"/>
    </Svg>
  )
}

export default Icon
