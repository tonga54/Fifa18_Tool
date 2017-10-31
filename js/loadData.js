
/*

CANVAS LINEAS QUIMICA

HTML

Your browser does not support the HTML5 canvas tag.</canvas>


JS
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.moveTo(0, 100);
ctx.lineTo(300, 100);
ctx.strokeStyle = "green";
ctx.lineWidth = 4;
ctx.stroke();

*/



$("#btnEnviar").click(buscarPlayers);

  class Jugador{
      // Jugador.id = 0;

      constructor(obj,tipoCarta){

         // this.id = Jugador.id;
         // Jugador.id++;
         this.nombre = obj.name.toUpperCase();
         this.posicion = obj.position;
         this.rating = obj.rating;
         this.ritmo = obj.attributes[0].value;
         this.tiro = obj.attributes[1].value;
         this.pase = obj.attributes[2].value;
         this.regate = obj.attributes[3].value;
         this.defensa =obj.attributes[4].value;
         this.fisico = obj.attributes[5].value;
         this.club = obj.club.imageUrls.normal.small;
         this.pais = obj.nation.imageUrls.medium;
         this.img = obj.headshotImgUrl;
         this.posicion = obj.position;
         this.tipo = tipoCarta;
     }

     mostrarCarta(){
         var codigo = "<div class='carta' style=\"background-image:url('imgs/" + this.tipo + "')\"> <div class='info'> <h3 class='media'>" + this.rating + "</h3><h4 class='posicion'>"+ this.posicion +"</h4> <img class='club' src='" + this.club + "'><img class='pais' src='" + this.pais + "'></div><div class='imagen'><img src='" + this.img + "' alt=''></div><div class='nombre'><h4>" + this.nombre + "</h4></div><div class='stats'><div class='left'><p><span id='ritmo' class='numero'>" + this.ritmo +"</span><span class='caracteristica'> RIT</span></p><p><span id='tiro' class='numero'>" + this.tiro + "</span><span class='caracteristica'> TIR</span></p><p><span id='pase' class='numero'>" + this.pase + "</span><span class='caracteristica'> PAS</span></p></div><div class='right'><p><span id='regate' class='numero'>" + this.regate + "</span><span class='caracteristica'> REG</span></p><p><span id='defensa' class='numero'>" + this.defensa + "</span><span class='caracteristica'> DEF</span></p><p><span id='fisico' class='numero'>" + this.fisico + "</span><span class='caracteristica'> FIS</span></p></div></div></div>";
         $("#cancha").append(codigo);
     }

  }


//Cargar de forma manual
  function cargarDatos(){
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

//Array jugadores encontrados

  var jugadores = [];

//Buscar y guardar en el array

  function buscarPlayers(){

    var nombre = $("#txtNombre").val();
    var apellido = $("#txtApellido").val();
    var mix = nombre + " " + apellido;

    $("#cancha").empty();

        $.ajax({
           type : 'GET',
           url:'http://www.easports.com/fifa/ultimate-team/api/fut/item?jsonParamObject={%22name%22:%22'+ nombre +'%22}',
           // url:'https://www.tiendainglesa.com.uy/home',
           data : {},
           dataType : 'json',
           success : function(data) {
             console.log(data);
             // jugadores = [];
             for(var i = 0;i < data.items.length; i++ ){
               if(data.items[i].lastName == apellido || data.items[i].commonName == mix){
                    var tipoCarta = "p_" + data.items[i].playerType + "_" + data.items[i].quality + ".png";
                    jugadores.push(new Jugador(data.items[i],tipoCarta));

                    /*
                    for(var x = 0; x < nombre.length;x++){
                      if(nombre[x] == " "){
                        nombre = nombre.substr(x);
                      }
                    }
                    */

               }//end if
             }//end for
             mostrar();
           }
       });

  };

   function mostrar(){
      for(var i = 0; i < jugadores.length; i++){
        jugadores[i].mostrarCarta();
      }
    }
