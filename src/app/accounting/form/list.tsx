"use client";
import React from 'react';
import {useEffect, useState} from 'react';
import { auth,db } from '../../../../firebase';

import Item from './item'

interface InputData {
    id: string;
    balanceType: 'income'|'expense';
    price: number;
    category: string;
    createdAt:string;
}

interface ListProps{
    inputs: InputData[];
    onDeleteInput: (id:string)=>void;
}

//App會回傳User參數給List
const List:React.FC<ListProps>  = ({inputs, onDeleteInput}) => {


    return(
        <div className='account-list'>
            {inputs.map(item =>(
                <Item
                    key={item.id}//每個元素標識符
                    input={item}//所有值type,price,cat等
                    onDelete={()=>onDeleteInput(item.id)}//調用刪除Function
                />
            ))}
        </div>
    )
}



export default List;