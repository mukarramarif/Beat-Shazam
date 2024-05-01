$(document).ready(function() {
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
                let song = createSongElement(data);
                $("#container").empty();
                $("#container").append(`
                                        <audio controls id='testSongId'>
                                            <source src="${song}" type="audio/mp3">
                                        </audio> 
                                        <table id='guessingTable'></table>`);
            }
        });
    });
});

function createSongElement(songs){
    let song = songs.items[0];
    let songUrl= song.track.preview_url;
    console.log(songUrl);
    return songUrl;   

}