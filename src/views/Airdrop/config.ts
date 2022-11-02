import tokens from '../../config/constants/tokens'

export const listAirdrop = (t) => [
    {
        id: 1,
        title: t("$5000 Airdrop for LiveTrade Community 🔥"),
        image: "/images/airdrop/project1.png",
        participate: 2782940,
        numberofwinner: 200,
        totalAirdrop: "$5,000",
        endin:"22-03-2022",
        status:"ended",
        titleDescription:t("$5000 Airdrop for LiveTrade Community 🔥"),
        startTime:1648321200000,
        endTime:1650999600000,
        content:t(`💲200 participants who complete all the entries will be randomly selected as winners and receive one of the following tokens: **$BUSD, $USDT, $LTD, $HTD, $SPG, $ADT, $MOWA, $BAMI** and other valuable **NFTs**.

**PRIZE POOL**  

💸 Total Reward: $5000

🏆 Winners: 200 random participants

💰 Distribution: within 96 hours after the Gleam is closed

⏲️ Closing time: 00:00 UTC March 22, 2022

**HOW TO JOIN **  

[https://gleam.io/RM0jg/livetrade-5000-airdrop-event-is-live-now](https://gleam.io/RM0jg/livetrade-5000-airdrop-event-is-live-now)
        `),
        logoProject:"/images/LTD_Logo.svg",
        name:"LiveTrade LTD",
        issuer:"LiveTrade LTD",
        totalWhitelist:"14,275",
        endTimeClaim:1648562261000,
        address: {
            97: '0x01801516E856760ad292B57A364E00f4a097e668',
            56: '0xD6E9c6193c14474170d4c348479072660c363342'
        }
    }
]
// LTD,BUSD,USDT,BAMI,HTD,ADT
// tokens.LiveTrade, tokens.busd, tokens.usdt, tokens.BAMI, tokens.htd, tokens.adt
export const listTokenEarn = [
    tokens.livetrade , tokens.busd, tokens.usdt, tokens.BAMI, tokens.htd, tokens.adt
]