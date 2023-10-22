const animalsAPIURL = 'https://api.api-ninjas.com/v1/animals?name=';
const animalsAPIKey = 'NCgsX/tZu9GD2YfAZGpM2A==6dfQiZXcvqGd8HcI';

const youtubeAPIKey = 'AIzaSyAlVamTr8Dxu5yes6i8dHiCVBJjmpZJvAo';
const youtubeAPIURL = 'https://www.googleapis.com/youtube/v3/search?key=${';

document.getElementById('find-button').addEventListener('click', () => {

    const userInputValue = document.getElementById('animal-input').value;
    const section = document.getElementById('results-section');
    section.innerHTML='';

    var youtubeRequest = youtubeAPIURL + youtubeAPIKey + '}&q=${' + userInputValue + '}&part=snippet&type=video&maxResults=1';

    const resultsLabel = document.createElement('div');

    // const btn = document.querySelector('.video-button');
    // const videoContainer = document.querySelector('.video-container');
    // const close = document.querySelector('.close');

    resultsLabel.className = 'your-results-label';
    resultsLabel.textContent = 'Results for '
    const spanResults = document.createElement('span');
    spanResults.className = 'results-span';
    spanResults.textContent = '"'+ userInputValue + '"';
    resultsLabel.appendChild(spanResults);
    section.appendChild(resultsLabel);

    var animalContainer = document.createElement('div');
    animalContainer.className = 'animal-cards-container';
    section.appendChild(animalContainer);

    function showVideoPopUp(videoId) {
        const popUp = document.createElement('div');
        popUp.className = 'video-popup';

        const videoFrame = document.createElement('iframe');
        videoFrame.setAttribute('src', `https://www.youtube.com/embed/${videoId}`);
        videoFrame.setAttribute('allowfullscreen', '');
        videoFrame.className = 'video-frame';

        const closeButton = document.createElement('span');
        closeButton.className = 'close';
        closeButton.textContent = 'X';
        closeButton.addEventListener('click', function() {
            popUp.style.display = 'none';
        });

        popUp.appendChild(videoFrame);
        popUp.appendChild(closeButton);
        document.body.appendChild(popUp);
    }

    fetch(animalsAPIURL + userInputValue, {
        method: 'GET',
        headers: {
            'X-Api-Key': animalsAPIKey,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(result => {
        if (result.length != 0) {
            if (result.length < 6) {
                section.setAttribute('id', 'results-section-v2');
            } 
            result.forEach(function(animal) {
                var card = document.createElement('div');
                card.className = 'card';

                var image = document.createElement('div');
                image.className = 'image';

                var content = document.createElement('div');
                content.className = 'content';

                var animalName = document.createElement('div');
                animalName.className = 'animal-name';
                animalName.textContent = animal.name;

                var mainDetails = document.createElement('div');
                mainDetails.className = 'main-details';

                var detailsOne = document.createElement('div');
                detailsOne.className = 'details-1';

                // start details-1 contents
                // phylum
                var labelPhylum = document.createElement('div');
                labelPhylum.className = 'label';
                labelPhylum.textContent = 'Phylum: ';

                var valuePhylum = document.createElement('span');
                valuePhylum.className = 'value';
                valuePhylum.textContent = animal.taxonomy.phylum;

                // class
                var labelClass = document.createElement('div');
                labelClass.className = 'label';
                labelClass.textContent = 'Class: ';

                var valueClass = document.createElement('span');
                valueClass.className = 'value';
                valueClass.textContent = animal.taxonomy.class;

                // order
                var labelOrder = document.createElement('div');
                labelOrder.className = 'label';
                labelOrder.textContent = 'Order: ';

                var valueOrder = document.createElement('span');
                valueOrder.className = 'value';
                valueOrder.textContent = animal.taxonomy.order;

                // genus
                var labelGenus = document.createElement('div');
                labelGenus.className = 'label';
                labelGenus.textContent = 'Genus: ';

                var valueGenus = document.createElement('span');
                valueGenus.className = 'value';
                valueGenus.textContent = animal.taxonomy.genus;

                // group
                var labelGroup = document.createElement('div');
                labelGroup.className = 'label';
                labelGroup.textContent = 'Group: ';

                var valueGroup = document.createElement('span');
                valueGroup.className = 'value';
                valueGroup.textContent = animal.characteristics.group;

                // diet
                var labelDiet = document.createElement('div');
                labelDiet.className = 'label';
                labelDiet.textContent = 'Diet: ';

                var valueDiet = document.createElement('span');
                valueDiet.className = 'value';
                valueDiet.textContent = animal.characteristics.diet;

                // locations
                var labelLocations = document.createElement('div');
                labelLocations.className = 'label';
                labelLocations.textContent = 'Locations: ';

                var valueLocations = document.createElement('span');
                valueLocations.className = 'value';
                valueLocations.textContent = animal.locations;

                var detailsTwo = document.createElement('div');
                detailsTwo.className = 'details-2';

                // start details-2 content
                // lifestyle
                var labelLifestyle = document.createElement('div');
                labelLifestyle.className = 'label';
                labelLifestyle.textContent = 'Lifestyle: ';

                var valueLifestyle = document.createElement('span');
                valueLifestyle.className = 'value';
                valueLifestyle.textContent = animal.characteristics.lifestyle;

                // family
                var labelFamily = document.createElement('div');
                labelFamily.className = 'label';
                labelFamily.textContent = 'Family: ';

                var valueFamily = document.createElement('span');
                valueFamily.className = 'value';
                valueFamily.textContent = animal.taxonomy.family;

                // Scientific Name
                var labelSN = document.createElement('div');
                labelSN.className = 'label';
                labelSN.textContent = 'SN: ';

                var valueSN = document.createElement('span');
                valueSN.className = 'value';
                valueSN.textContent = animal.taxonomy.scientific_name;

                // habitat
                var labelHabitat = document.createElement('div');
                labelHabitat.className = 'label';
                labelHabitat.textContent = 'Habitat: ';

                var valueHabitat = document.createElement('span');
                valueHabitat.className = 'value';
                valueHabitat.textContent = animal.characteristics.habitat;

                // lifespan
                var labelLifespan = document.createElement('div');
                labelLifespan.className = 'label';
                labelLifespan.textContent = 'Lifespan: ';

                var valueLifespan = document.createElement('span');
                valueLifespan.className = 'value';
                valueLifespan.textContent = animal.characteristics.lifespan;

                var videoContainer = document.createElement('div');
                videoContainer.className = 'video-container';

                var videoButton = document.createElement('button');
                videoButton.className = 'video-button';

                var videoLabel = document.createElement('b');
                videoLabel.className = 'video-label';
                videoLabel.textContent = 'Video';

                var apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(animal.name)}`;

                // getting yung mga imagess
                fetch(apiUrl)
                    .then(response => response.json())
                    .then(res => {
                        var animalImage = document.createElement('img');
                        var imageURL = res.thumbnail ? res.thumbnail.source : null;
                        animalImage.src = imageURL;
                        animalImage.alt = animalName;
                        image.appendChild(animalImage);
                    })
                .catch(error => {
                    console.error('Error fetching image: ', error);
                    image.innerHTML = "<p>Error loading image</p>";
                });

                // details-1
                detailsOne.appendChild(labelPhylum);
                labelPhylum.appendChild(valuePhylum);

                detailsOne.appendChild(labelClass);
                labelClass.appendChild(valueClass);

                detailsOne.appendChild(labelOrder);
                labelOrder.appendChild(valueOrder);

                detailsOne.appendChild(labelGenus);
                labelGenus.appendChild(valueGenus);

                detailsOne.appendChild(labelGroup);
                labelGroup.appendChild(valueGroup);

                detailsOne.appendChild(labelDiet);
                labelDiet.appendChild(valueDiet);

                detailsOne.appendChild(labelLocations);
                labelLocations.appendChild(valueLocations);

                detailsTwo.appendChild(labelLifestyle);
                labelLifestyle.appendChild(valueLifestyle);

                detailsTwo.appendChild(labelFamily);
                labelFamily.appendChild(valueFamily);

                detailsTwo.appendChild(labelSN);
                labelSN.appendChild(valueSN);

                detailsTwo.appendChild(labelHabitat);
                labelHabitat.appendChild(valueHabitat);

                detailsTwo.appendChild(labelLifespan);
                labelLifespan.appendChild(valueLifespan);

                card.appendChild(image);
                card.appendChild(content);
                content.appendChild(animalName);
                content.appendChild(mainDetails);
                mainDetails.appendChild(detailsOne);
                mainDetails.appendChild(detailsTwo);
                videoButton.appendChild(videoLabel);
                videoButton.appendChild(videoContainer);
                card.appendChild(videoButton);
                animalContainer.appendChild(card);
            });
            section.scrollIntoView({ 
                behavior: 'smooth' 
            });
            // Add event listener to the video button
             document.querySelectorAll('.video-button').forEach(function(button, index) {
                button.addEventListener('click', function() {
                const videoId = 'video_id'; // Replace 'video_id' with the actual video ID from the API response
                showVideoPopUp(videoId);
            });
            });
            
            
        } else {
            animalContainer.innerHTML = "<div class='card'><div class='animal-name'>Animal not found!</div></div>";
        }
    })
    .catch(function(error) {
        animalContainer.innerHTML = "<div class='card'><div class='animal-name'>Error occurred while fetching animal data.</div></div>";
        console.error('Error: ', error.message);
    });
});


btn.addEventListener('click',()=>{
    videoContainer.classList.add('show');
});

close.addEventListener('click',()=>{
    videoContainer.classList.remove('show');
});

// videoButton.addEventListener('click', () => {
//     const videoContainer = videoButton.parentElement.querySelector('.video-container');
//     videoContainer.classList.add('show');
// });
// close.addEventListener('click', () => {
//     const videoContainer = close.parentElement;
//     videoContainer.classList.remove('show');
// });
