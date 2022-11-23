class TextMessage {
    constructor({ text, onComplete }) {
        this.text = text
        this.onComplete = onComplete
        this.element = null
    }

    createElement() {
        this.element = document.createElement("div")
        this.element.classList.add("TextMessage")

        this.element.innerHTML = (`
            <p class="TextMessage_p"></p>
            <button class ="TextMessage_button">Next</button>
        `)

        // init typewriter effect
        this.revealingText = new RevealingText({
            element: this.element.querySelector(".TextMessage_p"),
            text: this.text
        })

        this.element.querySelector("button").addEventListener("click", () => {
            // close text message
            this.done()
        })

        this.actionListener = new KeyPressListener("Enter", () => {
            this.actionListener.unbind() // stop listening since text message will close upon pressing
            this.done()
        })
    }

    done() {
        this.element.remove()
        this.onComplete()
    }

    init(container) {
        this.createElement()
        container.appendChild(this.element)
        this.revealingText.init()
    }
}