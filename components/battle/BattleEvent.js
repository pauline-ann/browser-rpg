// handle events chosen in Turn Cycle
// ie) animation, text message, state change when damage is done
class BattleEvent {
    constructor(event, battle) {
        this.event = event
        this.battle = battle
    }

    textMessage() {
        console.log("a message")
    }

    init(resolve) {
        this[this.event.type](resolve)
    }
}