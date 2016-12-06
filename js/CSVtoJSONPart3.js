const readline = require('readline');
const fs = require('fs');

var out = fs.createWriteStream('../json/part3.json');

const rl = readline.createInterface({
  input: fs.createReadStream('../input/datafile.csv'),

  output: out
});

/*var continents1 = {"NorthAmerica": ["Canada","Mexico"],
"SouthAmerica": ["Argentina","Brazil","USA"],
"Europe": ["France","Germany","Italy","Russia","United Kingdom"],
"Asia": ["India","Indonesia","Japan","Saudi Arabia","Republic of Korea","Turkey"],
"Africa": ["South Africa"],
"Australia": ["Australia"]};*/

var continents = [
                  { "Continent Name":"North America", 
                    "Countries": ["Canada","Mexico","USA"], 
                    "AggregatePopulation": "0", 
                    "AggregateGPD": "0"},
                  {"Continent Name":"South America",
                    "Countries": ["Argentina","Brazil"],
                    "AggregatePopulation": "0",
                    "AggregateGPD": "0"},
                  {"Continent Name":"Europe",
                   "Countries": ["France","Germany","Italy","United Kingdom"],
                   "AggregatePopulation": "0",
                   "AggregateGPD": "0"},
                  {"Continent Name":"Asia",
                  "Countries": ["India","Indonesia","Japan","Saudi Arabia","Republic of Korea","Turkey","Russia","China"],
                   "AggregatePopulation": "0",
                   "AggregateGPD": "0"},
                   {"Continent Name":"Australia",
                    "Countries": ["Australia"],
                    "AggregatePopulation": "0",
                    "AggregateGPD": "0"},
                    {"Continent Name":"Africa",
                      "Countries": ["South Africa"],
                      "AggregatePopulation": "0",
                      "AggregateGPD": "0"}];

var flag =0;
var header ;
var countryIndex;
var populationIndex;
var GDPIndex;

/*
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
outArray.push(Europe); */

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

    for(i=0; i<continents.length; i++){
      //console.log("Entering for");
      var temp = continents[i];
      var countriesArray = temp.Countries;
      
      var indexOfCountry = countriesArray.indexOf(country);
      if(indexOfCountry >= 0){
        temp.AggregatePopulation = Number(temp.AggregatePopulation) + pop;
        temp.AggregateGPD = Number(temp.AggregateGPD) + gdp;
        break;
      }
    }
    
  }

});


rl.on('close',function(){
  console.log(continents);
  out.write(JSON.stringify(continents));
})

