class PlayerState {
    constructor() {
        this.pizzas = {
            "p1": {
                id: "s001", // pizza id from /content/pizzas.js
                hp: 30,
                maxHp: 50,
                xp: 90,
                maxXp: 100,
                level: 1,
                status: { type: "saucy" }
            },
            "p2": {
                id: "v001",
                hp: 30,
                maxHp: 50,
                xp: 75,
                maxXp: 100,
                level: 1,
                status: null
            }
        }
        this.lineup = ["p1", "p2"], // TODO adjust order in menu later
            this.items = [
                { actionId: "item_recoverHp", instanceId: "item1" },
                { actionId: "item_recoverHp", instanceId: "item2" },
                { actionId: "item_recoverHp", instanceId: "item3" },
            ]
    }
}

window.playerState = new PlayerState()