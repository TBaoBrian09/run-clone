export interface userProps {
    balanceOf:number
    allowance:number
} 
export interface userStakedProps {
    amount:number
    stakeBlock:number
    unstakeLockTime:number
    pendingReward:number
}
export interface userStaked {
    userStaked:userStakedProps
 }
export interface user {
   dataUser:userProps
}
export interface tvlProps {
    tvl:number
 }
export interface endTimeProps{
    endTime:number
}
export interface endBlockProps{
    endBlock:number
}
 
export interface startTimeProps{
    startTime:number
}
 
 
