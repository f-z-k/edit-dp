import React, { useRef, forwardRef, ForwardRefRenderFunction } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import BBB from './index1'
import reportWebVitals from './reportWebVitals';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const AA = forwardRef<HTMLDivElement, any>(function (props, ref) {
  return <div ref={ref}>1</div>
})
const BB = function() {
  const ref = useRef(null)
  return <div>
    <AA ref={ref}/>
  </div>
}
root.render(
  <React.StrictMode>
    <div style={{padding: 50}}>
      <BB />
      {/* <BBB /> */}
      <App />
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
