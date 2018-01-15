var dataItems = [];
var backgroundCard = {
  "sbc_base" : "0 -7268px",
  "totw_gold" : "0 -9796px",
  "fut_champions_gold" : "0 -1580px",
  "rare_gold" : "0 -1264px",
  "purple" : "0 -6004px",
  "silver" : "0 -2260px",
  "legend" : "0 -632px",
  "rare_silver" : "0 -1580px",
  "rare_bronze" : "0 -948px",
  "bronze" : "0 0px",
  "halloween" : "0 -3792px"
}

class Data{

  constructor(nombre,apellido){
      this.nombre = nombre;
      this.apellido = apellido;
      this.jugadores = [];
      this.getApiData();
    }

  playerHandler(data){
      var retorno = null;
      if(dataItems.length > 0){
        this.analizarDiscrminar();
        if(this.jugadores.length > 0){
          retorno = this.jugadores;
        }
      }
      return retorno;
  }




   getApiData(){
       $.get("http://www.easports.com/fifa/ultimate-team/api/fut/item?jsonParamObject=",{name:this.nombre},
          function(data, status){
              if(status == "success"){
                  dataItems = data.items;
              }else{
                  console.log("Error en peticion http");
              }
          }
        );
        // console.log($.get("http://www.easports.com/fifa/ultimate-team/api/fut/item?jsonParamObject=",{name:this.nombre}));
   }

  analizarDiscrminar(){
     	for(var i = 0;i < dataItems.length;i++){
        var css = "";
     		var firstName = this.normalizar(dataItems[i].firstName);
     		var lastName = this.normalizar(dataItems[i].lastName);
     		if(firstName.indexOf(this.nombre) > -1 && lastName.indexOf(this.apellido) > -1){
          var carta = dataItems[i].color;
          Object.getOwnPropertyNames(backgroundCard).forEach(function(val, idx, array) {
            if(carta == val){
                if(carta == "rare_gold" || carta == "standar_gold" || carta == "silver" || carta == "legend" || carta == "rare_silver" || carta == "rare_bronze" || carta == "bronze"){
                  css = "('imgs/items-big-group0-s50e3578bc5.png')" + backgroundCard[val] + ";";
                }
                else{
                  css = "('imgs/items-big-group1-sbba5f1adfb.png')" + backgroundCard[val] + ";";
                }
            }

          });
          this.jugadores.push(new Player(dataItems[i],css));
     		}
     	}
   }



  normalizar(cadena) {
  	var s1 = 'ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç';
  	var s2 = 'AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc';
  	var devolucion = "";
  	for(var i = 0; i < cadena.length ; i++){
  		var j = 0;
  		var char = false;
  		while(j < s1.length && !char){
  			if(cadena.charAt(i) === s1[j]){
  				devolucion += s2[j];
  				char = true;
  			}
  			j++;
  		}

  		if(!char){
  			devolucion += cadena[i];
  		}

  	}
  	return devolucion;
  }


} // end class
