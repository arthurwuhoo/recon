var addresses = [];
var corLat = [];
var corLong = [];
var places = [];


var geo_add = [];


var coffee_store = [];
var gyms_store = [];
var subway_store = [];

var coffee_arr = [];
var gyms_arr = [];
var subway_arr = [];


var result = "";
var test_item;
var test_arr = [];


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
    $('li').remove();
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


// the coffee loop

///////////////////////////////////////////////////////////////////
// PROBLEMS HERE
function doSomethingFirst() {

}
// PROBLEMS HERE


///////////////////////////////////////////////////////////////////

function calculator() {
    
    coffee_arr = [];
    gyms_arr = [];
    subway_arr = [];
    
    for(i = 0; i < corLat.length; i++){
        //function 1
        addressLookup(corLat[i], corLong[i], "cafe", 250);
        addressLookup(corLat[i], corLong[i], "gym", 250);
        addressLookup(corLat[i], corLong[i], "subway_station", 250);
    }
}

$("#getrecon").click(function(){
    doSomethingFirst();
    calculator();
});

// conditional events

$("#filler_button").click(function(){
 $("#loading").fadeOut("slow");
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
function loadList(items){
		$('li').remove();
		if(items.length > 0) {
			for(var i = 0; i < items.length; i++) {
				$('ul').append('<li class= "list-group-item" data-toggle="modal" data-target="#editModal">' + items[i] + '<span class="glyphicon glyphicon-remove"></span</li>');
			}
		}
	};

// deleting an item off the list
$('ul').delegate("span", "click", function(event){
		event.stopPropagation();
		index = $('span').index(this);
		$('li').eq(index).remove();
    
		addresses.splice(index, 1);
        corLat.splice(index, 1);
        corLong.splice(index, 1);
        geo_add.splice(index, 1);
    
	});


var fullarray;
var newarray;
var output;

$("#maketable").click(function(){

fullarray = [geo_add, coffee_arr, gyms_arr, subway_arr];

// transpose this array
newarray = fullarray[0].map(function(col, i) { 
  return fullarray.map(function(row) { 
    return row[i] 
  })
});
output = makeTableHTML(newarray);
});


// need to add some different 