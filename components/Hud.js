class Hud {
    constructor() {
        this.scoreboards = []
    }

    update() {
        this.scoreboards.forEach(scoreboard => {
            // iterate through scoreboards and update
        })
    }

    createElement() {
        this.element = document.createElement("div")
        this.element.classList.add("Hud")

        const { playerState } = window
        playerState.lineup.forEach(key => {
            const pizza = playerState.pizzas[key]
            const scoreboard = new Combatant({
                id: key,
                ...Pizzas[pizza.id],
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
    }
}