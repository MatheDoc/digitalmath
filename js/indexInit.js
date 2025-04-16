document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-block').forEach(link => {
        link.addEventListener('click', () => {
        // Den angeklickten Text des Links als Thema in die URL einfügen
        const thema = link.innerText.trim();
        const url = `/lernbereich.html?thema=${encodeURIComponent(thema)}`;
        // Öffnen des Links in einem neuen Fenster
        window.open(url, '_blank');
        });
    });
});