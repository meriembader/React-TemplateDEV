import React from 'react';
import RangeSlider from 'react-bootstrap-range-slider';
import './inputStyle.scss';


export const RangeSliderRx=({tooltipPlacement,tooltip, onChange, min, max, className, variant, hidden})=>{
  if(hidden){
    return;
  }
  return(
    <RangeSlider
      tooltip={tooltip?tooltip:"on"}
      tooltipPlacement={tooltipPlacement?tooltipPlacement:"top"}
      onChange={onChange}
      min={min?min:0}
      max={max?max:10}
      className="range-slider__wrap"
      variant="danger"/>
  );
}

export default RangeSliderRx;
