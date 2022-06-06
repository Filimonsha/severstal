import React, { useEffect } from 'react';
import './App.css';
import Layout from './components/common/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import Ruler from '@scena/ruler';
import axios from 'axios';
axios.defaults.withCredentials = true

function App() {
  // useEffect(()=>{
  //   console.log("Приложение")
  // // },[])
  // const rulerB = new Ruler(document.querySelector(".measurement__wrap")!, {
  //   type: "vertical",
  //   height: 547,
  //   width: 60,
  //   style: {
  //     // position:"absolute"
  //   }
  // });
  return (
    <div className="App">
      <Layout />
    </div>
  );
}

export default App;
