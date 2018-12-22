/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

    $.ajax({
        url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
        headers: {
            Authorization: 'Client-ID 5fd98b156b2293d680d4560d3024f2b55c19353c9aa8cadf29e3244b1054bcca'
        }
    }).done(addImage)
    .fail(function (err) {
        requestError(err, 'image');
    });
    /**
     * This function handle same operation the below function did
     * but if there's no image founded there's nothing will display
     * compare with the below function it return message if no images
     * Avalible
     * 
     function addImage(images) {
        const firstImage = images.results[0];

        responseContainer.insertAdjacentHTML('afterbegin', `<figure>
                <img src="${firstImage.urls.small}" alt="${searchedForText}">
                <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
            </figure>`
        );
        }
     */

     
    function addImage(data) {
        let htmlContent = "";
    
        if(data && data.results && data.results.length > 1){
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
    function requestError(e, part) {
        console.log(e, part);
    }
    });
})();
