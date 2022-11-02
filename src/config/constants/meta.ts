import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'



export const DEFAULT_META: PageMeta = {
  title: 'Run Together is a Move-to-earn project that applies both Game-Fi and Social-Fi aspects, aims to motivate people around the world living a healthier lifestyle.',
  // description:
  //   'A multi-chain platform that allows continuous flows between digital and traditional financial assets. This is where values are connected and best exploited.',
  
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  return {
    title: `Run Together`,
    image: 'https://runtogether.net/wp-content/uploads/2022/07/meta-banner.png',
    description:"Run Together is a Move-to-earn project that applies both Game-Fi and Social-Fi aspects, aims to motivate people around the world living a healthier lifestyle."
  }
} 
