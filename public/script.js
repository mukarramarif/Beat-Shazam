$(document).ready(function() {
    $('#submit').click(function() {
        console.log($('#song-input').val());
        let url = new URL($('#song-input').val());
        let pathSegments = url.pathname.split('/');
        let playlistId = pathSegments[2];
        console.log(playlistId);
        $.ajax({
            url: "/send-playlist",
            type: 'GET',
            data: { id: playlistId },
            success: function(data) {
                console.log(data);
            }
        });
    });
});