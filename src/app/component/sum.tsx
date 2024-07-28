"use client";

//設定資料型態
interface TotalProps{
    total:number
}



const Total:React.FC<TotalProps> = ({total})=>{
    return(
        <div className='account-sumup'>
            <div className='sumup-count'>合計<span id='totalCount'>{total}</span></div>
            <button className='sumup-back' onClick={()=> window.location.href='/'}>返回首頁</button>
        </div>
    )
}
export default Total;