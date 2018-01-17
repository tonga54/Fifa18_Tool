$("#btnEnviar").click(searchShowPlayer);
$(".search").keyup(function(e){
  if(e.key == "Enter"){
    searchShowPlayer();
  }
});

function searchShowPlayer(){
  let nombre   = $("#txtNombre").val();
  let apellido = $("#txtApellido").val();
  if(nombre == "" || apellido == "" || !isNaN(nombre) || !isNaN(apellido)){
    alert("Nombre o apellido vacio / No pueden ser numericos");
  }else{
    nombre = capitalizarCadenas(nombre);
    apellido = capitalizarCadenas(apellido);
    const dtPlayer = new Data(nombre,apellido);
    let players;
    const loading = $("#loading");

    //Lo siguiente es una forma de iterar tantas veces
    //hasta que la llamada ajax, logre tener todos los datos prontos (antes que el
    //playerHandler). Al iterar tantas veces va a llegar un punto que mi peticion
    //ajax va a haber culminado y la variable DataItems va a contener el array deseado.
    //Para que mi funcion playerHandler pueda lograr analizar dichos datos y brindar
    //la informacion deseada.

    let i = 0;
    let interval = setInterval(function(){
        if(i == 30){
          loading.hide();
          detenerIntervalo();
        }else{
          if(players != null){
            loading.hide();
            detenerIntervalo();
          }else{
             loading.show();
             players = dtPlayer.playerHandler();
          }
        }
        i++;
    }, 300);

    function detenerIntervalo(){
      showCard(players);
      clearInterval(interval);
    }

  }//end if

}//end function

function showCard(players){
  if(players != null){
    $("#cancha").empty();
    Player.informacionEspecifica(players[0]);
     for(let i = 0; i < players.length; i++){
       Player.showCard(players[i]);
     }
  }else{
    alert("No se encontro al jugador");
  }
}

function capitalizarCadenas(cadena){
  let aux = "";
  for(let i = 0; i < cadena.length;i++){
    if(i == 0){
        aux += cadena.charAt(i).toUpperCase();
    }else{
      if(cadena.charAt(i-1) == " "){
        aux += cadena.charAt(i).toUpperCase();
      }else{
        aux += cadena.charAt(i).toLowerCase();
      }
    }
  }//end for
  return aux;
}

// --------------------------------------------

 // CARTAS PERSONALIZADAS

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

   for(let i = foto.length;i >= 0; i--){
     if(foto.charAt(i) == "\\"){
       i = i+1;
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

   let media;
   media = ritmo + tiro + pase + regate + defensa + fisico;
   media = media / 6;
   media = Math.round(media);

   $(".media").html(media);
}
