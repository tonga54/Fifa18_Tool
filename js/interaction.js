$("#btnEnviar").click(searchShowPlayer);

function searchShowPlayer(){
  var nombre   = $("#txtNombre").val();
  var apellido = $("#txtApellido").val();
  var dtPlayer = new Data(nombre,apellido);
  var players;



//Como la peticion es asincrona, dependiendo lo que demore el servidor
//va a hacer que mi variable players contenga algo o no, es decir
//si el servidor demora mas que la llamada al playerHandler entonces
//mi variable players quedara vacia, esta es una forma de iterar tantas
//veces hasta que el servidor, realize la peticion mas rapido que la llamada
//al playerHandler. Al iterar tantas veces va a llegar un punto que la
//peticion sera mas rapida que mi llamada lo cual, hara que mi variable players
//si contenga un valor.
  function p(){
      players = dtPlayer.playerHandler();
  }

  var i = 0;
  var interval = setInterval(function(){
    console.log(players);
    if(i == 30){
      detener();
    }
    if(players != undefined){
      if(players.length > 0){
        detener();
      }
    }else{
       p();
    }
    i++;
    console.log(i);
  }, 300);

  function detener(){
    showCard(players);
    clearInterval(interval);
  }


}

function showCard(players){
  if(players != null){
    $("#cancha").empty();
     for(var i = 0; i < players.length; i++){
       players[i].showCard();
     }
  }else{
    alert("No se encontro al jugador");
  }
}

// --------------------------------------------

 //Para tener tu propia carta personalizada.
function cardCreator(){
   var nombre = $("#txtNombre").val();
   var posicion = $("#txtPosicion").val();
   var ritmo = Number($("#txtRitmo").val());
   var tiro = Number($("#txtTiro").val());
   var pase = Number($("#txtPase").val());
   var regate = Number($("#txtRegate").val());
   var defensa = Number($("#txtDefensa").val());
   var fisico = Number($("#txtFisico").val());
   var foto = $("#txtFoto").val();

   for(var i = foto.length;i >= 0; i--){
     if(foto.charAt(i) == "\\"){
       i = i+1
       foto = foto.substr(i);
       break;
     }
   }

   nombre = nombre.toUpperCase();
   posicion = posicion.toUpperCase();
   $(".nombre h4").html(nombre);
   $(".posicion").html(posicion);
   $("#ritmo").html(ritmo);
   $("#tiro").html(tiro);
   $("#pase").html(pase);
   $("#regate").html(regate);
   $("#defensa").html(defensa);
   $("#fisico").html(fisico);
   $(".imagen img").attr("src",foto);

   var media;
   media = ritmo + tiro + pase + regate + defensa + fisico;
   media = media / 6;
   media = Math.round(media);

   $(".media").html(media);
}
