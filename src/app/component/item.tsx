"use client";

//表示單列紀錄的組件

//資料型態
    //接口 
interface InputData {
    type: 'income'|'expense';
    price: number;
    cat: string;
}
//使用接口類型
interface ItemProps{
    input:InputData;
    onDelete: ()=>void
}


//接受input, ondelete兩個props，從input中獲得三個屬性
const Item: React.FC<ItemProps> = ({input, onDelete})=>{
    const {type,price,cat} = input;

    return(
        <div className='account-list-item'>
            <div className="account-list-balance" style={{color: type ==='income'?'#8EB16C':'#CD8474'}}>{ type ==='income' ?'收入' :'支出'}</div>
            <div>{price}</div>
            <div>{cat}</div>
            <button className='account-list-delete' onClick={onDelete}>刪除</button>
        </div>
    )
}

export default Item;