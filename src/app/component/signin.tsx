import { auth, db } from '../../../firebase';
import { useEffect, useState } from 'react';
import { signInWithEmailAndPassword,signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { setPersistence, browserLocalPersistence} from 'firebase/auth'
import { Fira_Mono } from 'next/font/google';





const SignIn = () =>{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error, setError] = useState<string|null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [signedIn, setSignedIn] = useState(false);
    const [displayStart, setDisplayStart] = useState('none');
    const [DisplayButton, setDisplayButton] = useState('block');
    const [username, setUsername] = useState<string|null>(null);
    

   
    //確認登入狀態
    useEffect(() => {
        console.log('這個函式有跑嗎？')
        const checkAuth = auth.onAuthStateChanged (async (user) => {
            setIsLoading(true)
            if(user){
                const userDocRef = doc(db, 'users',user.uid);
                const userDocSnap = await getDoc(userDocRef);
                if(userDocSnap.exists()){
                    setUsername(userDocSnap.data().username);
                    setSignedIn(true);
                    setDisplayStart('inline-block');
                    setDisplayButton('none')
                    console.log('有登入了！',userDocSnap.data());
                }else{
                    console.log('沒有登入哦');
                }
                setIsLoading(false);
            }
        });
        return () => checkAuth();
    },[]);


    const handleSignIn = async() => {
        setIsLoading(true);
        try{
            if(signedIn){// 如果已經登入了話
                await signOut(auth);
                setSignedIn(false);
                setDisplayStart('none');
                setDisplayButton('block');
                setUsername(null)
                console.log('已登出');
            }else{
                //使用者憑證
                const userCredential = await signInWithEmailAndPassword(auth,email,password);
                const user = userCredential.user;
                console.log(user, ' : 登入成功');
    
                //獲得用戶的IdToken
                const idToken = await user.getIdToken();
                //設置Cookie或local Storage
                const expiresIn = 24*60*60*100
                const expiresDate = new Date( new Date().getTime() + expiresIn);
                document.cookie = `idToken=${idToken}; expires=${expiresDate.toUTCString()} path=/`;
                console.log('User signed in and token stored in cookie.');
                
                //找使用者名稱
                const userDocRef = doc(db, 'users',userCredential.user.uid);
                const userDocSnap = await getDoc(userDocRef);
                if(userDocSnap.exists()){
                    setUsername(userDocSnap.data().username);
                    console.log('我想確認資料',userDocSnap.data());
                }else{
                    console.log('找不到使用者名稱');
                }
                setSignedIn(true);
                setDisplayStart('inline-block');
                setDisplayButton('none')
            }
            setError(null);
            setEmail('');
            setPassword('');
            }catch(error:any){
            if(error.message){
                setError(error.message);
            }else{
                setError('發生錯誤')
            }
            console.error('error sigining in')
        }finally{
            setIsLoading(false);
        }
    };
        

    return(
        <>
            {isLoading ? <div>確認登入狀態中....</div>:''}
            <h3>{signedIn ? `${username}已登入`:'登入你的帳號'}</h3>
            <input 
                style={{display:DisplayButton}}
                type="email"
                placeholder='Your Email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />
            <input 
                style={{display:DisplayButton}}
                type="password" 
                placeholder="Your Password" 
                value={password}
                onChange={(e)=>setPassword(e.target.value)} disabled={isLoading} />
            <button onClick={handleSignIn} disabled={isLoading}>{signedIn ? '登出':'登入'}</button>
            <button style={{display:displayStart}} onClick={()=> window.location.href='/accounting'}>立即開始</button>
            {error && <p style={{color:'red'}}>{error}</p> }
        </>
        
    )

};

export default SignIn;