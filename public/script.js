let song;
let totalPoints;
$(document).ready(function() {
    
    $('#submitButton').attr("onclick", function() {
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
                $("#scoreborad").show();
                $("#part-2-container").show();
                $("#part-2-container").css("display", "flex");
                $("#part-2-container").css("flex-wrap", "wrap");
                $("#part-2-container").css("flex-direction", "column");


                $("#songFile").attr("src", song.track.preview_url);
                //$("body").css("background-image", "url(" + getThumbnail(song) + ")");
                $("audio")[0].load();
                $("#thumbnail").attr("src", getThumbnail(song));
                $("#guess").attr("placeholder", "Guess the ARTIST...");
                

            }
        });
    });
    let points = 100;
    $('#guessButton').click(function(){
        let guess = $('#guess').val();
        console.log(guess);
        let answer = false;
        for(let i=0; i<song.track.artists.length; i++){
                if(guess === song.track.artists[i].name){
                    console.log("correct artist");
                    answer = true;
                    console.log(points);
                }
        }

        if(!answer){
            console.log("Wrong artist");
            points-=20;
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

    let titlePoints = 100;

    $('#guessButton').attr("onclick", function(){
        let guess = $('#guess').val();
        console.log(guess);

        if(guess === song.track.name){
            console.log("Correct name");
            beginYearRound();

        }
        else {
            titlePoints -= 20;
            console.log("Wrong name");
        }

    });

}

function beginYearRound() {
    $('#guessButton').attr("onclick", null);
    $("#guess").empty();
    $("#guess").attr("placeholder", "Guess the SONG YEAR...");

    let yearPoints = 100;

    $('#guessButton').attr("onclick", function(){
        let guess = $('#guess').val();
        console.log(guess);
        console.log(song.track.album.release_date);

        if(guess === song.track.album.release_date){
            console.log("Correct year");

        }
        else {
            yearPoints -= 20;
            console.log("Wrong year");
        }

    });
}

function getThumbnail(song){
    return song.track.album.images[0].url;
}