const myForm = document.getElementById("myForm")
const startsWith = document.getElementById("startsWith")
const btnSearch = document.getElementById("btnSearch")
const myContent = document.getElementById("myContent")
const apiKey = "eecf7d5e4faebc8beb80c430af40f474"

myForm.addEventListener("submit", e => e.preventDefault())

const draw = heroes => {
    myContent.innerHTML=""
    // El fragmento es para que no se sobreescriba la imágen en el mismo lugar
    const fragment = document.createDocumentFragment()
    heroes.forEach(hero => {
        const container = document.createElement('div')
        const title = document.createElement("h2")
        const image = document.createElement("img")

        title.textContent = hero.name
        image.src =` ${hero.thumbnail.path}/portrait_incredible.${hero.thumbnail.extension}`
        container.appendChild(title)
        container.appendChild(image)
        fragment.appendChild(container)
    })
    myContent.appendChild(fragment)
}

btnSearch.addEventListener("click", async () => {
    // encodeUri, es una función de js que convierte los espacios para poder enviarlos a la url
    const encondeName = encodeURI(startsWith.value)
    const marvelURL = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${encondeName}&apikey=${apiKey}`
    const resp = await axios.get(marvelURL)
    draw(resp.data.data.results)
    console.log(resp.data.data.results)
})
