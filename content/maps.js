// object containing all the different maps within game
window.OverworldMaps = {
    DemoRoom: {
        lowerSrc: "/images/maps/DemoLower.png", // path to image that we want to load
        upperSrc: "/images/maps/DemoUpper.png",
        gameObjects: {
            hero: new Person({
                x: utils.withGrid(5),
                y: utils.withGrid(6),
                isPlayerControlled: true
            }),
            npc1: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(9),
                src: "/images/characters/people/npc1.png",
                behaviorLoop: [
                    { type: "stand", direction: "left", time: 800 },
                    { type: "stand", direction: "up", time: 800 },
                    { type: "stand", direction: "right", time: 1200 },
                    { type: "stand", direction: "up", time: 800 },
                ],
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "BETH: Um...hi?", faceHero: "npc1" },
                            { type: "textMessage", text: "BETH: You're so random" },
                            { type: "battle", enemyId: "beth" },
                            { type: "textMessage", text: "BETH: Ugh..." }
                        ]
                    }
                ]
            }),
            npc2: new Person({
                x: utils.withGrid(8),
                y: utils.withGrid(5),
                src: "/images/characters/people/erio.png",
                // behaviorLoop: [
                //   { type: "walk", direction: "left" },
                //   { type: "stand", direction: "up", time: 800 },
                //   { type: "walk", direction: "up" },
                //   { type: "walk", direction: "right" },
                //   { type: "walk", direction: "down" }
                // ],
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "ERIO: Haaaahaaa..", faceHero: "npc2" },
                            { type: "textMessage", text: "ERIO: Ahaaha" },
                            { type: "battle", enemyId: "erio" }
                        ]
                    }
                ]
            }),
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
                        { type: "changeMap", map: "Kitchen" }
                    ]
                }
            ]
        }
    },
    Kitchen: {
        lowerSrc: "/images/maps/KitchenLower.png",
        upperSrc: "/images/maps/KitchenUpper.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(5),
                y: utils.withGrid(5),
            }),
            npc3: new Person({
                x: utils.withGrid(9),
                y: utils.withGrid(6),
                src: "/images/characters/people/npc3.png",
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "NPC3: You made it!", faceHero: "npc3" }
                        ]
                    }
                ]
            }),
            npc4: new Person({
                x: utils.withGrid(10),
                y: utils.withGrid(8),
                src: "/images/characters/people/npc4.png",
            }),
        },
    },
}
