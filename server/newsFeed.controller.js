const Parser = require('rss-parser');
const parser = new Parser();

module.exports ={
    getNews: async (req,res) =>{
        let feed = await parser.parseURL('https://news.google.com/_/rss/search?q=recycling');
        let limitedFeed = feed.items.splice(15);
        if(limitedFeed.length){
            return res.status(200).send(feed)
        }else{
            return res.status(400).send("Unable to fetch news")
        }
    },
    getNewsToday: async (req,res) => {
        let feed = await parser.parseURL('https://www.recyclingtoday.com/rss/');
        let limitedFeed = feed.items.splice(15);
        if(limitedFeed.length){
            return res.status(200).send(feed)
        }else{
            return res.status(400).send("Unable to fetch news")
        }
    }

}