let song;
let totalPoints;
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
                song = createSongElement(data);
                $("#container").hide();
                $("#scoreboard").show();
                $("#scoreboard").attr("id", "scoreboard-show");
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
        $("#guess").val(''); //clear the input field
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
            if(points != 0){
                points-=20;
            }
            $("#score").empty();
            $("#score").append(points);
        } else { //right answer, begin round 2...
            $("guessButton").attr("id", "guessButton2");
            beginTitleRound();
            $("round").empty();
            $("round").append("Round 2");
            $("#table-artistname").empty();
            $("#table-artistname").append(guess);
        }
    });
    $("guessButton2").click(function(){
        beginTitleRound();
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
    
    
    $("#guess").attr("placeholder", "Guess the SONG TITLE...");

    let titlePoints = 100;

    $('#guessButton').click(function(){
        let guess = $('#guess').val();
        console.log(guess);
        console.log(song.track.name);
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
    
}

function getThumbnail(song){
    return song.track.album.images[0].url;
}