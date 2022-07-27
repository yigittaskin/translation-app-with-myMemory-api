const fromLang = document.querySelector("#from-lang")
const toLang = document.querySelector("#to-lang")
const btnTranslate = document.querySelector(".btnTranslate")
const fromText = document.querySelector("#from-text")
const toText = document.querySelector("#to-text")
const changeLang = document.querySelector("#changeLang")
const icons = document.querySelectorAll(".icons")

for (const lang in languages) {
    let option = `<option value="${lang}">${languages[lang]}</option>`
    fromLang.innerHTML += option
    toLang.innerHTML += option
}

fromLang.value = "tr-TR"
toLang.value = "en-GB"

changeLang.addEventListener('click', () => {
    let textChange = fromText.value
    fromText.value = toText.value
    toText.value = textChange

    let langChange = fromLang.value
    fromLang.value = toLang.value
    toLang.value = langChange
})

btnTranslate.addEventListener('click', () => {
    let text = fromText.value
    let from = fromLang.value
    let to = toLang.value
    const url =  `https://api.mymemory.translated.net/get?q=${text}&langpair=${from}|${to}`

    fetch(url)
        .then(res => res.json())
        .then(data =>{
            toText.value = data.responseData.translatedText
        })
})

for(let icon of icons) {
    icon.addEventListener("click", (e) => {
        if (e.target.classList.contains("fa-copy")) {
            if (e.target.id == "left") {
                navigator.clipboard.writeText(fromText.value)
            }else {
                navigator.clipboard.writeText(toText.value)
            }
        }else {
            let utterance
            if (e.target.id == "left") {
                utterance = new SpeechSynthesisUtterance(fromText.value)
                utterance.lang = fromLang.value
            }else {
                utterance = new SpeechSynthesisUtterance(toText.value)
                utterance.lang = toLang.value
            }
            speechSynthesis.speak(utterance)
        }
    })
}