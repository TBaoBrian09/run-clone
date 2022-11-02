import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { APIKEY } from "config/index"

export function GetTimeStamp(blockNumber:number){
  axios.get(`
      https://api.bscscan.com/api
      ?module=block
      &action=getblockreward
      &blockno=${blockNumber}
      &apikey=${APIKEY}
  `)
      .then(res => {
          return res
      })
      .catch(error => console.log(error));
}