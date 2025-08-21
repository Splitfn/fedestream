const API_KEY = "98fcae4e578571a0ff1b8b7ba599f6ef";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w200";

function search() {
    const query = document.getElementById("searchInput").value;
    if (!query) return;

    fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&language=it&query=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => {
            const resultsDiv = document.getElementById("results");
            resultsDiv.innerHTML = "";

            data.results.forEach(item => {
                const card = document.createElement("div");
                card.className = "movie-card clearfix";

                const imgSrc = item.poster_path ? IMAGE_BASE + item.poster_path : "";
                card.innerHTML = `
                    <img src="${imgSrc}" alt="${item.title || item.name}">
                    <h3>${item.title || item.name} (${(item.release_date || item.first_air_date || "").split("-")[0]})</h3>
                    <p>Tipo: ${item.media_type}</p>
                    <p>${item.overview || "Nessuna descrizione disponibile."}</p>
                    <button onclick="play('${item.id}', '${item.media_type}')">Riproduci</button>
                `;
                resultsDiv.appendChild(card);
            });
        })
        .catch(err => console.error(err));
}

function play(id, type) {
    alert(`Qui partirà il player per ${type} con ID TMDB: ${id}\nIn futuro puoi integrare un player come VixSrc.`);
}
