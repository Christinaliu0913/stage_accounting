import { auth, db } from '../../../firebase';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc} from 'firebase/firestore';


const SignUp = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username,setUsername] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [registered, setRegistered] =useState(false)

    const handleSignUp = async () =>{
        setIsLoading(true);//顯示開始載入
        try{
            //使用者憑證
            const userCredential = await createUserWithEmailAndPassword(auth,email,password);
            //成功註冊
            const user = userCredential.user;
            //保存會員名稱到firestore
            //doc 創建一個文檔引用
            await setDoc(doc(db,'users', user.uid),{
                uid: user.uid,
                email:user.email,
                username: username
            })
            console.log('User signed up', user);
            setError(null);
            setRegistered(true)
            setEmail('');
            setPassword('');
            setUsername('');

        } catch(error:any){
            setError(error.message);
            console.error('Error signing up',error);
        }finally{
            setIsLoading(false);//結束載入
        }
    };

    return (
        <>
            <h3>註冊一個帳號</h3>
            <input 
                type="text" 
                placeholder='Your Username'
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
            />
            <input 
                type="email" 
                placeholder='Your Email' 
                value={email} 
                onChange={(e)=>setEmail(e.target.value)}
            />
            <input 
                type="password" 
                placeholder='Your password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />
            <button onClick={handleSignUp} disabled={isLoading}>{ isLoading ? "註冊中...":"註冊"}</button>
            {error && <p style={{color:'red'}}>{error}</p>} {registered && !error && !isLoading &&<p style={{ color: 'darkgreen' }}>註冊成功</p>}
        </>
    )
}

export default SignUp;