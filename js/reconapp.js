var addresses = [];
var corLat = [];
var corLong = [];
var places = [];


var geo_add = [];


var coffee_store = [];
var gyms_store = [];
var subway_store = [];
var grocery_store = [];

var coffee_arr = [];
var gyms_arr = [];
var subway_arr = [];
var grocery_arr = [];

var result = "";
var test_item;
var test_arr = [];

var options = {
  id: 'nan'
};

var nanobar = new Nanobar( options );

// move bar
nanobar.go( 30 ); // size bar 30%
nanobar.go( 76 ); // size bar 76%

// size bar 100% and and finish
nanobar.go(100);


function makeTableHTML(myArray) {
    var result = "<table border=1>";
    for(var i=0; i<myArray.length; i++) {
        result += "<tr>";
        for(var j=0; j<myArray[i].length; j++){
            result += "<td>"+myArray[i][j]+"</td>";
        }
        result += "</tr>";
    }
    $("#innerworkings").html(result);
}


var geocoder = new google.maps.Geocoder();

function geoCode(address){
    geocoder.geocode({ 'address': address}, function(data, status) {
        if (status == google.maps.GeocoderStatus.OK) { 
            
            var myylocation = data[0];
            theaddress = myylocation.formatted_address;
            geo_add.push(theaddress);
            console.log(myylocation);
            var lat = myylocation.geometry.location.lat();
            var long = myylocation.geometry.location.lng();
            corLat.push(lat);
            corLong.push(long);
        }
    });
}


function addAddress() {
    addresses.push($("#address").val());
    $('#thelist li').remove();
    $("#address").val("");
    geo_add = [];
    corLat = [];
    corLong = [];
    result = "";
    
    for(i = 0; i < addresses.length; i++){
        //input google search query here
            geoCode(addresses[i]);
            $('ul').append('<li class= "list-group-item" data-toggle="modal" data-target="#editModal">' + addresses[i] + '<span class="glyphicon glyphicon-remove"></span></li>');
        }
}

//making a map?


//nearby places

// make a function that takes an address and puts it into the request: location
// get the results of the function count the number of coffee shops nearby
var map;

function addressLookup(latitude,longitude, estab, distance) {
  var testLocation = new google.maps.LatLng(latitude,longitude);

  map = new google.maps.Map(document.getElementById('map'), {
      center: testLocation,
      zoom: 15
    });
    
  marker = new google.maps.Marker({
            position: testLocation,
            map: map,
            title: geo_add[i]
        });

  var request = {
    location: testLocation,
    radius: distance.toString(),
    types : [estab]
  };

  service = new google.maps.places.PlacesService(map);
  
if (estab == "cafe"){    
    service.nearbySearch(request, callback_coffee);    
    }
if (estab == "subway_station"){    
    service.nearbySearch(request, callback_subway);    
    }
if (estab == "gym"){    
    service.nearbySearch(request, callback_gym);    
    }
if (estab == "grocery_or_supermarket"){
    service.nearbySearch(request, callback_grocery);
}
    
}

function callback_coffee(results, status) {
    coffee_store = [];
  
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
      coffee_store.push(results[i]);
    }
    }
    
    if(coffee_store.length > 0){
        coffee_arr.push(coffee_store.length); 
    } else {
        coffee_arr.push(0);    
    }
    
}
function callback_gym(results, status) {

    gyms_store = [];
    
    if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            gyms_store.push(results[i]);
            }
        }
    
    if(gyms_store.length > 0){
        gyms_arr.push(gyms_store.length);
    } else {
     gyms_arr.push(0);
    }

}
function callback_subway(results, status) {
    subway_store = [];
    
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      
      for (var i = 0; i < results.length; i++) {
       subway_store.push(results[i]);
    }
    }
    
    if(subway_store.length > 0){
        console.log('right');
        subway_arr.push(subway_store.length);  
    } else {
        console.log('huh');
        subway_arr.push(0);
    }
  
}

function callback_grocery(results, status) {
    grocery_store = [];
    
    if (status == google.maps.places.PlacesServiceStatus.OK) {  
      for (var i = 0; i < results.length; i++) {
        grocery_store.push(results[i]);
    }
    }
    
    if(grocery_store.length > 0){
        grocery_arr.push(grocery_store.length);  
    } else {
        grocery_arr.push(0);
    }
  
}


// the coffee loop

///////////////////////////////////////////////////////////////////
// PROBLEMS HERE
function doSomethingFirst() {

}
// PROBLEMS HERE


///////////////////////////////////////////////////////////////////



function calculator() {
    var search_radius = parseFloat($("#radius").val());
    search_radius = search_radius*1609.34;
    console.log(search_radius);
    
    coffee_arr = [];
    gyms_arr = [];
    subway_arr = [];
    grocery_arr = [];
    
    for(i = 0; i < corLat.length; i++){
        //function 1
        addressLookup(corLat[i], corLong[i], "cafe", search_radius);
        addressLookup(corLat[i], corLong[i], "gym", search_radius);
        addressLookup(corLat[i], corLong[i], "subway_station", search_radius);
        addressLookup(corLat[i], corLong[i], "grocery_or_supermarket", search_radius);    

    }
    
}

$("#getrecon").click(function(){
    calculator();
});

// conditional events

$("#loading").fadeIn("slow");

$("#filler_button").click(function(){
 $("#loading").fadeOut("slow");
 $("#loadingmask").fadeOut("slow");    
});

$("#additem").click(function(){
 addAddress();

});

$("#address").keyup(function(e) {
    if(e.which == 13) {
        addAddress();
    }
});


//load the list
var defaultList = [ "56 e 8 st, ny",
                "140 e 14 st, ny",    
                "15 little west 12 st, ny",
                "30 rockefeller plaza, ny"
                ];


function loadList(items){	
    $('#thelist li').remove();
		if(items.length > 0) {
			for(var i = 0; i < items.length; i++) {
				$('ul').append('<li class= "list-group-item" data-toggle="modal" data-target="#editModal">' + items[i] + '<span class="glyphicon glyphicon-remove"></span</li>');
			}
		}
    addresses = defaultList;
    
    for(i = 0; i < addresses.length; i++){
        //input google search query here
            geoCode(addresses[i]);
        }
	};

loadList(defaultList);

// deleting an item off the list
$('ul').delegate("span", "click", function(event){
		event.stopPropagation();
		index = $('span').index(this);
		$('#thelist li').eq(index).remove();
    
		addresses.splice(index, 1);
        corLat.splice(index, 1);
        corLong.splice(index, 1);
        geo_add.splice(index, 1);
    
	});


var fullarray;
var newarray;
var output;


function mapGen(){
    
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: new google.maps.LatLng(corLat[0], corLong[0]),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
            {
              featureType: 'all',
              stylers: [
                { saturation: -80 }
              ]
            },{
              featureType: 'road.arterial',
              elementType: 'geometry',
              stylers: [
                { hue: '#00ffee' },
                { saturation: 50 }
              ]
            },{
              featureType: 'poi.business',
              elementType: 'labels',
              stylers: [
                { visibility: 'off' }
              ]
            }
          ]
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;
    var bounds = new google.maps.LatLngBounds();

    for (i = 0; i < corLat.length; i++) {  
      
        marker = new google.maps.Marker({
        position: new google.maps.LatLng(corLat[i], corLong[i]),
        map: map
      });
        
      bounds.extend(marker.getPosition());
        
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(geo_add[i]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
    
    map.fitBounds(bounds);
}

$("#maketable").click(function(){
    makeTable();
});

function makeTable() {
    
mapGen();  
fullarray = [geo_add, coffee_arr, gyms_arr, subway_arr, grocery_arr];

// transpose this array
newarray = fullarray[0].map(function(col, i) { 
  return fullarray.map(function(row) { 
    return row[i] 
  })
});
output = makeTableHTML(newarray);
};


// need to add some different 