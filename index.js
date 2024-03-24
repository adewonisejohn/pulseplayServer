const express = require('express');
const app = express();
const ytdl = require('ytdl-core')
const search = require('youtube-search');
const usetube = require('usetube');
const {getPlaylistSongs} = require('./middlewares/songOfTheWeek')
require('dotenv').config()




app.get('/search',async function(req,res){
    var query = req.query.q;
    var result =[];
    var opts = {
        maxResults: 10,
        key: 'AIzaSyCQ0AIv4zV1j5malfaddggg4-rrE11PvTM',
    };
    try{
        const results = await usetube.searchVideo(query);
        const videoData = results.videos
        .map(result => ({
            title: result.title,
            artist: result.artist,
            url:"https://www.youtube.com/watch?v="+result.id,
            thumbnail:"https://img.youtube.com/vi/"+result.id+"/hqdefault.jpg",
            song_id: result.id,
        }));
        console.log(videoData)
        res.json({
            status:true,
            data:videoData
        })
    }catch(error){
        res.json({
            status:false,
            message:error.message
        })
    }
    
});

app.get('/musiclink',async function(req,res){
    try{
        var videoLink = req.query.videoUrl
        const videoInfo = await ytdl.getInfo(videoLink);
        const audioFormats = ytdl.filterFormats(videoInfo.formats,'audioonly');
        res.json({
            status:true,
            data:audioFormats[0].url
        })
    }catch(error){
        console.log(error)
        res.json({
            staus:false,
            message:error.message
        })
    }

});

app.get('/playlist-songs',getPlaylistSongs);

app.listen(2000,()=>{
    console.log('app listening on port 2000')
})