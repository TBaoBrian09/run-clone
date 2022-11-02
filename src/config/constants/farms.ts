import tokens from './tokens'
import {FarmConfig} from './types'




const farms: FarmConfig[] = [
    /**
     * These 3 farms (PID 0, 251, 252) should always be at the top of the file.
     */
    // {
    //     pid: 0,
    //     lpSymbol: 'BKS',
    //     lpAddresses: {
    //         97: '',
    //         56: '0x6D810eB08FC6852b4a0e524944149154DAdba2b6',
    //     },
    //     token: tokens.babykshark,
    //     quoteToken: tokens.wbnb,
    // },
    {
        pid: 1,
        lpSymbol: 'RUN-BUSD LP',
        lpAddresses: {
            97: '',
            56: '0xB3C793C1470d49569A8d189a946dB5bdB7BB6E4B',
        },
        token: tokens.Run,
        quoteToken: tokens.busd,
    },
    // {
    //     pid: 1,
    //     lpSymbol: 'RUN-BNB LP',
    //     lpAddresses: {
    //         97: '',
    //         56: '0xb73b2c77052Fd08212865Dc436AE8CeDc200244c',
    //     },
    //     token: tokens.Run,
    //     quoteToken: tokens.bnb,
    // },
    // {
    //     pid: 251,
    //     lpSymbol: 'CAKE-BNB LP',
    //     lpAddresses: {
    //         97: '0x3ed8936cAFDF85cfDBa29Fbe5940A5b0524824F4',
    //         56: '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0',
    //     },
    //     token: tokens.cake,
    //     quoteToken: tokens.wbnb,
    // },
    // {
    //     pid: 252,
    //     lpSymbol: 'BUSD-BNB LP',
    //     lpAddresses: {
    //         97: '',
    //         56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
    //     },
    //     token: tokens.busd,
    //     quoteToken: tokens.wbnb,
    // },
]

export default farms
