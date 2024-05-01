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
                $("#songFile").attr("src", song.track.preview_url);
                $("audio")[0].load();
            
                
                

            }
        });
    });
    $('#guessButton').click(function(){
        let guess = $('#guess').val();
        console.log(guess);
        let foundArtist = false;
        for(let i=0; i<song.track.artists.length; i++){
            
                console.log(song.track.artists[i]);
                if(guess === song.track.artists[i].name){
                    foundArtist = true;
                    console.log("correct");
                }
            }
            if (!foundArtist) console.log("Wrong");
        
        
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

