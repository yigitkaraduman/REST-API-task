const express = require('express');
const router = express.Router();
const axios = require('axios');


router.get('/', async (req, res) => {
    //request for getting countries data
    axios({
        method: 'get',
        url: "http://localhost:3000/countries",
      })
      .then((response) =>{
          let regionCountryNumList = getCountryNums(response.data);
          let assignments = assignRepresentatives(regionCountryNumList);
          res.send(JSON.stringify(assignments));
          
      })
      .catch(function (error) {
          console.log("Error:" + error.message);
      })

})

//extracts the list of total country numbers belong to every region.
const getCountryNums = function(countries){
    let countryNumList = [];
    for(let i = 0; i < countries.length; i++){
        let index = countryNumList.findIndex(country => country.region.toLowerCase() == countries[i].region.toLowerCase())
        if(index == -1){
            let newCountry = {"region": countries[i].region, "count": 1};
            countryNumList.push(newCountry);
        }
        else{
            let currentCountryCount = countryNumList[index].count;
            countryNumList[index].count = currentCountryCount + 1;
        }
    }

    return countryNumList;

}

//makes the min-max representative assignments
const assignRepresentatives = function(regionCountryNumList){
    let assignments = [];
    for(let i = 0; i < regionCountryNumList.length; i++){
        let minSalesReq = 0;
        if(regionCountryNumList[i].count > 0)
            minSalesReq = Math.ceil(regionCountryNumList[i].count / 7);
        
        let maxSalesReq = 0;
        if(regionCountryNumList[i].count > 0)
            maxSalesReq = Math.ceil(regionCountryNumList[i].count / 3);
        
        assignments.push({"region": regionCountryNumList[i].region, "minSalesReq": minSalesReq, "maxSalesReq": maxSalesReq});
     
    }
    
    return assignments;
}



module.exports = router;