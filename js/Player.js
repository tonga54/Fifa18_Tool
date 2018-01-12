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
         this.analizarImagen(obj);
         this.posicion = obj.position;

         //aceleracion, velocidad
         this.ritmo  = [obj.acceleration,obj.sprintspeed];
         //agilidad,equilibrio,anticipacion,control del balon,regates,compostura
         this.regates = [obj.agility,obj.balance,obj.reactions,obj.ballcontrol,obj.dribbling,obj.composure];
         //posicionamiento,definicion,potencia de tiro,tiros lejanos,voleas,penaltis
         this.tiros = [obj.positioning,obj.finishing,obj.shotpower,obj.longshots,obj.volleys,obj.penalties];
         //intercepciones,precision de cabeza,marcaje,robos de balon, entrada agresiva
         this.defensa = [obj.interceptions,obj.headingaccuracy,obj.marking,obj.standingtackle,obj.slidingtackle];
         //VISIÓN DE JUEGO, CENTROS, PRECISIÓN EN FALTAS, PASES CORTOS, PASES LARGOS, EFECTO
         this.pases = [obj.vision,obj.crossing,obj.freekickaccuracy,obj.shortpassing,obj.longpassing,obj.curve];
         //SALTO, RESISTENCIA, FUERZA, AGRESIVIDAD
         this.capacidadFisica = [obj.jumping,obj.stamina,obj.strength,obj.aggression];
     }

     showCard(){
         var codigo = "<div class='playerInfo'><div class='carta' style=\"background:url" + this.background +" \"> <div class='info'> <h3 class='media'>" + this.rating + "</h3><h4 class='posicion'>"+ this.posicion +"</h4> <img class='club' src='" + this.club + "'><img class='pais' src='" + this.pais + "'></div><div class='imagen'><img src='" + this.img + "' alt=''></div><div class='nombre'><h4>" + this.nombre + "</h4></div><div class='stats'><div class='left'><p><span id='ritmo' class='numero'>" + this.ritmoGbl + "</span><span class='caracteristica'> RIT</span></p><p><span id='tiro' class='numero'>" + this.tiroGbl + "</span><span class='caracteristica'> TIR</span></p><p><span id='pase' class='numero'>" + this.paseGbl + "</span><span class='caracteristica'> PAS</span></p></div><div class='right'><p><span id='regate' class='numero'>" + this.regateGbl + "</span><span class='caracteristica'> REG</span></p><p><span id='defensa' class='numero'>" + this.defensaGbl + "</span><span class='caracteristica'> DEF</span></p><p><span id='fisico' class='numero'>" + this.fisicoGbl + "</span><span class='caracteristica'> FIS</span></p></div></div></div>";

         codigo += "<div class='lineStats'><div class='detailedStats' style='float:left';><div class='titleLine'><span class='attributeGlobalTitle'>RITMO</span><span class='attributeGlobalValue " + this.changeColor(this.ritmoGbl) + "'>" + this.ritmoGbl + "</span></div><div><div class='line'><span class='attributeTitle'>ACELERACION</span><span class='attributeStats " + this.changeColor(this.ritmo[0]) + "'>" + this.ritmo[0] + "</span></div><div class='line'><span class='attributeTitle'>VELOCIDAD</span><span class='attributeStats " + this.changeColor(this.ritmo[1]) + "'>" + this.ritmo[1] + "</span></div></div></div>";

         codigo += "<div class='detailedStats'><div class='titleLine'><span class='attributeGlobalTitle'>REGATES</span><span class='attributeGlobalValue " + this.changeColor(this.regateGbl) + "'>" + this.regateGbl + "</span></div><div><div class='line'><span class='attributeTitle'>AGILIDAD</span><span class='attributeStats " + this.changeColor(this.regates[0]) + "'>" + this.regates[0] + "</span></div><div class='line'><span class='attributeTitle'>EQUILIBRIO</span><span class='attributeStats " + this.changeColor(this.regates[1]) + "'>" + this.regates[1] + "</span></div><div class='line'><span class='attributeTitle'>ANTICIPACION</span><span class='attributeStats " + this.changeColor(this.regates[2]) + "'>" + this.regates[2] + "</span></div><div class='line'><span class='attributeTitle'>CONTROL DEL BALON</span><span class='attributeStats " + this.changeColor(this.regates[3]) + "'>" + this.regates[3] + "</span></div><div class='line'><span class='attributeTitle'>REGATES</span><span class='attributeStats " + this.changeColor(this.regates[4]) + "'>" + this.regates[4] + "</span></div><div class='line'><span class='attributeTitle'>COMPOSTURA</span><span class='attributeStats " + this.changeColor(this.regates[5]) + "'>" + this.regates[5] + "</span></div></div></div></div>";

         codigo += "<div class='lineStats'><div class='detailedStats'><div class='titleLine'><span class='attributeGlobalTitle'>TIROS</span><span class='attributeGlobalValue " + this.changeColor(this.tiroGbl) + "'>" + this.tiroGbl + "</span></div><div><div class='line'><span class='attributeTitle'>POSICIONAMIENTO</span><span class='attributeStats " + this.changeColor(this.tiros[0]) + "'>" + this.tiros[0] + "</span></div><div class='line'><span class='attributeTitle'>DEFINICION</span><span class='attributeStats " + this.changeColor(this.tiros[1]) + "'>" + this.tiros[1] + "</span></div><div class='line'><span class='attributeTitle'>POTENCIA DE TIRO</span><span class='attributeStats " + this.changeColor(this.tiros[2]) + "'>" + this.tiros[2] + "</span></div><div class='line'><span class='attributeTitle'>TIROS LEJANOS</span><span class='attributeStats " + this.changeColor(this.tiros[3]) + "'>" + this.tiros[3] + "</span></div><div class='line'><span class='attributeTitle'>VOLEAS</span><span class='attributeStats " + this.changeColor(this.tiros[4]) + "'>" + this.tiros[4] + "</span></div><div class='line'><span class='attributeTitle'>PENALTIS</span><span class='attributeStats " + this.changeColor(this.tiros[5]) + "'>" + this.tiros[5] + "</span></div></div></div>";

         codigo += "<div class='detailedStats' style='float:left;'><div class='titleLine'><span class='attributeGlobalTitle'>DEFENSA</span><span class='attributeGlobalValue " + this.changeColor(this.defensaGbl) + "'>" + this.defensaGbl + "</span></div><div><div class='line'><span class='attributeTitle'>INTERCEPCIONES</span><span class='attributeStats " + this.changeColor(this.defensa[0]) + "'>" + this.defensa[0] + "</span></div><div class='line'><span class='attributeTitle'>PRECISION DE CABEZA</span><span class='attributeStats " + this.changeColor(this.defensa[1]) + "'>" + this.defensa[1] + "</span></div><div class='line'><span class='attributeTitle'>MARCAJE</span><span class='attributeStats " + this.changeColor(this.defensa[2]) + "'>" + this.defensa[2] + "</span></div><div class='line'><span class='attributeTitle'>ROBOS DE BALON</span><span class='attributeStats " + this.changeColor(this.defensa[3]) + "'>" + this.defensa[3] + "</span></div><div class='line'><span class='attributeTitle'>ENTRADA AGRESIVA</span><span class='attributeStats " + this.changeColor(this.defensa[4]) + "'>" + this.defensa[4] + "</span></div></div></div></div>";

         codigo += "<div class='lineStats'><div class='detailedStats'><div class='titleLine'><span class='attributeGlobalTitle'>PASES</span><span class='attributeGlobalValue " + this.changeColor(this.paseGbl) + "'>" + this.paseGbl + "</span></div><div><div class='line'><span class='attributeTitle'>VISION DE JUEGO</span><span class='attributeStats " + this.changeColor(this.pases[0]) + "'>" + this.pases[0] + "</span></div><div class='line'><span class='attributeTitle'>CENTROS</span><span class='attributeStats " + this.changeColor(this.pases[1]) + "'>" + this.pases[1] + "</span></div><div class='line'><span class='attributeTitle'>PRECISION EN FALTAS</span><span class='attributeStats " + this.changeColor(this.pases[2]) + "'>" + this.pases[2] + "</span></div><div class='line'><span class='attributeTitle'>PASES CORTOS</span><span class='attributeStats " + this.changeColor(this.pases[3]) + "'>" + this.pases[3] + "</span></div><div class='line'><span class='attributeTitle'>PASES LARGOS</span><span class='attributeStats " + this.changeColor(this.pases[4]) + "'>" + this.pases[4] + "</span></div><div class='line'><span class='attributeTitle'>EFECTO</span><span class='attributeStats " + this.changeColor(this.pases[5]) + "'>" + this.pases[5] + "</span></div></div></div>";

         codigo += "<div class='detailedStats' style='float:left;'><div class='titleLine'><span class='attributeGlobalTitle'>CAPACIDAD FISICA</span><span class='attributeGlobalValue " + this.changeColor(this.fisicoGbl) + "'>" + this.fisicoGbl + "</span></div><div><div class='line'><span class='attributeTitle'>SALTO</span><span class='attributeStats " + this.changeColor(this.capacidadFisica[0]) + "'>" + this.capacidadFisica[0] + "</span></div><div class='line'><span class='attributeTitle'>RESISTENCIA</span><span class='attributeStats " + this.changeColor(this.capacidadFisica[1]) + "'>" + this.capacidadFisica[1] + "</span></div><div class='line'><span class='attributeTitle'>FUERZA</span><span class='attributeStats " + this.changeColor(this.capacidadFisica[2]) + "'>" + this.capacidadFisica[2] + "</span></div><div class='line'><span class='attributeTitle'>AGRESIVIDAD</span><span class='attributeStats " + this.changeColor(this.capacidadFisica[3]) + "'>" + this.capacidadFisica[3] + "</span></div></div></div></div></div>";

         $("#cancha").append(codigo);
     }


     changeColor (value){
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

     analizarImagen(obj){
       //Si el jugador no tiene una imagen especial se la asigna la por defecto
       if(obj.specialImages.largeTOTWImgUrl == null){
         this.img = obj.headshotImgUrl;
       }else{
         this.img = obj.specialImages.largeTOTWImgUrl;
       }
     }

  }
