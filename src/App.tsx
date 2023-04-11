import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import DR from './component/DragResize';
function App() {
  const [boundsEle, setBoundsEle] = useState<HTMLDivElement>();
  return (
    <DR.EditBox
      width={800}
      height={800}
    >
      <DR.Item></DR.Item>
      <DR.Item
        width={100}
        height={100}
        x={200}
        y={300}
      ></DR.Item>
    </DR.EditBox>
  );
}

export default App;
