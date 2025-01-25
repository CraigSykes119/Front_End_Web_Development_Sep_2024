(() => {
    // Globals
    const contentContainer = document.getElementById("content");

    function renderImages(images) {
        let imagesHtml = '<div class="image-container">';
        images.hits.forEach((image) => {
            imagesHtml += `
                <div class="image">
                    <a class="venobox" data-gall="gallery01" href="${image.largeImageURL}" title="${image.tags}">
                        <img src="${image.webformatURL}" alt="${image.tags}">
                    </a>
                    <div class="image-info">
                        <div class="tags">
                            ${image.tags.split(',').map(tag => `<a href="#">${tag.trim()}</a>`).join('')}
                        </div>
                        <div class="right">
                            <span class="likes">${image.likes} Likes</span>
                            <span class="comments">${image.comments} Comments</span>
                        </div>
                    </div>
                </div>
            `;
        });
        imagesHtml += '</div>';
        contentContainer.innerHTML = imagesHtml;

        // Initialize VenoBox
        new VenoBox({
            selector: '.venobox',
            numeration: true,
            infinigall: true,
            share: true,
            spinner: 'circle',
        });
    }

    function init() {
        try {
            // Using the JSON data (option 1 as per your original file)
            renderImages(dataOption1);
        } catch (err) {
            console.error(err);
            contentContainer.innerHTML = '<h2>Error</h2><p>No images to display.</p>';
        }
    }

    window.addEventListener("load", init);
})();
