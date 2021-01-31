var name;
var msg;
var time;
var url = "http://localhost:8080";
var ping = 1000;

//Username
function postPlayer(){
                $.ajax({
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
            },
            url: url+'/post',
            type: 'POST',
            dataType:"json",
            data:JSON.stringify({
                "name" : name,
            }),
            success: function(data) {
                console.log(data);
            },
            error: function() {
                console.error("No es posible completar la operación");
            }
        });
    }

    function setName(){
            name = document.getElementById("username").value;
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
                    else{
                         document.getElementById("title").innerHTML = "The server is closed";
                         document.getElementById("Logger").innerHTML = "Please wait a few seconds and reload the page";
                    }
                }

            });

        }

//delete player when refresh the page or close the window
window.onbeforeunload=function(e){
    var e=e;
    if(e){
        e.returnValue='Are you sure?';
        //deletePlayer();
        }
}

window.onload=function(e){
    document.getElementById("username").value="";
    document.getElementById("usermsg").value="";
}

function userLog(){
  document.getElementById("title").innerHTML = "Player List :";
  $(document).ready(function() {
          setName();
          document.getElementById("Logger").innerHTML = "";
      postPlayer();
      timeGet = setInterval(getPlayers,ping);
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
                  document.getElementById("chatbox").scrollTop=1000;
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
