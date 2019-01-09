const axios = require('axios');
const {API_KEY} = process.env;
const baseUrl = 'http://api.earth911.com'
module.exports={
    getMaterials: async (req,res)=>{
        let results = await axios.get(`${baseUrl}/earth911.getMaterials?api_key=${API_KEY}`);
        let data = results.data.result;
        res.status(200).send(data);
    },
    getFamilies: async (req,res)=>{
        let wantedIds = [1,2,3,4,5,6,7,8,9,96,95,98]
        let results = await axios.get(`${baseUrl}/earth911.getFamilies?api_key=${API_KEY}`);
        let data = results.data.result;
        let sorted = data.filter(family => wantedIds.includes(family.family_id))
        res.status(200).send(sorted);
    },
    getLocations: async (req,res) => {
        let {lat,lng,ids} = req.query
        let idsArr = ids.split(",")
        if(!idsArr[0]){
            let results = await axios.get(`${baseUrl}/earth911.searchLocations?api_key=${API_KEY}&latitude=${lat}&longitude=${lng}&max_distance=25`);
            let data = results.data.result;
            if(data.length >31){
                data.splice(30);
            }
            res.status(200).send(data)
        }else{
            let urlStr = `${baseUrl}/earth911.searchLocations?api_key=${API_KEY}&latitude=${lat}&longitude=${lng}&max_distance=100`;
            idsArr.forEach(id =>{
                let material = `&material_id=${id}`;
                urlStr += material
            })
            let results = await axios.get(urlStr)
            let data = results.data.result;
            if(data.length >31){
                data.splice(30);
            }
            res.status(200).send(data)
        }
    },
    getLocationDetails: async (req, res)=>{
        let{location_id} = req.query;
        let results = await axios.get(`${baseUrl}/earth911.getLocationDetails?api_key=${API_KEY}&location_id=${location_id}`)
        let data = results.data.result;
        res.status(200).send(data)
    },
    getPrograms: async (req, res) => {
        const {lat,lng} = req.query
        let results = await axios.get(`${baseUrl}/earth911.searchPrograms?api_key=${API_KEY}&latitude=${lat}&longitude=${lng}&max_distance=100`);
        let data = results.data.result;
        if(data.length >31){
            data.splice(30);
        }
        res.status(200).send(data)
    },
    getProgramDetails: async (req, res) => {
        let{program_id} = req.query;
        let results = await axios.get(`${baseUrl}/earth911.getProgramDetails?api_key=${API_KEY}&program_id=${program_id}`)
        let data = results.data.result;
        res.status(200).send(data)
    }
}