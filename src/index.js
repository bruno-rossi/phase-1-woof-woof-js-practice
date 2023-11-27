// Deliverables:
// 1.  Add the pups from the db to the top section of the page (<div id="dog-bar"></div>). 
// a. Use a function to create a span with a pups name and add it to the dog bar (ex: <span>Mr. Bonkers</span>).
// b. Fetch pup data from the server: http://localhost:3000/pups
// 2. Show more information about each pup in the <div id="dog-info"> element.
// a. Create a click event listener for the dog cards in the #dog-bar. 
// b. When a user clicks on a dog card, append an img tag, an h2 tag, and a button with isGoodDog status.
// - Add the dog's img as src;
// - Add the dog's name as textContent in h2; 
// 3. Toggle good dog button functionality:
// a. When clicking on "#is-good-dog" button, the value of isGoodDog toggles between true or false. 
// b. The button click triggers an event listener that sends a patch request to the dog. Remember to use the URL for each pup: `http://localhost:3000/pups/${id}`
// BONUS:
// 4. Filter good dogs
// Add an event listener to <button id="good-dog-filter">Filter good dogs: OFF</button>. When a user clicks on this button, the textContent changes to Filter good dogs: ON.
// When filter good dogs is turned on (true), then the nav should only display the dogs that match isGoodDog = true.

let listOfDogs;
let currentDoggo;

fetch("http://localhost:3000/pups")
.then(response => response.json())
.then(doggos => {

    console.log(doggos);
    listOfDogs = doggos;

    // Call the function to create the nav card for each of the doggos:
    listOfDogs.forEach(doggo => {
        createNavCard(doggo);
    });    
    
})

// Define function to create the nav card for a dog:
function createNavCard(dog) {
    
    // Create span and append it to the #dog-bar:
    const spanTag = document.createElement("span");
    document.querySelector("#dog-bar").append(spanTag);
    spanTag.textContent = dog.name;

    // Add event listener to the span tag:
    spanTag.addEventListener("click", event => {
        currentDoggo = dog;
        displayDoggo(currentDoggo);
        console.log(currentDoggo);
    })
}

// Create elements to display a dog's information in #dog-info:
const imgTag = document.createElement("img");
const h2Tag = document.createElement("h2");
const goodDogButton = document.createElement("button");
document.querySelector("#dog-info").append(imgTag, h2Tag);
goodDogButton.type = "button";
goodDogButton.id = "is-good-dog";

function displayDoggo(dog) {
    imgTag.src = dog.image;
    h2Tag.textContent = dog.name;
    goodDogButton.textContent = dog.isGoodDog ? "Bad Dog!" : "Good Dog!";
    document.querySelector("#dog-info").append(goodDogButton);
}
    
goodDogButton.addEventListener("click", event => {
    currentDoggo.isGoodDog = !currentDoggo.isGoodDog;
    goodDogButton.textContent = currentDoggo.isGoodDog ? "Bad Dog!" : "Good Dog!";

    fetch(`http://localhost:3000/pups/${currentDoggo.id}`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
            },
        body: JSON.stringify({
            "isGoodDog": currentDoggo.isGoodDog
        })
    })
})

let dogFilter = false;

const filterButton = document.querySelector("#good-dog-filter");

filterButton.addEventListener("click", event => {
    dogFilter = !dogFilter;
    filterButton.textContent = dogFilter ? "Filter good dogs: ON" : "Filter good dogs: OFF";

    let filteredDogList = listOfDogs.filter(dog => {
        return dog.isGoodDog === true;
    })
    console.log(filteredDogList);
    console.log(dogFilter);

    if (dogFilter === true) {
        document.querySelector("#dog-bar").innerHTML = "";
        filteredDogList.forEach(dog => {
            createNavCard(dog);
        });
    } else { 
        document.querySelector("#dog-bar").innerHTML = "";
        listOfDogs.forEach(dog => {
            createNavCard(dog);
        });

    }
})

