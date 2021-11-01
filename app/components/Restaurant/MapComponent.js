import React, {useEffect, useState} from 'react';
import GoogleMapReact from 'google-map-react';
import { Row, Col, Container} from 'react-bootstrap';
import {IcoRxSort, IcoRxVegan, IcoRxVegetarien, IcoRxGluten, IcoRxHalel, IcoRxCasher} from '../lib/BsCustomerIcon/BsGenerateIcon';
import MapPopover from "./MapPopover";
import './MapComponent.scss';
import DropdownStandard from "../lib/Dropdown/DropdownStanddard/DropdownStandard";
import {FormattedMessage} from "react-intl";
import messages from "./messages";
import TitleBoldText from "../lib/TitleBoldText";
import DetailsText from "../lib/DetailsText/DetailsText";
import {loadRestaurants} from "../../containers/MainApp/Restaurants/Reducer/actions";

const filterPrice = [{code: 1, label: '€'}, {code: 10, label: '€€'}, {code: 100, label: '€€€'}, {code: 1000, label: '€€€€'}];
const filterDietetic = [
  {icon: IcoRxVegan, code: 'vega', label: (<FormattedMessage {...messages.filterVeganItem} />)},
  {icon: IcoRxVegetarien, code: 'vegetarien', label: (<FormattedMessage {...messages.filterVegetarienItem} />)},
  {icon: IcoRxGluten, code: 'gluten', label: (<FormattedMessage {...messages.filterGlutenItem} />)},
  {icon: IcoRxHalel, code: 'halel', label: (<FormattedMessage {...messages.filterHalelItem} />)},
  {icon: IcoRxCasher, code: 'casher', label: (<FormattedMessage {...messages.filterCasherItem} />)},
];
const filterSort = [
  { code: 'views', label: (<FormattedMessage {...messages.filterSortPopularItem} />)},
  { code: 'near', label: (<FormattedMessage {...messages.filterSortNearItem} />)},
  { code: 'globalRating', label: (<FormattedMessage {...messages.filterSortNoteItem} />)},
  { code: 'delivery', label: (<FormattedMessage {...messages.filterSortDeliveryItem} />)},
];
// Marker component
const Marker = props => {
  const { restaurant } = props;
  return (
    <div>
      {restaurant && <MapPopover restaurant={restaurant} />}
    </div>
  );
};

const initialCenter = {
  lat: 0,
  lng: 0,
};

const MapComponent = ({ restaurants, marker, isList, containerStyle, filterAction, sortRestoBy }) => {
  const[clearFilter, setClearFilter] = useState(false);
  let centerMarker = isList ? restaurants[0] : marker;
  centerMarker = centerMarker && centerMarker.location ? { lat: centerMarker.location.coordinates[1], lng: centerMarker.location.coordinates[0] } : initialCenter;

  useEffect(() => {
    setClearFilter(false);
  }, [clearFilter]);

  return (
   
   <Container bsPrefix='h-100'>
     {isList && <Row className="row-filter">
        <Col></Col>
        <Col bsPrefix='pl-5 pr-2'>
          <DropdownStandard className="tripar align-filter3 " role='tri' onClick={sortRestoBy} title={(<FormattedMessage {...messages.filterSortTitle} />)} toggleIcon={{icon: IcoRxSort}} itemType='radio'  menu={filterSort} clearFilter={clearFilter}/>
 
                
           
        </Col>
        <Col bsPrefix='pl-5 pr-2'>
          <DropdownStandard className="prix align-filter3 " role='budget' onClick={filterAction} title={(<FormattedMessage {...messages.filterPriceTitle} />)} itemType='button'  menu={filterPrice} clearFilter={clearFilter}/>
        </Col>
        <Col bsPrefix='pl-5'>
          <DropdownStandard  className="diab align-filter3 " role='dietetic' onClick={filterAction} title={(<FormattedMessage {...messages.filterDieteticTitle} />)} itemType='checkbox'  menu={filterDietetic} clearFilter={clearFilter}/>
        </Col>
        <Col>
          <TitleBoldText size="16px" className="link-color" >
            <span onClick={() => {filterAction(null, null, 'CLEAR'); setClearFilter(true)}}>  <FormattedMessage {...messages.filterDeleteAll} /> </span>
          </TitleBoldText>
        </Col>
      </Row>}
     <Row className={containerStyle} >
       <Col>
   
         </Col>
    </Row>
   </Container>
  );
};

export default MapComponent;
