"use client";
import React, {useState} from 'react';

//設定資料型態
interface InputProps{
    onAddInput:(
        type: 'income'|'expense', 
        price:number, 
        cat:string)=>void;
}

//onAddInput屬性->設定3個狀態值
const Input: React.FC<InputProps> = ({onAddInput})=>{
    const [balanceType,setBalanceType] = useState<'income'|'expense'>('expense');
    const [price,setPrice] = useState<number| null>(null);
    const [cat, setCat] = useState<string>('');

    const addInput = () =>{
        if(!price || !cat){
            alert('請填妥所有資訊');
            return
        }
        //執行函數，傳入所有參數，並清空欄內值
        onAddInput(balanceType,price,cat);
        setPrice (null);
        setCat ('');
    };

    return(
        <div className='account-input'>
    
            <select className="account-input-balance" value={balanceType} onChange={(e)=> setBalanceType(e.target.value as 'income'|'expense')}name="" id="">
                    <option value="expense">支出</option>
                    <option value="income">收入</option>
            </select>
                <input id="input-price" className="account-input-item" type="number" placeholder="金額" value={price !== null ?price: ''} onChange={(e)=>setPrice(Number(e.target.value))}/>
                <input id="input-cat" className="account-input-item" type="text"  placeholder="項目" value={cat} onChange={(e)=>setCat(e.target.value)}/>
                <button id="input-add" onClick={addInput} >新增</button>
        </div>
    
    )   
};

export default Input