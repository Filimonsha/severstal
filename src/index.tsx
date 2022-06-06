import React from 'react';
// import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom';
import axios from 'axios';
axios.defaults.withCredentials = true
// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />

//     </BrowserRouter>
//   </React.StrictMode>
// );

window.addEventListener('load', () => {
  ReactDOM.render(<React.StrictMode>
    <BrowserRouter>
      <App />

    </BrowserRouter>
  </React.StrictMode>, document.getElementById('root'))
})