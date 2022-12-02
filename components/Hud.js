class Hud {
    constructor() {
        this.scoreboards = []
    }

    update() {
        // iterate through scoreboards and update
        this.scoreboards.forEach(scoreboard => {
            // look up current state and update
            scoreboard.update(window.playerState.pizzas[scoreboard.id])
        })
    }

    createElement() {
        // clean up any old elements before creating elements
        if (this.element) {
            this.element.remove()
            this.scoreboards = []
        }

        this.element = document.createElement("div")
        this.element.classList.add("Hud")

        const { playerState } = window
        playerState.lineup.forEach(key => {
            const pizza = playerState.pizzas[key]
            const scoreboard = new Combatant({
                id: key, // "p1", "p2"
                ...Pizzas[pizza.pizzaId], // "s001", "v001"
                ...pizza,
            }, null)
            // get elements on the DOM
            scoreboard.createElement()
            this.scoreboards.push(scoreboard)
            this.element.appendChild(scoreboard.hudElement)
        })
        this.update()
    }

    init(container) {
        this.createElement()
        container.appendChild(this.element)

        document.addEventListener("PlayerStateUpdated", () => {
            this.update()
        })

        document.addEventListener("LineupChanged", () => {
            // refresh pizzas in HUD
            this.createElement()
            container.appendChild(this.element)
        })
    }
}