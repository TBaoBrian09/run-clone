import tokens from './tokens'
import { PoolNftConfig } from './types'
import nftsContract from './nftContract'


const poolsNft: PoolNftConfig[] = [
  {
    nftId: 1,
    stakingToken: tokens.babykshark,
    earningNft: nftsContract.artShark,
    contractAddress: {
      97: '',
      56: '0x47d898b55c4494e361ed75d74e862e2dc5baca8e',
    },
    harvest: true,
    sortOrder: 999,
    hashRate: '1',
    decimals:9,
    name: 'ART SHARK',
    media: 'https://slate.textile.io/ipfs/bafybeigkaulwoy64xokx247erbvk2pdzyhe25d6mnsq5ii3tpzjj4c35wa'
  },
  // {
  //   nftId: 2,
  //   stakingToken: tokens.babykshark,
  //   earningNft: tokens.osc,
  //   contractAddress: {
  //     97: '',
  //     56: '0x47d898b55c4494e361ed75d74e862e2dc5baca8e',
  //   },
  //   harvest: true,
  //   sortOrder: 999,
  //   hashRate: '1',
  //   decimals:9,
  //   name: 'BARTENDER SHARK',
  //   media: 'https://slate.textile.io/ipfs/bafybeidkqwbypimyaxgzji4vm45iiewinqlbh65rg4532mtejh7alsp2za'
  // },
  // {
  //   nftId: 3,
  //   stakingToken: tokens.babykshark,
  //   earningNft: tokens.osc,
  //   contractAddress: {
  //     97: '',
  //     56: '0x47d898b55c4494e361ed75d74e862e2dc5baca8e',
  //   },
  //   harvest: true,
  //   sortOrder: 999,
  //   hashRate: '1',
  //   decimals:9,
  //   name: 'CONSTRUCTION WORKERS SHARK',
  //   media: 'https://slate.textile.io/ipfs/bafybeidepna4nbdmkcgjn4lxx2oxq2zrmaoebuhc74ohdfwtlag4pblgia'
  // },
  // {
  //   nftId: 4,
  //   stakingToken: tokens.babykshark,
  //   earningNft: tokens.osc,
  //   contractAddress: {
  //     97: '',
  //     56: '0x47d898b55c4494e361ed75d74e862e2dc5baca8e',
  //   },
  //   harvest: true,
  //   sortOrder: 999,
  //   hashRate: '1',
  //   decimals:9,
  //   name: 'COOK SHARK',
  //   media: 'https://slate.textile.io/ipfs/bafybeihghn73i6iu2sd5enbs6djfy4ncqvqdfbzohimun7sgx3pu47oosq'
  // }
]

export default poolsNft
