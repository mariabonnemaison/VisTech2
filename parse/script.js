function parseCsv(d) {
    if(+d.likes>=1000000){
        return{ video_id: d.video_id, 
            title:d.title,
            trending_date:d.trending_date}


    }
}
    

    d3.csv('./YoutubeTrendingVideos-ARTG5430.csv', parseCsv).then(function(data){
  console.log(data)


});

