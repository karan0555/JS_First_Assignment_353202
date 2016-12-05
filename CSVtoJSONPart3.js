const readline = require('readline');
const fs = require('fs');

var out = fs.createWriteStream('part3.json');

const rl = readline.createInterface({
  input: fs.createReadStream('datafile.csv'),

  output: out
});

var continents = {"NorthAmerica": ["Canada","Mexico"],
"SouthAmerica": ["Argentina","Brazil","USA"],
"Europe": ["France","Germany","Italy","Russia","United Kingdom"],
"Asia": ["India","Indonesia","Japan","Saudi Arabia","Republic of Korea","Turkey"],
"Africa": ["South Africa"],
"Australia": ["Australia"]};

var flag =0;
var header ;
var countryIndex;
var populationIndex;
var GDPIndex;

var outArray = [];

var NorthAmerica = {
  "Continent Name":"North America",
  "AggregatePopulation": "0",
  "AggregateGPD": "0"
}
var SouthAmerica = {
  "Continent Name":"South America",
  "AggregatePopulation": "0",
  "AggregateGPD": "0"
}

var Europe = {
  "Continent Name":"Europe",
  "AggregatePopulation": "0",
  "AggregateGPD": "0"
}

var Asia = {
  "Continent Name":"Asia",
  "AggregatePopulation": "0",
  "AggregateGPD": "0"
}

var Africa = {
  "Continent Name":"Africa",
  "AggregatePopulation": "0",
  "AggregateGPD": "0"
}

var Australia = {
  "Continent Name":"Australia",
  "AggregatePopulation": "0",
  "AggregateGPD": "0"
}

outArray.push(NorthAmerica);
outArray.push(SouthAmerica);
outArray.push(Australia);
outArray.push(Africa);
outArray.push(Asia);
outArray.push(Europe);

rl.on('line', function(val) {
  //console.log('Line from file:', val); 
  
  if(flag == 0){
    console.log("Entering Heading");
    header = val.split(",");

    countryIndex = header.indexOf("Country Name");

    populationIndex2013 = header.indexOf("Population (Millions) - 2013");

    GDPIndex2013 = header.indexOf("GDP Billions (US$) - 2013");


    flag = 1;
  }
  else{
  	str = val.split(",");
  	var country = str[countryIndex];
    var pop = Number(str[populationIndex2013]);
    var gdp = Number(str[GDPIndex2013]);
    console.log(country+" "+pop+" "+gdp);

    for (var i in continents) {
      console.log("Entering For Loop");
      console.log([i]["AggregatePopulation"]);
      if (continents.hasOwnProperty(i)) {
        var indexOfCountry = continents[i].indexOf(country);
        if(indexOfCountry >= 0){
          i["AggregatePopulation"] += pop;
          i["AggregateGPD"] += gdp;
          console.log(i+" "+i["AggregatePopulation"]+" "+i["AggregateGPD"]);
          break;
        }        
      }
    }
  }

});


rl.on('close',function(){
  out.write(JSON.stringify(outArray));
})

