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
                /*$("#container").append(`
                                        <audio controls id='testSongId'>
                                            <source src="${song}" type="audio/mp3">
                                        </audio> 
                                        <table id='guessingTable'></table>`);*/
                $("#part-2-container").show();
                $("#part-2-container").css("display", "flex");
                $("#part-2-container").css("flex-wrap", "wrap");
                $("#part-2-container").css("flex-direction", "column");


                $("#songFile").attr("src", song.track.preview_url);
                $("#thumbnail").attr("src", getThumbnail(song));
                $("audio")[0].load();
            
                $("#guess").attr("placeholder", "Guess the ARTIST...");
                

            }
        });
    });
    $('#guessButton').click(function(){
        let guess = $('#guess').val();
        console.log(guess);
        if(song.track.artists.length === 1){
            if(guess === song.track.artists[0].name){
                console.log("correct");
            }
            else{
                console.log("wrong");
            }
        }   
        else{
            for(let i=0; i<song.track.artists.length; i++){
                if(guess === song.track.artist[i]){
                    console.log("correct");
                }
            }
            console.log("Wrong");
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

function getThumbnail(song){
    return song.track.album.images[0].url;
}