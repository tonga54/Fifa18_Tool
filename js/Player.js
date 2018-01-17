class Player{
      constructor(obj,css){
         this.background = css;
         this.nombre = obj.name.toUpperCase();
         this.posicion = obj.position;
         this.rating = obj.rating;
         this.ritmoGbl = obj.attributes[0].value;
         this.tiroGbl = obj.attributes[1].value;
         this.paseGbl = obj.attributes[2].value;
         this.regateGbl = obj.attributes[3].value;
         this.defensaGbl =obj.attributes[4].value;
         this.fisicoGbl = obj.attributes[5].value;
         this.club = obj.club.imageUrls.normal.small;
         this.pais = obj.nation.imageUrls.medium;
         this.analizarImagenJugador(obj);
         this.posicion = obj.position;
         this.edad = ["edad",obj.age];
         this.altura = ["altura",obj.height];
         this.peso = ["peso",obj.weight];
         this.pie = ["pie",obj.foot];
         this.nacionalidad = ["país",obj.nation.name];
         this.equipo = ["equipo",obj.club.name];
         this.liga = ["liga",obj.league.name];
         // this.posicionTotal = ["Posicion",obj.positionFull];
         this.piernaMala = ["pierna mala",obj.weakFoot];
         this.filigranas = ["filigranas",obj.skillMoves];
         this.indiceOfensivo = ["índice de trabajo ofensivo",obj.atkWorkRate];
         this.indiceDefensivo = ["índice de trabajo defensivo",obj.defWorkRate];
         this.especialidades = obj.specialities;
         this.rasgos = obj.traits;
         // this.tipoCarta = obj.playerType;
         this.ritmo  = {"ritmo":this.ritmoGbl,"aceleracion":obj.acceleration,"velocidad":obj.sprintspeed};
         this.regates = {"regate":this.regateGbl,"agilidad":obj.agility,"equilibrio":obj.balance,"anticipacion":obj.reactions,"cotrol del balon":obj.ballcontrol,"regates":obj.dribbling,"compostura":obj.composure};
         this.tiros = {"tiro":this.tiroGbl,"posicionamiento":obj.positioning,"definicion":obj.finishing,"potencia de tiro":obj.shotpower,"tiros lejanos":obj.longshots,"voleas":obj.volleys,"penalties":obj.penalties};
         this.defensa = {"defensa":this.defensaGbl,"intercepciones":obj.interceptions,"precision de cabeza":obj.headingaccuracy,"marcaje":obj.marking,"robos de balon":obj.standingtackle,"entrada agresiva":obj.slidingtackle};
         this.pases = {"pases":this.paseGbl,"vision de juego":obj.vision,"centros":obj.crossing,"precision en faltas":obj.freekickaccuracy,"pases cortos":obj.shortpassing,"pases largos":obj.longpassing,"efecto":obj.curve};
         this.capacidadFisica = {"capacidad fisica":this.fisicoGbl,"salto":obj.jumping,"resistencia":obj.stamina,"fuerza":obj.strength,"agresividad":obj.aggression};
     }

     static showCard(obj){
       let specificInfo = "<div id='inf' class='detailedStats'><div>";
       const values = Object.values(obj);

       let codigo = "<div class='playerInfo'><div class='carta' style=\"background:url" + obj.background +" \"> <div class='info'> <h3 class='media'>" + obj.rating + "</h3><h4 class='posicion'>"+ obj.posicion +"</h4> <img class='club' src='" + obj.club + "'><img class='pais' src='" + obj.pais + "'></div><div class='imagen'><img src='" + obj.img + "' alt=''></div><div class='nombre'><h4>" + obj.nombre + "</h4></div><div class='stats'><div class='left'><p><span id='ritmo' class='numero'>" + obj.ritmoGbl + "</span><span class='caracteristica'> RIT</span></p><p><span id='tiro' class='numero'>" + obj.tiroGbl + "</span><span class='caracteristica'> TIR</span></p><p><span id='pase' class='numero'>" + obj.paseGbl + "</span><span class='caracteristica'> PAS</span></p></div><div class='right'><p><span id='regate' class='numero'>" + obj.regateGbl + "</span><span class='caracteristica'> REG</span></p><p><span id='defensa' class='numero'>" + obj.defensaGbl + "</span><span class='caracteristica'> DEF</span></p><p><span id='fisico' class='numero'>" + obj.fisicoGbl + "</span><span class='caracteristica'> FIS</span></p></div></div></div>";

       //auxBloque : Utilizada para saber donde comenzar y terminar el div
       //lineStats que sirve para divir las filas de cada bloque de Atributos
       //cuando se completan dos detailedStats, se cierra el div y luego se abre
       //etc.

       //bandera : es utilizada para aplicar de elemento por medio el estilo de float.

       let auxBloque = 2;
       let bandera = false;
       for (let i = 26; i < values.length; i++) {

          if(auxBloque % 2 == 0){
            codigo += "<div class='lineStats'>";
          }

          if(!bandera){
            codigo += "<div class='detailedStats' style='float:left;'>";
            bandera = true;
          }else{
            codigo += "<div class='detailedStats'>";
            bandera = false;
          }

          Object.getOwnPropertyNames(values[i]).forEach(function(val, idx, array) {

              let valorAtributo = values[i][val];
              let nombreAtributo = val.toUpperCase();

                if(idx == 0){
                  codigo += "\
                            <div class='titleLine'>\
                              <span class='attributeGlobalTitle'>"+nombreAtributo+"</span>\
                              <span class='attributeGlobalValue " + Player.changeColor(valorAtributo) + "'>" + valorAtributo + "</span>\
                            </div>";
                }

                 codigo += "\
                           <div>\
                              <div class='line'>\
                                  <span class='attributeTitle'>" + nombreAtributo + "</span>\
                                  <span class='attributeStats " + Player.changeColor(valorAtributo) + "'>" + valorAtributo + "</span>\
                              </div>\
                           </div>";

             });//end foreach

             codigo += "</div>";

          let aux = auxBloque + 1;
          if(aux % 2 == 0){
            codigo += "</div><div style='clear:both;'></div>";
          }

          auxBloque++;
       }//end for

       $("#cancha").append(codigo);
    }

    static informacionEspecifica(obj){
      let specificInfo = "<div id='inf' class='detailedStats'><div>";
      const values = Object.values(obj);
      for (let i = 13; i <= 23; i++) {
          let nombreAtributo = values[i][0].toUpperCase();
          let valorAtributo = values[i][1];
          if(nombreAtributo == "FILIGRANAS" || nombreAtributo == "PIERNA MALA"){
            specificInfo += "<div class='line'><span class='attributeTitle'>" + nombreAtributo + "</span><span class='attributeStats'>" + valorAtributo + " <span class='icon-star-full'></span></span></div>";
          }else{
            specificInfo += "<div class='line'><span class='attributeTitle'>" + nombreAtributo + "</span><span class='attributeStats'>" + valorAtributo + "</span></div>";
          }
      }
      specificInfo += "</div></div>";
      $(".specificInfo").html(specificInfo);
    }

     static changeColor (value){
       if(value >= 81){
         return "green";
       }else if(value >= 71 && value <= 80){
        return "softgreen";
       }else if(value >= 61 && value <= 70){
         return "orange";
       }else if(value >= 51 && value <= 60){
         return "softorange";
       }else{
         return "red";
       }
     }

     analizarImagenJugador(obj){
       //Si el jugador no tiene una imagen especial se la asigna la por defecto
       if(obj.specialImages.largeTOTWImgUrl == null){
         this.img = obj.headshotImgUrl;
       }else{
         this.img = obj.specialImages.largeTOTWImgUrl;
       }
     }

}
