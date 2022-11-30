class KeyboardMenu {
    constructor() {
        this.options = [] // set by updater method
        this.up = null
        this.down = null
        this.prevFocus = null
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
    }

    createElement() {
        this.element = document.createElement("div")
        this.element.classList.add("KeyboardMenu")

        // description box element
        this.decriptionElement = document.createElement("div")
        this.decriptionElement.classList.add("DescriptionBox")
        this.decriptionElement.innerHTML = (`<p>This is a description uwu</p>`)
        this.decriptionElementText = this.decriptionElement.querySelector("p") // save a reference to paragraph since we will be changing it a lot
    }

    init(container) {
        this.createElement()
        container.appendChild(this.decriptionElement)
        container.appendChild(this.element)
    }
}