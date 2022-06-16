import React, { useEffect } from 'react';
import './App.css';
import Layout from './components/common/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import Ruler from '@scena/ruler';
import axios from 'axios';
// import {Cookies} from "js-cookie"
import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie';
axios.defaults.withCredentials = true

function App() {

  return (
    <div className="App">
      <Layout />
    </div>
  );
}

export default App;
