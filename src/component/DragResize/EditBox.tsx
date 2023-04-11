import { useState } from 'react';
import { IPropsBox } from './type';
import GuideLine from './GuideLine';
import { editContext } from './Context/EditContext';
import { onMoveContext } from './Context/OnMoveContext';
const Index = function (props: IPropsBox) {
  let { width, height } = props;
  const [boundsEle, setBoundsEle] = useState<HTMLDivElement | null>(null);
  const [itemEle, setItemEle] = useState<HTMLDivElement | null>(null);
  const onMoveCb = (dom: HTMLDivElement) => {
    setItemEle(dom)
  }
  return <div style={{width, height}} ref={(ref) => {
    setBoundsEle(ref)
  }}>
    {
      itemEle?<GuideLine width={width} height={height} itemEle={itemEle} />:null
    }
    <onMoveContext.Provider value={onMoveCb}>
      <editContext.Provider value={boundsEle}>
        {props.children}
      </editContext.Provider>
    </onMoveContext.Provider>
  </div>;
};
export default Index;
