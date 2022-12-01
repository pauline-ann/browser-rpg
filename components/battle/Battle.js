class Battle {
    constructor({ enemy, onComplete }) {
        this.enemy = enemy
        this.onComplete = onComplete
        this.combatants = {}
        this.activeCombatants = {
            // player: "player1",
            // enemy: "enemy1",
            player: null,
            enemy: null
        }

        // dynamically add Player team
        window.playerState.lineup.forEach(id => {
            this.addCombatant(id, "player", window.playerState.pizzas[id])
        })

        // dynamically add Enemy team
        Object.keys(this.enemy.pizzas).forEach(id => {
            this.addCombatant("e_" + id, "enemy", this.enemy.pizzas[id])
        })

        // populated by what combatants have in their inventory
        this.items = [
            { actionId: "item_recoverStatus", instanceId: "p1", team: "player" },
            { actionId: "item_recoverStatus", instanceId: "p2", team: "player" },
            { actionId: "item_recoverStatus", instanceId: "p3", team: "enemy" },
            { actionId: "item_recoverHp", instanceId: "p4", team: "player" },
        ]
    }

    // add combatants to respective teams
    addCombatant(id, team, pizzaConfig) {
        this.combatants[id] = new Combatant({
            ...Pizzas[pizzaConfig.id],
            ...pizzaConfig,
            team,
            isPlayerControlled: team === "player"
        }, this)

        // populate first active pizza
        this.activeCombatants[team] = this.activeCombatants[team] || id
    }

    createElement() {
        this.element = document.createElement("div")
        this.element.classList.add("Battle")
        this.element.innerHTML = (`
        <div class="Battle_hero">
            <img src="${'/images/characters/people/hero.png'}" alt="Hero" />
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
        this.enemyTeam = new Team("enemy", "Bully") // TODO make dynamic

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
            }
        })

        this.turnCycle.init()
    }
}