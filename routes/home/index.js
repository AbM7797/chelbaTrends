const express=require('express');
const router=express.Router();
const Twit = require('twit');
const axios=require('axios');
const googleTrends = require('google-trends-api');
const fs= require('fs');




var trenTweets=[];
var youtube=[];
var googleQuo=[];
var googleTemp=[];





router.all('/*',(req,res,next)=>{

    req.app.locals.layout='home'
    next();

});

router.get('/',(req,res)=>{
   
//********************************Twitter**************************************
    var T = new Twit({
        consumer_key:         'oS4qitRipHwUzsjANd2CiFMX5',
        consumer_secret:      'HBgzw1T0lRA3b64tw2T99aQi6ASQfe2tRWfpTG2zNzMzymhADc',
        access_token:         '764059813198299136-SzoWF9uPtZePB0fCNWnKnomxgmhVTGC',
        access_token_secret:  'a1XEyPRBO64h4gC25f9nFmIau83RuxkssHal9PZ0Be53b',
        timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
        strictSSL:            true,     // optional - requires SSL certificates to be valid.
      });
    var params = {
        id: '1'
    }
    T.get('https://api.twitter.com/1.1/trends/place.json', params, gotData);
        
    function gotData(err, data, response) {
        var tweet = JSON.stringify(data);
        var tweets= [];
        tweets = JSON.parse(tweet)[0].trends;
        tweets.sort(function(a, b){
            return a.tweet_volume-b.tweet_volume;
        });
        for(let i=1;i<10;i++){
            if(tweets[tweets.length-i].tweet_volume!=null){
                trenTweets.push(tweets[tweets.length-i]);
            }
           
        }
        //***************************************Youtube************************
        axios.get('https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=TN&key=AIzaSyCT7G8i2gGZLSmSWi3iw6dS6jQxQxEwpUc').then(resul=>{
        var yout = resul.data.items;
        yout.sort(function(a,b){
            return a.statistics.viewCount - b.statistics.viewCount;
        });
        youtube =Array.prototype.reverse.apply(yout);
        //*************************Google********************************
        googleTrends.realTimeTrends({
            geo: 'FR',
            category: 'all',
        }, function(err, results) {
        if (err) {
       console.log(err);
        }else {
                googleTemp=JSON.parse(results).storySummaries.trendingStories;
                axios.get('https://trends.google.com/trends/api/dailytrends?hl=fr&tz=-60&geo=FR&ns=15').then(res=>{
                fs.writeFile('data.txt', res.data, function (err) {
                    if (err) throw err;
                });
            });
            fs.readFile('data.txt','utf-8',(err,data)=>{
            if(err)console.log(err);
        else {
        googleQuo = JSON.parse(data.substr(5)).default.trendingSearchesDays[0].trendingSearches;
        res.render('home/index',{youtube,youtube,trenTweets,trenTweets,googleQuo,googleQuo,googleTemp,googleTemp});
    }
}); 

//**********************************************************************************

    } 
}); 


  
        
}).catch(error=>{
    console.log(error);
});

 
    };



 

});









module.exports=router;