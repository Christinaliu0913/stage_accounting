//管理負責狀態和處理邏輯
"use client";
import {useState} from 'react';
import Input from './input';
import List from './list';
import Total from './sum'


interface InputData {
    id: number;
    type: 'income'|'expense';
    price: number;
    cat: string;
}



const App:React.FC = () => {
    //一開始為一個什麼都沒有的列陣
    const [inputs, setInputs] = useState<InputData[]>([]);
    const [total, setTotal] = useState(0);
    //新增一個紀錄
    const addInput = (type: 'income'|'expense',price:number,cat:string) =>{
        const newInput = {
            id: inputs.length +1,
            type,
            price,
            cat
        };
        //在紀錄的陣列中添加一個紀錄
        setInputs([...inputs,newInput]);
        //合計紀錄
        setTotal(total + (type === "income" ? price : -price));
    }
    //刪除紀錄
    const deleteInput = (id:number) => {
        //i為inputs中的一個紀錄
        const inputToDelete = inputs.find(i => i.id ===id);

        if(!inputToDelete) return;
        //檢查紀錄i是否不等於傳入Id，當不等於i.id時，保留於心陣列中
        setInputs(inputs.filter(i => i.id !==id));
        setTotal(total - (inputToDelete.type ==="income" ? inputToDelete.price : -inputToDelete.price));
    }
    return (
        <div className='account'>
            <Input onAddInput={addInput}/>
            <List inputs={inputs} onDeleteInput={deleteInput}/>
            <Total total={total}/>
        </div>
    )
}

export default App;