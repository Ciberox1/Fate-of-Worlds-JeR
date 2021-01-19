 function postPlayer(){
                $.ajax({
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
            },
            url: 'http://localhost:8080/post',
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
        do{
            name = window.prompt("Enter your name: ");
        }while(name.length>8);
    }

    function deletePlayer(){
            $.ajax({
                url: 'http://localhost:8080/delete',
                type: 'DELETE',
                error: function() {
                    console.error("No es posible completar la operación");
                    }
                });
            }

    function getPlayers(){
            $.ajax({
                url: 'http://localhost:8080/get',
                type: 'GET',
                data:({
                    "name":name,
                }),
                success: function(data) {
                    
                    document.getElementById("playerList").innerHTML = "";
                    if(data[0]!=null){
                        console.log("Jugador 1: " +data[0].name);
                        document.getElementById("playerList").innerHTML += data[0].name + '<br/>';
                    }
                       
                    if(data[1]!=null){
                        console.log("Jugador 2: " +data[1].name);
                        document.getElementById("playerList").innerHTML += data[1].name;
                    }
                       countRequest=0;
                },
                error: function() {
                     if(countRequest<2){
                        console.error("No es posible completar la operación");
                        countRequest++;
                    }
                    else{
                         console.error("El servidor se ha caído")
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

$(document).ready(function() {
        setName();
    postPlayer();
    timeGet = setInterval(getPlayers,1000);
    //execute getPlayers each 0.5 seconds
});
