import {Conditions, Memberships} from "views/Membership/config"
import tokens from "config/constants/tokens"

const nftRequired = () => {
    const arr = []
    for(let i = 0; i < Conditions.length ; i++){
        if(Conditions[i].title === 'Diamond' || Conditions[i].title ===  'Platinum' || Conditions[i].title ===  'Gold' || Conditions[i].title ===  'Elite'){
            arr.push(Conditions[i])
        }
    }
    return arr
} 

export const idoList = [
    {
        id: '1',
        name: 'HTD',
        status: 'Fixed Price',
        nftRequire: [Memberships.Diamond, Memberships.Platinum, Memberships.Gold, Memberships.Elite],
        stakingAddress: {
            97: '0xccD35293d3ecd1a3ab91078b68AAab28F5591dA3',
            56: '0xccD35293d3ecd1a3ab91078b68AAab28F5591dA3'
        },
        idoAddress: {
            97: '0x7238a91E321f639987dD10F2C1D7E6692bF8bACF',
            56: '0x8C6f2129CACfc191058c7dA7AaAf9a1E5efA8cB9'
        },
        image: '/images/dipo/HTD3.png',
        description: 'HeroesTD is a blockchain-based Play to Earn game where players summon Heroes to attack enemy bases and defend their bases. As an NFT game, HeroesTD provides players with diverse Heroes and game modes to enjoy and earn real money.',
        purchaseWith: 'BUSD',
        project:"HeroesTD",
        requiredLevel: 'Elite+',
        endsIn: '23:44:12',
        startsOn : "Nov 28, 2021",
        startsIn : "12:00 PM (UTC+7) November 28, 2021",
        currentRound: 'Private',
        liveStatus: 'past',
        tokenPrice: tokens.busd,
        tokenEarn: tokens.htd,
        tokenFee: tokens.livetrade,
        perPrice: 0.04,
        percentage: 100,
        minPrice: 10,
        fixedPrice: '1 HTD ~ 0.04 BUSD',
        value: '98/98 slots',
        banner:"/images/dipo/HTD_BannerProject.svg",
        whitepaperLink:"https://docs.heroestd.io/",
        contractAddressLink:"https://bscscan.com/token/0x5E2689412Fae5c29BD575fbe1d5C1CD1e0622A8f",
        Issuer:"CG Studio Pte. Ltd.",
        projectname:"heroestd",
        SocialLink: [
            {id:1, Label:"Facebook", Icon:"FacebookIcon", Link:"https://www.facebook.com/Heroestd"},
            {id:2, Label:"Twitter", Icon:"TwitterIcon", Link:"https://twitter.com/heroes_td"},
            {id:3, Label:"Telegram", Icon:"TelegramIcon", Link:"https://t.me/Heroes_TD"},
            {id:4, Label:"Discord", Icon:"DiscordIcon", Link:"https://dsc.gg/HEROESTD"},
            {id:5, Label:"Globe", Icon:"GlobeIcon", Link:"https://heroestd.io/"},
        ],
        detail:{
            DataTotalAllocation:[
                {id: 1, name:"Total allocation", value:"0"},
                {id: 2, name:"Vesting period", value:""},
                {id: 3, name:"Vesting Starts", value:""},
                {id: 4, name:"Min/Max Entry", value:"10-200"},
                {id: 5, name:"Cliff", value:""},
                {id: 6, name:"Required Level", value:"Elite+"}, 
            ],
            DataYourInvestment:[
                {id:1,Round:"Private", Purchased:"",Purchaseprice:"",Claimed:"", Nextvestingin:"",Claimable:"",button:"Claim vested"},
            ]
        },
        VestingSchedule:["6% unlock at TGE, 90-day cliff,","6% monthly unlock in the next 16 months"],
        ListLevel: [
            {id:1, name:"Diamond", icon:"/images/membership/ranks/Diamond.svg", Allocation:"$200"},
            {id:2, name:"Platinum", icon:"/images/membership/ranks/Platinum.svg", Allocation:"$150"},
            {id:3, name:"Gold", icon:"/images/membership/ranks/Gold.svg", Allocation:"$100"},
            {id:4, name:"Elite", icon:"/images/membership/ranks/Silver.svg", Allocation:"$50"},
        ], 
        whitelist: {
            DIAMOND : [
                '0xe22555fa3dce077fa0e693d08d4a26f513d9ae2c',
                '0x75eb3362cd7984cb8b9b3004ad01e9a20346fbdf',
                '0x8a03a236a6cc8fce3ab4c5366056e032b1f53695',
                '0xbc0f5d520a42a202490873e67e38286c2611b836',
                '0x762027f2d360c6fa95d49cab1bd331b989ea5a31',
                '0x788979f1937aa6b1c47ad415681b569a0fcd18a4',
                '0x1543175b976efd7cfb8c032755c96defe90a60f1',
                '0x8afbe6fed74ac16407d0adea567fbe83ccd5714d',
                '0x5d30c042ad28c1018e1dd89f8a8d1fa34a898db2',
                '0xb58f19eef27d252f5d6f391c4d7dfb57647170c8',
                '0x1bdec90c4d296a7d7b73c27ab058f6487355b638',
                '0x4a30aea8f8a6a80480ef5672ff9a056f4ee06f23',
                '0x7f770fe3891bdc1b42338364eb5ef8e33f708eca',
                '0x601e7e930de3ecbfa15105fb4f46bae7bf40e510',
                '0x0ddb5bf6ba40cebd0e474375389db846e68eaecc',
                '0xcac31e31b142e98079bd2578b5e0c937a5a71f76',
                '0xe3e8619da04fe808599b496e533d891a0fb3d636',
                '0x3b77a437f27869f5943cc81271aac564fc41c2c6',
                '0x1edc76142a3cd8b85b94a97b883d28c9d877f87e',
                '0xa9258dc60efd09b130026cc2b5353988160ca0b1',
                '0x3cfa96e48971e18dd6665f729d9c3b15380f572f',
                '0x55ee8fca7660bfcd19cbad2ca79f761b09974641',
                '0xf6f0ccd570b90d4c4f9963b81f7131885737412b',
                '0x1b58e5df21ab1c28e4761394fd2794646cbbfab3',
                '0x1f0cdf57b731c83399a811a4d72100ac8b573748',
                '0x6e655cab8e33f0e1ef0d8ad320eb614b4b889f25',
                '0x3147b7059344c1adcf64853f250d44df148d84c7',
                '0x821829d8fdf7776a0f9792ca24638d81d5c27b9c',
                
                '0x9798aDF34d7CB55e96a81BdAcC416C518b75ae21',
                '0x5a0D681F415967ad457F48F7E4c417c6C2a6c455',
                '0x18436468c2a6A717667D68ddeD502772709d57c5',
                '0x8f348851B74BB3E8c17d76194818cDCe752DbB10',
                '0xEEa00d93642385b30643d1e8e930942DA9adfFBf',
                '0x9937a3E43C95D8B6D05D2e90DC16CB87055e445B',
                '0x723692A0c4fD74C8172588DB18b71ABD609a2f46',
                '0x7b4B12570899Bd7bb31c30729d91732901306C79',
                '0xB1331BB0f8a4c40996b3397A1F75169BeCD5BE50',
                '0x89Bb3dD6AecBE54022177614EA512Cd8f65e70bF',
                '0x9C6c8C6ccFE8f7177fCF9e95246c0257499b0102',
                '0x83979A58CEbA9D1Ed291cf00AE9aF0565066dE05',
                '0xa37437ddd234a3b6B9B11B4A9Ac2a1416241F7DB',
                '0x2b2956b73a7b9046690f6daac83b822b74c7a827',
                '0xdbc15aCb6e144817fe3AB9929b3751Ec3a0F99a6',
                '0x9a870E49Bbcd2b69B5151D555AF97A2bb2665bc5',
                '0xeFec6d895EAf8fE482599B788F21406aC03ADaC3',
                '0x53A56114f71f6Dc2a9587b118D413BF61f1C9c9D',
                '0x698F6DBaDEa7ACE1A0D5453f2DE6FF323E2F6E49',
                '0x1fcc20C03B7fe02DaB31F6aEC06E7E50290c017A',
                '0xF42517deC67Feed85cA78ee7275D8b4448Db7B23',
                '0x75f211e310d80D47C94728b41f62Db1819aA4F3f',
            ],
            PLATINUM : [
                    '0x274de408f0b3e9c34c9e6d44de3e20a06a3b2685',
                    '0x5a7b1761497d7890c690a51dacb419d1bd441081',
                    '0x48af67844ed23210024503942517eb0090ca0eed',
                    '0xc4cdd7dff562c590c5c00b9b5ebb8a53072524a6',
                    '0x49d6a6b8e7e33c2085eebd4d9ae5c75b705a8ebd',
                    '0x7c92f1fc952df91c5c0ed21c4ea196a7359a6755',
                    '0xef2a0000a23e8b2e64b7ff3a657378d10bde749b',
                    
                    '0x129D35e9058D9A501c39796FA819e1F4ACa988aa',
                    '0xF0977DA0B8fb06f85Ef58DE856bf4071E0b9FeE9',
                    '0x8c3ec50E85FB08253aacD0c0710054873a530adD',
                    '0x3ADA164Be6906516cBF0bcDCcc42510e2712835f',
                    '0x0d60b5e19f823bbb509ce1f2c92faEd788dD7B65',
                    '0x6D584561523D903Cf58B96286BF55c47Ab82d57e',
                    '0x39Eb0Ad584103f5F8FE43382110DcF755C77a2B5',
                    '0x01D5Df1799bA30b899206c552cC306990a2Be750',
                    '0xa2a6E302bAA6837C7b310A0ddaD667234A62aA0E',
                    '0xAEA862a5860C05900B336600652d9Dc67D78f0F5',
                    '0x084e0Cb300F6E35A2bee657d25AA527f35B88Aa7',
                    '0x233013aFEb14B74aED3F869234cB4b18Ac7e4b12',
            ],
            GOLD : [
                '0xb9be5e36df1295851fc26f26cc6dffcb9836b8ca',
                '0xe65e62bde486d9d36d0e1df50309642f17e29fa2',
                '0x383439b0311549a7afe0070da1f58a210ade2c35',
                '0xe9c447c2c39fa8242c3a22e6cf9a0bd1a2612daf',
                '0xa72b92efd54f2f0637bbf1a9fbae6dea6ea9e43c',
                
                '0x7DAe313a90F9FFa3081177B6b7ff74409188D09a',
                '0xEa8d753d476675a50a98a6d0632935CC14B9E1C4',
                '0x03ca51ff5bc5Aa12dAB4E25a3C8551fE8cb0FF62',
                '0xbC5aEA3481FA202a5598d89dcfE31794AaaCefBb',
                '0x031F02CC92A537cA39D599e3B9f2cb2ae41C4266',
                '0x88C017A5121C7cF60b72e16Ea06d47E4474786aa',
                '0xFc04E26B6163516010aB0ef5a81192DC6FA6b16C',
                '0xE3426005ad89249008A4899b97E6816CEc9fA73B',
                '0x68Ba85171A6aD969eEB0c2cEBAAfdE60E789eCa4',
                '0x8A75Ec1b9D2C6787C92b1B4039C26c69C874798d',
                '0xC14737E51e79Ea666E3434B2fc4C445A968C082E',
            ],
            ELITE : [
                    '0xdcbbcf2fb454362241c9e974a25bbc53ff7d71c2',
                    '0xfd0101a542dfb96c4017bd102dd41fad3b7f3028',
                    '0xa69f74c260e4a79bdc4d42a1b11e6a151f282995',
                    '0xdccf29fa0f10922f6284441193b0192d361101d4',
                    
                    '0xE350db5722e7e1527335ee8CFf4375dDd52E0e8A',
                    '0x4082f324b1a2D463A9427bdE2767aC3240b59946',
                    '0x5438c71e9D2532B4BC1795c700659494F70841D7',
                    '0x0F2379e92733a372fDe1Cd3e83A3cF996c3aAb9D',
                    '0xaa8356E9d73C633F73607b479971ed82dFe0efce',
                    '0x1cFec67f01e040fD27007C79eF681Aa8a29Fd6eA',
                    '0x5Ee5f5AB007B75aB811017D9f19e42F4F5c0277E',
                    '0x10Ea1a7b975FDaE9F236aA8e90bC7237E3d2be24',
                    '0x971f7A98f773abbe50Af731A46cf812a472c2D1F',
            ]
        }
    }
]