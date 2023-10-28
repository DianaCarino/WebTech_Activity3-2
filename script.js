// refactored version (with vid)
const animalsAPIURL = "https://api.api-ninjas.com/v1/animals?name=";
const animalsAPIKey = "NCgsX/tZu9GD2YfAZGpM2A==6dfQiZXcvqGd8HcI";

const youtubeAPIKey = "AIzaSyCSQZTyVjPC8R9-re-aSanmB5qUUFCkJaM";
const youtubeAPIURL = "https://www.googleapis.com/youtube/v3/search";

const videoPress = document.getElementById("video-press");
const videoShow = document.getElementById("video-show");

const section = document.getElementById("results-section");

/*
Created by: Kevin king Yabut
Description:

The getYouTubeSearchURL function generates a YouTube search URL specifically tailored to search for a single video. It constructs the URL using the YouTube Data API, 
with parameters including the API key, the National Geographic channel ID, the provided search query (encoded for URL compatibility), 
and specific search parameters such as the type of content and the maximum number of results. The function returns the generated URL for the specified search query.


*/
function getYouTubeSearchURL(animalString) {
  const addSearch  = `${animalString} animal wildlife`;
  return `${youtubeAPIURL}?key=${youtubeAPIKey}&q=${encodeURIComponent(addSearch)}&part=snippet&type=video&maxResults=1`;
}

/*
Created by: Kevin king Yabut
Description:

The fetchVideo function initiates a search for a YouTube video related to the specified animalName by calling the getYouTubeSearchURL 
function to construct a search URL. It then utilizes the fetch API to perform an asynchronous request to the generated URL. 
The function handles the response by converting it to a JSON format and extracting the video ID of the first item in the search results. 
If an error occurs during the process, it logs the error message to the console.

*/
function fetchVideo(animalName) {
  const youtubeUrl = getYouTubeSearchURL(animalName);

  return fetch(youtubeUrl)
    .then((response) => response.json())
    .then((data) => data.items[0].id.videoId)
    .catch((error) => {
      console.error("Error fetching YouTube video: ", error);
      alert("Error fetching video");
    });
}

/*
Created by:
Description:
*/
function showVideoPopUp(videoId, targetCard) {
  const popUp = document.createElement("div");
  popUp.className = "video-popup";

  const videoFrame = document.createElement("iframe");
  videoFrame.setAttribute("allowfullscreen", "");
  videoFrame.className = "video-frame";

  videoFrame.setAttribute("src", `https://www.youtube.com/embed/${videoId}`);

  const closeButton = document.createElement("span");
  closeButton.className = "close";
  closeButton.textContent = "X";
  closeButton.addEventListener("click", function () {
    popUp.style.display = "none";
    const iframe = popUp.querySelector("iframe");
    if (iframe) {
      const iframeSrc = iframe.getAttribute("src");
      iframe.setAttribute("src", iframeSrc);
    }
  });

  popUp.appendChild(videoFrame);
  popUp.appendChild(closeButton);

  targetCard.appendChild(popUp);


  videoFrame.addEventListener("error", function () {

    videoFrame.setAttribute("src", "about:blank");
  });
}


/*
Created by: 
Description:

*/
function fetchAnimal(userInputValue) {
  return fetch(animalsAPIURL + userInputValue, {
    method: "GET",
    headers: {
      "X-Api-Key": animalsAPIKey,
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}

/*
Created by: 
Description: 
*/
// Fetch the image
function fetchImage(animal, image) {
  var apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
    animal.name
  )}`;

  return fetch(apiUrl)
    .then((response) => response.json())
    .then((res) => {
      var animalImage = document.createElement("img");
      var imageURL = res.thumbnail ? res.thumbnail.source : null;
      if (imageURL) {
        animalImage.src = imageURL;
      } else {
        var alternateImageUrl = "../assets/Barney.png";
        animalImage.src = alternateImageUrl;
      }

      image.appendChild(animalImage);
    })
    .catch((error) => {
      console.error("Error fetching image: ", error);
      image.innerHTML = "<p>Error loading image</p>";
    });
}

/*
Created by: Kevin king Yabut

Description:

This function adds click event listeners to the buttons, the event listeners control the visibility of video containers,
the function also handles the fetching and displaying of videos associated with the specific animal name.
*/
function videoAnimals() {
  const videoPressButtons = document.querySelectorAll(".video-button"); 
  videoPressButtons.forEach(function (button) {
    const hasEventListener = button.classList.contains("event-listener-added");
    if (!hasEventListener) {
      button.addEventListener("click", function () {
        const videoContainer = this.querySelector(".video-container");
        videoContainer.classList.toggle("show");
      });

      button.addEventListener("click", function () {
        const animalName =
          this.parentElement.querySelector(".animal-name").textContent;
        const youtubeUrl = getYouTubeSearchURL(animalName);

        fetch(youtubeUrl)
          .then((response) => response.json())
          .then((data) => {
            const videoId = data.items[0].id.videoId;
            const targetCard = this.parentElement;
            showVideoPopUp(videoId, targetCard);
          });
      });

      button.classList.add("event-listener-added");
    }
  });
}

/*
Created by:
Description:
This is the function to create the animal cards.
It will create the card where all the details about the animals will be displayed.
It retrieves the passed animal object and appends the animal details to the content.
It will then create a video button.
The animal's details, image, and the video button will then be appended to the card.
The card will then be appended to the container.
*/
// Create the Animal card
function createCard(animal, image, animalContainer) {
  console.log(animal);

  var card = document.createElement("div");
  card.className = "card";

  var content = document.createElement("div");
  content.className = "content";

  var animalName = document.createElement("div");
  animalName.className = "animal-name";
  animalName.textContent = animal.name;

  var mainDetails = document.createElement("div");
  mainDetails.className = "main-details";

  var detailsOne = document.createElement("div");
  detailsOne.className = "details-1";

  // detailsone
  var labelPhylum = document.createElement("div");
  labelPhylum.className = "label";
  labelPhylum.textContent = "Phylum: ";

  var valuePhylum = document.createElement("span");
  valuePhylum.className = "value";
  valuePhylum.textContent = animal.taxonomy.phylum;

  // class
  var labelClass = document.createElement("div");
  labelClass.className = "label";
  labelClass.textContent = "Class: ";

  var valueClass = document.createElement("span");
  valueClass.className = "value";
  valueClass.textContent = animal.taxonomy.class;

  // order
  var labelOrder = document.createElement("div");
  labelOrder.className = "label";
  labelOrder.textContent = "Order: ";

  var valueOrder = document.createElement("span");
  valueOrder.className = "value";
  valueOrder.textContent = animal.taxonomy.order;

  // genus
  var labelGenus = document.createElement("div");
  labelGenus.className = "label";
  labelGenus.textContent = "Genus: ";

  var valueGenus = document.createElement("span");
  valueGenus.className = "value";
  valueGenus.textContent = animal.taxonomy.genus;

  // group
  var labelGroup = document.createElement("div");
  labelGroup.className = "label";
  labelGroup.textContent = "Type: ";

  var valueGroup = document.createElement("span");
  valueGroup.className = "value";
  valueGroup.textContent = animal.characteristics.group;

  // diet
  var labelDiet = document.createElement("div");
  labelDiet.className = "label";
  labelDiet.textContent = "Diet: ";

  var valueDiet = document.createElement("span");
  valueDiet.className = "value";
  valueDiet.textContent = animal.characteristics.diet;

  // locations
  var labelLocations = document.createElement("div");
  labelLocations.className = "label";
  labelLocations.textContent = "Locations: ";

  var valueLocations = document.createElement("span");
  valueLocations.className = "value";
  valueLocations.textContent = animal.locations;

  var detailsTwo = document.createElement("div");
  detailsTwo.className = "details-2";

  // detailstwo
  var labelLifestyle = document.createElement("div");
  labelLifestyle.className = "label";
  labelLifestyle.textContent = "Lifestyle: ";

  var valueLifestyle = document.createElement("span");
  valueLifestyle.className = "value";
  valueLifestyle.textContent = animal.characteristics.lifestyle;

  // family
  var labelFamily = document.createElement("div");
  labelFamily.className = "label";
  labelFamily.textContent = "Family: ";

  var valueFamily = document.createElement("span");
  valueFamily.className = "value";
  valueFamily.textContent = animal.taxonomy.family;

  // Scientific Name
  var labelSN = document.createElement("div");
  labelSN.className = "label";
  labelSN.textContent = "SN: ";

  var valueSN = document.createElement("span");
  valueSN.className = "value";
  valueSN.textContent = animal.taxonomy.scientific_name;

  // habitat
  var labelHabitat = document.createElement("div");
  labelHabitat.className = "label";
  labelHabitat.textContent = "Habitat: ";

  var valueHabitat = document.createElement("span");
  valueHabitat.className = "value";
  valueHabitat.textContent = animal.characteristics.habitat;

  // lifespan
  var labelLifespan = document.createElement("div");
  labelLifespan.className = "label";
  labelLifespan.textContent = "Lifespan: ";

  var valueLifespan = document.createElement("span");
  valueLifespan.className = "value";
  valueLifespan.textContent = animal.characteristics.lifespan;

  var videoContainer = document.createElement("div");
  videoContainer.className = "video-container";

  var videoButton = document.createElement("button");
  videoButton.className = "video-button";

  var videoLabel = document.createElement("b");
  videoLabel.className = "video-label";
  videoLabel.textContent = "Video";
  fetchVideo(animalName);

  // need na mano mano append dito
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

  // mano mano talaga dapat toh
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
  card.appendChild(videoContainer);
  card.appendChild(videoButton);
  animalContainer.appendChild(card);
  videoAnimals();
  section.scrollIntoView({
    behavior: "smooth",
  });
}

/*
Created by:
Description: 
The search function of the website, upon searching select elements will be created labeled diet, habitat and group.
The filter and sort buttons will also be created. 
It will then call the createCard method to create a card per animal.
*/
document.getElementById("find-button").addEventListener("click", () => {
  const userInputValue = document.getElementById("animal-input").value;

  fetchAnimal(userInputValue)
    .then((result) => {
      console.log(result);

      const section = document.getElementById("results-section");
      section.innerHTML = "";

      const resultsLabel = document.createElement("div");
      resultsLabel.className = "your-results-label";
      resultsLabel.textContent = "Results for ";

      const spanResults = document.createElement("span");
      spanResults.className = "results-span";
      spanResults.textContent = '"' + userInputValue + '"';
      resultsLabel.appendChild(spanResults);
      section.appendChild(resultsLabel);

      // eto ung lumalabas na filter options after searching
      if (!document.getElementById("diet-select")) {
        var dietSelect = document.createElement("select");
        dietSelect.id = "diet-select";
        dietSelect.className = "filter-select";
        var emptyDietOption = document.createElement("option");
        emptyDietOption.value = ""; // eto para di niya kinukuha ung first na value na nakikita niya
        emptyDietOption.textContent = "Select Diet"; // default text lang toh para hindi empty string
        dietSelect.appendChild(emptyDietOption);
        section.appendChild(dietSelect);
      }

      if (!document.getElementById("habitat-select")) {
        var habitatSelect = document.createElement("select");
        habitatSelect.id = "habitat-select";
        habitatSelect.className = "filter-select";
        var emptyHabitatOption = document.createElement("option");
        emptyHabitatOption.value = ""; // eto para di niya kinukuha ung first na value na nakikita niya
        emptyHabitatOption.textContent = "Select Habitat"; // default text lang toh para hindi empty string
        habitatSelect.appendChild(emptyHabitatOption);
        section.appendChild(habitatSelect);
      }

      if (!document.getElementById("group-select")) {
        var groupSelect = document.createElement("select");
        groupSelect.id = "group-select";
        groupSelect.className = "filter-select";
        var emptyGroupOption = document.createElement("option");
        emptyGroupOption.value = ""; // eto para di niya kinukuha ung first na value na nakikita niya
        emptyGroupOption.textContent = "Select Group"; // default text lang toh para hindi empty string
        groupSelect.appendChild(emptyGroupOption);
        section.appendChild(groupSelect);
      }

      var filterButton = document.createElement("button");
      filterButton.id = "filter-button";
      filterButton.textContent = "Filter";
      section.appendChild(filterButton);

      document.getElementById("filter-button").addEventListener("click", () => {
        const selectedDiet = document.getElementById("diet-select").value;
        const selectedHabitat = document.getElementById("habitat-select").value;
        const selectedGroup = document.getElementById("group-select").value;

        filterResults(selectedDiet, selectedHabitat, selectedGroup);
      });

      var sortButton = document.createElement("button");
      sortButton.id = "sort-button";
      sortButton.textContent = "Sort A-Z";
      section.appendChild(sortButton);

      document.getElementById("sort-button").addEventListener("click", () => {
        sortResults();
      });

      // eto para hindi multiple na same option para unique lang
      // kunyare sampo ung omnivore para instead na 10 options na omnivore magiging isa lang
      const uniqueDiets = new Set();
      const uniqueHabitats = new Set();
      const uniqueGroups = new Set();

      const animalContainer = document.createElement("div");
      animalContainer.className = "animal-cards-container";
      section.appendChild(animalContainer);

      // dito na ung gagawin ung card
      result.forEach(function (animal) {
        var image = document.createElement("div");
        image.className = "image";
        var diet = animal.characteristics.diet;
        var habitat = animal.characteristics.habitat;
        var group = animal.characteristics.group;

        if (!uniqueDiets.has(diet)) {
          var dietOption = document.createElement("option");
          dietOption.value = diet;
          dietOption.textContent = diet;
          dietSelect.appendChild(dietOption);
          uniqueDiets.add(diet);
        }

        if (!uniqueHabitats.has(habitat)) {
          var habitatOption = document.createElement("option");
          habitatOption.value = habitat;
          habitatOption.textContent = habitat;
          habitatSelect.appendChild(habitatOption);
          uniqueHabitats.add(habitat);
        }

        if (!uniqueGroups.has(group)) {
          var groupOption = document.createElement("option");
          groupOption.value = group;
          groupOption.textContent = group;
          groupSelect.appendChild(groupOption);
          uniqueGroups.add(group);
        }

        fetchImage(animal, image).then((animalImage) => {
          if (animalImage) {
            image.appendChild(animalImage);
          }
          createCard(animal, image, animalContainer);
        });
      });
    })
    .catch((error) => {
      console.error("Error fetching animal data: ", error);
    });
});

/*
Created by: Dominic Gabriel O. Ronquillo
Description: 
This is the filter function of the website. After the website has displayed an initial result the filter option will become available.
when it is clicked it will begin by fetching the animal again. Before creating the card it will first check the selected values.
It will match the selected values with the current values. The cards will be created for animals that match the criteria.
*/
// method to filter results
function filterResults(selectedDiet, selectedHabitat, selectedGroup) {
  const userInputValue = document.getElementById("animal-input").value;

  // halos same na toh dun sa kanina
  fetchAnimal(userInputValue)
    .then((result) => {
      const section = document.getElementById("results-section");
      section.innerHTML = "";

      const resultsLabel = document.createElement("div");
      resultsLabel.className = "your-results-label";
      resultsLabel.textContent = "Results for ";

      const spanResults = document.createElement("span");
      spanResults.className = "results-span";
      spanResults.textContent = '"' + userInputValue + '"';
      resultsLabel.appendChild(spanResults);
      section.appendChild(resultsLabel);

      const uniqueDiets = new Set();
      const uniqueHabitats = new Set();
      const uniqueGroups = new Set();

      if (!document.getElementById("diet-select")) {
        var dietSelect = document.createElement("select");
        dietSelect.id = "diet-select";
        dietSelect.className = "filter-select";
        var emptyDietOption = document.createElement("option");
        emptyDietOption.value = "";
        emptyDietOption.textContent = "Select Diet";
        dietSelect.appendChild(emptyDietOption);
        section.appendChild(dietSelect);
      }

      if (!document.getElementById("habitat-select")) {
        var habitatSelect = document.createElement("select");
        habitatSelect.id = "habitat-select";
        habitatSelect.className = "filter-select";
        var emptyHabitatOption = document.createElement("option");
        emptyHabitatOption.value = "";
        emptyHabitatOption.textContent = "Select Habitat";
        habitatSelect.appendChild(emptyHabitatOption);
        section.appendChild(habitatSelect);
      }

      if (!document.getElementById("group-select")) {
        var groupSelect = document.createElement("select");
        groupSelect.id = "group-select";
        groupSelect.className = "filter-select";
        var emptyGroupOption = document.createElement("option");
        emptyGroupOption.value = "";
        emptyGroupOption.textContent = "Select Group";
        groupSelect.appendChild(emptyGroupOption);
        section.appendChild(groupSelect);
      }

      var filterButton = document.createElement("button");
      filterButton.id = "filter-button";
      filterButton.textContent = "Filter";
      section.appendChild(filterButton);

      document.getElementById("filter-button").addEventListener("click", () => {
        const selectedDiet = document.getElementById("diet-select").value;
        const selectedHabitat = document.getElementById("habitat-select").value;
        const selectedGroup = document.getElementById("group-select").value;

        filterResults(selectedDiet, selectedHabitat, selectedGroup);
      });

      var sortButton = document.createElement("button");
      sortButton.id = "sort-button";
      sortButton.textContent = "Sort A-Z";
      section.appendChild(sortButton);

      document.getElementById("sort-button").addEventListener("click", () => {
        sortResults();
      });

      const animalContainer = document.createElement("div");
      animalContainer.className = "animal-cards-container";
      section.appendChild(animalContainer);

      result.forEach(function (animal) {
        var dietValue = animal.characteristics.diet;
        var habitatValue = animal.characteristics.habitat;
        var groupValue = animal.characteristics.group;
        var diet = animal.characteristics.diet;
        var habitat = animal.characteristics.habitat;
        var group = animal.characteristics.group;

        if (!uniqueDiets.has(diet)) {
          var dietOption = document.createElement("option");
          dietOption.value = diet;
          dietOption.textContent = diet;
          dietSelect.appendChild(dietOption);
          uniqueDiets.add(diet);
        }

        if (!uniqueHabitats.has(habitat)) {
          var habitatOption = document.createElement("option");
          habitatOption.value = habitat;
          habitatOption.textContent = habitat;
          habitatSelect.appendChild(habitatOption);
          uniqueHabitats.add(habitat);
        }

        if (!uniqueGroups.has(group)) {
          var groupOption = document.createElement("option");
          groupOption.value = group;
          groupOption.textContent = group;
          groupSelect.appendChild(groupOption);
          uniqueGroups.add(group);
        }

        // yung ginagawa lang neto chinecheck if pinili ba toh tas nag mamatch ba results
        const dietMatched = selectedDiet === "" || dietValue === selectedDiet;
        const habitatMatched =
          selectedHabitat === "" || habitatValue === selectedHabitat;
        const groupMatched =
          selectedGroup === "" || groupValue === selectedGroup;

        // create the card pag nagmamatch
        if (dietMatched && habitatMatched && groupMatched) {
          var image = document.createElement("div");
          image.className = "image";

          fetchImage(animal, image).then((animalImage) => {
            if (animalImage) {
              image.appendChild(animalImage);
            }
            createCard(animal, image, animalContainer);
          });
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching animal data: ", error);
    });
}

/*
Created by: Dominic Gabriel O. Ronquillo
Description:
This is the sort function of the website.
It begins by converting the animal cards into an array so they can be sorted.
If the sort button says A-Z it will sort the animals in Ascending order.
If the sort button says Z-A it will sort the animals in Descending order.
Afterwards it will clear the current container and then append the new results.
*/
function sortResults() {
  const sortButton = document.getElementById("sort-button");
  const sortOrder = sortButton.textContent;
  const animalContainer = document.querySelector(".animal-cards-container");

  // kukunin lang ung cards tas gagawin na array
  const animalCards = Array.from(animalContainer.querySelectorAll(".card"));

  // sort by name
  animalCards.sort((a, b) => {
    const nameA = a.querySelector(".animal-name").textContent;
    const nameB = b.querySelector(".animal-name").textContent;
    if (sortOrder === "Sort A-Z") {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  });

  // empty the results
  animalContainer.innerHTML = "";

  // show the new results
  animalCards.forEach((card) => {
    animalContainer.appendChild(card);
  });

  // eto para naguupdate ung button kada click
  sortButton.textContent = sortOrder === "Sort A-Z" ? "Sort Z-A" : "Sort A-Z";
}

// old version

// const animalsAPIURL = 'https://api.api-ninjas.com/v1/animals?name=';
// const animalsAPIKey = 'NCgsX/tZu9GD2YfAZGpM2A==6dfQiZXcvqGd8HcI';

// const youtubeAPIKey = 'AIzaSyAdawYbu7IXXWoPuwp3ri28HzJ2I4su4JI';
// const youtubeAPIURL = 'https://www.googleapis.com/youtube/v3/search';

// const videoPress = document.getElementById("video-press");
// const videoShow = document.getElementById("video-show");

// document.getElementById('find-button').addEventListener('click', () => {

//     const userInputValue = document.getElementById('animal-input').value;
//     const section = document.getElementById('results-section');

//     section.innerHTML='';

//     function getYouTubeSearchURL(animalString) {
//         const addSearch  = `${animalString} profile`;
//         return `${youtubeAPIURL}?key=${youtubeAPIKey}&q=${encodeURIComponent(addSearch)}&part=snippet&type=video&maxResults=1`;
//     }

//     const resultsLabel = document.createElement('div');

//     // const btn = document.querySelector('.video-button');
//     // const videoContainer = document.querySelector('.video-container');
//     // const close = document.querySelector('.close');

//     resultsLabel.className = 'your-results-label';
//     resultsLabel.textContent = 'Results for '
//     const spanResults = document.createElement('span');
//     spanResults.className = 'results-span';
//     spanResults.textContent = '"'+ userInputValue + '"';
//     resultsLabel.appendChild(spanResults);
//     section.appendChild(resultsLabel);

//     var animalContainer = document.createElement('div');
//     animalContainer.className = 'animal-cards-container';
//     section.appendChild(animalContainer);

//     function showVideoPopUp(videoId, targetCard) {
//         const popUp = document.createElement('div');
//         popUp.className = 'video-popup';

//         const videoFrame = document.createElement('iframe');
//         videoFrame.setAttribute('src', `https://www.youtube.com/embed/${videoId}`);
//         videoFrame.setAttribute('allowfullscreen', '');
//         videoFrame.className = 'video-frame';

//         const closeButton = document.createElement('span');
//         closeButton.className = 'close';
//         closeButton.textContent = 'X';
//         closeButton.addEventListener('click', function() {
//             popUp.style.display = 'none';
//         });

//         popUp.appendChild(videoFrame);
//         popUp.appendChild(closeButton);

//         targetCard.appendChild(popUp);
//     }

//     fetch(animalsAPIURL + userInputValue, {
//         method: 'GET',
//         headers: {
//             'X-Api-Key': animalsAPIKey,
//             'Content-Type': 'application/json'
//         }
//     })
//     .then(response => response.json())
//     .then(result => {
//         if (result.length != 0) {
//             if (result.length < 6) {
//                 section.setAttribute('id', 'results-section-v2');
//             }

//            result.forEach(function(animal) {

//                 console.log(animal.name);

//                 var card = document.createElement('div');
//                 card.className = 'card';

//                 var image = document.createElement('div');
//                 image.className = 'image';

//                 var content = document.createElement('div');
//                 content.className = 'content';

//                 var animalName = document.createElement('div');
//                 animalName.className = 'animal-name';
//                 animalName.textContent = animal.name;

//                 var animalString = animalName.textContent;

//                 var mainDetails = document.createElement('div');
//                 mainDetails.className = 'main-details';

//                 var detailsOne = document.createElement('div');
//                 detailsOne.className = 'details-1';

//                 // start details-1 contents
//                 // phylum
//                 var labelPhylum = document.createElement('div');
//                 labelPhylum.className = 'label';
//                 labelPhylum.textContent = 'Phylum: ';

//                 var valuePhylum = document.createElement('span');
//                 valuePhylum.className = 'value';
//                 valuePhylum.textContent = animal.taxonomy.phylum;

//                 // class
//                 var labelClass = document.createElement('div');
//                 labelClass.className = 'label';
//                 labelClass.textContent = 'Class: ';

//                 var valueClass = document.createElement('span');
//                 valueClass.className = 'value';
//                 valueClass.textContent = animal.taxonomy.class;

//                 // order
//                 var labelOrder = document.createElement('div');
//                 labelOrder.className = 'label';
//                 labelOrder.textContent = 'Order: ';

//                 var valueOrder = document.createElement('span');
//                 valueOrder.className = 'value';
//                 valueOrder.textContent = animal.taxonomy.order;

//                 // genus
//                 var labelGenus = document.createElement('div');
//                 labelGenus.className = 'label';
//                 labelGenus.textContent = 'Genus: ';

//                 var valueGenus = document.createElement('span');
//                 valueGenus.className = 'value';
//                 valueGenus.textContent = animal.taxonomy.genus;

//                 // group
//                 var labelGroup = document.createElement('div');
//                 labelGroup.className = 'label';
//                 labelGroup.textContent = 'Type: ';

//                 var valueGroup = document.createElement('span');
//                 valueGroup.className = 'value';
//                 valueGroup.textContent = animal.characteristics.group;

//                 // diet
//                 var labelDiet = document.createElement('div');
//                 labelDiet.className = 'label';
//                 labelDiet.textContent = 'Diet: ';

//                 var valueDiet = document.createElement('span');
//                 valueDiet.className = 'value';
//                 valueDiet.textContent = animal.characteristics.diet;

//                 // locations
//                 var labelLocations = document.createElement('div');
//                 labelLocations.className = 'label';
//                 labelLocations.textContent = 'Locations: ';

//                 var valueLocations = document.createElement('span');
//                 valueLocations.className = 'value';
//                 valueLocations.textContent = animal.locations;

//                 var detailsTwo = document.createElement('div');
//                 detailsTwo.className = 'details-2';

//                 // start details-2 content
//                 // lifestyle
//                 var labelLifestyle = document.createElement('div');
//                 labelLifestyle.className = 'label';
//                 labelLifestyle.textContent = 'Lifestyle: ';

//                 var valueLifestyle = document.createElement('span');
//                 valueLifestyle.className = 'value';
//                 valueLifestyle.textContent = animal.characteristics.lifestyle;

//                 // family
//                 var labelFamily = document.createElement('div');
//                 labelFamily.className = 'label';
//                 labelFamily.textContent = 'Family: ';

//                 var valueFamily = document.createElement('span');
//                 valueFamily.className = 'value';
//                 valueFamily.textContent = animal.taxonomy.family;

//                 // Scientific Name
//                 var labelSN = document.createElement('div');
//                 labelSN.className = 'label';
//                 labelSN.textContent = 'SN: ';

//                 var valueSN = document.createElement('span');
//                 valueSN.className = 'value';
//                 valueSN.textContent = animal.taxonomy.scientific_name;

//                 // habitat
//                 var labelHabitat = document.createElement('div');
//                 labelHabitat.className = 'label';
//                 labelHabitat.textContent = 'Habitat: ';

//                 var valueHabitat = document.createElement('span');
//                 valueHabitat.className = 'value';
//                 valueHabitat.textContent = animal.characteristics.habitat;

//                 // lifespan
//                 var labelLifespan = document.createElement('div');
//                 labelLifespan.className = 'label';
//                 labelLifespan.textContent = 'Lifespan: ';

//                 var valueLifespan = document.createElement('span');
//                 valueLifespan.className = 'value';
//                 valueLifespan.textContent = animal.characteristics.lifespan;

//                 var videoContainer = document.createElement('div');

//                 videoContainer.className = 'video-container';

//                 var videoButton = document.createElement('button');

//                 videoButton.className = 'video-button';

//                 var videoLabel = document.createElement('b');
//                 videoLabel.className = 'video-label';
//                 videoLabel.textContent = 'Video';

//                 videoButton.appendChild(videoLabel);
//                 videoButton.appendChild(videoContainer);
//                 card.appendChild(videoContainer);
//                 card.appendChild(videoButton);
//                 animalContainer.appendChild(card);

//                 const videoPressButtons = document.querySelectorAll('.video-button'); //kunin mga meron na class video-button na nakadisplay pagkasearch
//                 videoPressButtons.forEach(function(button) {
//                 const hasEventListener = button.classList.contains('event-listener-added'); //eto putangina life saver sa stack overflow anti duplicate ng trigger
//                 if (!hasEventListener) {
//                 button.addEventListener('click', function() {
//                 const videoContainer = this.querySelector('.video-container');
//                 videoContainer.classList.toggle('show');
//         });

//                 button.addEventListener('click', function() {
//                 const animalName = this.parentElement.querySelector('.animal-name').textContent;
//                 const youtubeUrl = getYouTubeSearchURL(animalName);

//                 fetch(youtubeUrl)
//                 .then(response => response.json())
//                 .then(data => {
//                     const videoId = data.items[0].id.videoId;
//                     const targetCard = this.parentElement;
//                     showVideoPopUp(videoId, targetCard);
//                 });
//         });

//         button.classList.add('event-listener-added');
//     }
// });

//                 var apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(animal.name)}`;

//                 // getting yung mga imagess
//                 fetch(apiUrl)
//                     .then(response => response.json())
//                     .then(res => {
//                         var animalImage = document.createElement('img');
//                         var imageURL = res.thumbnail ? res.thumbnail.source : null;
//                         animalImage.src = imageURL;
//                         animalImage.alt = animalName;
//                         image.appendChild(animalImage);
//                     })
//                 .catch(error => {
//                     console.error('Error fetching image: ', error);
//                     image.innerHTML = "<p>Error loading image</p>";
//                 });

//                 // details-1
//                 detailsOne.appendChild(labelPhylum);
//                 labelPhylum.appendChild(valuePhylum);

//                 detailsOne.appendChild(labelClass);
//                 labelClass.appendChild(valueClass);

//                 detailsOne.appendChild(labelOrder);
//                 labelOrder.appendChild(valueOrder);

//                 detailsOne.appendChild(labelGenus);
//                 labelGenus.appendChild(valueGenus);

//                 detailsOne.appendChild(labelGroup);
//                 labelGroup.appendChild(valueGroup);

//                 detailsOne.appendChild(labelDiet);
//                 labelDiet.appendChild(valueDiet);

//                 detailsOne.appendChild(labelLocations);
//                 labelLocations.appendChild(valueLocations);

//                 detailsTwo.appendChild(labelLifestyle);
//                 labelLifestyle.appendChild(valueLifestyle);

//                 detailsTwo.appendChild(labelFamily);
//                 labelFamily.appendChild(valueFamily);

//                 detailsTwo.appendChild(labelSN);
//                 labelSN.appendChild(valueSN);

//                 detailsTwo.appendChild(labelHabitat);
//                 labelHabitat.appendChild(valueHabitat);

//                 detailsTwo.appendChild(labelLifespan);
//                 labelLifespan.appendChild(valueLifespan);

//                 card.appendChild(image);
//                 card.appendChild(content);
//                 content.appendChild(animalName);
//                 content.appendChild(mainDetails);
//                 mainDetails.appendChild(detailsOne);
//                 mainDetails.appendChild(detailsTwo);
//                 videoButton.appendChild(videoLabel);
//                 videoButton.appendChild(videoContainer);
//                 card.appendChild(videoButton);
//                 animalContainer.appendChild(card);
//             });
//
//             // Add event listener to the video button

//         } else {
//             animalContainer.innerHTML = "<div class='card'><div class='animal-name'>Animal not found!</div></div>";
//         }
//     })
//     .catch(function(error) {
//         animalContainer.innerHTML = "<div class='card'><div class='animal-name'>Error occurred while fetching animal data.</div></div>";
//         console.error('Error: ', error.message);
//     });
// });

// btn.addEventListener('click',()=>{
//     videoContainer.classList.add('show');
// });

// close.addEventListener('click',()=>{
//     videoContainer.classList.remove('show');
// });

// // videoButton.addEventListener('click', () => {
// //     const videoContainer = videoButton.parentElement.querySelector('.video-container');
// //     videoContainer.classList.add('show');
// // });
// // close.addEventListener('click', () => {
// //     const videoContainer = close.parentElement;
// //     videoContainer.classList.remove('show');
// // });

// const url = 'https://ytmedia.p.rapidapi.com/@api/json/audiostreams/kcCXl12FcRc';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '489c86492cmsha0848e70c28bbf2p1c600ejsn9ad13b010409',
// 		'X-RapidAPI-Host': 'ytmedia.p.rapidapi.com'
// 	}
// };

// try {
// 	const response =  fetch(url, options);
// 	const result =  response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }
