class Battle {
    constructor() {
        this.combatants = {
            // TODO make dynamic
            "player1": new Combatant({
                ...Pizzas.s001, // copy info about pizza,
                team: "player", // player || enemy
                hp: 50,
                maxHp: 50,
                xp: 0,
                maxXp: 100,
                level: 1,
                status: {
                    type: "saucy",
                    expiresIn: 3
                }
            }, this),
            "enemy1": new Combatant({
                ...Pizzas.v001, // copy info about pizza,
                team: "enemy", // player || enemy
                hp: 50,
                maxHp: 50,
                xp: 20,
                maxXp: 100,
                level: 1,
                status: {
                    type: "saucy",
                    expiresIn: 3
                }
            }, this),
            "enemy2": new Combatant({
                ...Pizzas.f001, // copy info about pizza,
                team: "enemy", // player || enemy
                hp: 50,
                maxHp: 50,
                xp: 30,
                maxXp: 100,
                level: 1,
                status: {
                    type: "saucy",
                    expiresIn: 3
                }
            }, this)
        }
        this.activeCombatants = {
            player: "player1",
            enemy: "enemy2",
        }
    }

    createElement() {
        this.element = document.createElement("div")
        this.element.classList.add("Battle")
        this.element.innerHTML = (`
        <div class="Battle_hero">
            <img src="${'/images/characters/people/hero.png'}" alt="Hero" />
        </div>
        <div class="Battle_enemy">
            <img src="${'/images/characters/people/npc4.png'}" alt="Enemy" />
        </div>
        `)
    }

    init(container) {
        this.createElement()
        container.appendChild(this.element)

        Object.keys(this.combatants).forEach(key => {
            let combatant = this.combatants[key]
            combatant.id = key
            combatant.init(this.element)
        })

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