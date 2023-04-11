const Index = function (props: { itemEle: HTMLDivElement; width: number; height: number }) {
  return (
    <div style={{ width: props.width, height: props.height, position: 'absolute' }}>
      <span></span>
    </div>
  );
};
export default Index;
