

//define generic animal object...
class Animal {
    constructor(species,weight,diet,fact) {
        this.species = species;
        this.weight = parseFloat(weight);
        this.diet = diet;
        this.image = this.image = 'images/' + species.toLowerCase() + '.png';
        this.fact = fact;
        this.facts = [fact];
    }

    addFact(factadd){
        return this.facts.push(factadd);
    }
}

// define human object...
class Human extends Animal{
    constructor(name,feet,inches,weight,diet) {
        super('human', weight , diet);
        this.name = name;
        this.feet = feet;
        this.inches = inches;

    }

    compareDiet(diet) {
        return this.diet === diet;
    }

    compareWeight(weight){
        return this.weight === weight;
    }

    compareHeight(height){
        return this.feet === height;
    }
}


// define dino object
class Dino extends Animal{
    constructor(species, weight, height, diet, where, when, fact) {
        super(species, weight, diet ,fact);
        this.height = parseFloat(height);
        this.where = where;
        this.when = when;

    }

}

// define a function to retrieve input data and create ah human object...
function retrieveInput() {
    return (function () {
        let name = document.getElementById('name').value;
        let feet = parseFloat(document.getElementById('feet').value);
        let inches = parseFloat(document.getElementById('inches').value);
        let weight = document.getElementById('weight').value;
        let diet = document.getElementById('diet').value;
        return new Human(name, feet, inches, weight, diet.toLowerCase());
    })();
}

// define a dinos array and retrieve data from json file...
let dinos = [];
fetch("dino.json").then(response => response.json()).then(result => result.Dinos.forEach(element => dinos.push(new Dino(element.species,element.weight , element.height , element.diet, element.where,element.when,element.fact))));


function createGridElement(specie, image, fact) {
    let gridElement = document.createElement("div");
    gridElement.className = "grid-item";

    let specieDisplayed = document.createElement("h3");
    specieDisplayed.innerText = specie;

    gridElement.appendChild(specieDisplayed);

    let imageDisplayed = document.createElement("img");
    imageDisplayed.src = image;
    gridElement.appendChild(imageDisplayed);

    if (fact){
        let factDisplayed = document.createElement("p");
        factDisplayed.innerText = fact;
        gridElement.appendChild(factDisplayed);
    }

    return gridElement;
}

function randomNumber(length) {
    return Math.floor(Math.random() * 10 % length);
}

// function called when press button ...
document.getElementById('btn').addEventListener('click', function () {
    // check if all input are not empty , in case there are some errors return fuction and send an alert...
    const inputCollection = document.getElementById('dino-compare').elements;

    // a sort of validation to not have empty input fields...
    let errors = [];
    for (let index = 0; index < inputCollection.length; index++) {

        if (inputCollection[index].value.length === 0) {
            let inputName = inputCollection[index].getAttribute('name');
            errors.push(inputName + ' field is required \n');

        }
    }

    if (errors.length > 0) {
        alert(errors);
        return;
    }
    // just a little check if dinos are empty ... should not be necessary since we are retrieving data from a json file ...
    if (dinos.length === 0){
        return alert("we are sorry something went wrong and i was not able to retrieve some data");
    }

    //retrieve input data if there are no errors and create human object...
    const humanInput = retrieveInput();
    // iterate over dinos array and add facts to our object...
    dinos.forEach(element => (function () {

        if (humanInput.compareDiet(element.diet)){
            element.addFact(`my specie: ${element.species} share the same diet of: ${humanInput.name} `);
        } else {
            element.addFact(`my specie: ${element.species} do not share the same diet of: ${humanInput.name} `);
        }
        if (humanInput.compareWeight(element.weight)){
            element.addFact( `my specie: ${element.species} have above the same weight of : ${humanInput.name} `);
        } else {
            element.addFact( `my specie: ${element.species} do not have the same weight of : ${humanInput.name} `);
        }
        if (humanInput.compareHeight(element.height)){
            element.addFact(`my specie: ${element.species} have above the same height of : ${humanInput.name} `) ;
        } else {
            element.addFact(`my specie: ${element.species} do not have the same height of : ${humanInput.name} `) ;
        }

        element.addFact(` i lived during: ${element.when}  bc`);
        element.addFact(` my specie habitat was ${element.where}`);
    })());

    // lets hide the form ...
    document.getElementById("dino-compare").style.display = "none";

    // lets create an array where we store dinos and human info to use to display...
    let objectToDisplay = dinos.concat(humanInput);

    for (let element in objectToDisplay){

        let specie ;
        if (objectToDisplay[element] instanceof Human){
            specie = objectToDisplay[element].name;
        } else {
            specie = objectToDisplay[element].species;
        }

        let image = objectToDisplay[element].image;
        let fact;

        if (objectToDisplay[element].facts.length > 0 && objectToDisplay[element].species  !== "Pigeon"){
            fact = objectToDisplay[element].facts[randomNumber(objectToDisplay[element].facts.length)];
        } else if (objectToDisplay[element].facts.length > 0 && objectToDisplay[element].species  === "Pigeon"){
            fact = objectToDisplay[element].facts[0];
        }
        let gridElement = createGridElement(specie,image,fact);

        document.getElementById("grid").appendChild(gridElement);

        

    }

});

document.getElementById("btn-reset").addEventListener("click" ,function () {
    document.getElementById("dino-compare").reset();
    location.reload();
    document.getElementById("dino-compare").style.display = "unset";
});









