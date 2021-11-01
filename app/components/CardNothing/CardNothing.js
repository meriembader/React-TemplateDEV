import React from 'react';
import { Button, Row } from 'react-bootstrap';
import nofavoris from '../../www/icons/nofavoris.png';
import { FormattedMessage } from 'react-intl';
import './cardNothing.scss';


const CardNothing=({title, msgDetail1, msgDetail2, buttonName })=>{

  return (
    <div className="mt-3">
        <div className="container-card">
          <img alt="user_image" src={nofavoris} fill="red" className="icon-nofavoris" />
          <span className="title-card-nothing"><FormattedMessage {...title} /></span>
          <span className="detail1-card-nothing"><FormattedMessage {...msgDetail1} /></span>
          {msgDetail2&&<span className="detail2-card-nothing"><FormattedMessage {...msgDetail2} /></span>}
        </div>
      <Button className="Path-1047"><FormattedMessage {...buttonName} /></Button>
    </div>
  );
}
export default CardNothing;
