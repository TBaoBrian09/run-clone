import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = ({ color, height, ...props }) => {
  return (
    // <Svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   xmlnsXlink="http://www.w3.org/1999/xlink"
    //   width="425px"
    //   height="453px"
    //   viewBox="0 0 425 453"
    //   version="1.1"
    //   {...props}
    // >
    //   <g id="surface1">
    //     <path
    //       stroke="none"
    //       fillRule="nonzero"
    //       fill={color}
    //       fillOpacity="1"
    //       d="M 425 390.519531 L 425 0 L 0 0 L 0 379.320312 C 3.273438 402.519531 40.875 449.707031 165.113281 452.839844 C 289.355469 455.972656 390.136719 412.597656 425 390.519531 Z M 425 390.519531 "
    //     />
    //   </g>
    // </Svg>
    <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M600 517.246V0H0V502.409C4.6189 533.14 57.7059 595.638 233.102 599.787C408.499 603.935 550.783 546.488 600 517.246Z"
        fill={color}
      />
    </svg>
  )
}

export default Icon
