// handle events chosen in Turn Cycle
// ie) animation, text message, state change when damage is done
class BattleEvent {
    constructor(event, battle) {
        this.event = event
        this.battle = battle
    }

    textMessage(resolve) {
        const message = new TextMessage({
            text: this.event.text,
            onComplete: () => {
                resolve()
            }
        })

        message.init(this.battle.element)
    }

    submissionMenu(resolve) {
        const menu = new SubmissionMenu({
            caster: this.event.caster,
            opponent: this.event.opponent,
            onComplete: submission => {
                resolve(submission)
            }
        })
        menu.init(this.battle.element)
    }

    init(resolve) {
        this[this.event.type](resolve)
    }
}