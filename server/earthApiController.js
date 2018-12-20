const axios = require('axios');
const {API_KEY} = process.env;
const baseUrl = 'http://api.earth911.com'
module.exports={
    getMaterials: async (req,res)=>{
        let results = await axios.get(`${baseUrl}/earth911.getMaterials?api_key=${API_KEY}`);
        console.log('hi after axios request')
        let data = results.data.result.filter(item => item.description.toLowerCase().includes('alum'));
        console.log(data)
        res.status(200).send(data);
    }
}