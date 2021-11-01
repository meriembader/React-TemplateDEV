import React from 'react';
import { Row } from 'react-bootstrap';
import alertIcon from '../../../www/icons/alert-icon.png';
import checkIcon from '../../../www/icons/check.png';
import './poster.scss';

const Poster =({hidden,type,msg})=>{

  if(hidden){
    return null;
  }

  let posterClassNames = {
    'success': { box: 'poster-box-success', icon: checkIcon },
    'warning': { box: 'poster-box-error', icon: alertIcon },
    'info': { box: 'poster-box-success', icon: checkIcon },
    'error': { box: 'poster-box-error', icon: alertIcon },
};

  return(

      <Row className={posterClassNames[type]?posterClassNames[type].box:'poster-box-success'}>
        <img className = "poster-check-icon" src={posterClassNames[type]?posterClassNames[type].icon:checkIcon} />
        <span className = "poster-alert-text">{msg}</span>
      </Row>

 );

}
export default Poster;
