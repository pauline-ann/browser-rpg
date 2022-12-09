class KeyboardMenu {
    constructor(config = {}) {
        this.options = [] // set by updater method
        this.up = null
        this.down = null
        this.prevFocus = null
        this.descriptionBox = config.descriptionBox || null
    }

    setOptions(options) {
        this.options = options
        this.element.innerHTML = this.options.map((option, index) => {
            const disabledAttr = option.isDisabled ? "disabled" : ""
            const spanContent = option.details ? option.details() : ""

            return (`
                <div class="option">
                    <button ${disabledAttr} data-button="${index}" data-description="${option.description}">
                        ${option.label}
                    </button>
                    <span class="details">${spanContent}</span>
                </div>
            `)
        }).join("")

        this.element.querySelectorAll("button").forEach(button => {

            button.addEventListener("click", () => {
                const chosenOption = this.options[Number(button.dataset.button)]
                chosenOption.handler()
            })

            button.addEventListener("mouseenter", () => {
                button.focus()
            })

            button.addEventListener("focus", () => {
                this.prevFocus = button
                this.descriptionElementText.innerText = button.dataset.description
            })
        })

        // auto focus first button that isn't disabled
        setTimeout(() => {
            this.element.querySelector("button[data-button]:not([disabled])").focus()
        }, 10)
    }

    createElement() {
        this.element = document.createElement("div")
        this.element.classList.add("KeyboardMenu")

        // description box element
        this.descriptionElement = document.createElement("div")
        this.descriptionElement.classList.add("DescriptionBox")
        this.descriptionElement.innerHTML = (`<p>This is a description uwu</p>`)
        this.descriptionElementText = this.descriptionElement.querySelector("p") // save a reference to paragraph since we will be changing it a lot
    }

    end() {

        // remove menu element and description element
        this.element.remove()
        this.descriptionElement.remove()

        // clean up bindings
        this.up.unbind()
        this.down.unbind()
    }

    init(container) {
        this.createElement()
        const descriptionContainer = this.descriptionBox ?? container
        descriptionContainer.appendChild(this.descriptionElement)
        container.appendChild(this.element)

        this.up = new KeyPressListener("ArrowUp", () => {
            const current = Number(this.prevFocus.getAttribute("data-button"))
            const prevButton = Array.from(this.element.querySelectorAll("button[data-button]")).reverse().find(el => {
                return el.dataset.button < current && !el.disabled
            })
            prevButton?.focus()
        })

        this.down = new KeyPressListener("ArrowDown", () => {
            const current = Number(this.prevFocus.getAttribute("data-button"))
            const nextButton = Array.from(this.element.querySelectorAll("button[data-button]")).find(el => {
                return el.dataset.button > current && !el.disabled
            })
            nextButton?.focus()
        })
    }
}