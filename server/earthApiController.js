const axios = require('axios');
const {API_KEY} = process.env;
const baseUrl = 'http://api.earth911.com'
module.exports={
    getMaterials: async (req,res)=>{
        let results = await axios.get(`${baseUrl}/earth911.getMaterials?api_key=${API_KEY}`);
        console.log('hi after axios request')
        let data = results.data.result;
        res.status(200).send(data);
    },
    getFamilies: async (req,res)=>{
        let wantedIds = [1,2,3,4,5,6,7,8,9,96,95,98]
        let results = await axios.get(`${baseUrl}/earth911.getFamilies?api_key=${API_KEY}`);
        let data = results.data.result;
        let sorted = [];
        data.forEach(item => {
            let found = false;
            wantedIds.filter(id =>{
                if(!found && item.family_id === id){
                    sorted.push(item);
                    found = true;
                    return false
                }else{
                    return true
                }
            })
        });
        sorted.forEach(item=>{
            console.log(item.description)
        })
        res.status(200).send(sorted);
    }
}