class Player{
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

     showCard(){
         var codigo = "<div class='carta' style=\"background-image:url('imgs/" + this.tipo + "')\"> <div class='info'> <h3 class='media'>" + this.rating + "</h3><h4 class='posicion'>"+ this.posicion +"</h4> <img class='club' src='" + this.club + "'><img class='pais' src='" + this.pais + "'></div><div class='imagen'><img src='" + this.img + "' alt=''></div><div class='nombre'><h4>" + this.nombre + "</h4></div><div class='stats'><div class='left'><p><span id='ritmo' class='numero'>" + this.ritmo +"</span><span class='caracteristica'> RIT</span></p><p><span id='tiro' class='numero'>" + this.tiro + "</span><span class='caracteristica'> TIR</span></p><p><span id='pase' class='numero'>" + this.pase + "</span><span class='caracteristica'> PAS</span></p></div><div class='right'><p><span id='regate' class='numero'>" + this.regate + "</span><span class='caracteristica'> REG</span></p><p><span id='defensa' class='numero'>" + this.defensa + "</span><span class='caracteristica'> DEF</span></p><p><span id='fisico' class='numero'>" + this.fisico + "</span><span class='caracteristica'> FIS</span></p></div></div></div>";
         $("#cancha").append(codigo);
     }

  }
