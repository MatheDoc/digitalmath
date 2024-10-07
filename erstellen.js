document.addEventListener("DOMContentLoaded", function() {
    function changeText() {
        document.getElementById('welcome').innerText = "Du hast den Button geklickt!";
    }
    
    // Button klickbar machen
    document.querySelector('button').addEventListener('click', changeText);
});
