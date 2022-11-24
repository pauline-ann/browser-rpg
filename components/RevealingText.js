class RevealingText {
    constructor(config) {
        this.element = config.element
        this.text = config.text
        this.speed = config.speed || 80

        this.timeout = null
        this.isDone = false // jump to end of text when enter key hit, but if done, move on
    }

    // recursively reveal each character
    revealOneCharacter(list) {
        const next = list.splice(0, 1)[0]
        next.span.classList.add("revealed")

        if (list.length === 0) {
            this.isDone = true
            return
        }

        this.timeout = setTimeout(() => {
            this.revealOneCharacter(list)
        }, next.delayAfter)
    }

    warpToDone() {
        clearTimeout(this.timeout)
        this.isDone = true
        this.element.querySelectorAll("span").forEach(s => {
            s.classList.add("revealed")
        })
    }

    init() {
        let characters = []
        this.text.split("").forEach((char) => {

            // create each span, add to element in DOM
            let span = document.createElement("span")
            span.textContent = char
            this.element.appendChild(span)

            const charIsSpace = char === " "
            const delayAfter = charIsSpace ? 0 : this.speed

            // add this span to our internal state array
            characters.push({
                span,
                delayAfter
            })
        })

        this.revealOneCharacter(characters)
    }
}