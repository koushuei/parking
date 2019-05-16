var start_map;
var map;
var infowindow;
var my_lat;
var my_lng;

var currentLocation;

var data;








function initMap() {
  // -----------先畫一開始的地圖--------------------------
  start_map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 22.8, lng: 120.20 },
    zoom: 10
  });
  //------------取得定位之後畫第二張自己位置的地圖--------------
  navigator.geolocation.getCurrentPosition(function (position) {
    my_lat = Number(position.coords.latitude);
    my_lng = Number(position.coords.longitude);
    currentLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    map = new google.maps.Map(document.getElementById('map'), {
      center: currentLocation,
      zoom: 14
    });
    //---------------標記自己的點---------------------------
    var my_image = "https://images.plurk.com/bHOjfuhV3ojfe5QGxqUP.png";
    var my_marker = new google.maps.Marker({
      position: currentLocation,
      map: map,
      icon: my_image
    });
    //---------------搜尋停車場---------------------------
    $.getJSON("park.json", function (data) {
      var min1data;
      var min2data;
      var min3data;
      var min1 = 10;
      var min2 =10;
      var min3=10;
      for (var i = 0; i < data.length; i++) { 
        var dis = 0;
        if ((data[i]["緯度"] >= my_lat - 0.03) && (data[i]["緯度"] <= my_lat + 0.03)) {
          if ((data[i]["經度"] >= my_lng - 0.03) && (data[i]["經度"] <= my_lng + 0.03)) {
            // dis=((my_lng-data[i]["經度"])*(my_lng-data[i]["經度"]))+((my_lat-data[i]["緯度"])*(my_lat-data[i]["緯度"]));
           // creatMarker(data[i]);
            //howtogo(data[i]);

           dis= distance(data[i]);
            console.log(dis);

             if(dis<min1){
               min1=dis;
               min1data=data[i]; 
             }
          }
        };
      }
      for (var i = 0; i < data.length; i++) {
        var dis = 0;
        if ((data[i]["緯度"] >= my_lat - 0.03) && (data[i]["緯度"] <= my_lat + 0.03)) {
          if ((data[i]["經度"] >= my_lng - 0.03) && (data[i]["經度"] <= my_lng + 0.03)) {
           dis= distance(data[i]);
            console.log(dis);
             if(dis<min2 && dis>min1){
               min2=dis;
               min2data=data[i]; 
             }
          }
        };
      }
      for (var i = 0; i < data.length; i++) {
        var dis = 0;
        if ((data[i]["緯度"] >= my_lat - 0.03) && (data[i]["緯度"] <= my_lat + 0.03)) {
          if ((data[i]["經度"] >= my_lng - 0.03) && (data[i]["經度"] <= my_lng + 0.03)) {
           dis= distance(data[i]);
            console.log(dis);
             if(dis<min3 && dis>min2){
               min3=dis;
               min3data=data[i]; 
             }
          }
        };
      }
      creatMarker(min1data);
      creatMarker(min2data);
      creatMarker(min3data);
      console.log(distance(min1data));
      console.log(distance(min2data));
      console.log(distance(min3data));
    });
  });
}

function creatMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: {
      lat: Number(place["緯度"]),
      lng: Number(place["經度"])
    }
  });
  google.maps.event.addListener(marker, 'click', function () {
    if (infowindow) { infowindow.close(); }
    infowindow = new google.maps.InfoWindow();


    infowindow.setContent(place['停車場名稱']);
    infowindow.open(map, this);
    var str = '';
    str =str ='<li>名稱：'+ place['停車場名稱'] + '</li><li>型式：' + place['型式'] + '</li><li>地址：' + place['停車場位置']+
    '</li><li>收費標準：'+place['收費標準'] +'</li>';
    document.querySelector('.attr').innerHTML = str;
    howtogo_map(currentLocation, place);
  });

}





function howtogo_map(my, place) {
  map = new google.maps.Map(document.getElementById('map'), {
    center: my,
    zoom: 14
  });
  //---------------標記自己的點---------------------------
  var my_image = "https://images.plurk.com/bHOjfuhV3ojfe5QGxqUP.png";
  var my_marker = new google.maps.Marker({
    position: currentLocation,
    map: map,
    icon: my_image
  });
  howtogo(place);
}

function howtogo(place) {

  var where = {
    lat: Number(place["緯度"]),
    lng: Number(place["經度"])
  }
  //var where={lat: a, lng: b};
  var DirectionsRequest = {
    origin: currentLocation,
    destination: where,
    travelMode: 'DRIVING'
  };
  
  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();


  directionsService.route(DirectionsRequest, function (response, status) {
    //規畫路徑回傳結果

    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setMap(map);
      directionsDisplay.setDirections(response);

    }
  });

}

function initMap1() {

  map = new google.maps.Map(document.getElementById('map'), {
    center: currentLocation,
    zoom: 14
  });
  //---------------標記自己的點---------------------------
  var my_image = "https://images.plurk.com/bHOjfuhV3ojfe5QGxqUP.png";
  var my_marker = new google.maps.Marker({
    position: currentLocation,
    map: map,
    icon: my_image
  });
  //---------------搜尋停車場---------------------------
  $.getJSON("park.json", function (data) {
    var min1data;
    var min2data;
    var min3data;
    var min1 = 10;
    var min2 =10;
    var min3=10;

    for (var i = 0; i < data.length; i++) {
      

      var dis = 0;

      if ((data[i]["緯度"] >= my_lat - 0.03) && (data[i]["緯度"] <= my_lat + 0.03)) {
        if ((data[i]["經度"] >= my_lng - 0.03) && (data[i]["經度"] <= my_lng + 0.03)) {
          // dis=((my_lng-data[i]["經度"])*(my_lng-data[i]["經度"]))+((my_lat-data[i]["緯度"])*(my_lat-data[i]["緯度"]));
         // creatMarker(data[i]);
          //howtogo(data[i]);

         dis= distance(data[i]);
          console.log(dis);

           if(dis<min1){
             min1=dis;
             min1data=data[i]; 
           }
        }
      };
    }
    for (var i = 0; i < data.length; i++) {
      var dis = 0;
      if ((data[i]["緯度"] >= my_lat - 0.03) && (data[i]["緯度"] <= my_lat + 0.03)) {
        if ((data[i]["經度"] >= my_lng - 0.03) && (data[i]["經度"] <= my_lng + 0.03)) {
         dis= distance(data[i]);
          console.log(dis);
           if(dis<min2 && dis>min1){
             min2=dis;
             min2data=data[i]; 
           }
        }
      };
    }
    for (var i = 0; i < data.length; i++) {
      var dis = 0;
      if ((data[i]["緯度"] >= my_lat - 0.03) && (data[i]["緯度"] <= my_lat + 0.03)) {
        if ((data[i]["經度"] >= my_lng - 0.03) && (data[i]["經度"] <= my_lng + 0.03)) {
         dis= distance(data[i]);
          console.log(dis);
           if(dis<min3 && dis>min2){
             min3=dis;
             min3data=data[i]; 
           }
        }
      };
    }
    

    creatMarker(min1data);
    creatMarker(min2data);
    creatMarker(min3data);
    console.log(distance(min1data));
    console.log(distance(min2data));
    console.log(distance(min3data));

  });
}


function distance(place) {
  var a=new google.maps.LatLng(Number(place["緯度"]),Number(place["經度"]));
  var b=new google.maps.LatLng(my_lat,my_lng);
  var c=(google.maps.geometry.spherical.computeDistanceBetween(a, b) / 1000);
  console.log (c);
  return c;
  
}


