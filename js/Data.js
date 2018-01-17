let dataItems = [];
const backgroundCard = {
  "sbc_base" : "0 -7268px",
  "totw_gold" : "0 -9796px",
  "fut_champions_gold" : "0 -1580px",
  "rare_gold" : "0 -1264px",
  "gold" : "0 -316px",
  "purple" : "0 -6004px",
  "silver" : "0 -2260px",
  "legend" : "0 -632px",
  "rare_silver" : "0 -1580px",
  "rare_bronze" : "0 -948px",
  "bronze" : "0 0px",
  "halloween" : "0 -3792px",
  "ones_to_watch" : "0 -5372px",
  "toty": "0 -10428px",
  "totw_gold" : "0 0px",
  "award_winner": "0 0px",
  "gotm": "0 -3476px",
  "fut_mas": "0 -2528px",
  "marquee": "0 -4424px",
  "sbc_premium" : "0 -7584px"
}

class Data{

  constructor(nombre,apellido){
      this.nombre = nombre;
      this.apellido = apellido;
      this.jugadores = [];
      this.getApiData(this.nombre);
    }

  playerHandler(data){
      let retorno = null;
      if(dataItems.length > 0){
        this.analizarDiscrminar();
        if(this.jugadores.length > 0){
          retorno = this.jugadores;
        }else{
          this.getApiData(this.apellido);
        }
      }
      return retorno;
  }

   getApiData(parameter){
       $.get("http://www.easports.com/es/fifa/ultimate-team/api/fut/item?jsonParamObject=",{name:parameter},
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
     	for(let i = 0;i < dataItems.length;i++){
        let css = "";
        // const commonName = this.normalizarCadenas(dataItems[i].commonName);
     		const firstName = this.normalizarCadenas(dataItems[i].firstName);
     		const lastName = this.normalizarCadenas(dataItems[i].lastName);
     		if(firstName.indexOf(this.nombre) > -1 && lastName.indexOf(this.apellido) > -1){
          let carta = dataItems[i].color;
          Object.getOwnPropertyNames(backgroundCard).forEach(function(val, idx, array) {
            if(carta == val){
                if(carta == "rare_gold" || carta == "gold" || carta == "silver" || carta == "legend" || carta == "rare_silver" || carta == "rare_bronze" || carta == "bronze"){
                  css = "('imgs/items-0.png')" + backgroundCard[val] + ";";
                }
                else{
                  css = "('imgs/items-1.png')" + backgroundCard[val] + ";";
                }
            }

          });
          this.jugadores.push(new Player(dataItems[i],css));
     		}
     	}
   }

  normalizarCadenas(cadena) {
  	const s1 = 'ÃÀÁÄÂĆÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇçć';
  	const s2 = 'AAAAACEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunnccc';
  	let devolucion = "";
  	for(let i = 0; i < cadena.length ; i++){
  		let j = 0;
  		let char = false;
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
