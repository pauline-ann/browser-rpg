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
        // get caster
        const casterId = this.battle.activeCombatants[this.currentTeam]
        const caster = this.battle.combatants[casterId]

        // get opponent
        const opponentTeam = caster.team === "player" ? "enemy" : "player"
        const opponentId = this.battle.activeCombatants[opponentTeam]
        const opponent = this.battle.combatants[opponentId]

        const submission = await this.onNewEvent({
            type: "submissionMenu",
            caster,
            opponent
        })

        const resultingEvents = caster.getReplacedEvents(submission.action.success)

        for (let i = 0; i < resultingEvents.length; i++) {
            const event = {
                ...resultingEvents[i],
                submission,
                action: submission.action,
                caster,
                target: submission.target
            }
            await this.onNewEvent(event) // stop and wait for each turn to complete
        }

        // check for post events
        // do things after original turn submission
        const postEvents = caster.getPostEvents()
        for (let i = 0; i < postEvents.length; i++) {
            const event = {
                ...postEvents[i],
                submission,
                action: submission.actions,
                caster,
                target: submission.target
            }
            await this.onNewEvent(event)
        }

        // check for status expire
        const expiredEvent = caster.decrementStatus()
        if (expiredEvent) {
            await this.onNewEvent(expiredEvent)
        }

        // change turn back to opposing team
        this.currentTeam = opponentTeam
        this.turn()
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