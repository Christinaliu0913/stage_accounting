import { useState, useEffect } from 'react';
import { auth, db } from '../../../firebase';
import {doc, getDoc} from 'firebase/firestore';


interface User {
    uid: string;
    email: string;
 }

const useAuth  = (ListTest: unknown) =>{
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User|null>(null);
    const [username, setUsername] = useState<string|null>(null);

    useEffect(() => {
        //檢查目前使用者有沒有登入
        const checkAuth = async () => {
            const currentUser = auth.currentUser;
            if(currentUser){
                const userDocRef =doc(db, 'users', currentUser.uid);
                const userDocSnap = await getDoc(userDocRef);
                if(userDocSnap.exists()){
                    setUser({
                        uid: currentUser.uid,
                        email: currentUser.email!,//!代表確信email一定有值
                    });
                    setUsername(
                        userDocSnap.data().username,
                    );
                }
            }
            setIsLoading(false);
        };
        
        checkAuth();

        //監聽使用者登入變化
        //當用戶登入或登出時會觸法
        const SignInUp = auth.onAuthStateChanged(async()=>{
            if(user){
                const userDocRef = doc(db,'users', user.uid);
                const userDocSnap = await getDoc(userDocRef);
                if(userDocSnap.exists()){
                    setUser({
                        uid: user.uid,
                        email: user.email,
                    });
                    setUsername(userDocSnap.data().username)
                }
            }else{
                setUser(null);
            }
            setIsLoading(false);
        });

        return () => SignInUp();
    },[]);
    return {user, isLoading, username};
};

export default useAuth;