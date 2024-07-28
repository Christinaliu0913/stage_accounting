"use client"; 
import "./globals.css";

const Home = () => {
  return (

    <body>
      <div className="page">
      <div className="head">練習我的專案</div>
      <div className="intro">歡迎來到我的頁面</div>
      <div className="start">
        <button className="changePage" onClick={()=> window.location.href='/accounting'}>點我開始</button>
      </div>
      </div>
    </body>
    
  );
};

export default Home;