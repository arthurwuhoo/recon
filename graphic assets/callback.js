$('a.button').click(function(){
    if (condition == 'true'){
        function1(someVariable);
        function2(someOtherVariable);
    }
    else {
        doThis(someVariable);
    }
});


$('a.button').click(function(){
    if (condition == 'true'){
        function1(someVariable, function() {
          function2(someOtherVariable);
        });
    }
    else {
        doThis(someVariable);
    }
});


function function1(param, callback) {
  ...do stuff
  callback();
} 