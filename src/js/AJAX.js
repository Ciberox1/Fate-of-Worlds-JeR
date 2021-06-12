var name;
var password;
var msg;
var time;
var url = "http://localhost:8080";
var ping = 1000;
var con = true;
var recon = false;
var contador;
var registered = false;
var countRequest;

function serverConnection(){
  $.ajax({
        url:  url+'/con',
        type: 'GET',

    success: function(){
      con = true;
      server();
      if(recon){
        document.getElementById("title").innerHTML = "The server is opened again";
        document.getElementById("Logger").innerHTML = "Please, reload the page";
        recon = false;
      }
    },
    error: function(jqXHR, textStatus){
      con = false;
      server();
      document.getElementById("title").innerHTML = "The server is closed";
      document.getElementById("Logger").innerHTML = "Please wait a few seconds";
      recon = true;
    }
  });
}

setInterval(serverConnection,ping);
//Username
function postPlayerSignIn(){
                $.ajax({
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
            },
            url: url+'/postS',
            type: 'POST',
            dataType:"json",
            data:JSON.stringify({
                "name" :name,
                "password": password,
            }),
            success: function(data) {
                console.log(data);
            },
            error: function() {
                console.error("No es posible completar la operación");
            }
        });
    }

function postPlayerLog(){
                $.ajax({
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
            },
            url: url+'/postL',
            type: 'POST',
            dataType:"json",
            data:JSON.stringify({
                "name" : name,
                "password": password,
            }),
            success: function(data) {
                console.log(data);
                document.getElementById("title").innerHTML = "Player List :";
                loadMsg();
                document.getElementById("Logger").innerHTML = "";
                timeGet = setInterval(getPlayers,ping);
            },
            error: function() {
                console.error("No es posible completar la operación");
            }
        });
    }

    function setName(){
            name = document.getElementById("username").value;
    }

    function setPassword(){
            password = document.getElementById("password").value;
    }

    /*function deletePlayer(){
            $.ajax({
                url: url+'/delete',
                type: 'DELETE',
                error: function() {
                    console.error("No es posible completar la operación");
                    }
                });
            }*/

    function getPlayers(){
            $.ajax({
                url: url+'/get',
                type: 'GET',
                data:({
                    "name":name,
                    "password":password,
                }),
                success: function(data) {
                    document.getElementById("Logger").innerHTML = "";
                    if(data[0]!=null){
                        console.log("Jugador 1: " +data[0].name);
                        document.getElementById("Logger").innerHTML += data[0].name + '<br/>';
                    }

                    if(data[1]!=null){
                        console.log("Jugador 2: " +data[1].name);
                        document.getElementById("Logger").innerHTML += data[1].name;
                    }
                       countRequest=0;
                },
                error: function() {
                     if(countRequest<2){
                        console.error("No es posible completar la operación");
                        countRequest++;
                    }
                }

            });

        }

window.onbeforeunload=function(e){
    minusPlayers();
}

window.onload=function(e){
    numPlayers();
    document.getElementById("username").value="";
    document.getElementById("usermsg").value="";
}

function loadMsg(){
  $.ajax({
      url: url+'/loadmsg',
      type: 'GET',
      data:({
        "username" : name,
        "body" : msg,
      }),
      success: function(data) {
          //document.getElementById("chatbox").innerHTML = "";
          for (var i = 0; i < 10; i++) {
            if(data[i]!=null){
                document.getElementById("chatbox").innerHTML += data[i].username + " -> " + data[i].body + '<br/>';
            }
          }
      },
      error: function() {
              console.error("No es posible completar la operación");
          }
  });
}

function userSignIn(){
  $(document).ready(function() {
          setName();
          setPassword();
          postPlayerSignIn();
          document.getElementById("title").innerHTML="User Registered";
          document.getElementById("username").value="";
          document.getElementById("password").value="";
  });
}

function userLog(){
  $(document).ready(function() {
      setName();
      setPassword();
      postPlayerLog();
      //execute getPlayers each 0.5 seconds
  });
}

//message
function setMsg(){
        msg = document.getElementById("usermsg").value;
        console.log(msg);
}

function postMsg(){
                $.ajax({
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
            },
            url: url+'/msgpost',
            type: 'POST',
            dataType:"json",
            data:JSON.stringify({
                "username" : name,
                "body" : msg,
            }),
            success: function(data) {
                console.log(data);
            },
            error: function() {
                console.error("No es posible completar la operación");
            }
        });
    }

    function getMsg(){
            $.ajax({
                url: url+'/msgget',
                type: 'GET',
                data:({
                  "username" : name,
                  "body" : msg,
                }),
                success: function(data) {

                    document.getElementById("chatbox").innerHTML = "";
                    for (var i = 0; i < 10; i++) {
                      if(data[i]!=null){
                          document.getElementById("chatbox").innerHTML += data[i].username + " -> " + data[i].body + '<br/>';
                      }
                    }
                  document.getElementById("chatbox").scrollTop+=1000;
                },
                error: function() {
                        console.error("No es posible completar la operación");
                    }
            });
        }

function sendMsg(){
  setMsg();
  postMsg();
  document.getElementById("usermsg").value="";
    $(document).ready(function() {
        timeGet = setInterval(getMsg,ping);
        //execute getPlayers each 0.5 seconds
    });
}

function server(){
  if(con == true){
    document.getElementById("server").innerHTML = "Server -> ON";
  }else if (con == false){
    document.getElementById("server").innerHTML = "Server -> OFF";
  }
}

function numPlayers(){
  $.ajax({
        url:  url+'/numP',
        type: 'POST',
    success: function(){
       console.log("Sumado");
       preload = true;
     },
    error: function(){
      console.error("No es posible completar la operación");
    }
  });
}

function minusPlayers(){
  $.ajax({
        url:  url+'/minusP',
        type: 'POST',
    success: function(){
       console.log("Restado");
     },
    error: function(){
      console.error("No es posible completar la operación");
    }
  });
}

function getOnlineP(){
  $.ajax({
        url:  url+'/getP',
        type: 'GET',
        data:({
          "cont":contador,
        }),
    success: function(data){
      document.getElementById("online").innerHTML = data;
     },
    error: function(){
      console.error("No es posible completar la operación");
    }
  });
}

setInterval(getOnlineP,ping);
