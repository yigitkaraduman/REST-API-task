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
          console.log(regionCountryNumList);
          let assignments = assignRepresentatives(regionCountryNumList);
          let distributions = distribute(assignments, response.data);
          res.send(JSON.stringify(distributions));
          
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
    console.log(assignments);
    return assignments;
}

//distributes sales reps equally as possible.
const distribute = function(assignments, countries){
    let distributionList = [];
    for(let i = 0; i < assignments.length; i++){ //traverses minSaleReq per region list
        let subList = []; //holds reps for the current region
        let currentRegion = assignments[i].region; //current region
        let minSalesReq = assignments[i].minSalesReq; //current minSale for the spesified region
        let subListpointer = 0;
        for(let k = 0; k < countries.length; k++){ //traverse country data
            if(countries[k].region.toLowerCase() == currentRegion.toLowerCase()){
                if(subList.length < minSalesReq) //there should be maximum minSalesReq amount sales rep in the sublist
                    subList.push({"region": currentRegion, "countryList": [countries[k].name], "countryCount": 1});
            
                else{ //assign countries to reps in order. If it comes to end of sublist, it goes back to 0 index and continue to assign reps in order again.
                    if(subList[subListpointer] == null)
                        subListpointer = 0;
                    
                    subList[subListpointer].countryList.push(countries[k].name);
                    subList[subListpointer].countryCount = subList[subListpointer].countryCount + 1;
                    subListpointer++;
                }
            }
        }

        distributionList = distributionList.concat(subList);
    }

        return distributionList;
}

module.exports = router;
