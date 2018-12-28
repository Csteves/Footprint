const Parser = require('rss-parser');
const parser = new Parser();

module.exports ={
    getNews: async (req,res) =>{
        let feed = await parser.parseURL('https://news.google.com/_/rss/search?q=recycling&hl=en-US&gl=US&ceid=US:en');
        let limitedFeed = feed.items.splice(15);
        if(limitedFeed.length){
            return res.status(200).send(feed)
        }else{
            return res.status(400).send("Unable to fetch news")
        }
    }

}