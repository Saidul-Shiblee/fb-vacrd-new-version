'use client'

import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import React from 'react';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';


const Handle = Slider.Handle;
const handle = (props) => {
    const { value, dragging, index, ...restProps } = props;
    return (
        <Tooltip
            prefixCls="rc-slider-tooltip"
            overlay={value}
            visible={dragging}
            placement="top"
            key={index}
        >
            <Handle value={value} {...restProps} />
        </Tooltip>
    );
};

const wrapperStyle = { width: 400, margin: 50 };

const SliderWithToolTip=()=>{
  return ( <div style={wrapperStyle}>
        
        <Slider min={0} max={20} defaultValue={3} handle={handle} />
    </div>)

}

export default SliderWithToolTip
  
        


