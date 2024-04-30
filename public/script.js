$ (() => {
    init();
})

function init() {
    $("submitButton").on('click', (e) =>
    {
        e.preventDefault();
        console.log(" submit button clicked");


}
    );
        
}