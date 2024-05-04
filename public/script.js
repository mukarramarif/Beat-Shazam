

let song;
let totalPoints;
let points;
let titlePoints;
let yearPoints;

let beganTitleRound = false;
let beganYearRound = false;
$(document).ready(function() { //init function
    totalPoints = 0;
    points = titlePoints = yearPoints = 100;

    $("#submitButton").removeAttr("onclick");
    
    $('#submitButton').on("click", function() {
        console.log($('#playlist-url-box').val());
        let url = new URL($('#playlist-url-box').val());
        let pathSegments = url.pathname.split('/');
        let playlistId = pathSegments[2];
        
        console.log(playlistId);
        $.ajax({
            url: "/send-playlist",
            type: 'GET',
            data: { id: playlistId },
            success: function(data) { //successfully sent the playlist link, set up the game phase
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
                
                $("audio")[0].load();
                $("#thumbnail").attr("src", getThumbnail(song));
                $("#guess").attr("placeholder", "Guess the ARTIST...");
                

            }
        });
    });
    
    $('#guessButton').click(function(){ //when an artist guess is made

        if (!beganTitleRound) {


        let guess = $('#guess').val();
        $("#guess").val(''); //clear the input field
        
        console.log(guess);
        let answer = false;
        for(let i=0; i<song.track.artists.length; i++){
                if(guess === song.track.artists[i].name){ //check each credited artist
                    console.log("correct artist");
                    answer = true;
                    console.log(points);
                    document.getElementById('score').innerHTML = "Round Score: " + points;
                    totalPoints+=points;
                    document.getElementById('tscore').innerHTML = "Total Score: " + totalPoints;
                }
        }

        if(!answer){
            console.log("Wrong artist");
            if(points !== 0){
                points-=20;
            }
            if(points === 0){ //enough wrong guesses and you failed the round and are sent to the next one, the correct name is displayed in red
                answer = true;

                $("#table-artistname").empty();
                $("#table-artistname").append(song.track.artists[0].name);
                $("#table-artistname").css("color", "red");

                beginTitleRound();


            }
            document.getElementById('score').innerHTML = "Round Score: " + points;
            document.getElementById('tscore').innerHTML = "Total Score: " + totalPoints;
            
        } else { //right answer, begin the song title round
            $("guessButton").attr("id", "guessButton2");
            $("#round").empty();
            $("#round").append("Round 2");
            $("#table-artistname").empty();
            $("#table-artistname").append(guess);
            $("#scoreboard").append(`<p>${totalPoints}</p>`);
            $("score").val(totalPoints);
            beginTitleRound();
        }
        
}});
    $("guessButton2").click(function(){
        beginTitleRound();

        
    });

});

function createSongElement(songs){ //choose a song object from the given playlist to be used as the mystery song
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
    beganTitleRound = true;
    
    $("#guess").attr("placeholder", "Guess the SONG TITLE...");

    

    $('#guessButton').on("click", function(){ //guess a song title if in the title round

        if (!beganYearRound) {


        let guess = $('#guess').val();
        $('#guess').val(''); //clear the input field
        console.log(guess);
        console.log(song.track.name);
        if(guess === song.track.name){ //right guess, proceed to the year round
            console.log("Correct name");
            beginYearRound();
            document.getElementById('score').innerHTML = "Round Score: " + titlePoints;
            $("#round").empty();
            $("#round").append("Round 3");
            $("#table-songtitle").empty();
            $("#table-songtitle").append(guess);

            totalPoints += titlePoints;
            document.getElementById('tscore').innerHTML = "Total Score: " + totalPoints;
            $("score").val(totalPoints);

        }
        else { //wrong guess
            document.getElementById('score').innerHTML = "Round Score: " + titlePoints;
            if(titlePoints !== 0){ //some guesses left, decrement round score & try again
                titlePoints-=20;
            }
            if(titlePoints === 0){ //no guesses left, give user the answer and go to year round
                beginYearRound();

                $("#table-songtitle").empty();
                $("#table-songtitle").append(song.track.name);
                $("#table-songtitle").css("color", "red");
            }
            document.getElementById('score').innerHTML = "Round Score: " + titlePoints;
            document.getElementById('tscore').innerHTML = "Total Score: " + totalPoints;
            console.log("Wrong name");
        }

    }
    
    });

}

function beginYearRound() {
    beganYearRound = true;

    $("#submitButton").removeAttr("onclick");
    $("#guess").empty();
    $("#guess").attr("placeholder", "Guess the SONG YEAR...");

    

    $('#guessButton').on("click", function(){ //a year is guessed in the year round
        let guess = $('#guess').val();
        $("#guess").val(''); //clear the input field
        console.log(guess);
        console.log(song.track.album.release_date.substring(0,4)); //spotify gives us release date in YYYY-MM-DD format, this turns it to just YYYY

        if(guess === song.track.album.release_date.substring(0,4)){ //right guess, finish game and proceed to success screen
            console.log("Correct year");
            $("#thumbnail").css("filter", "none");
            $("#table-year").empty();
            $("#table-year").append(guess);
            totalPoints += yearPoints;
            document.getElementById('score').innerHTML = "Round Score: " + yearPoints;
            document.getElementById('tscore').innerHTML = "Total Score: " + totalPoints;
            $("score").val(yearPoints);

            console.log("Total points "+totalPoints+", Artist points "+points+", Title points +"+titlePoints+", Year points" +yearPoints);
            const windowFeatures = "left=100,top=100,width=320,height=320";
                var handle = window.open(
                    "",
                    "game",
                    windowFeatures,
                );
            handle.document.write(`<p>In Round 1 you scored${points} points. In Round 2 you scored ${titlePoints} points. In Round 3 you scored ${yearPoints} points. Your total score is ${totalPoints} points.</p>`);

        }
        else { //wrong guess for year
            document.getElementById('score').innerHTML = "Round Score: " + yearPoints;
            if(yearPoints != 0){
                yearPoints-=20; //some guesses remaining
            } else { //no guesses remaining
                $("#table-year").empty();
                $("#table-year").append(song.track.album.release_date.substring(0,4));
                $("#table-year").css("color", "red");
            

                if (totalPoints === 0) {
                    $.ajax({
                        url: "/gamelost",
                        type: 'GET',
                        success: function(data) {
                            console.log("game lost");
                            console.log(data);
                        }
                    });
                    const windowFeatures = "left=100,top=100,width=320,height=320";
                    const handle = window.open(
                        "http://localhost:3000/gamelost.html",
                        "gamelost",
                        windowFeatures,
                    );
                } else {
                    $.ajax({
                        url: "/gameScore",
                        type: 'GET',
                        data: { points: points, titlePoints: titlePoints, yearPoints: yearPoints, totalPoints: totalPoints },
                        success: function(data) {
                            console.log("game score sent");
                            console.log(data);
                        }
                    });
                    const windowFeatures = "left=100,top=100,width=320,height=320";
                    var handle = window.open(
                        "http://localhost:3000/gameScore.html",
                        "gameScore",
                        windowFeatures,
                    );
                }
            }
        }
    
    });
}    

function getThumbnail(song){
    return song.track.album.images[0].url;
}

