 function postPlayer(){
                $.ajax({
                    headers: { 
                        'Accept': 'application/json',
                        'Content-Type': 'application/json' 
            },
            url: 'https://557d57ef8632.ngrok.io/post',
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
                url: 'https://557d57ef8632.ngrok.io/delete',
                type: 'DELETE',
                error: function() {
                    console.error("No es posible completar la operación");
                    }
                });
            }

    function getPlayers(){
            $.ajax({
                url: 'https://557d57ef8632.ngrok.io/get',
                type: 'GET',
                success: function(data) {
                   Player1Connected=data[0];
                   Player2Connected=data[1];
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
    //execute getPlayers each 0.5 seconds
    timeGet = setInterval(getPlayers,3000);
});


        
