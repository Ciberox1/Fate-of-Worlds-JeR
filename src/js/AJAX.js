 function postPlayer(){
                $.ajax({
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin':'http://localhost:8080',
            },
            url: 'http://a12ff83996a0.ngrok.io/post',

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
            name = window.prompt("Enter your name: ");
        }

    function deletePlayer(){
            $.ajax({
                headers:{
                    'Access-Control-Allow-Origin':'http://localhost:8080',
                },

                url: 'http://a12ff83996a0.ngrok.io/delete',

                type: 'DELETE',
                error: function() {
                    console.error("No es posible completar la operación");
                    }
                });
            }

    function getPlayers(){
            $.ajax({
                headers:{
                    'Access-Control-Allow-Origin':'http://localhost:8080',
                },
                url: 'http://a12ff83996a0.ngrok.io/get',

                type: 'GET',
                success: function(data) {
                    console.log(data);
                    document.getElementById("playerList").innerHTML = "PlayerList: ";
                    if(data[0]!=null)
                        document.getElementById("playerList").innerHTML += '<br/>' + data[0].name;
                    if(data[1]!=null)
                        document.getElementById("playerList").innerHTML += ', ' + data[1].name;
                },
                error: function() {
                    console.error("No es posible completar la operación");
                }

            });

        }

//delete player when refresh the page or close the window
window.onbeforeunload=function(e){
    var e=e;
    if(e){
        e.returnValue='Are you sure?';
        deletePlayer();
        }
}

$(document).ready(function() {
    setName();
    postPlayer();
    getPlayers();
    //execute getPlayers each 0.5 seconds
    timeGet = setInterval(getPlayers,5000);
});
