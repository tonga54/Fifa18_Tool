$("#btnEnviar").click(searchShowPlayer);

function searchShowPlayer(){
  let nombre   = $("#txtNombre").val();
  let apellido = $("#txtApellido").val();
  if(nombre == "" || apellido == "" || !isNaN(nombre) || !isNaN(apellido)){
    alert("Nombre o apellido vacio / No pueden ser numericos");
  }else{
    nombre = capitalizar(nombre);
    apellido = capitalizar(apellido);
    const dtPlayer = new Data(nombre,apellido);
    let players;
    const loading = $("#loading");

    //Lo siguiente es una forma de iterar tantas veces
    //hasta que la llamada ajax, logre tener todos los datos prontos (antes que el
    //playerHandler). Al iterar tantas veces va a llegar un punto que mi peticion
    //ajax va a haber culminado y la variable DataItems va a contener el array deseado.
    //Para que mi funcion playerHandler pueda lograr analizar dichos datos y brindar
    //la informacion deseada.

    function playerHandler(){
        players = dtPlayer.playerHandler();
    }

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
             playerHandler();
          }
        }
        i++;
    }, 300);

    function detenerIntervalo(){
      showCard(players);
      // document.getElementById("sonido").play();
      clearInterval(interval);
    }

  }//end if

}//end function

function showCard(players){
  if(players != null){
    $("#cancha").empty();
    // players[0].informacionEspecifica();
    informacionEspecifica(players[0]);
     for(let i = 0; i < players.length; i++){
       players[i].showCard();
     }
  }else{
    alert("No se encontro al jugador");
  }
}

function capitalizar(cadena){
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
  }
  return aux;
}


function informacionEspecifica(obj){
  let specificInfo = "<div id='inf' class='detailedStats' style='float:left;'><div>";
  const values = Object.values(obj);
  for (let i = 13; i <= 22; i++) {
       specificInfo+="<div class='line'><span class='attributeTitle'>"+values[i][0]+"</span><span class='attributeStats'>" + values[i][1] + "</span></div>";
  }
  specificInfo+="</div></div>";

  $(".specificInfo").html(specificInfo);
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
