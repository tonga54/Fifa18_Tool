class Player{
      constructor(obj,tipoCarta){
         // this.id = Jugador.id;
         // Jugador.id++;
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
         this.img = obj.headshotImgUrl;
         this.posicion = obj.position;
         this.tipo = tipoCarta;

         //acelracion, velocidad
         this.ritmo  = [obj.acceleration,obj.sprintspeed];
         //agilidad,equilibrio,anticipacion,control del balon,regates,compostura
         this.regates = [obj.agility,obj.balance,obj.reactions,obj.ballcontrol,obj.dribbling,obj.composure];
         //posicionamiento,definicion,potencia de tiro,tiros lejanos,voleas,penaltis
         this.tiros = [obj.positioning,obj.finishing,obj.shotpower,obj.longshot,obj.volleys,obj.penalties];
         //intercepciones,precision de cabeza,marcaje,robos de balon, entrada agresiva
         this.defensa = [obj.interceptions,obj.headingaccuracy,obj.marking,obj.standingtackle,obj.slidingtackle];
         //VISIÓN DE JUEGO, CENTROS, PRECISIÓN EN FALTAS, PASES CORTOS, PASES LARGOS, EFECTO
         this.pases = [obj.vision,obj.crossing,obj.freekickaccuracy,obj.shortpassing,obj.longpassing,obj.curve];
         //SALTO, RESISTENCIA, FUERZA, AGRESIVIDAD
         this.capacidadFisica = [obj.jumping,obj.stamina,obj.strength,obj.aggression];
     }

     showCard(){
         var codigo = "<div class='carta' style=\"background-image:url('imgs/" + this.tipo + "')\"> <div class='info'> <h3 class='media'>" + this.rating + "</h3><h4 class='posicion'>"+ this.posicion +"</h4> <img class='club' src='" + this.club + "'><img class='pais' src='" + this.pais + "'></div><div class='imagen'><img src='" + this.img + "' alt=''></div><div class='nombre'><h4>" + this.nombre + "</h4></div><div class='stats'><div class='left'><p><span id='ritmo' class='numero'>" + this.ritmoGbl + "</span><span class='caracteristica'> RIT</span></p><p><span id='tiro' class='numero'>" + this.tiroGbl + "</span><span class='caracteristica'> TIR</span></p><p><span id='pase' class='numero'>" + this.paseGbl + "</span><span class='caracteristica'> PAS</span></p></div><div class='right'><p><span id='regate' class='numero'>" + this.regateGbl + "</span><span class='caracteristica'> REG</span></p><p><span id='defensa' class='numero'>" + this.defensaGbl + "</span><span class='caracteristica'> DEF</span></p><p><span id='fisico' class='numero'>" + this.fisicoGbl + "</span><span class='caracteristica'> FIS</span></p></div></div></div>";

         //RITMO
         codigo += "<div class='estadisticas'><h3>RITMO</h3><div><div class='line'><span class='tit'>ACELERACION</span><span class='estadis'>" + this.ritmo[0] + "</span></div><div class='line'><span class='tit'>VELOCIDAD</span><span class='estadis'>" + this.ritmo[1] + "</span></div></div></div>";

         //REGATES
         //codigo += "<div class='estadisticas'><h3>Regate<h3><div><div class='line'><span class='tit'>AGILIDAD</span><span class='estadis'>" + this.ritmo[0] + "</span></div><div class='line'><span class='tit'>VELOCIDAD:</span><span class='estadis'>" + this.ritmo[1] + "</span></div></div></div>";
         $("#cancha").append(codigo);
     }

  }
