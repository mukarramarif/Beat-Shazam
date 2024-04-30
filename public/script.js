$ (() => {
    init();
})

function init() {
    $("submitButton").on('click', (e) =>
    {
        e.preventDefault();
        console.log(" submit button clicked");

        
        //TODO get song from given playlist

        $("#container").clear();

        //TODO construct guessing page

    }
    );
        
}