// TurnCycle is in charge of asking player what to do and receiving that answer
// response comes in the form of little digestible events that happen
// each battle event is handled differently

class TurnCycle {
    constructor({ battle, onNewEvent, onBattleEnd }) {
        this.battle = battle
        this.onNewEvent = onNewEvent
        this.onBattleEnd = onBattleEnd
        this.currentTeam = "player" // or "enemy"
        this.isBattleStart = true
    }

    // pump out promises and wait for promises to resolve
    async turn() {
        // get challenger
        const challenger = this.battle.enemy

        // get caster
        const casterId = this.battle.activeCombatants[this.currentTeam]
        const caster = this.battle.combatants[casterId]

        // get enemy
        const enemyTeam = caster.team === "player" ? "enemy" : "player"
        const enemyId = this.battle.activeCombatants[enemyTeam]
        const enemy = this.battle.combatants[enemyId]

        if (this.isBattleStart && challenger.textMessages.preBattle) {

            // display pre-battle dialogue
            await this.onNewEvent({
                type: "textMessage",
                text: `${challenger.name.toUpperCase()}: ${challenger.textMessages.preBattle}`
            })

            this.isBattleStart = false
        }

        const submission = await this.onNewEvent({
            type: "submissionMenu",
            caster,
            enemy
        })

        // stop here if we are swapping out this combatant
        if (submission.replacement) {
            await this.onNewEvent({
                type: "replace",
                replacement: submission.replacement
            })
            await this.onNewEvent({
                type: "textMessage",
                text: `Go get 'em, ${submission.replacement.name}`
            })
            this.nextTurn(enemyTeam)
            return
        }

        if (submission.instanceId) {
            // add to list to persist to player state after battle
            this.battle.usedInstanceIds[submission.instanceId] = true

            // reset items in battle state to filter out item that was used
            this.battle.items = this.battle.items.filter(item => item.instanceId !== submission.instanceId)
        }

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

        // check if target is still alive
        const isTargetDead = submission.target.hp <= 0
        if (isTargetDead) {

            // play faint sfx
            window.Sfx.faint.play()

            await this.onNewEvent({
                type: "textMessage", text: `${submission.target.name} fainted!`
            })

            if (submission.target.team === "enemy") {

                const playerActivePizzaId = this.battle.activeCombatants.player
                const xp = submission.target.xpGiven

                // reward with xp
                // we don't care about enemy getting xp
                await this.onNewEvent({
                    type: "textMessage",
                    text: `Gained ${xp} XP!`
                })

                await this.onNewEvent({
                    type: "giveXp",
                    xp,
                    combatant: this.battle.combatants[playerActivePizzaId]// active player pizza
                })
            }
        }

        // check if there is a winning team
        const winner = this.getWinningTeam()

        // end battle
        if (winner) {
            const playerWon = winner === "player"

            // stop battle music
            window.Music.battle.stop()

            if (playerWon) {
                window.Sfx.victory.play()
            } else {
                window.Sfx.loss.play()
            }

            const enemyText = playerWon ? `${challenger.textMessages.battleWin}` : `${challenger.textMessages.battleLoss}`
            await this.onNewEvent({
                type: "textMessage",
                text: `${challenger.name.toUpperCase()}: ${enemyText}`
            })

            return this.onBattleEnd(winner)
        }

        // bring in replacement if there is still one
        if (isTargetDead) {
            const replacement = await this.onNewEvent({
                type: "replacementMenu",
                team: submission.target.team
            })
            await this.onNewEvent({
                type: "replace",
                replacement
            })
            await this.onNewEvent({
                type: "textMessage",
                text: `${replacement.name} appears!`
            })
        }

        // check for post events
        // do things after original turn submission
        const postEvents = caster.getPostEvents()
        for (let i = 0; i < postEvents.length; i++) {
            const event = {
                ...postEvents[i],
                submission,
                action: submission.action,
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

        this.nextTurn(enemyTeam)
    }

    nextTurn(enemyTeam) {
        // change turn back to opposing team
        this.currentTeam = enemyTeam
        this.turn()
    }

    getWinningTeam() {
        let aliveTeams = {}

        Object.values(this.battle.combatants).forEach(combatant => {
            if (combatant.hp > 0) {
                aliveTeams[combatant.team] = true
            }
        })

        if (!aliveTeams["player"]) { return "enemy" }
        if (!aliveTeams["enemy"]) { return "player" }

        return null
    }

    async init() {
        await this.onNewEvent({
            type: "textMessage",
            text: `${this.battle.enemy.name} wants to battle!`
        })

        // start the first turn
        this.turn()
    }
}