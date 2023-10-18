const animalTemplate = document.querySelector("[animal-template]")
const cardContainer = document.querySelector("[data-cards-container]")

fetch("https://api.api-ninjas.com/v1/animals?name=siberian tiger")
.then(res => res.json())
.then(data => {
    data.forEach(animal => {
        const card = animalTemplate.content.cloneNode(true).children[0]
        const phylum = card.querySelector("[data-phylum]")
        const classAnimal = card.querySelector("[data-class]")
        const order = card.querySelector("[data-order]")
        const family = card.querySelector("[data-family]")
        const genus = card.querySelector("[data-genus]")
        const scientificName = card.querySelector("[data-scientific-name]")
        const type = card.querySelector("[data-type]")
        const habitat = card.querySelector("[data-habitat]")
        const diet = card.querySelector("[data-diet]")
        const lifespan = card.querySelector("[data-lifespan]")
        const locations = card.querySelector("[data-locations]")

        phylum.textContent = animal.phylum
        classAnimal.textContent = animal.class
        order.textContent - animal.order
        family.textContent = animal.family
        genus.textContent = animal.genus
        scientificName.textContent = animal.scientific_name
        type.textContent = animal.type
        habitat.textContent = animal.habitat
        diet.textContent = animal.diet
        lifespan.textContent = animal.lifespan
        locations.textContent = animal.locations

        cardContainer.append(card)
    })
})