import {
  LOAD_RESTAURANTS,
  LOAD_RESTAURANTS_ERROR,
  LOAD_RESTAURANTS_SUCCESS,
  LOAD_RESTAURANTS_SORT,
} from '../constants';



export function loadRestaurants(filter) {
  return {
    types: [LOAD_RESTAURANTS, LOAD_RESTAURANTS_SUCCESS, LOAD_RESTAURANTS_ERROR],
    promise: client => client.post('/restaurants/list'),
    filter,
  };
}

export function sortRestaurants(restaurants) {
  return {
    types: LOAD_RESTAURANTS_SORT,
    restaurants,
  };
}
export const dataX = [
  {
  "_id":"rest1",
  "avgPrice":35.0,
  "name":"Joayo-Haussmann",
  "owner":{
    "id":"6048e1f839e5e3170c959478",
    "ref":"User"
  },
  "description":"Belle dcouverte et joli cadre Raviolis excellents et barbecue de canard et porc pics super Bon cheesecake au yuzu et belle prsentation Apritif vin de mre original",
  "imageUrl":"https://s3.eu-central-1.amazonaws.com/mydish.assets/Joayo.png.png",
  "category":"Reservation",
  "services":"",
  "budget":500,
  "type":"Italien ",
  "coords":"",
  "location":{
    "type":"Point",
    "coordinates":[2.331217607088657, 48.85864117351143]
  },
  "orders": 2,
  "globalRating": 4,
  "ratePerService":[
    {

    }
  ],
  "ratingsNbr": 234,
  "menus":[
    {
      "_id":"602c31ee20077c3250f49f66",
      "ref":"Product"
    }
  ],
  "menusJour":[
    {
      "id":"602c31ee20077c3250f49f66",
      "ref":"Product"
    }
  ],
  "address":"70290 Ridgeview Avenue",
  "discount": 25,
  "views":3,
  "diatetic":"",
  "specialty":"",
  "openingHours":"",
  "updatedAt":1613509485418

},
  {
    "_id":"rest34",
    "avgPrice":35.0,
    "name":"Joayo-Haussmann",
    "owner":{
      "id":"6048e1f839e5e3170c959478",
      "ref":"User"
    },
    "description":"Belle dcouverte et joli cadre Raviolis excellents et barbecue de canard et porc pics super Bon cheesecake au yuzu et belle prsentation Apritif vin de mre original",
    "imageUrl":"https://s3.eu-central-1.amazonaws.com/mydish.assets/Joayo.png.png",
    "category":"Reservation",
    "services":"",
    "budget":500,
    "type":"Italien ",
    "coords":"",
    "location":{
      "type":"Point",
      "coordinates":[2.301217607088657, 48.85864117351143]
    },
    "orders": 2,
    "globalRating": 8,
    "ratePerService":[
      {

      }
    ],
    "ratingsNbr": 44,
    "menus":[
      {
        "_id":"602c31ee20077c3250f49f66",
        "ref":"Product"
      }
    ],
    "menusJour":[
      {
        "id":"602c31ee20077c3250f49f66",
        "ref":"Product"
      }
    ],
    "address":"70290 Ridgeview Avenue",
    "discount": 50,
    "views":3,
    "diatetic":"",
    "specialty":"",
    "openingHours":"",
    "updatedAt":1613509485418

  },
  {
    "_id": "rest23",
    "avgPrice":45.0,
    "name":"Bestro de la Lumière",
    "owner":{
      "id":"6048e1f839e5e3170c959478",
      "ref":"User"
    },
    "description":"Un restaurant coréen à recommander. Le cadre est moderne et aéré. Ment...",
    "imageUrl":"https://s3.eu-central-1.amazonaws.com/mydish.assets/Moom-Mam.png",
    "category":"Reservation",
    "services":"",
    "budget":500,
    "type":"Italien ",
    "coords":"",
    "location":{
      "type":"Point",
      "coordinates":[2.2992327724606394, 48.25960820680177]
    },
    "orders": 2,
    "globalRating": 6,
    "ratePerService":[
      {

      }
    ],
    "ratingsNbr": 23,
    "menus":[
      {
        "_id":"602c31ee20077c3250f49f66",
        "ref":"Product"
      }
    ],
    "menusJour":[
      {
        "id":"602c31ee20077c3250f49f66",
        "ref":"Product"
      }
    ],
    "address":"70290 Avenue de l'arche",
    "discount":'',
    "offers": "1 acheté(s) = 1 offert(s)",
    "views":3,
    "diatetic":"",
    "specialty":"",
    "openingHours":"",
    "updatedAt":1613509485418

  },
  {
    "_id":"rest2",
    "avgPrice":35.0,
    "name":"Joayo-Haussmann",
    "owner":{
      "id":"6048e1f839e5e3170c959478",
      "ref":"User"
    },
    "description":"Belle dcouverte et joli cadre Raviolis excellents et barbecue de canard et porc pics super Bon cheesecake au yuzu et belle prsentation Apritif vin de mre original",
    "imageUrl":"https://s3.eu-central-1.amazonaws.com/mydish.assets/Joayo.png.png",
    "category":"Reservation",
    "services":"",
    "budget":500,
    "type":"Italien ",
    "coords":"",
    "location":{
      "type":"Point",
      "coordinates":[2.301217607088657, 48.85864117351143]
    },
    "orders": 2,
    "globalRating": 8,
    "ratePerService":[
      {

      }
    ],
    "ratingsNbr": 564,
    "menus":[
      {
        "_id":"602c31ee20077c3250f49f66",
        "ref":"Product"
      }
    ],
    "menusJour":[
      {
        "id":"602c31ee20077c3250f49f66",
        "ref":"Product"
      }
    ],
    "address":"70290 Ridgeview Avenue",
    "discount": 50,
    "views":3,
    "diatetic":"",
    "specialty":"",
    "openingHours":"",
    "updatedAt":1613509485418

  },
  {
    "_id": "rest3",
    "avgPrice":65.0,
    "name":"Resto les amis",
    "owner":{
      "id":"6048e1f839e5e3170c959478",
      "ref":"User"
    },
    "description":"Un restaurant tunien à recommander. Le cadre est moderne et aéré. Ment...",
    "imageUrl":"https://s3.eu-central-1.amazonaws.com/mydish.assets/Moom-Mam.png",
    "category":"Reservation",
    "services":"",
    "budget":800,
    "type":"Tunisien",
    "coords":"",
    "location":{
      "type":"Point",
      "coordinates":[2.2992327724606394, 48.55960820680177]
    },
    "orders": 2,
    "globalRating": 7,
    "ratePerService":[
      {

      }
    ],
    "ratingsNbr": 253,
    "menus":[
      {
        "_id":"602c31ee20077c3250f49f66",
        "ref":"Product"
      }
    ],
    "menusJour":[
      {
        "id":"602c31ee20077c3250f49f66",
        "ref":"Product"
      }
    ],
    "address":"50296 Avenue de la lune",
    "discount": 13,
    "views":7,
    "diatetic":"",
    "specialty":"",
    "openingHours":"",
    "updatedAt":1613509485418

  }]
