
import React, { useState, useEffect } from "react";
import { Decrypts } from "config/api/decrypts";
import { HashClient } from "config/api/encrypt";
import axios from "axios";
import { URL } from "config/index"
import { ListShoes, ListBoxes } from "./type";


export const fetchListBoxes = async (userId:string): Promise<ListBoxes> => {
    try {
        const hash =  HashClient('sneaker/list');
        const token = Decrypts()
        const {data: response} = await axios({ 
            method: 'GET',
            url: `${URL}/sneaker/list?user_id=${userId}&is_box_open=0`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'hash-client': `${hash}`
              }
        });
        return {
            listBoxes:response.data.data
        }
    }
    catch(error) {
        console.log(error)
        return {
            listBoxes:[]
        }
    }
}
export const fetchListShoes = async (userId:string): Promise<ListShoes> => {
    try {
        // const token = localStorage.getItem('serviceToken');
        const hash =  HashClient('sneaker/list');
        const token = Decrypts();
        const {data: response} = await axios({
            method: 'GET',
            url: `${URL}/sneaker/list?user_id=${userId}&is_box_open=1`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'hash-client': `${hash}`
              }
        });
        return {
            listShoes:response.data.data.filter((data) => data.type !== 5)
        }
    }
    catch(error) {
        console.log(error)
        return {
            listShoes:[]
        }
    }
}