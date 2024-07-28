"use client";
import React from 'react';
import Item from './item'
//設定資料型態
interface InputData {
    id: number;
    type: 'income'|'expense';
    price: number;
    cat: string;
}
interface ListProps{
    inputs:InputData[];
    onDeleteInput: (id:number)=>void;
}


//顯示所有紀錄
const List:React.FC<ListProps> = ({inputs, onDeleteInput}) => {

    return(
        <div className='account-list'>
            {inputs.map(input =>(
                <Item
                    key={input.id}//每個元素標識符
                    input={input}//所有值type,price,cat等
                    onDelete={()=>onDeleteInput(input.id)}//調用刪除Function
                />
            ))}
        </div>
    )
}

export default List;