// handle events chosen in Turn Cycle
// ie) animation, text message, state change when damage is done
class BattleEvent {
    constructor(event, battle) {
        this.event = event
        this.battle = battle
    }

    textMessage(resolve) {
        const text = this.event.text
            .replace("{CASTER}", this.event.caster?.name)
            .replace("{TARGET}", this.event.target?.name)
            .replace("{ACTION}", this.event.action?.name)

        const message = new TextMessage({
            text,
            onComplete: () => {
                resolve()
            }
        })

        message.init(this.battle.element)
    }

    async stateChange(resolve) {
        const { caster, target, damage } = this.event
        if (damage) {
            // modify the target to have less HP
            target.update({
                hp: target.hp - damage
            })

            // start blinking
            target.pizzaElement.classList.add("battle-damage-blink")
        }

        // wait a little bit
        await utils.wait(800)

        // stop blinking
        target.pizzaElement.classList.remove("battle-damage-blink")
        resolve()
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