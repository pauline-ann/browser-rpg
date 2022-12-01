window.Enemies = {
    "erio": {
        name: "Erio",
        src: "/images/characters/people/erio.png",
        pizzas: {
            "a": {
                id: "s001",
                maxHp: 50,
                level: 1
                // attackBonus: 20000 etc.
                // can configure behavior here
            },
            "b": {
                id: "s002",
                maxHp: 50,
                level: 1
            }
        },
        textMessages: {
            battleWin: "What??! How?",
            battleLoss: "Sowwee."
        }
    },
    "beth": {
        name: "Beth",
        src: "/images/characters/people/npc1.png",
        pizzas: {
            "a": {
                id: "f001",
                hp: 1, // TODO for testing purposes
                maxHp: 50,
                level: 1
            }
        },
        textMessages: {
            battleWin: "Aw man..",
            battleLoss: "Better luck next time."
        }
    }
}