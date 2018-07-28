$("#btnEnviar").click(search);

$(".search").keyup(function(e){
  if(e.key == "Enter"){
    search();
  }
});

function search(){
  let name   = $("#txtNombre").val();
  let lastName = $("#txtApellido").val();
  if(name == "" || lastName == "" || !isNaN(name) || !isNaN(lastName)){
    alert("Nombre o apellido vacio / No pueden ser numericos");
  }else{
    name = capitalize(name);
    lastName = capitalize(lastName);
    getApiData(name,lastName,1);
  }
}


function getApiData(name,lastname,page){
	const loading = $("#loading");
  	$.ajax({
	    url:"http://www.easports.com/es/fifa/ultimate-team/api/fut/item",
	    type : "GET",
	    datatype : "json",
	    data : {"name":name,"page":page},
	    beforeSend : function(){
	    	loading.show();
	    },
	    success : function (response){
	      if(response.items.length > 0){
	      	let players = discriminarJugadores(response.items,name,lastname);
	      	if(players.length <= 0 && page == 1){
	      		getApiData(name,lastname, page+1);
	      	}
	      	
	      	if(players.length > 0){
	      		showCards(players);
	      	}

	      }
	    },
	    error : function(response){
	      console.log("ERROR: ", response);
	    },
	    complete: function(response){
	    	if(response.responseJSON.items.length <= 0){
	    		alert("No se encontraron coincidencias");
	    	}
	    	loading.hide();
	    }
	});
}

function getColor (value){
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

function playerImage(player){
   //Si el jugador no tiene una imagen especial se la asigna la por defecto
   if(player.specialImages.largeTOTWImgUrl == null){
     return player.headshotImgUrl;
   }else{
     return player.specialImages.largeTOTWImgUrl;
   }
 }

 function capitalize(string){
  let aux = "";
  for(let i = 0; i < string.length;i++){
    if(i == 0){
        aux += string.charAt(i).toUpperCase();
    }else{
      if(string.charAt(i-1) == " "){
        aux += string.charAt(i).toUpperCase();
      }else{
        aux += string.charAt(i).toLowerCase();
      }
    }
  }//end for
  return aux;
}

function normalize(string) {
  	const s1 = 'ÃÀÁÄÂĆÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇçć';
  	const s2 = 'AAAAACEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunnccc';
  	let devolucion = "";
  	for(let i = 0; i < string.length ; i++){
  		let j = 0;
  		let char = false;
  		while(j < s1.length && !char){
  			if(string.charAt(i) === s1[j]){
  				devolucion += s2[j];
  				char = true;
  			}
  			j++;
  		}

  		if(!char){
  			devolucion += string[i];
  		}

  	}
  	return devolucion;
}

function discriminarJugadores(response,name,lastname){
	let ret = [];
 	for(let i = 0; i < response.length;i++){
        let css = "";
 		const playerFirstName = normalize(response[i].firstName);
 		const playerLastName = normalize(response[i].lastName);
 		// const playerCommonName = normalize(response[i].commonName);
 		if((playerFirstName.indexOf(name) > -1 && playerLastName.indexOf(lastname) > -1)){
	      	ret.push(response[i]);
 		}
 	}

 	return ret;
}

function showCards(players){
	$("#pitch").empty();
	$("#specificInfo").empty();

	var specificInfo = 
	"<div id='inf' class='detailedStats'>" +
		"<div>" + 
			"<div class='line'>" +
				"<span class='attributeTitle'>EDAD</span>" +
				"<span class='attributeStats'>" + players[0].age + "</span>" +
			"</div>" +
			"<div class='line'>" +
				"<span class='attributeTitle'>ALTURA</span>" +
				"<span class='attributeStats'>" + players[0].height + "</span>" +
			"</div>" +
			"<div class='line'>" +
				"<span class='attributeTitle'>PESO</span>" +
				"<span class='attributeStats'>" + players[0].weight + "</span>" +
			"</div>" +
			"<div class='line'>" +
				"<span class='attributeTitle'>PIE</span>" +
				"<span class='attributeStats'>" + players[0].foot + "</span>" +
			"</div>" +
			"<div class='line'>" +
				"<span class='attributeTitle'>PAÍS</span>" +
				"<span class='attributeStats'>" + players[0].nation.name + "</span>" +
			"</div>" +
			"<div class='line'>" +
				"<span class='attributeTitle'>EQUIPO</span>" +
				"<span class='attributeStats'>" + players[0].club.name + "</span>" +
			"</div>" +
			"<div class='line'>" +
				"<span class='attributeTitle'>LIGA</span>" +
				"<span class='attributeStats'>" + players[0].league.name + "</span>" +
			"</div>" +
			"<div class='line'>" +
				"<span class='attributeTitle'>PIERNA MALA</span>" +
				"<span class='attributeStats'>" + players[0].weakFoot + " <span class='icon-star-full'></span></span>" +
			"</div>" +
			"<div class='line'>" +
				"<span class='attributeTitle'>FILIGRANAS</span>" +
				"<span class='attributeStats'>"+ players[0].skillMoves +" <span class='icon-star-full'></span></span>" +
			"</div>" +
			"<div class='line'>" +
				"<span class='attributeTitle'>ÍNDICE DE TRABAJO OFENSIVO</span>" +
				"<span class='attributeStats'>" + players[0].atkWorkRate + "</span>" +
			"</div>" +
			"<div class='line'>" +
				"<span class='attributeTitle'>ÍNDICE DE TRABAJO DEFENSIVO</span>" +
				"<span class='attributeStats'>" + players[0].defWorkRate + "</span>" +
			"</div>" +
		"</div>" +
	"</div>";

	for(let i = 0; i < players.length;i++){
		 
        var codigo = "<div class='playerInfo'>" +
				       "<div class='carta " + players[i].color + "'>" +
				       		"<div class='info'>" +
				       			"<h3 class='media'>" + players[i].rating + "</h3>" +
				       			"<h4 class='posicion'>"+ players[i].position +"</h4>" + 
				       			"<img class='club' src='" + players[i].club.imageUrls.normal.small + "'>" +
				       			"<img class='pais' src='" + players[i].nation.imageUrls.medium + "'>" +
				       		"</div>" +
				       		"<div class='imagen'>" +
				       			"<img src='" + playerImage(players[i]) + "' alt=''>" +
				       		"</div>" +
				       		"<div class='nombre'>" +
				       			"<h4>" + players[i].name.toUpperCase() + "</h4>" +
				       		"</div>" +
				       		"<div class='stats'>" +
				       			"<div class='left'>" +
				       				"<p>" +
				       					"<span id='ritmo' class='numero'>" + players[i].attributes[0].value + "</span>" +
				       					"<span class='caracteristica'> RIT</span>" +
				   					"</p>" +
				   					"<p>" +
				   						"<span id='tiro' class='numero'>" + players[i].attributes[1].value + "</span>" +
				   						"<span class='caracteristica'> TIR</span>" +
									"</p>" +
									"<p>" +
										"<span id='pase' class='numero'>" + players[i].attributes[2].value + "</span>" +
										"<span class='caracteristica'> PAS</span>" +
									"</p>" +
								"</div>" +
								"<div class='right'>" +
									"<p>" +
										"<span id='regate' class='numero'>" + players[i].attributes[3].value + "</span>" +
										"<span class='caracteristica'> REG</span>" +
									"</p>" +
									"<p>" +
										"<span id='defensa' class='numero'>" + players[i].attributes[4].value + "</span>" +
										"<span class='caracteristica'> DEF</span>" +
									"</p>" +
									"<p>" +
										"<span id='fisico' class='numero'>" + players[i].attributes[5].value + "</span>" +
										"<span class='caracteristica'> FIS</span>" +
									"</p>" +
								"</div>" +
							"</div>" +
						"</div>";

        codigo += "<div class='lineStats'>" +
					"<div class='detailedStats' style='float:left;'>" +
						"<div class='titleLine'>" +
							"<span class='attributeGlobalTitle'>RITMO</span>" +
							"<span class='attributeGlobalValue " + getColor(players[i].attributes[0].value) + "'>" + players[i].attributes[0].value + "</span>" +
						"</div>" +
						"<div>" +
							"<div class='line'>" +
								"<span class='attributeTitle'>RITMO</span>" +
								"<span class='attributeStats " + getColor(players[i].attributes[0].value)+ "'>" + players[i].attributes[0].value + "</span>" +
							"</div>" +
						"</div>" +
						"<div>" +
							"<div class='line'>" +
								"<span class='attributeTitle'>ACELERACION</span>" +
								"<span class='attributeStats " + getColor(players[i].acceleration)+ "'>" + players[i].acceleration + "</span>" +
							"</div>" +
						"</div>" +
						"<div>" +
							"<div class='line'>" +
								"<span class='attributeTitle'>VELOCIDAD</span>" +
								"<span class='attributeStats " + getColor(players[i].sprintspeed)+ "'>" + players[i].sprintspeed + "</span>" +
							"</div>" +
						"</div>" +
					"</div>" +
					"<div class='detailedStats'>" +
						"<div class='titleLine'>" +
							"<span class='attributeGlobalTitle'>REGATE</span>" +
							"<span class='attributeGlobalValue " + getColor(players[i].attributes[3].value) + "'>" + players[i].attributes[3].value + "</span>" +
						"</div>" +
						"<div>" +
							"<div class='line'>" +
								"<span class='attributeTitle'>REGATE</span>" +
								"<span class='attributeStats " + getColor(players[i].attributes[3].value)+ "'>" + players[i].attributes[3].value + "</span>" +
							"</div>" +
						"</div>" +
						"<div>" +
							"<div class='line'>" +
								"<span class='attributeTitle'>AGILIDAD</span>" +
								"<span class='attributeStats " + getColor(players[i].agility)+ "'>" + players[i].agility + "</span>" +
							"</div>" +
						"</div>" +
						"<div>" +
							"<div class='line'>" +
								"<span class='attributeTitle'>EQUILIBRIO</span>" +
								"<span class='attributeStats " + getColor(players[i].balance)+ "'>" + players[i].balance + "</span>" +
							"</div>" +
						"</div>" +
						"<div>" +
							"<div class='line'>" +
								"<span class='attributeTitle'>ANTICIPACION</span>" +
								"<span class='attributeStats " + getColor(players[i].reactions)+ "'>" + players[i].reactions + "</span>" +
							"</div>" +
						"</div>" +
						"<div>" +
							"<div class='line'>" +
								"<span class='attributeTitle'>COTROL DEL BALON</span>" +
								"<span class='attributeStats " + getColor(players[i].ballcontrol)+ "'>" + players[i].ballcontrol + "</span>" +
							"</div>" +
						"</div>" +
						"<div>" +
							"<div class='line'>" +
								"<span class='attributeTitle'>REGATES</span>" +
								"<span class='attributeStats " + getColor(players[i].dribbling)+ "'>" + players[i].dribbling + "</span>" +
							"</div>" +
						"</div>" +
						"<div>" +
							"<div class='line'>" +
								"<span class='attributeTitle'>COMPOSTURA</span>" +
								"<span class='attributeStats " + getColor(players[i].composure)+ "'>" + players[i].composure + "</span>" +
							"</div>" +
						"</div>" +
					"</div>" +
				"</div>" +
				"<div style='clear:both;'>" +
					
				"</div>" +
				"<div class='lineStats'>" +
					"<div class='detailedStats' style='float:left;'>" +
						"<div class='titleLine'>" +
							"<span class='attributeGlobalTitle'>TIRO</span>" +
							"<span class='attributeGlobalValue " + getColor(players[i].attributes[1].value) + "'>" + players[i].attributes[1].value + "</span>" +
						"</div>" +
						"<div>" +
							"<div class='line'>" +
								"<span class='attributeTitle'>TIRO</span>" +
								"<span class='attributeStats " + getColor(players[i].attributes[1].value)+ "'>" + players[i].attributes[1].value + "</span>" +
							"</div>" +
						"</div>" +
						"<div>" +
							"<div class='line'>" +
								"<span class='attributeTitle'>POSICIONAMIENTO</span>" +
								"<span class='attributeStats " + getColor(players[i].positioning)+ "'>" + players[i].positioning + "</span>" +
							"</div>" +
						"</div>" +
						"<div>" +
							"<div class='line'>" +
								"<span class='attributeTitle'>DEFINICION</span>" +
								"<span class='attributeStats " + getColor(players[i].finishing)+ "'>" + players[i].finishing + "</span>" +
							"</div>" +
						"</div>" +
						"<div>" +
							"<div class='line'>" +
								"<span class='attributeTitle'>POTENCIA DE TIRO</span>" +
								"<span class='attributeStats " + getColor(players[i].shotpower)+ "'>" + players[i].shotpower + "</span>" +
							"</div>" +
						"</div>" +
						"<div>" +
							"<div class='line'>" +
								"<span class='attributeTitle'>TIROS LEJANOS</span>" +
								"<span class='attributeStats " + getColor(players[i].longshots)+ "'>" + players[i].longshots + "</span>" +
							"</div>" +
						"</div>" +
						"<div>" +
							"<div class='line'>" +
								"<span class='attributeTitle'>VOLEAS</span>" +
								"<span class='attributeStats " + getColor(players[i].volleys)+ "'>" + players[i].volleys + "</span>" +
							"</div>" +
						"</div>" +
						"<div>" +
							"<div class='line'>" +
								"<span class='attributeTitle'>PENALTIES</span>" +
								"<span class='attributeStats " + getColor(players[i].penalties)+ "'>" + players[i].penalties + "</span>" +
							"</div>" +
						"</div>" +
					"</div>" +
					"<div class='detailedStats'>" +
						"<div class='titleLine'>" +
							"<span class='attributeGlobalTitle'>DEFENSA</span>" +
							"<span class='attributeGlobalValue " + getColor(players[i].attributes[4].value) + "'>" + players[i].attributes[4].value + "</span>" +
						"</div>" +
						"<div>" +
							"<div class='line'>" +
								"<span class='attributeTitle'>DEFENSA</span>" +
								"<span class='attributeStats " + getColor(players[i].attributes[4].value)+ "'>" + players[i].attributes[4].value + "</span>" +
							"</div>" +
						"</div>" +
						"<div>" +
							"<div class='line'>" +
								"<span class='attributeTitle'>INTERCEPCIONES</span>" +
								"<span class='attributeStats " + getColor(players[i].interceptions)+ "'>" + players[i].interceptions + "</span>" +							"</div>" +
						"</div>" +
						"<div>" +
							"<div class='line'>" +
								"<span class='attributeTitle'>PRECISION DE CABEZA</span>" +
								"<span class='attributeStats " + getColor(players[i].headingaccuracy)+ "'>" + players[i].headingaccuracy + "</span>" +
							"</div>" +
						"</div>" +
						"<div>" +
							"<div class='line'>" +
								"<span class='attributeTitle'>MARCAJE</span>" +
								"<span class='attributeStats " + getColor(players[i].marking)+ "'>" + players[i].marking + "</span>" +
							"</div>" +
						"</div>" +
						"<div>" +
							"<div class='line'>" +
								"<span class='attributeTitle'>ROBOS DE BALON</span>" +
								"<span class='attributeStats " + getColor(players[i].standingtackle)+ "'>" + players[i].standingtackle + "</span>" +
							"</div>" +
						"</div>" +
						"<div>" +
							"<div class='line'>" +
								"<span class='attributeTitle'>ENTRADA AGRESIVA</span>" +
								"<span class='attributeStats " + getColor(players[i].slidingtackle)+ "'>" + players[i].slidingtackle + "</span>" +
							"</div>" +
						"</div>" +
					"</div>" +
				"</div>" +
				"<div style='clear:both;'>" +
					
				"</div>" +
				"<div class='lineStats'>" +
					"<div class='detailedStats' style='float:left;'>" +
						"<div class='titleLine'>" +
							"<span class='attributeGlobalTitle'>PASES</span>" +
							"<span class='attributeGlobalValue " + getColor(players[i].attributes[2].value) + "'>" + players[i].attributes[2].value + "</span>" +
						"</div>" +
						"<div>" +
							"<div class='line'>" +
								"<span class='attributeTitle'>PASES</span>" +
								"<span class='attributeStats " + getColor(players[i].attributes[2].value)+ "'>" + players[i].attributes[2].value + "</span>" +
							"</div>" +
						"</div>" +
						"<div>" +
							"<div class='line'>" +
								"<span class='attributeTitle'>VISION DE JUEGO</span>" +
								"<span class='attributeStats " + getColor(players[i].vision)+ "'>" + players[i].vision + "</span>" +
							"</div>" +
						"</div>" +
						"<div>" +
							"<div class='line'>" +
								"<span class='attributeTitle'>CENTROS</span>" +
								"<span class='attributeStats " + getColor(players[i].crossing)+ "'>" + players[i].crossing + "</span>" +
							"</div>" +
						"</div>" +
						"<div>" +
							"<div class='line'>" +
								"<span class='attributeTitle'>PRECISION EN FALTAS</span>" +
								"<span class='attributeStats " + getColor(players[i].freekickaccuracy)+ "'>" + players[i].freekickaccuracy + "</span>" +
							"</div>" +
						"</div>" +
						"<div>" +
							"<div class='line'>" +
								"<span class='attributeTitle'>PASES CORTOS</span>" +
								"<span class='attributeStats " + getColor(players[i].shortpassing)+ "'>" + players[i].shortpassing + "</span>" +
							"</div>" +
						"</div>" +
						"<div>" +
							"<div class='line'>" +
								"<span class='attributeTitle'>PASES LARGOS</span>" +
								"<span class='attributeStats " + getColor(players[i].longpassing)+ "'>" + players[i].longpassing + "</span>" +
							"</div>" +
						"</div>" +
						"<div>" +
							"<div class='line'>" +
								"<span class='attributeTitle'>EFECTO</span>" +
								"<span class='attributeStats " + getColor(players[i].curve)+ "'>" + players[i].curve + "</span>" +
							"</div>" +
						"</div>" +
					"</div>" +
					"<div class='detailedStats'>" +
						"<div class='titleLine'>" +
							"<span class='attributeGlobalTitle'>CAPACIDAD FISICA</span>" +
							"<span class='attributeGlobalValue " + getColor(players[i].attributes[5].value) + "'>" + players[i].attributes[5].value + "</span>" +
						"</div>" +
						"<div>" +
							"<div class='line'>" +
								"<span class='attributeTitle'>CAPACIDAD FISICA</span>" +
								"<span class='attributeStats " + getColor(players[i].attributes[5].value)+ "'>" + players[i].attributes[5].value + "</span>" +
							"</div>" +
						"</div>" +
						"<div>" +
							"<div class='line'>" +
								"<span class='attributeTitle'>SALTO</span>" +
								"<span class='attributeStats " + getColor(players[i].jumping)+ "'>" + players[i].jumping + "</span>" +
							"</div>" +
						"</div>" +
						"<div>" +
							"<div class='line'>" +
								"<span class='attributeTitle'>RESISTENCIA</span>" +
								"<span class='attributeStats " + getColor(players[i].stamina)+ "'>" + players[i].stamina + "</span>" +
							"</div>" +
						"</div>" +
						"<div>" +
							"<div class='line'>" +
								"<span class='attributeTitle'>FUERZA</span>" +
								"<span class='attributeStats " + getColor(players[i].strength)+ "'>" + players[i].strength + "</span>" +
							"</div>" +
						"</div>" +
						"<div>" +
							"<div class='line'>" +
								"<span class='attributeTitle'>AGRESIVIDAD</span>" +
								"<span class='attributeStats " + getColor(players[i].aggression)+ "'>" + players[i].aggression + "</span>" +
							"</div>" +
						"</div>" +
					"</div>" +
				"</div>" +
				"<div style='clear:both;'></div>";

				$("#pitch").append(codigo);

    }//end for

   $("#specificInfo").html(specificInfo);
}