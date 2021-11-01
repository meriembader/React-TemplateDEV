import React, { useState } from 'react';
import { Popover } from 'reactstrap';
import RestaurantCardBody from './RestaurantCardBody';
import {IcoRxMarkerGMap} from '../lib/BsCustomerIcon/BsGenerateIcon'
import CardRx from '../lib/Card/CardRx';


const MapPopover = (props) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const {restaurant} = props;
  const toggle = () => setPopoverOpen(!popoverOpen);

  return (
    <div>
      <IcoRxMarkerGMap className="map-marker-img" id={restaurant._id.slice(restaurant._id.length-5, restaurant._id.length)} rate={restaurant.globalRating} discount={restaurant.discount} color={restaurant.offers?'#45b995':'#fb5557'}/>
      <Popover style={{ 'border-radius': '.9rem'}} placement="top" isOpen={popoverOpen} target={restaurant._id.slice(restaurant._id.length-5, restaurant._id.length)} toggle={toggle}>
        <CardRx imageUrl={restaurant.imageUrl} isCustomerCard={true} customerCard={<RestaurantCardBody restaurant={restaurant} vertical={true}/>}/>
      </Popover>
    </div>
  );
}

export default MapPopover;
