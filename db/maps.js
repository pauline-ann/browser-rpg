// object containing all the different maps within game
window.OverworldMaps = {
    DemoRoom: {
        id: "DemoRoom",
        lowerSrc: "/db/images/maps/DemoLower.png", // path to image that we want to load
        upperSrc: "/db/images/maps/DemoUpper.png",
        configObjects: {
            hero: {
                type: "Person",
                x: utils.withGrid(5),
                y: utils.withGrid(6),
                isPlayerControlled: true
            },
            npc1: {
                type: "Person",
                x: utils.withGrid(7),
                y: utils.withGrid(9),
                src: "/db/images/characters/people/npc1.png",
                behaviorLoop: [
                    { type: "stand", direction: "left", time: 100 },
                    { type: "stand", direction: "up", time: 100 },
                    { type: "stand", direction: "right", time: 100 },
                    { type: "stand", direction: "down", time: 100 }
                ],
                talking: [
                    // each object is a scenario
                    {
                        required: ["TALKED_TO_ERIO"], // this scenario only runs if required story flags are true. can have multiple.
                        events: [
                            { type: "textMessage", text: "Isn't Erio the coolest?", faceHero: "npc1" }
                        ]
                    },
                    {
                        events: [
                            { type: "textMessage", text: "BETH: I'm going to crush you!", faceHero: "npc1" },
                            { type: "battle", enemyId: "beth" },
                            { type: "addStoryFlag", flag: "DEFEATED_BETH" }, // receive this story flag if battle is won
                            { type: "textMessage", text: "BETH: Hey that wasn't nice..." },
                        ]
                    }
                ]
            },
            npc2: {
                type: "Person",
                x: utils.withGrid(8),
                y: utils.withGrid(5),
                src: "/db/images/characters/people/erio.png",
                behaviorLoop: [
                    { type: "stand", direction: "down", time: 3000 },
                    { type: "stand", direction: "left", time: 2000 },
                    { type: "stand", direction: "down", time: 3000 },
                    { type: "stand", direction: "right", time: 2000 },
                ],
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "ERIO: Ahahaaaaaaa", faceHero: "npc2" },
                            { type: "addStoryFlag", flag: "TALKED_TO_ERIO" }
                        ]
                    }
                ]
            },
            pizzaStone: {
                type: "PizzaStone",
                x: utils.withGrid(2),
                y: utils.withGrid(7),
                storyFlag: "USED_PIZZA_STONE",
                pizzas: ["v001", "f001"] // can make it so that they have different options for crafting
            }
        },
        walls: {
            [utils.asGridCoord(7, 6)]: true, // "7,6": true
            [utils.asGridCoord(8, 6)]: true,
            [utils.asGridCoord(7, 7)]: true,
            [utils.asGridCoord(8, 7)]: true,
            [utils.asGridCoord(1, 3)]: true,
            [utils.asGridCoord(2, 3)]: true,
            [utils.asGridCoord(3, 3)]: true,
            [utils.asGridCoord(4, 3)]: true,
            [utils.asGridCoord(5, 3)]: true,
            [utils.asGridCoord(7, 3)]: true,
            [utils.asGridCoord(6, 4)]: true,
            [utils.asGridCoord(8, 4)]: true,
            [utils.asGridCoord(9, 3)]: true,
            [utils.asGridCoord(10, 3)]: true,
            [utils.asGridCoord(0, 4)]: true,
            [utils.asGridCoord(0, 5)]: true,
            [utils.asGridCoord(0, 6)]: true,
            [utils.asGridCoord(0, 7)]: true,
            [utils.asGridCoord(0, 8)]: true,
            [utils.asGridCoord(0, 9)]: true,
            [utils.asGridCoord(11, 4)]: true,
            [utils.asGridCoord(11, 5)]: true,
            [utils.asGridCoord(11, 6)]: true,
            [utils.asGridCoord(11, 7)]: true,
            [utils.asGridCoord(11, 8)]: true,
            [utils.asGridCoord(11, 9)]: true,
            [utils.asGridCoord(11, 10)]: true,
            [utils.asGridCoord(1, 10)]: true,
            [utils.asGridCoord(2, 10)]: true,
            [utils.asGridCoord(3, 10)]: true,
            [utils.asGridCoord(4, 10)]: true,
            [utils.asGridCoord(6, 10)]: true,
            [utils.asGridCoord(7, 10)]: true,
            [utils.asGridCoord(8, 10)]: true,
            [utils.asGridCoord(9, 10)]: true,
            [utils.asGridCoord(10, 10)]: true,
        },
        cutsceneSpaces: {
            [utils.asGridCoord(7, 4)]: [
                {
                    events: [
                        { who: "npc2", type: "walk", direction: "left" },
                        { who: "npc2", type: "stand", direction: "up", time: 500 },
                        { type: "textMessage", text: "ERIO: Hey, get outta there!" },
                        { who: "npc2", type: "walk", direction: "right" },
                        { who: "npc2", type: "stand", direction: "left", time: 500 },
                        { who: "hero", type: "walk", direction: "down" },
                        { who: "npc2", type: "stand", direction: "down" },
                        { who: "hero", type: "walk", direction: "left" },
                    ]
                }
            ],
            [utils.asGridCoord(5, 10)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "DemoRoom",
                            x: utils.withGrid(7),
                            y: utils.withGrid(4),
                            direction: "down"
                        }
                    ]
                }
            ]
        }
    },
    Street: {
        id: "Street",
        lowerSrc: "/db/images/maps/StreetLower.png",
        upperSrc: "/db/images/maps/StreetUpper.png",
        configObjects: {
            hero: {
                type: "Person",
                x: utils.withGrid(18),
                y: utils.withGrid(12),
                isPlayerControlled: true
            },
            // TODO add more npc
        },
        walls: {
            // TODO add walls
        },
        cutsceneSpaces: {
            [utils.asGridCoord(5, 9)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "Tony",
                            x: utils.withGrid(6),
                            y: utils.withGrid(12),
                            direction: "up"
                        }
                    ]
                }
            ],
            [utils.asGridCoord(29, 9)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "Shop",
                            x: utils.withGrid(5),
                            y: utils.withGrid(12),
                            direction: "up"
                        }
                    ]
                }
            ],
            [utils.asGridCoord(25, 5)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "North",
                            x: utils.withGrid(7),
                            y: utils.withGrid(16),
                            direction: "up"
                        }
                    ]
                }
            ]
        }
    },
    Tony: {
        id: "Tony",
        lowerSrc: "/db/images/maps/DiningRoomLower.png",
        upperSrc: "/db/images/maps/DiningRoomUpper.png",
        configObjects: {
            hero: {
                type: "Person",
                isPlayerControlled: true,
                x: utils.withGrid(5),
                y: utils.withGrid(5)
            },
            // TODO add npc
        },
        walls: {
            // TODO add walls
        },
        cutsceneSpaces: {
            [utils.asGridCoord(7, 3)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "Kitchen",
                            x: utils.withGrid(5),
                            y: utils.withGrid(10),
                            direction: "up"
                        }
                    ]
                }
            ],
            [utils.asGridCoord(6, 12)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "Street",
                            x: utils.withGrid(5),
                            y: utils.withGrid(9),
                            direction: "down"
                        }
                    ]
                }
            ]
        }
    },
    Kitchen: {
        id: "Kitchen",
        lowerSrc: "/db/images/maps/KitchenLower.png",
        upperSrc: "/db/images/maps/KitchenUpper.png",
        configObjects: {
            hero: {
                type: "Person",
                isPlayerControlled: true,
                x: utils.withGrid(5),
                y: utils.withGrid(5)
            },
            npc3: {
                type: "Person",
                x: utils.withGrid(9),
                y: utils.withGrid(6),
                src: "/db/images/characters/people/npc3.png",
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "NPC3: You made it!", faceHero: "npc3" }
                        ]
                    }
                ]
            },
            npc4: {
                type: "Person",
                x: utils.withGrid(10),
                y: utils.withGrid(8),
                src: "/db/images/characters/people/npc4.png",
            },
        },
        walls: {
            // TODO add walls
        },
        cutsceneSpaces: {
            [utils.asGridCoord(5, 10)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "Tony",
                            x: utils.withGrid(7),
                            y: utils.withGrid(3),
                            direction: "down"
                        }
                    ]
                }]
        }
    },
    Shop: {
        id: "Shop",
        lowerSrc: "/db/images/maps/PizzaShopLower.png",
        upperSrc: "/db/images/maps/PizzaShopUpper.png",
        configObjects: {
            hero: {
                type: "Person",
                isPlayerControlled: true,
                x: utils.withGrid(5),
                y: utils.withGrid(5)
            },
            // TODO add npc
        },
        walls: {
            // TODO add walls
        },
        cutsceneSpaces: {
            [utils.asGridCoord(5, 12)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "Street",
                            x: utils.withGrid(29),
                            y: utils.withGrid(9),
                            direction: "down"
                        }
                    ]
                }]
        }
    },
    North: {
        id: "North",
        lowerSrc: "/db/images/maps/StreetNorthLower.png",
        upperSrc: "/db/images/maps/StreetNorthUpper.png",
        configObjects: {
            hero: {
                type: "Person",
                isPlayerControlled: true,
                x: utils.withGrid(5),
                y: utils.withGrid(5)
            },
            // TODO add npc
        },
        walls: {
            // TODO add walls
        },
        cutsceneSpaces: {
            [utils.asGridCoord(7, 16)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "Street",
                            x: utils.withGrid(25),
                            y: utils.withGrid(5),
                            direction: "down"
                        }
                    ]
                }
            ],
            [utils.asGridCoord(7, 5)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "Green",
                            x: utils.withGrid(5),
                            y: utils.withGrid(12),
                            direction: "up"
                        }
                    ]
                }
            ]
        }
    },
    Green: {
        id: "Green",
        lowerSrc: "/db/images/maps/GreenKitchenLower.png",
        upperSrc: "/db/images/maps/GreenKitchenUpper.png",
        configObjects: {
            hero: {
                type: "Person",
                isPlayerControlled: true,
                x: utils.withGrid(5),
                y: utils.withGrid(5)
            },
            // TODO add npc
        },
        walls: {
            // TODO add walls
        },
        cutsceneSpaces: {
            [utils.asGridCoord(5, 12)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "North",
                            x: utils.withGrid(7),
                            y: utils.withGrid(5),
                            direction: "down"
                        }
                    ]
                }]
        }
    }
}
