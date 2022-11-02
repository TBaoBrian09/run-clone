import contracts from "./contracts"
import tokens from "./tokens"

export const investPool = [
    {
        storeID:1,
        storeName:"RUN Store 1",
        revenue:"30%",
        apy:"20%",
        depositFee:"2%",
        tokenStake:tokens.Run,
        tokenEarn:tokens.busd,
        storeLocation:"81 Nguyen Hien Street, An Khanh, Ninh Kieu, Can Tho city",
        storeContract:contracts.poolProposals,
        poolStoreContract:contracts.poolStore
    },
    // {
    //     storeID:2,
    //     storeName:"RUN Store 2",
    //     revenue:"30%",
    //     apy:"20%",
    //     depositFee:"2%",
    //     tokenStake:tokens.Run,
    //     tokenEarn:tokens.busd,
    //     storeLocation:"81 Nguyen Hien Street, An Khanh, Ninh Kieu, Can Tho city",
    //     storeContract:contracts.poolProposalsDeltaLabs,
    //     poolStoreContract:contracts.poolStoreDeltaLabs
    // },
    {
        storeID:3,
        storeName:"RUN Store 3",
        revenue:"30%",
        apy:"20%",
        depositFee:"2%",
        tokenStake:tokens.Run,
        tokenEarn:tokens.busd,
        storeLocation:"81 Nguyen Hien Street, An Khanh, Ninh Kieu, Can Tho city",
        storeContract:contracts.poolProposal3,
        poolStoreContract:contracts.poolStore3
    }
]