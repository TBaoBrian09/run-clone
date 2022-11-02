import { useEffect, useState } from 'react'
import { useWeb3React } from "@web3-react/core";
import contracts from 'config/constants/contracts';
import { getAddress } from 'utils/addressHelpers'
import { Conditions } from "views/Membership/config";
import axios from 'axios'
import { X_API_KEY, GET_NFT_BALANCE_OWNER } from 'config';

export const GetNFTBALANCE = () => {
    const [ fetchBalance, setFetchBalance ] = useState([])
    const { account } = useWeb3React()
    const [ listNftBalance, setListNftBalance ] = useState([])
   
    const chainId = getAddress(contracts.bscChainId)
    useEffect(() => {
        const fetchOnWallet = async () =>{
          try {
            const dataTmp = []
            const {data: response} = await axios({
                method: 'GET',
                url: `${GET_NFT_BALANCE_OWNER}/${account}/nft?chain=${chainId}&format=decimal`,
                headers: {
                    "X-API-Key": X_API_KEY
                }
            });
            const filterData = response.result
            if ( filterData.length !== 0 ){
                const result = Conditions.map((d, i) => {
                    const countNft = filterData.filter(data => data.token_address.toLowerCase() === getAddress(Conditions[i].contractAddress).toLowerCase())
                    return { ...d, totalNft: countNft.length }
                })
                .filter(d => d.totalNft > 0)
                const sortConditions = result.sort((a, b) => (a.order_id - b.order_id))
                setListNftBalance(sortConditions)
            }
          } catch (error) {
            console.error(error);
          }
        }
        if ( account ) {
            fetchOnWallet();
        }
      }, [account, chainId]);
       
    return { listNftBalance }
}