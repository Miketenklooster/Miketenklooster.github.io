const url = 'https://www.omdbapi.com/';
const key = 'e94fc62a';

const type = {
    all: '',
    movie: 'movie',
    series: 'series',
    episode: 'episode'
};

function getView(elementId, view, page) {
    sessionStorage.setItem('site', view);
    sessionStorage.setItem('page', page);
    return fetch(view /*, options */)
        .then((response) => response.text())
        .then((html) => {
            const content = document.getElementById(`${elementId}`);
            content.innerHTML = html;
            let scripts = content.getElementsByTagName("script");
            for (let i = 0; i < scripts.length; i++) {
                eval(scripts[i].innerText);
            }
        })
        .catch((error) => console.error(error))
}

function prevPage()
{
    let current_page = parseInt(sessionStorage.getItem("page"), 10);
    if (current_page > 1) {
        current_page--;
        getView('main-content', 'views/home.html', current_page);
    }
}

function nextPage(totalResults)
{
    let current_page = parseInt(sessionStorage.getItem("page"), 10);
    if (current_page < numPages(totalResults)) {
        current_page++;
        getView('main-content', 'views/home.html', current_page);
    }
}

function numPages(totalResults)
{
    let results = Math.ceil(totalResults / 10);
    if(isNaN(results)){
        results = 0;
    }
    return results;
}

// For code optimisation
//
// function getAll() {
//     fetch(url + "?s=" + sessionStorage.getItem('title') + "&apikey=" + key, {
//         method: "GET",
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//         .then((response) => response.json())
//         .then((json) => {
//             const data = json["Search"];
//             return data.map((data) => {
//                 console.log(data);
//             });
//         })
//         .catch((error) => console.error(error))
// }
//
// function getDetails(id) {
//     sessionStorage.setItem("omdbID", id);
//     return fetch(url + "?i=" + id + "&plot=full&apikey=" + key, {
//         method: "GET",
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//         .then((response) => response.json())
//         .catch((error) => console.error(error))
// }
//
// function searchData(title, type) {
//     sessionStorage.setItem("title", title);
//     return fetch(url + "?s=" + title + "&type=" + type + "&apikey=" + key, {
//         method: "GET",
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//         .then((response) => response.json())
//         .then((json) => {
//             json.map(json => json["Search"]);
//             console.log(json);
//         })
//         .catch((error) => console.error(error))
// }
