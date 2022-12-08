window.Enemies = {
    "erio": {
        name: "Erio",
        src: "/db/images/characters/people/erio.png",
        pizzas: {
            "a": {
                pizzaId: "s001",
                maxHp: 30,
                level: 1
                // attackBonus: 20000 etc.
                // can configure behavior here
            },
            "b": {
                pizzaId: "s002",
                maxHp: 30,
                level: 1
            }
        },
        textMessages: {
            battleWin: "What??! How?",
            battleLoss: "Sowwee."
        }
    },
    "regina": {
        name: "Regina",
        src: "/db/images/characters/people/regina.png",
        pizzas: {
            "a": {
                pizzaId: "f001",
                maxHp: 30,
                level: 1
            }
        },
        textMessages: {
            battleWin: "Aw man..",
            battleLoss: "Better luck next time."
        }
    }
}