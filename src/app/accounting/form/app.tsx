//管理負責狀態和處理邏輯
"use client";
import { useEffect, useState } from 'react';
import { auth, db } from '../../../../firebase'
import { collection, query, where, getDocs, deleteDoc, doc,getDoc } from 'firebase/firestore';
import Input from './input';
import List from './list';
import Total from '../../component/sum'



interface InputData {
    id: string;
    balanceType: 'income'|'expense';
    price: number;
    category: string;
    createdAt:string;
}
interface User{
    uid:string;
    email:string;
}



const App:React.FC = () => {
    //一開始為一個什麼都沒有的列陣
    const [inputs, setInputs] = useState<InputData[]>([]);
    const [total, setTotal] = useState(0);
    const [user, setUser] = useState<User|null>(null);
    const [username, setUsername] =useState<string|null>(null);

    //使用者確認
    useEffect( ()=>{
        console.log('這個函式有跑嗎？')
        const checkAuth = auth.onAuthStateChanged (async (user) => {  
            if(user){
                try{
                    const userDocRef = doc(db, 'users',user.uid);
                    const userDocSnap = await getDoc(userDocRef);
                    if(userDocSnap.exists()){
                        setUser({
                            uid: user.uid,
                            email: user.email!,
                        });
                        setUsername(userDocSnap.data().username);
                        console.log('有登入了！',userDocSnap.data());
                    }else{
                        console.log('沒有登入哦');
                    }
                }catch(error){
                    console.log(error);
                }   
            }else{
                setUser(null);
                console.log('沒有登入哦');
            }
        });
        return () => checkAuth();
    },[])
    //顯示目前的內容
    useEffect(()=>{
        const fetchItems = async()=>{
            if(user){
                try{
                    
                    //從firebase中獲取會員所紀錄的集合
                    const q = query(collection(db,'accounting'), where('uid','==',user.uid));
                    const querySnapshot = await getDocs(q);
                    //查詢結果
                    const fetchedItems = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...(doc.data() as Omit<InputData,'id'>)
                    }))as InputData[];
                    console.log('這邊是我想要檢查的資料',fetchedItems)
                    setInputs(fetchedItems);
                    sumUp(fetchedItems);
                    
                }catch(error){
                    console.log(error);
                }  
            }
            
        }
        fetchItems();
    },[user]);

    const sumUp = (items:InputData[])=>{
        const total = items.reduce((acc, item)=>{
            return acc + (item.balanceType === 'income' ? item.price : -item.price);
        },0)
        setTotal(total);
    }

    //新增一個紀錄
    const onAddItem = (item: InputData) =>{
        const newInputs =[...inputs,item];
        //在紀錄的陣列中添加一個紀錄
        setInputs(newInputs);
        //合計紀錄
        sumUp(newInputs);
    }
    //刪除紀錄
    const deleteInput = async (id:string) => {
        try{
            //從firebase中刪除
            await deleteDoc(doc(db, 'accounting', id));
            //更新畫面
            const updatedInputs = inputs.filter(item => item.id !==id);
            //檢查紀錄i是否不等於傳入Id，當不等於i.id時，保留於心陣列中
            setInputs(updatedInputs);
            sumUp(updatedInputs);
        }catch(error){
            console.error('錯誤',error);
        }

        
    };
    return (
        <div className='account'>
            <Input onAddItem={onAddItem} />
            <List inputs={inputs} onDeleteInput={deleteInput} />
            <Total total={total}/>
        </div>
    )
}

export default App;