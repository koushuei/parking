  var map;
  var infowindow;


  
  function initMap() {
    navigator.geolocation.getCurrentPosition(function(position) {
      var currentLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
  
      map = new google.maps.Map(document.getElementById('map'), {
        center: currentLocation,
        zoom: 14
      }); //map

      var my_image="https://images.plurk.com/bHOjfuhV3ojfe5QGxqUP.png ";
    var my_marker = new google.maps.Marker({ 
        position: currentLocation,
         map: map,
         icon: my_image
     });
  
  //---------------尋找停車場--------------------------


  
      var service = new google.maps.places.PlacesService(map);
      var query = {
        location: currentLocation,
        radius: '3000',
        type: ['parking'],
        keyword:'停車'
      };   //var query
     /* var service = new google.maps.places.PlacesService(map);
      var query1 = {
        location: currentLocation,
        radius: '300',
        query:'停車'
      }; */
  
      service.nearbySearch(query, callback); //(textSearch)
  
      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          var parking = results.slice(0, 100);
          for (var i = 0; i < results.length; i++) {
            parking.forEach(createMarker);
            
          }   //for
        }   //if
      }   //callback function
     //-----------------------------------------------------------

  //---------以下停車場資訊---------------------------------------------
      var INFOWINDOW;
      function createMarker(place) {
        var placeLoc = place.geometry.location;
       
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location,
          
        });   //var marker
       //-----------------------------
        var p_lat,p_lng;
        //-------------------------------
        google.maps.event.addListener(marker, 'click', function() {
          
          if (INFOWINDOW) { INFOWINDOW.close(); }
          var infowindow = new google.maps.InfoWindow();
          INFOWINDOW = infowindow;
          infowindow.setContent(place.name);
          infowindow.open(map, this);
  
          service.getDetails(place, function(details, status){
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              infowindow.setContent(details.name);
              var a=place.geometry.location.lat();
              var b=place.geometry.location.lng();

              var str='';
              str='<li>' + details.name +'</li><li>地址：'+ details.formatted_address +'</li>';
              //document.querySelector('.attr').innerHTML = str;
            

            } 
            //--------------------------------------------
            
            var where= {lat: a, lng: b};
                var DirectionsRequest={
                  origin: currentLocation,
                  destination:where,
                  travelMode: 'DRIVING'
                };
                    //路線規劃 完成
                var directionsService = new google.maps.DirectionsService();
                var directionsDisplay = new google.maps.DirectionsRenderer();
                
                directionsDisplay.setMap(map);
                
                
                directionsService.route(DirectionsRequest, function(result, status) {
                  var strTmp = "";
                  if (status == 'OK') {
                    directionsDisplay.setDirections(result);
                    var route = result.routes[0];
                        
                        strTmp += route.legs[0].distance.text;
                    
                    var dist = parseInt(parseFloat(strTmp) * 1000).toString();
                    console.log(dist/1000);
                    str+='<li>距離'+dist+'公尺</li>';
                    document.querySelector('.attr').innerHTML = str;
                  }
          
                });
                
    //----------------------------------------------
              //  var dms = new google.maps.DistanceMatrixService;


          });   //getDetails

          
        });   
      
      //------------------------------------------------------
      
      }  
  
     
  
    }); 
  }