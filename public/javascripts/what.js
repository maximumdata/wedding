var socket = io.connect();
var ten = 0;
socket.on('connect', function(data) {
    console.log('connected');
});

socket.on('info', function(info) {
    var tweet = info.tweet;
    if(ten < 11) {
        console.log(tweet);
        ten++;
        document.getElementById("content").innerHTML += '<div>' + tweet.text + '</div>';
    } else {return;}
});

