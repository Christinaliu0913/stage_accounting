"use client"; 
import "./globals.css";
import SignUp from "./component/signup";
import SignIn from "./component/signin";


const Home = () => {
  return (

    <>
      <div className="page">
      <div className="head">練習我的專案</div>
      <div className="intro">歡迎來到我的頁面</div>
      <div className="sign"><SignIn/></div>
      <div className="sign"><SignUp/></div>
      </div>
    </>
    
  );
};

export default Home;