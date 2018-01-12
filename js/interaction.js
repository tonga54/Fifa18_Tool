$("#btnEnviar").click(searchShowPlayer);

function searchShowPlayer(){
  var nombre   = $("#txtNombre").val();
  var apellido = $("#txtApellido").val();
  var dtPlayer = new Data(nombre,apellido);
  var players  = dtPlayer.playerHandler();
  showCard(players);
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
