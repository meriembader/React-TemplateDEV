import React, { memo, useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect, useDispatch } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Row, Col, Form } from 'react-bootstrap';
import { IcoRxAndroid, IcoRxApple, IcoRxStepThree, IcoRxStepTwo, IcoRxStepOne, IcoRxSearch }from '../../../components/lib/BsCustomerIcon/BsGenerateIcon';
import Axios from "axios";
import Pagination from '../../../components/lib/Pagination/Pagination';
import './RestaurantsContainer.scss';
import Footer from '../../../components/Footer/Footer';
import messages from './messages';
import { loadRestaurants, sortRestaurants } from './Reducer/actions';
import RestaurantCard from '../../../components/Restaurant/RestaurantCard';
import RestaurantMapCard from '../../../components/Restaurant/RestaurantMapCard';
import MapComponent from '../../../components/Restaurant/MapComponent';
import { updateRestaurants, loadRestaurantsByCategories2 } from '././Reducer/actions';
import ArrowIcon from '../../../www/icons/arrow2.svg';
import NavbarClient from '../../NavbarHeader/NavbarHeader';
import RestaurantCardList from '../../../components/Restaurant/RestaurantCardList';
import InputTextEntry from "../../../components/lib/FormInputs/InputTextEntry";
const BASE_URL = '';//const BASE_URL = 'https://mydish-backend.herokuapp.com/api';



  const onRequestSuccess = config => {
    if (config.method == 'get') {
      config.headers = {
        ...config.headers,
        Pragma: 'no-cache',
        'If-Modified-Since': '0',
      };
    }

    /*if (
      sessionStorage.getItem('myDish-token') !== undefined &&
      sessionStorage.getItem('myDish-token') !== null
    ) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${sessionStorage.getItem('myDish-token')}`,
      };
    }*/

    return { ...config, url: BASE_URL + config.url };
  };


const RestaurantsContainer = ({
  intl: { formatMessage },
  loading, loadRestaurantsByFilter,
  error,
  loadRestaurantsByCategories,
  updateRestaurants,
  restaurants,
  pagination,
  filter,
  match,
}) => {
  const { category } = match.params;
  const [filters, setFilters] = useState({budget: null, dietetic: [] });
  const[currentPage, setCurrentPage] = useState(1);
  const[currentRestos, setCurrentRestos] = useState(1);
  const[totalPages, setTotalPages] = useState(1);
  const dispatch = useDispatch();
  const [RestaurantList, setRestaurantList] = useState([]);
  const [FilteredResult, setFilteredResult] = useState([]);
  const [searchTerm,setSearchTerm] = useState('');
  console.log(searchTerm);
  const handleOnClick=(filter, code, actionMode)=>{
    const filterCopy = filters;
    if(actionMode){
      if(actionMode !== 'CLEAR'){
        if(actionMode === '+'){
          filterCopy[code] && filterCopy[code].push(filter);
        }else{
          filterCopy[code] = filterCopy[code] && filterCopy[code].filter(element => element !== filter );
        }
        setFilters(filterCopy);
      }else{
        setFilters({budget: null, dietetic: [] });
      }
    }else{
      filterCopy[code]=filter;
      setFilters(filterCopy);
    }
  }


  const onPageChanged = data => {
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentResto = restaurantsSorted.slice(offset, offset + pageLimit);
    setCurrentPage(currentPage);
    setCurrentRestos(currentResto);
    setTotalPages(totalPages);
  }

  const sortRestoBy=(code)=>{
    dispatch(sortRestaurants(restaurants.sort((a, b) => a[code] - b[code])));
  }

const ax=Axios.create();
 const   baseURL = 'http://localhost:5000/Restaurant/getRestaurantList';
 ax.interceptors.request.use(onRequestSuccess);

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    dispatch(loadRestaurants({ category, pagination: { page: 1, limit: 5 } }));



    ax.get(baseURL).then((response) => {
      setRestaurantList(response.data);
     
      console.log(response.data);
     
    });

  

  }, []);

const searchData=(value)=>{
  setSearchTerm(value);
  if(searchTerm!== ''){
    const filteredData=RestaurantList.filter((el)=>{
      return Object.values(el).join('').toLowerCase().includes(searchTerm.toLowerCase());
      })
      setFilteredResult(filteredData);
      console.log("fsdfsdfd");
  }
else{
  setFilteredResult(RestaurantList);
}


}

  return (
 
     <div>
  
  
<NavbarClient  withSearchText={true}/>
  
        <div>
            <input  className="search-field-input" icon='search'
               placeholder='saissiez votre rechercher'
               onChange={(e)=>searchData(e.target.value)}
            />
      
     

        </div>
         

    
      

      <div className="restaurants-list-body">
   


      <section class="section-products">
		<div class="container">
  
          
       <div class="row">
	

          <Col lg="6" md="6" xs="18" >
          <div className="d-flex bk-offer marge-col-card-title">
              <span> {RestaurantList.length}  <span>{formatMessage(messages.restaurantsLabel)}</span></span>
            </div>
         </Col>
         <Col lg="6" md="6" xs="18">
           {RestaurantList.length && (
             <MapComponent
               restaurants={restaurants}
               containerStyle="h-100"
               isList={true}
               formatMessage={formatMessage}
               filterAction={handleOnClick}
               sortRestoBy={sortRestoBy}
             />
           )}
         </Col>
    
  </div>
<br></br>
<br></br>

				<div class="row justify-content-center text-center">
						
				</div>
				<div class="row">
	      {searchTerm.length>1 ? (
          FilteredResult.map((el, index) => (
            <div class="col-md-4 col-lg-4 col-xl-3">
               <RestaurantMapCard
                    favoris ={el} order={index} type={el.type}
                  />
          </div>
            
            ))
        ) : (
          restaurants.map((el, index) => (
            <div class="col-md-4 col-lg-4 col-xl-3">
               <RestaurantMapCard
                    favoris ={el} order={index} type={el.type}
                  />
          </div>
            
            ))
        ) }
    				
				</div>
       
            
        <Row className="mt-4">
              <div className="ml-auto">
                <Pagination totalRecordsRx={restaurants.length} pageLimitRx={4} pageNeighboursRx={2} onPageChanged={onPageChanged} />
              </div>
            </Row>
		</div>
    
</section>


     







       
      </div>
      <Footer />;
    </div>
  );
};

const mapStateToProps = (state, props) => {
  const { restaurants, loading, error, pagination, filter } =
    state.restaurants || {};
  return {
    restaurants,
    loading,
    error,
    pagination,
    filter,
  };
};




export function mapDispatchToProps(dispatch) {
  return {
    loadRestaurantsByCategories: () => dispatch(loadRestaurantsByCategories2()),
    loadRestaurantsByFilter: (filter) => dispatch(loadRestaurants({'criteria':filter})),
    updateRestaurants: (id, type, isFavorite) =>
      dispatch(updateRestaurants(id, type, isFavorite)),
  };
}





const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
  injectIntl,
)(RestaurantsContainer);
