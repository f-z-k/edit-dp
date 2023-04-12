import { useState } from 'react';
import { IPropsEdit, OnMove, CurrentItem } from './type';
import GuideLine from './GuideLine';
import { editContext } from './Context/EditContext';
import { onMoveContext } from './Context/OnMoveContext';
const Index = function (props: IPropsEdit) {
  let { width, height } = props;
  const [boundsEle, setBoundsEle] = useState<HTMLDivElement | null>(null);
  const [currentItem, setCurrentItem] = useState<CurrentItem>();
  const onMove: OnMove = (item) => {
    setCurrentItem(item)
  }
  return <div style={{width, height}} ref={(ref) => {
    setBoundsEle(ref)
  }}>
    {
      <GuideLine width={width} height={height} currentItem={currentItem} />
    }
    <onMoveContext.Provider value={onMove}>
      <editContext.Provider value={boundsEle}>
        {props.children}
      </editContext.Provider>
    </onMoveContext.Provider>
  </div>;
};
export default Index;
