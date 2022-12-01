// Similar to battle submission menu
// Call setOptions multiple times as we change pages
class PauseMenu {
    constructor({ onComplete }) {
        this.onComplete = onComplete
    }

    getOptions(page) {
        if (page === "root") {
            return [
                // TODO dynamically add pizzas
                {
                    label: "Save",
                    description: "Save your progress",
                    handler: () => {
                        // TODO add save ftnality
                    }
                },
                {
                    label: "Close",
                    description: "Close the pause menu",
                    handler: () => {
                        this.close()
                    }
                }
            ]
        }
        return []
    }

    createElement() {
        this.element = document.createElement("div")
        this.element.classList.add("PauseMenu")
        this.element.innerHTML = (`
        <h2>Pause Menu</h2>
        `)
    }

    close() {
        // do some clean up when pause menu is closed
        this.esc?.unbind()
        this.keyboardMenu.end()
        this.element.remove()
        this.onComplete()
    }

    async init(container) {
        this.createElement()
        this.keyboardMenu = new KeyboardMenu({
            //
        })
        this.keyboardMenu.init(this.element)
        this.keyboardMenu.setOptions(this.getOptions("root"))

        container.appendChild(this.element)

        // add key binding to close pause menu when menu is already open
        utils.wait(200)
        this.esc = new KeyPressListener("Escape", () => {
            this.close()
        })
    }
}