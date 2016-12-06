const readline = require('readline');
const fs = require('fs');

var out = fs.createWriteStream('../json/part2.json');

const rl = readline.createInterface({
  input: fs.createReadStream('../input/datafile.csv'),

  output: out
});
var flag =0;
var header ;
var countryIndex;
var populationIndex;
var GDPIndex;
var purPowerIndex;
var outArray = [];
var vl;

rl.on('line', function(val) {
  //console.log('Line from file:', val); 
  
  if(flag == 0){
    console.log("Entering Heading");
  	header = val.split(",");

  	for(j=0; j<header.length; j++){
      console.log("j = "+j+" "+header[j]);
  		if(header[j] == "Country Name")
  		{
        console.log("Country Name Index is "+j);
  			countryIndex = j;
  		}
  		if(header[j] == "Population (Millions) - 2013")
  		{
        console.log("Population (Millions) - 2013 Index is "+j);
  			populationIndex = j;
  		}
      if(header[j] == "GDP Billions (US$) - 2013")
      {
        console.log("GDP Billions (US$) - 2013"+j);
        GDPIndex = j;
      }
      if(header[j] == "Purchasing Power in Billions ( Current International Dollar) - 2013")
      {
        console.log("Purchasing Power in Billions (Current International Dollar) - 2013"+j);
        purPowerIndex = j;
      }
  	}
  	flag = 1;
  }
  else{
  	str = val.split(",");
  	var ob = {};
  	ob[header[countryIndex]] = str[countryIndex];
  	ob[header[populationIndex]] = str[populationIndex];
    ob[header[GDPIndex]] = str[GDPIndex];
    ob[header[purPowerIndex]] = str[purPowerIndex];
  	//console.log("Object is ");
  	//console.log(ob);
    outArray.push(ob);
  }
  
});


rl.on('close',function(){
  out.write(JSON.stringify(outArray));
})

