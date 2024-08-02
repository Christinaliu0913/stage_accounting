"use client";
import { useState, useEffect } from 'react';
import { auth, db } from '../../../../firebase';
import {collection, doc, setDoc} from 'firebase/firestore';

//設定資料型態
interface InputProps{
    onAddItem:
        (
            item:{
                id: string;
                balanceType: 'income'|'expense';
                price: number;
                category:string;
                createdAt:string;
            }
        )=>void
};

//onAddInput屬性->設定3個狀態值
const Input: React.FC<InputProps> = ({onAddItem})=>{
    const currentUser = auth.currentUser;
    const [balanceType,setBalanceType] = useState<'income'|'expense'>('expense');
    const [price,setPrice] = useState<number| null>(null);
    const [category, setCat] = useState<string>('');

    const addInput = async () =>{
        if(!price || !category){
            alert('請填妥所有資訊');
            return
        }
        if(currentUser){
            //執行函數，儲存項目
            const newDocRef = doc(collection(db,'accounting'));
            const newItem = {
                uid: 
                    currentUser.uid, 
                    balanceType, 
                    price,
                    category,
                    createdAt: new Date().toISOString()
            }
            await setDoc(newDocRef,newItem);
            console.log('已儲存',newDocRef.id);

            onAddItem({
                id: 
                    newDocRef.id,
                    balanceType,
                    price,
                    category,
                    createdAt: newItem.createdAt,
                });
                
            }
        

        
        setPrice (null);
        setCat ('');
    }


    return(
        <div className='account-input'>
    
            <select className="account-input-balance" value={balanceType} onChange={(e)=> setBalanceType(e.target.value as 'income'|'expense')}>
                    <option value="expense">支出</option>
                    <option value="income">收入</option>
            </select>
                <input id="input-price" className="account-input-item" type="number" placeholder="金額" value={price !== null ?price: ''} onChange={(e)=>setPrice(Number(e.target.value))}/>
                <input id="input-cat" className="account-input-item" type="text"  placeholder="項目" value={category} onChange={(e)=>setCat(e.target.value)}/>
                <button id="input-add" onClick={addInput} >新增</button>
        </div>
    
    )   
};

export default Input