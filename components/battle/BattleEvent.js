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
        const { caster, target, damage, recover, status } = this.event
        let who = this.event.onCaster ? caster : target

        if (damage) {
            // modify the target to have less HP
            target.update({
                hp: target.hp - damage
            })

            // start blinking
            target.pizzaElement.classList.add("battle-damage-blink")

            // play damage sfx
            target.sound.damage()
        }

        if (recover) {
            let newHp = who.hp + recover
            if (newHp > who.maxHp) {
                newHp = who.maxHp
            }
            who.update({
                hp: newHp
            })

            // play recover sfx
            caster.sound.recover()
        }

        if (status) {
            who.update({
                status: { ...status }
            })

            if (status.type === "clumsy") {
                // play damage sfx
                target.sound.damage()
            }
            if (status.type === "saucy") {
                // play recover sfx
                caster.sound.recover()

            }
        }

        if (status === null) {
            who.update({
                status: null
            })

            // play recover sfx
            caster.sound.recover()
        }

        // wait a little bit
        await utils.wait(800)

        this.updateTeamIcons()

        // stop blinking
        target.pizzaElement.classList.remove("battle-damage-blink")
        resolve()
    }

    submissionMenu(resolve) {
        const { enemy, caster } = this.event
        const { items, combatants, element } = this.battle

        // filter out combatants that are on the enemy team or not alive
        const filteredCombatants = Object.values(combatants).filter(combatant => {
            return combatant.id !== caster.id && combatant.team === caster.team && combatant.hp > 0
        })

        const menu = new SubmissionMenu({
            caster,
            enemy,
            items,
            replacements: filteredCombatants,
            onComplete: submission => {
                resolve(submission)
            }
        })
        menu.init(element)
    }

    replacementMenu(resolve) {
        const menu = new ReplacementMenu({
            replacements: Object.values(this.battle.combatants).filter(combatant => {
                return combatant.team === this.event.team && combatant.hp > 0
            }),
            onComplete: replacement => {
                resolve(replacement)
            }
        })
        menu.init(this.battle.element)
    }

    async replace(resolve) {
        const { replacement } = this.event

        // find previously active combanant and switch to inactive
        const prevCombatant = this.battle.combatants[this.battle.activeCombatants[replacement.team]]
        this.battle.activeCombatants[replacement.team] = null
        prevCombatant.update()
        await utils.wait(400)

        // switch new combatant to active
        this.battle.activeCombatants[replacement.team] = replacement.id
        replacement.update()
        await utils.wait(400)

        this.updateTeamIcons()

        // resolve once done
        resolve()
    }

    giveXp(resolve) {
        let amount = this.event.xp
        const { combatant } = this.event
        const step = () => {
            if (amount > 0) {
                amount -= 1
                combatant.xp += 1

                // check if combatant levels up
                if (combatant.xp === combatant.maxXp) {
                    const prevMaxXp = combatant.maxXp
                    const prevMaxHp = combatant.maxHp

                    combatant.maxXp = prevMaxXp + (prevMaxXp * .25) // increase max XP based off previous level's max XP
                    combatant.maxHp = prevMaxHp + (prevMaxHp * .25) // increase max HP based off previous level's max HP
                    combatant.hp = combatant.maxHp // refill health on level up
                    combatant.xp = 0 // reset xp
                    combatant.level += 1 // increase level
                }

                combatant.update()
                requestAnimationFrame(step)
                return
            }
            resolve()
        }
        requestAnimationFrame(step)
    }

    animation(resolve) {
        const ftn = BattleAnimations[this.event.animation]
        ftn(this.event, resolve) // call function passing in event and how to resolve it
    }

    updateTeamIcons() {
        this.battle.playerTeam.update()
        this.battle.enemyTeam.update()
    }

    init(resolve) {
        this[this.event.type](resolve)
    }
}