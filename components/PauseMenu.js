// Similar to battle submission menu
// Call setOptions multiple times as we change pages
class PauseMenu {
    constructor({ progress, onComplete }) {
        this.progress = progress
        this.onComplete = onComplete
    }

    getOptions(pageKey) {
        // case 1: show the first page of options
        if (pageKey === "root") {
            const lineupPizzas = playerState.lineup.map(id => {
                const { pizzaId } = playerState.pizzas[id]
                const base = Pizzas[pizzaId]
                return {
                    label: base.name,
                    description: base.description,
                    handler: () => {
                        this.keyboardMenu.setOptions(this.getOptions(id))
                    }
                }
            })

            return [
                ...lineupPizzas,
                {
                    label: "Controls",
                    description: "Press the arrow keys or WASD keys to walk around or navigate the menu. Press ENTER to confirm or interact with the environment. Press ESC to open and close the menu.",
                    handler: () => {
                        this.close()
                    }
                },
                {
                    label: "Save",
                    description: "Save your progress",
                    handler: () => {
                        this.progress.save()
                        this.close()
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

        // case 2: show the options for just one pizza (by id)
        const unequippedPizzas = Object.keys(playerState.pizzas).filter(id => {
            return playerState.lineup.indexOf(id) === -1
        }).map(id => {
            const { pizzaId } = playerState.pizzas[id]
            const base = Pizzas[pizzaId]
            return {
                label: `Swap for ${base.name}`,
                description: base.description,
                handler: () => {
                    playerState.swapLineup(pageKey, id)
                    this.keyboardMenu.setOptions(this.getOptions("root"))
                }
            }
        })

        return [
            // swap for any unequipped pizza
            ...unequippedPizzas,
            {
                label: "Move to the front",
                description: "Move this pizza to the front of the list",
                isDisabled: playerState.lineup.indexOf(pageKey) === 0, // disable move to front option if the pizza is the first in lineup
                handler: () => {
                    playerState.moveToFront(pageKey)
                    this.keyboardMenu.setOptions(this.getOptions("root"))
                }
            },
            {
                label: "Back",
                description: "Go back to main menu",
                handler: () => {
                    this.keyboardMenu.setOptions(this.getOptions("root"))
                }
            }
        ]
    }

    createElement() {
        this.element = document.createElement("div")
        this.element.classList.add("PauseMenu")
        this.element.classList.add("OverlayMenu")
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
            descriptionBox: container
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