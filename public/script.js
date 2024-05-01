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
                $("#container").empty();
                $("#container").append(`<p>Next Step</p> <audio controls id='testSongId'><source src="" type="audio/mp3"></audio> <table id='guessingTable'></table>`);
            }
        });
    });
});


