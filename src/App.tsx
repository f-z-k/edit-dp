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
      <DR.Item id="11111"></DR.Item>
      <DR.Item
        id="22222"
        width={100}
        height={100}
        x={200}
        y={300}
      ></DR.Item>
    </DR.EditBox>
  );
}

export default App;
