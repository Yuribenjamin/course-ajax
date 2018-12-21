(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        const imgRequest = new XMLHttpRequest();
        imgRequest.onload = addImage;
        imgRequest.onerror = function(err) {
            requestError(err, 'image');
        };
        imgRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        imgRequest.setRequestHeader('Authorization', 'Client-ID 5fd98b156b2293d680d4560d3024f2b55c19353c9aa8cadf29e3244b1054bcca');
        imgRequest.send();

        function addImage(){
            let htmlContent = "";
            const data = JSON.parse(this.responseText);
        
            if(data && data.results && data.results[0]){
                const firstImage = data.results[0];
                htmlContent = `<figure>
                    <img src="${firstImage.urls.regular}" alt="${searchedForText}">
                    <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
                <figure>`;
            }else {
                htmlContent = '<div class="error-no-image">No images availble</div>';
            }
            responseContainer.insertAdjacentHTML('afterbegin', htmlContent)
        }
    });
})();
