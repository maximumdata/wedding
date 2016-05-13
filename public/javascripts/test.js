
var getMoreBtn = document.getElementById('getMore');
var tweetList = document.getElementById('tweets');

getMoreBtn.addEventListener('click', function(e) {
  ajaxGET('http://localhost:3000/', function(data) {
    for(var i = 0; i < data.length; i++) {
      console.log('i = ' + i, data[i]);
      tweetList.innerHTML += '<li>'+data[i].text+'<img src="'+data[i].user.image+'"></li>';
    }
  });
});


function ajaxGET(url, next) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      var data = JSON.parse(request.responseText);
      return next(data);
    } else {
      // We reached our target server, but it returned an error
      console.log('something broke', request);
      return next({message: 'something broke on the server'});
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
    console.log('connection error');
    return next({message: 'something broke before getting to the server'});
  };

  request.send();
}
