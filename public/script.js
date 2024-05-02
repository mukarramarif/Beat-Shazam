$(document).ready(function() {
    let song;
    $('#submitButton').click(function() {
        console.log($('#playlist-url-box').val());
        let url = new URL($('#playlist-url-box').val());
        let pathSegments = url.pathname.split('/');
        let playlistId = pathSegments[2];
        
        console.log(playlistId);
        $.ajax({
            url: "/send-playlist",
            type: 'GET',
            data: { id: playlistId },
            success: function(data) { //successfully sent the playlist link
                console.log(data);
                song = createSongElement(data);
                $("#container").hide();
                
                $("#part-2-container").show();
                $("#part-2-container").css("display", "flex");
                $("#part-2-container").css("flex-wrap", "wrap");
                $("#part-2-container").css("flex-direction", "column");


                $("#songFile").attr("src", song.track.preview_url);
                //$("body").css("background-image", "url(" + getThumbnail(song) + ")");
                $("audio")[0].load();
            
                $("#guess").attr("placeholder", "Guess the ARTIST...");
                

            }
        });
    });
    $('#guessButton').click(function(){
        let guess = $('#guess').val();
        console.log(guess);
        let answer = false;
        for(let i=0; i<song.track.artists.length; i++){
                if(guess === song.track.artists[i].name){
                    console.log("correct");
                    answer = true;
                }
        }

        if(!answer){
            console.log("Wrong");
        } else { //right answer, begin round 2...
            beginTitleRound();
            $("#table-artistname").empty();
            $("#table-artistname").append(guess);
        }

           
        
        
    });
});

function createSongElement(songs){
    let randomIndex = Math.floor(Math.random() * songs.items.length);
    console.log(randomIndex);
    let song = songs.items[randomIndex];
    let songUrl= song.track.preview_url;
    if(songUrl == null){
        return createSongElement(songs);
    }
    console.log(songUrl);
    return song;   
}

function beginTitleRound() {
    $('#guessButton').attr("onclick", null);
    $("#guess").empty();
    $("#guess").attr("placeholder", "Guess the SONG TITLE...");

    $('#guessButton').click(function(){
        let guess = $('#guess').val();
        console.log(guess);

    });

}

function getThumbnail(song){
    return song.track.album.images[0].url;
}