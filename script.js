const myForm = document.getElementById("myForm")
const startsWith = document.getElementById("startsWith")
const btnSearch = document.getElementById("btnSearch")
const myContent = document.getElementById("myContent")
const apiKey = "eecf7d5e4faebc8beb80c430af40f474"

myForm.addEventListener("submit", e => e.preventDefault())

const draw = heroes => {
    myContent.innerHTML=""
    heroes.forEach(hero => {
        const container = document.createElement('div')
        container.classList.add("flex","rounded-2xl","border-double","border-8","shadow-xl","flex-col")
        const title = document.createElement("h2")
        title.classList.add("px-2","py-1","text-sm","text-center")
        const image = document.createElement("img")
        image.classList.add("rounded-lg","shadow-2xl")

        title.textContent = hero.name
        image.src =` ${hero.thumbnail.path}/standard_fantastic.${hero.thumbnail.extension}`
        container.appendChild(title)
        container.appendChild(image)
        myContent.appendChild(container)
    })
}

btnSearch.addEventListener("click", async () => {
    // encodeUri, es una función de js que convierte los espacios para poder enviarlos a la url
    const encondeName = encodeURI(startsWith.value)
    const marvelURL = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${encondeName}&apikey=${apiKey}`
    try{
        const resp = await axios.get(marvelURL)
        draw(resp.data.data.results)
        console.log(resp.data.data.results)
    }catch(error){
        console.log(error)
    }
})
