class PlayerState {
    constructor() {
        this.pizzas = {
            "p1": {
                pizzaId: "s001", // pizza id from /content/pizzas.js
                hp: 30,
                maxHp: 50,
                xp: 90,
                maxXp: 100,
                level: 1,
                status: { type: "saucy" }
            },
            "p2": {
                pizzaId: "v001",
                hp: 30,
                maxHp: 50,
                xp: 75,
                maxXp: 100,
                level: 1,
                status: null
            },
            "p3": {
                pizzaId: "f001",
                hp: 30,
                maxHp: 50,
                xp: 75,
                maxXp: 100,
                level: 1,
                status: null
            }
        }
        this.lineup = ["p1", "p2"]
        this.items = [
            { actionId: "item_recoverHp", instanceId: "item1" },
            { actionId: "item_recoverHp", instanceId: "item2" },
            { actionId: "item_recoverHp", instanceId: "item3" }
        ]
        // use these flags to test game throughout different points of story
        // test different scenarios
        this.storyFlags = {}
    }

    swapLineup(oldId, newId) {
        const oldIndex = this.lineup.indexOf(oldId)
        this.lineup[oldIndex] = newId
        utils.emitEvent("LineupChanged")
    }

    // move object with specific id to the front of the lineup
    moveToFront(newId) {
        this.lineup = this.lineup.filter(id => id !== newId)
        this.lineup.unshift(newId)
        utils.emitEvent("LineupChanged")
    }
}

window.playerState = new PlayerState()