import React, { useRef, forwardRef, ForwardRefRenderFunction, useImperativeHandle } from 'react';
const AA = forwardRef(function (props, ref) {
  useImperativeHandle(ref, () => {
    return {
      show: () => {

      }
    }
  })
  return <div>1</div>
})
const BBB = function() {
  const ref = useRef();
  setInterval(() => {
    console.log(ref)
  }, 1000)
  return <div>
    <AA ref={ref}/>
  </div>
}
export default BBB