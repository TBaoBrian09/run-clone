import { getAddress } from "utils/addressHelpers";
import contracts from "config/constants/contracts";
import multicall from "utils/multicall";
import mysteryBoxAbi from "config/abi/mysteryBox.json"
import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import { ListTokenId } from "../type";

type BalanceProps = {
    balanceMysteryBox: number
}

export const fetchBalanceNft = async (userAddress:string): Promise<BalanceProps> => {
    try {
        const calls = [
            {
                address: getAddress(contracts.mysteryBox),
                name: 'getTotalUserBuyNft',
                params: [userAddress]
            }
        ]
        const result = await multicall(mysteryBoxAbi, calls)
        const resultNumber = new BigNumber(result.toString()).toNumber();
        return {
            balanceMysteryBox: resultNumber
        } 
    } catch (e) {
        console.log(e)
        return {
            balanceMysteryBox: 0
        } 
    }
 }

 export const fetchTokensId = async (account: string, balance: number): Promise<ListTokenId> => {
    try {
        const listId = [];
        const listIdValid = [];
        const calls = [];
        const callValid = [];
        for (let index = 0; index < balance; index++ ) {
            calls.push({
                address: getAddress(contracts.mysteryBox),
                name: 'userBuyNftListMap',
                params: [account, index]
            })
        }
        const result = await multicall(mysteryBoxAbi, calls);
        for( let index = 0; index < result.length; index++ ) {
            listId.push(parseInt(result[index].toString()))
            callValid.push({
                address: getAddress(contracts.mysteryBox),
                name: 'boxOpenedMap',
                params: [parseInt(result[index].toString())]
            })
        }
        const listIdChecked = await multicall(mysteryBoxAbi, callValid);
        for( let index = 0; index < listId.length; index++ ) {
            if(listIdChecked[index][0] === false) {
                listIdValid.push(parseInt(listId[index].toString()))
            }
        }
        return {
            tokenIds: listIdValid
        }
    }
    catch(error) {
        console.log(error)
        return {
            tokenIds: []
        }
    }
}

export const FetchDataRunBoxIsOpen = (idMysteryBox) => {
    const [ dataBox, setDataBox ] = useState({
        tokenId: 0,
        type: 0
    });
    useEffect(() => {
      const fetchDataBox = async () => {
        try {
            const callBoxId = [
                {
                    address: getAddress(contracts.mysteryBox),
                    name: 'mysteryBoxNftMap',
                    params: [idMysteryBox]
                }
            ]
            const idRunBox = await multicall(mysteryBoxAbi, callBoxId);            
            const index = new BigNumber(idRunBox.toString()).toNumber();
            const callBoxType = [
                {
                    address: getAddress(contracts.mysteryBox),
                    name: 'getBoxTypeRunTogether',
                    params: [index]
                }
            ]
            const boxType = await multicall(mysteryBoxAbi, callBoxType);            
            setDataBox({
                tokenId: new BigNumber(idRunBox.toString()).toNumber(),
                type: new BigNumber(boxType.toString()).toNumber()
            })
        } catch (e) {
          console.log(e)
        }
      }
      fetchDataBox()
    }, [idMysteryBox])
    return { dataBox }
}