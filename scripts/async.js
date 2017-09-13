let body = document.getElementById("body");
let h1 = document.createElement("h1");
let heading = document.createTextNode("Learn by doing :)");
h1.appendChild(heading);
body.prepend(h1);
let button = document.getElementById('Submit');


button.addEventListener('click', function(e) {
    e.preventDefault();
    fetchAndDisplay();
});


function fetchAndDisplay() {
    let keyword = document.getElementById('Enterkeyword').value
    console.log(keyword);
    fetch(`https://api.unsplash.com/search/photos?page=1&query=${keyword}`, {
        headers: {
            Authorization: 'Client-ID d20594646ba6ccffeb7e0e80d4a8ebc7365248167aae2649c3684d77e23eafcd'
        }
    }).then(response => response.json()).then(addImage).catch(e => requestError(e, 'image'));

    function requestError(e, part) {
        console.log(e);
        responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
    };

    function addImage(data) {
        let htmlContent = '';
        const firstImage = data.results[0];

        if (firstImage) {
            htmlContent = `<figure>
            <img src="${firstImage.urls.small}" alt="${keyword}">
            <figcaption>${keyword} by ${firstImage.user.name}</figcaption>
        </figure>`;
        } else {
            htmlContent = 'Unfortunately, no image was returned for your search.'
        }

        body.insertAdjacentHTML('beforeend', htmlContent);
    }
}