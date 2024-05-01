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
            success: function(recievedData) { //successfully sent the playlist link
                console.log(recievedData);
                $("#container").empty();
                $("#container").append(`<p>Next Step</p> 
                                        <audio controls id='testSongId'>
                                            <source src="${recievedData.previewUrl}" type="audio/mp3">
                                        </audio> 
                                        <table id='guessingTable'></table>`);
            }
        });
    });
});

<<<<<<< HEAD
//function createSongElement()
=======
>>>>>>> 4e9a2df4fc8615986230c242406969d87eefda26

