import { IPropsGuide } from './type'
const Index = function (props: IPropsGuide) {
  let { width, height, currentItem } = props;
  return (
    <div className='dr-guideLine' style={{ width, height, position: 'absolute' }}>
      <span></span>
    </div>
  );
};
export default Index;
