class Data{

  constructor(nombre,apellido){
      this.nombre = nombre;
      this.apellido = apellido;
      this.jugadores = [];
      this.mix = "";
  }

  playerHandler(){
      var response = this.getApiData();
      var arrayPlayersObject = this.savePlayersObject(response);
      return arrayPlayersObject;
  }

  savePlayersObject(data){
      for(var i = 0;i < data.items.length; i++ ){
        if(data.items[i].lastName == this.apellido || data.items[i].commonName == this.mix){
             var typeCard = "p_" + data.items[i].playerType + "_" + data.items[i].quality + ".png";
             this.jugadores.push(new Player(data.items[i],typeCard));
        }
      }
      return this.jugadores;
  }

  getApiData(){
    var nombre = this.nombre;
    var apellido = this.apellido
    var mix = nombre + " " + apellido;
    this.mix = mix;
    var response = null;
      $("#cancha").empty();

      $.ajax({
         type : 'GET',
         url:'http://www.easports.com/fifa/ultimate-team/api/fut/item?jsonParamObject={%22name%22:%22'+ nombre +'%22}',
         data : {},
         dataType : 'json',
         async: false,
         success : function(data) {
           response = data;
         }
       });

       return response;
   }

}
