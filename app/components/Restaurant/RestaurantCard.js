/*
 * RestaurantCard
 *
 * This is the restaurant Card Components
 *
 */

import React,{useState} from 'react';
import {Row, Col} from 'react-bootstrap';
import './RestaurantCard.scss';
import RestaurantCardBody from './RestaurantCardBody';
import {IcoFavorisAtive, IcoFavorisDisAtive, IcoRxApple} from '../lib/BsCustomerIcon/BsGenerateIcon';

const RestaurantCard = ({
  restaurant,
  onAddFavorit
}) => {

  const [bookMark, setBookMark] = useState(
    false,
  );
  const handleFavorite = async () => {
    setBookMark(!bookMark);
    onAddFavorit(restaurant._id)
  };

  return (
    <Row className="restaurant-card-box">
      <Col
        lg={6}
        md={6}
        xs={6}
        className="restaurant-card-img"
        style={{
          backgroundImage: `url(${restaurant.imageUrl})`,
          backgroundSize: 'cover',
        }}
      >
        <div className="favorite-icon"  onClick={() => handleFavorite()}>
          { bookMark? <IcoFavorisAtive /> : <IcoFavorisDisAtive/>}
         
        </div>
      </Col>
     <RestaurantCardBody restaurant={restaurant} />
    </Row>
)};

export default RestaurantCard;
