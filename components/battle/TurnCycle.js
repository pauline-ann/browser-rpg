// TurnCycle is in charge of asking player what to do and receiving that answer
// response comes in the form of little digestible events that happen
// each battle event is handled differently

class TurnCycle {
    constructor({ battle, onNewEvent }) {
        this.battle = battle
        this.onNewEvent = onNewEvent
        this.currentTeam = "player" // or "enemy"
    }

    // pump out promises and wait for promises to resolve
    async turn() {

    }

    async init() {
        await this.onNewEvent({
            type: "textMessage",
            text: "The battle is starting!"
        })

        // start the first turn
        this.turn()
    }
}