import { BountyConfig } from './types'

const bounties: BountyConfig[] = [
  {
    id: 0,
    contractAddress: {
      97: '',
      56: '0xbe71fd033c3e7a0d23ac3c108543950b5b60745d',
    },
    name: "Bronze Kshark",
    title: "KSHARK Bronze Bounty NFT",
    description: "Click the button to request the quest<br/>Once received, successfully purchase 1 KSC on Kshark NFT official website",
    image: "/images/bouties/KSHARK-BRONZE.png"
  },
  {
    id: 1,
    contractAddress: {
      97: '',
      56: '0xd4Ea8ddcd520eF58eaF2eA457262D45aF390a220',
    },
    name: "Iron Kshark",
    title: "KSHARK Iron Bounty NFT",
    description: "Click the button to request the quest<br/>Successful purchase of $ KSHARK on Pancakeswap, the amount must exceed 100 KSC",
    image: "/images/bouties/KSHARK-IRON.png"
  },
  {
    id: 2,
    contractAddress: {
      97: '',
      56: '0xe9f774CE11EE96298EcdD6485E13386Cc318b29e',
    },
    name: "Silver Kshark",
    title: "KSHARK NFT silver bonus",
    description: "Click the button to request the quest<br/>Successful purchase of $ KSHARK on Pancakeswap, the amount must exceed 1000 KSC",
    image: "/images/bouties/KSHARK-SILVER.png"
  },
  {
    id: 3,
    contractAddress: {
      97: '',
      56: '0x00735DCFBd78b5AA0EFB4Bf0EC84F2B684E29030',
    },
    name: "Gold Kshark",
    title: "KSHARK gold bonus NFT",
    description: "Click the button to request the quest<br/>Successful purchase of $ KSHARK on Pancakeswap, the amount must exceed 5000 KSC",
    image: "/images/bouties/KSHARK-GOLD.png"
  },
  {
    id: 4,
    contractAddress: {
      97: '',
      56: '0xDd709509E342C8e51A011EBD77dBEAc686567e40',
    },
    name: "Premium Kshark",
    isPremium: true,
    title: "KSHARK premium bonus NFT",
    description: "Contact the community admin Telegram – a new era of messaging for detailed instructions on the task.<br/>Create and continue to maintain a KSHARK community of more than 300 people<br/>Submit contact information and community links for review by community admins.<br/>After the review is passed,the community admin will rate the community according to the quality of the community, as much as possible to receive the KSHARK Premium Bonus NFT.",
    image: "/images/bouties/KSHARK-PREMIUM.png"
  },
]

export default bounties
