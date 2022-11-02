import React, { useState, useEffect} from "react";
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import { useWeb3React } from "@web3-react/core";
import { Flex, AutoRenewIcon } from "@phamphu19498/runtogether-uikit"
import PageFullWidth from "components/Layout/PageFullWidth";
import { useTranslation } from "contexts/Localization";
import Body from "./components/Body"
import { listAirdrop } from "../../config"

const AirdropDetails = () => {
    const { t } = useTranslation()
    const { airdroptId }: { airdroptId: string } = useParams()
    const { account } = useWeb3React()
    const [refresh, setRefresh] = useState(false);
    
    const airdrop = listAirdrop(t).filter(d=>d.id === parseInt(airdroptId))
    
    return (
        <PageFullWidth>
           { airdrop.length === 0 ?
                 <Flex mt="1rem" justifyContent="center" alignItems="center" height="100vh">
                    <AutoRenewIcon spin color="primaryBright" style={{width:"30px"}}/>
                </Flex>
           :
                <Body item={airdrop} onRresh={(newValue) => setRefresh(newValue)}/>
           }
        </PageFullWidth>
    )
}
export default AirdropDetails




