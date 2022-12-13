class Battle {
    constructor({ enemy, location, onComplete }) {
        this.combatants = {}
        this.activeCombatants = {
            player: null, // "player1"
            enemy: null // "enemy1"
        }
        this.enemy = enemy
        this.location = location || ""
        this.onComplete = onComplete
        this.items = []

        // dynamically add Player team
        window.playerState.lineup.forEach(id => {
            this.addCombatant(id, "player", window.playerState.pizzas[id])
        })

        // dynamically add Enemy team
        Object.keys(this.enemy.pizzas).forEach(id => {
            this.addCombatant("e_" + id, "enemy", this.enemy.pizzas[id])
        })

        // populate initial items list from Player State
        window.playerState.items.forEach(item => {
            this.items.push({
                ...item,
                team: "player"
            })
        })

        this.usedInstanceIds = {}
    }

    // add combatants to respective teams
    addCombatant(id, team, config) {
        this.combatants[id] = new Combatant({
            ...Pizzas[config.pizzaId],
            ...config,
            team,
            isPlayerControlled: team === "player"
        }, this)

        if (this.combatants[id].hp > 0) {
            // populate first active pizza if pizza is alive
            this.activeCombatants[team] = this.activeCombatants[team] || id
        }
    }

    createElement() {
        this.element = document.createElement("div")
        this.element.classList.add("Battle")
        this.element.classList.add(`Battle_${this.location}`)
        this.element.innerHTML = (`
        <div class="Battle_hero">
            <img src="${'/db/images/characters/people/hero.png'}" alt="Hero" />
        </div>
        <div class="Battle_enemy">
            <img src="${this.enemy.src}" alt="${this.enemy.name}" />
        </div>
        `)
    }

    init(container) {
        this.createElement()
        container.appendChild(this.element)

        this.playerTeam = new Team("player", "Hero")
        this.enemyTeam = new Team("enemy", "Bully")

        Object.keys(this.combatants).forEach(key => {
            let combatant = this.combatants[key]
            combatant.id = key
            combatant.init(this.element)

            // add to correct team
            if (combatant.team === "player") {
                this.playerTeam.combatants.push(combatant)
            } else if (combatant.team === "enemy") {
                this.enemyTeam.combatants.push(combatant)
            }
        })

        this.playerTeam.init(this.element)
        this.enemyTeam.init(this.element)

        this.turnCycle = new TurnCycle({
            battle: this,
            onNewEvent: event => {
                return new Promise(resolve => {
                    const battleEvent = new BattleEvent(event, this)
                    battleEvent.init(resolve)
                })
            },
            onBattleEnd: winner => {
                // update Player State with new values
                // there are pros to reading data directly from battle instead of going off Player State
                if (winner === "player") {
                    const playerState = window.playerState

                    Object.keys(playerState.pizzas).forEach(pizzaId => {
                        const playerStatePizza = playerState.pizzas[pizzaId]
                        const combatant = this.combatants[pizzaId]
                        if (combatant) {
                            playerStatePizza.hp = combatant.hp
                            playerStatePizza.xp = combatant.xp
                            playerStatePizza.maxXp = combatant.maxXp
                            playerStatePizza.level = combatant.level
                        }
                    })

                    // get rid of items used during battle
                    playerState.items = playerState.items.filter(item => {
                        return !this.usedInstanceIds[item.instanceId]
                    })

                    // send signal to update
                    utils.emitEvent("PlayerStateUpdated")
                }

                this.element.remove() // remove battle elements
                this.onComplete(winner === "player") // go back to Overworld
            }
        })

        this.turnCycle.init()
    }
}