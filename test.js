var continents = {"North America": ["Canada","Mexico"],
                  "South America": ["Argentina","Brazil","USA"],
                  "Europe": ["France","Germany","Italy","Russia","United Kingdom"],
                  "Asia": ["India","Indonesia","Japan","Saudi Arabia","Republic of Korea","Turkey"],
                  "Africa": ["South Africa"],
                  "Australia": ["Australia"]};

function showProps(obj, objName) {
  var result = "";
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      result += objName + "." + i + " = " + obj[i] + "\n";
      console.log("Index of Non Country "+obj[i].indexOf("India"));
      console.log(obj[i]);
    }
  }
  return result;
}

console.log(showProps(continents,"continents"));