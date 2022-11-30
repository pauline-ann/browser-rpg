window.PizzaTypes = {
    normal: "normal",
    spicy: "spicy",
    veggie: "veggie",
    fungi: "fungi",
    chill: "chill"
}

// TODO make more complex
window.Pizzas = {
    "s001": {
        name: "Slice Samurai",
        description: "This is a description",
        type: PizzaTypes.spicy,
        src: "/images/characters/pizzas/s001.png",
        icon: "/images/icons/spicy.png",
        actions: ["saucyStatus", "clumsyStatus", "damage1"] // id of battle actions
    },
    "s002": {
        name: "Bacon Brigade",
        description: "A salty warrior who fears nothing.",
        type: PizzaTypes.spicy,
        src: "/images/characters/pizzas/s002.png",
        icon: "/images/icons/spicy.png",
        actions: ["saucyStatus", "clumsyStatus", "damage1"] // id of battle actions
    },
    "v001": {
        name: "Call Me Kale",
        description: "This is a description",
        type: PizzaTypes.veggie,
        src: "/images/characters/pizzas/v001.png",
        icon: "/images/icons/veggie.png",
        actions: ["damage1"]
    },
    "f001": {
        name: "Portobello Express",
        description: "This is a description",
        type: PizzaTypes.fungi,
        src: "/images/characters/pizzas/f001.png",
        icon: "/images/icons/fungi.png",
        actions: ["damage1"]
    }
}