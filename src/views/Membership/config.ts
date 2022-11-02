import tokens from "config/constants/tokens"

export const Processes = (t) => [
  {
    title:t("Bonus & discount"),
    description: t("Enjoy numerous incentives and benefits on LiveTrade’s products & services"),
    image: "PrivilegesIcon",
  },
  {
    title:t("Profit sharing"),
    description: t("Participate in productive investments introduced by LiveTrade & partners"),
    image: "ExclusivityIcon",
  },
  {
    title:t("Redeem & Transfer"),
    description: t("Redeem NFTs for LTD any time or transfer ownership to share the privileges"),
    image: "RequirementIcon",
  },
  {
    title:t("And more to come"),
    description: t("Enjoy new features that will be continuously developed to better serve our users"),
    image: "RedeemTransferIcon",
  },
]

export const Memberships = {
  Diamond: {
    title: "Diamond",
    address: {
      97: '0x059c730e4385658a879a00bf567b9697f651603a',
      56: '0xc974B48b471F572bD1B6F287A895Ed8aA42ef074'
    }
  },
  Platinum: {
    title: "Platinum",
    address: {
      97: '0xD80cEF869bf05ad8b9Ef39B539244B117aEb0d68',
      56: '0xbb76E90f882e564b6F4aCfBBA25936ab9bC93CCc'
    }
  },
  Gold: {
    title: "Gold",
    address: {
      97: '0x6010C4C2Bc648cC793fAbcF5E03d93eE8d8A0b06',
      56: '0x5f333e18e7Badff476045EDE65c2E3B498937C71'
    }
  },
  Elite: {
    title: "Elite",
    address: {
      97: '0xe29DF351dE6D24bbA32A04c19bd5ab7831921B77',
      56: '0x6d6671e209f91B77Ce292B21A2f7ADf40Ca4a219'
    }
  },
  Deluxe: {
    title: "Deluxe",
    address: {
      97: '0xDD41dF6A7ABFd5605ffa007ff5Aa20F2c89848AA',
      56: '0x8C4881388c58af0592E92d612A1d9Fb979b7b0B5'
    }
  },
  Standard: {
    title: "Standard",
    address: {
      97: '0xDf5573504e89849ec1F633F17aBC973f703f85c8',
      56: '0x9E51dFe6D7C2A6cadFE2CA56A9e63B882AED3f7D'
    }
  },
}

export const Conditions = [
  {
    order_id:1,
    title: Memberships.Diamond.title,
    symbolLevel:"LTDDiamond",
    image: '/images/membership/ranks/Diamond.svg',
    videos:"https://dapp-livetrade.s3.ap-southeast-1.amazonaws.com/Diamond.webm",
    backgroundurl:"url(./images/membership/ranks/background/Diamond.png)",
    imageNFT:"/images/membership/ranks/background/Diamond.png",
    quantity: 35000,
    maxarmorial: 100,
    ltdRequired: 35000,
    Maximumsupply:4,
    Remaining: 0,
    contractAddress: Memberships.Diamond.address,
    backgroundRemaining:"linear-gradient(158.93deg, #7E0B0B 0%, #080530 68.87%)",
    tokenUpgrade: tokens.livetrade,
    totalPerUser: 0,
    claimed: 0,
    maxAllocated: 200,
    approveReturn: false,
    allowance: 0,
    nftLists: [],
    tokenList: [],
    nfts:'url(./images/YourNFTs/Diamond.png)',
    content:"You’ve got the power!",
    Infor: {
      DataInfor:[
        {
          id:1,
          content:"Seed/Private Allocations (varies for projects)",
          details:["DIPO Projects", "Joint Projects"]
        },
        {
          id:2,
          content:"Exclusive bonuses and rewards",
        },
        {
          id:3,
          content:"Better interest rates for Lending and Staking",
        },
        {
          id:5,
          content:"Incentives on LiveTrade App",
          details:["Better rates for trading", "Purchase DIPO projects' tokens on the app","Discount on premium features (cashback, social trading, etc.)"]
        },
        {
          id:6,
          content:"Exclusive discount & features on NFT trading",
          details:["Membership NFTs", "NFTs of other projects"]
        }
      ]
     }    
  },
  {
    order_id:2,
    title: Memberships.Platinum.title,
    symbolLevel:"LTDPlatinum",
    image: '/images/membership/ranks/Platinum.svg',
    videos:"https://dapp-livetrade.s3.ap-southeast-1.amazonaws.com/Platinum.webm",
    backgroundurl:"url(./images/membership/ranks/background/Platinum.png)",
    imageNFT:"/images/membership/ranks/background/Platinum.png",
    quantity: 5000,
    maxarmorial: 300,
    Maximumsupply: 10,
    maxAllocated: 150,
    ltdRequired: 25000,
    Remaining: 0,
    backgroundRemaining:"linear-gradient(161.03deg, #5A1230 0%, #040325 75.55%)",
    contractAddress: Memberships.Platinum.address,
    tokenUpgrade: tokens.livetrade,
    totalPerUser: 0,
    nftLists: [],
    tokenList: [],
    claimed: 0,
    approveReturn: false,
    allowance: 0,
    nfts:'url(./images/YourNFTs/Platinum.png)',
    content:"One more step to go",
    Infor: {
      DataInfor:[
        {
          id:1,
          content:"Seed/Private Allocations (varies for projects)",
          details:["DIPO Projects", "Joint Projects"]
        },
        {
          id:2,
          content:"Exclusive bonuses and rewards",
        },
        {
          id:3,
          content:"Better interest rates for Lending and Staking",
        },
        {
          id:5,
          content:"Incentives on LiveTrade App",
          details:["Better rates for trading", "Purchase DIPO projects' tokens on the app","Discount on premium features (cashback, social trading, etc.)"]
        },
        {
          id:6,
          content:"Exclusive discount & features on NFT trading",
          details:["Membership NFTs", "NFTs of other projects"]
        }
      ]
     }    
  }, {
    order_id:3,
    title: Memberships.Gold.title,
    symbolLevel:"LTDGold",
    image: '/images/membership/ranks/Gold.svg',
    videos:"https://dapp-livetrade.s3.ap-southeast-1.amazonaws.com/Gold.webm",
    backgroundurl:"url(./images/membership/ranks/background/Gold.png)",
    imageNFT:"/images/membership/ranks/background/Gold.png",
    quantity: 20000,
    maxarmorial: 500,
    Maximumsupply: 10,
    maxAllocated: 100,
    Remaining: 0,
    ltdRequired: 20000,
    backgroundRemaining:"linear-gradient(161.03deg, #39094A 0%, #0C031F 75.55%)",
    contractAddress: Memberships.Gold.address,
    tokenUpgrade: tokens.livetrade,
    totalPerUser: 0,
    claimed: 0,
    nftLists: [],
    tokenList: [],
    approveReturn: false,
    allowance: 0,
    nfts:'url(./images/YourNFTs/Gold.png)',
    content:"Climb to the top",
    Infor: {
      DataInfor:[
        {
          id:1,
          content:"Seed/Private Allocations (varies for projects)",
          details:["DIPO Projects", "Joint Projects"]
        },
        {
          id:2,
          content:"Exclusive bonuses and rewards",
        },
        {
          id:3,
          content:"Better interest rates for Lending and Staking",
        },
        {
          id:5,
          content:"Incentives on LiveTrade App",
          details:["Better rates for trading", "Purchase DIPO projects' tokens on the app","Discount on premium features (cashback, social trading, etc.)"]
        },
        {
          id:6,
          content:"Exclusive discount & features on NFT trading",
          details:["Membership NFTs", "NFTs of other projects"]
        }
      ]
     }    
  }, {
    order_id:4,
    title: Memberships.Elite.title,
    symbolLevel:"LTDElite",
    image: '/images/membership/ranks/Silver.svg',
    videos:"https://dapp-livetrade.s3.ap-southeast-1.amazonaws.com/Elite.webm",
    backgroundurl:"url(./images/membership/ranks/background/Elite.png)",
    imageNFT:"/images/membership/ranks/background/Elite.png",
    quantity: 14000,
    maxarmorial: 800,
    Maximumsupply:30,
    Remaining: 0,
    maxAllocated: 50,
    ltdRequired: 14000,
    backgroundRemaining:"linear-gradient(161.03deg, #300F59 0%, #1D0C42 75.55%)",
    contractAddress: Memberships.Elite.address,
    tokenUpgrade: tokens.livetrade,
    totalPerUser: 0,
    nftLists: [],
    tokenList: [],
    claimed: 0,
    approveReturn: false,
    allowance: 0,
    nfts:'url(./images/YourNFTs/Elite.png)',
    content:"Go and grow",
    Infor: {
      DataInfor:[
        {
          id:1,
          content:"Seed/Private Allocations (varies for projects)",
          details:["DIPO Projects", "Joint Projects"]
        },
        {
          id:2,
          content:"Exclusive bonuses and rewards",
        },
        {
          id:3,
          content:"Better interest rates for Lending and Staking",
        },
        {
          id:5,
          content:"Incentives on LiveTrade App",
          details:["Better rates for trading", "Purchase DIPO projects' tokens on the app","Discount on premium features (cashback, social trading, etc.)"]
        },
        {
          id:6,
          content:"Exclusive discount & features on NFT trading",
          details:["Membership NFTs", "NFTs of other projects"]
        }
      ]
     }    
  }, {
    order_id:5,
    title: Memberships.Deluxe.title,
    symbolLevel:"LTDDeluxe",
    image: '/images/membership/ranks/Deluxe.svg',
    videos:"https://dapp-livetrade.s3.ap-southeast-1.amazonaws.com/Deluxe.webm",
    backgroundurl:"url(./images/membership/ranks/background/Deluxe.png)",
    imageNFT:"/images/membership/ranks/background/Deluxe.png",
    quantity: 7000,
    maxarmorial:1000,
    Maximumsupply:30,
    Remaining: 0,
    ltdRequired: 7000,
    backgroundRemaining:"#1C1248",
    contractAddress: Memberships.Deluxe.address,
    tokenUpgrade: tokens.livetrade,
    totalPerUser: 0,
    nftLists: [],
    tokenList: [],
    claimed: 0,
    approveReturn: false,
    allowance: 0,
    nfts:'url(./images/YourNFTs/Deluxe.png)',
    content:"Make steps forward",
    Infor: {
      DataInfor:[
        {
          id:1,
          content:"Seed/Private Allocations (varies for projects)",
          details:["DIPO Projects"]
        },
        {
          id:2,
          content:"Exclusive bonuses and rewards",
        },
        {
          id:3,
          content:"Better interest rates for Lending and Staking",
        },
        {
          id:5,
          content:"Incentives on LiveTrade App",
          details:["Better rates for trading", "Purchase DIPO projects' tokens on the app","Discount on premium features (cashback, social trading, etc.)"]
        },
        {
          id:6,
          content:"Exclusive discount & features on NFT trading",
          details:["Membership NFTs"]
        }
      ]
     }    
  }, {
    order_id:6,
    title: Memberships.Standard.title,
    symbolLevel:"LTDStandard",
    image: '/images/membership/ranks/Standard.svg',
    videos:"https://dapp-livetrade.s3.ap-southeast-1.amazonaws.com/Standard.webm",
    backgroundurl:"url(./images/membership/ranks/background/Standard.png)",
    imageNFT:"/images/membership/ranks/background/Standard.png",
    quantity: 3500,
    maxarmorial: 1500,
    Maximumsupply:30,
    Remaining: 0,
    ltdRequired: 3500,
    backgroundRemaining:"linear-gradient(160.98deg, #1C1A6D 11.61%, #0B1740 82.66%)",
    contractAddress: Memberships.Standard.address,
    tokenUpgrade: tokens.livetrade,
    nftLists: [],
    tokenList: [],
    totalPerUser: 0,
    claimed: 0,
    approveReturn: false,
    allowance: 0,
    nfts:'url(./images/YourNFTs/Standard.png)',
    content:"Start from the bottom ",
    Infor: {
      DataInfor:[
        {
          id:1,
          content:"Seed/Private Allocations (varies for projects)",
          details:["DIPO Projects"]
        },
        {
          id:2,
          content:"Exclusive bonuses and rewards",
        },
        {
          id:3,
          content:"Better interest rates for Lending and Staking",
        },
        {
          id:5,
          content:"Incentives on LiveTrade App",
          details:["Better rates for trading", "Purchase DIPO projects' tokens on the app","Discount on premium features (cashback, social trading, etc.)"]
        },
        {
          id:6,
          content:"Exclusive discount & features on NFT trading",
          details:["Membership NFTs"]
        }
      ]
     }    
  },
]

export const YourRight = (t) => [
  {
    id:1,
    YourRight:t("Number of LTD required"),
    Standard: "3,500",
    Deluxe:"7,000",
    Elite:"14,000",
    Gold:"20,000",
    Platinum:"25,000",
    Diamond:"35,000",
  },
  {
    id:2,
    YourRight:t("Maximum supply"),
    Standard:"1500",
    Deluxe:"1000",
    Elite:"800",
    Gold:"500",
    Platinum:"300",
    Diamond:"100",
  },
  {
    id:3,
    YourRight:t("Maximum amount per user"),
    Standard:"30",
    Deluxe:"30",
    Elite:"30",
    Gold:"10",
    Platinum:"10",
    Diamond:"4",
  },
  {
    id:4,
    YourRight:t("Seed/Private Allocations (varies for projects)"),
    details:{
      DataDetails:[
        {id:5, Name:t("DIPO Projects"), Standard:true, Deluxe:true, Elite:true, Gold:true, Platinum:true, Diamond:true},
        {id:6, Name:t("Joint Projects"), Standard:false, Deluxe:false, Elite:true, Gold:true, Platinum:true, Diamond:true}
      ]
    }
  },
  {
    id:7,
    YourRight:t("Exclusive bonuses and rewards"),
    Standard:"check",
    Deluxe:"check",
    Elite:"check",
    Gold:"check",
    Platinum:"check",
    Diamond:"check",
  },
  {
    id:8,
    YourRight:t("Better interest rates for Lending and Staking"),
    Standard:"check",
    Deluxe:"check",
    Elite:"check",
    Gold:"check",
    Platinum:"check",
    Diamond:"check",
  },
  {
    id:9,
    YourRight:t("Incentives on LiveTrade App"),
    details:{
      DataDetails:[
        {id:10, Name:t("Better rates for trading"), Standard:true, Deluxe:true, Elite:true, Gold:true, Platinum:true, Diamond:true},
        {id:11, Name:t("Purchase DIPO projects' tokens on the app"), Standard:true, Deluxe:true, Elite:true, Gold:true, Platinum:true, Diamond:true},
        {id:12, Name:t("Discount on premium features (cashback, social trading, etc.)"), Standard:true, Deluxe:true, Elite:true, Gold:true, Platinum:true, Diamond:true}
      ]
    }
  },
  {
    id:13,
    YourRight:t("Exclusive discount & features on NFT trading"),
    details:{
      DataDetails:[
        {id:14, Name:t("Membership NFTs"), Standard:true, Deluxe:true, Elite:true, Gold:true, Platinum:true, Diamond:true},
        {id:15, Name:t("NFTs of other projects"), Standard:false, Deluxe:false, Elite:true, Gold:true, Platinum:true, Diamond:true},
      ]
    }
  }
]
