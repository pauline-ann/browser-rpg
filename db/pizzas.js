window.PizzaTypes = {
    spicy: "spicy",
    veggie: "veggie",
    fungi: "fungi"
}

window.Pizzas = {
    "s001": {
        name: "Slice Samurai",
        description: "The highest ranking social caste of the Pizza Period.",
        type: PizzaTypes.spicy,
        src: "/db/images/characters/pizzas/s001.png",
        icon: "/db/images/icons/spicy.png",
        actions: ["saucyStatus"] // id of battle actions
    },
    "s002": {
        name: "Bacon Brigade",
        description: "A salty warrior who fears nothing.",
        type: PizzaTypes.spicy,
        src: "/db/images/characters/pizzas/s002.png",
        icon: "/db/images/icons/spicy.png",
        actions: ["saucyStatus"]
    },
    "v001": {
        name: "Spooky Kale",
        description: "This pizza is super-natural!",
        type: PizzaTypes.veggie,
        src: "/db/images/characters/pizzas/v001.png",
        icon: "/db/images/icons/veggie.png",
        actions: ["clumsyStatus"]
    },
    "v002": {
        name: "Totally Tofu",
        description: "Never soy never.",
        type: PizzaTypes.veggie,
        src: "/db/images/characters/pizzas/v002.png",
        icon: "/db/images/icons/veggie.png",
        actions: ["clumsyStatus"]
    },
    "f001": {
        name: "Hello Portobello",
        description: "A shroom with a view.",
        type: PizzaTypes.fungi,
        src: "/db/images/characters/pizzas/f001.png",
        icon: "/db/images/icons/fungi.png",
        actions: ["saucyStatus"]
    },
    "f002": {
        name: "Shroom! Shroom!",
        description: "Now that's a fast pizza.",
        type: PizzaTypes.fungi,
        src: "/db/images/characters/pizzas/f002.png",
        icon: "/db/images/icons/fungi.png",
        actions: ["clumsyStatus"]
    }
}