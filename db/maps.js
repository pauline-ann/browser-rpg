// object containing all the different maps within game
window.OverworldMaps = {
  Demo: {
    id: "Demo",
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
        src: "/db/images/characters/people/regina.png",
        behaviorLoop: [
          { type: "walk", direction: "left" },
          { type: "walk", direction: "up" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "down" },
        ],
        talking: [
          // each object is a scenario
          {
            required: ["TALKED_TO_MOUSE"], // this scenario only runs if required story flags are true. can have multiple.
            events: [
              {
                type: "textMessage",
                text: "Isn't that dude the coolest?",
                faceHero: "npc1",
              },
            ],
          },
          {
            events: [
              {
                type: "textMessage",
                text: "I'm going to crush you!",
                faceHero: "npc1",
              },
              { type: "battle", enemyId: "npc1", locationId: "Demo" },
              { type: "addStoryFlag", flag: "DEFEATED_REGINA" }, // receive this story flag if battle is won
              { type: "textMessage", text: "Hey that wasn't nice..." },
            ],
          },
        ],
      },
      npc2: {
        type: "Person",
        x: utils.withGrid(8),
        y: utils.withGrid(5),
        src: "/db/images/characters/people/mouse.png",
        behaviorLoop: [
          { type: "stand", direction: "down", time: 3000 },
          { type: "stand", direction: "left", time: 2000 },
          { type: "stand", direction: "down", time: 3000 },
          { type: "stand", direction: "right", time: 2000 },
        ],
        talking: [
          {
            events: [
              {
                type: "textMessage",
                text: "Ahahaaaaaaa",
                faceHero: "npc2",
              },
              { type: "addStoryFlag", flag: "TALKED_TO_MOUSE" },
            ],
          },
        ],
      },
      pizzaStone1: {
        type: "PizzaStone",
        x: utils.withGrid(2),
        y: utils.withGrid(7),
        storyFlag: "USED_PIZZA_STONE1",
        pizzas: ["s001", "s002"],
      },
      pizzaStone2: {
        type: "PizzaStone",
        x: utils.withGrid(3),
        y: utils.withGrid(7),
        storyFlag: "USED_PIZZA_STONE2",
        pizzas: ["v001", "v002"],
      },
      pizzaStone3: {
        type: "PizzaStone",
        x: utils.withGrid(4),
        y: utils.withGrid(7),
        storyFlag: "USED_PIZZA_STONE3",
        pizzas: ["f001", "f002"],
      }
    },
    walls: {
      [utils.asGridCoord(7, 6)]: true,
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
            { type: "textMessage", text: "Hey, get outta there!" },
            { who: "npc2", type: "walk", direction: "right" },
            { who: "npc2", type: "stand", direction: "left", time: 500 },
            { who: "hero", type: "walk", direction: "down" },
            { who: "npc2", type: "stand", direction: "down" },
            { who: "hero", type: "walk", direction: "left" },
          ],
        },
      ],
      [utils.asGridCoord(5, 10)]: [
        {
          events: [
            {
              type: "changeMap",
              map: "Demo",
              x: utils.withGrid(7),
              y: utils.withGrid(4),
              direction: "down",
            },
          ],
        },
      ],
    },
  },
  Shop: {
    id: "Shop",
    lowerSrc: "/db/images/maps/PizzaShopLower.png",
    upperSrc: "/db/images/maps/PizzaShopUpper.png",
    configObjects: {
      hero: {
        type: "Person",
        isPlayerControlled: true,
        x: utils.withGrid(7),
        y: utils.withGrid(5),
      },
      cypher: {
        type: "Person",
        x: utils.withGrid(3),
        y: utils.withGrid(5),
        src: "/db/images/characters/people/cypher.png",
        behaviorLoop: [
          { type: "stand", direction: "down", time: 5000 },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "up" },
          { type: "stand", direction: "up", time: 3000 },
          { type: "walk", direction: "down" },
          { type: "walk", direction: "left" }
        ],
        talking: [
          {
            required: ["DEFEATED_GAME"],
            events: [
              {
                type: "textMessage",
                text: "CYPHER: You beat all the chefs? You saved our town! Thank you, hero.",
                faceHero: "cypher"
              },
              {
                type: "restPizzas"
              },
              {
                type: "textMessage",
                text: "CYPHER: There, your pizzas are good as new. It's the least I can do for everything you've done!",
                faceHero: "cypher"
              },
            ],
          },
          {
            required: ["EMBARKED_ON_JOURNEY"],
            events: [
              {
                type: "textMessage",
                text: "CYPHER: Your pizzas look like they need some extra toppings!",
                faceHero: "cypher",
              },
              {
                type: "restPizzas"
              },
              {
                type: "textMessage",
                text: "CYPHER: There you go, good as new!!",
                faceHero: "cypher",
              },
            ],
          },
          {
            required: ["QUEST_PIZZA_STONE", "USED_PIZZA_STONE1", "USED_PIZZA_STONE2", "USED_PIZZA_STONE3"],
            events: [
              {
                type: "textMessage",
                text: "CYPHER: Smells delicious! Great job baking those pizzas. Now you'll be able to protect yourself from the pizza overlords.",
                faceHero: "cypher",
              },
              { type: "removeStoryFlag", flag: "QUEST_PIZZA_STONE" },
              {
                type: "textMessage",
                text: "CYPHER: If you defeat them all, you'll save our town from being conquered by these pizza maniacs!",
                faceHero: "cypher",
              },
              {
                type: "textMessage",
                text: "CYPHER: Before you leave, I must teach you how to use your pizzas in battle.",
                faceHero: "cypher",
              },
              {
                type: "textMessage",
                text: "CYPHER: Let's do this!",
                faceHero: "cypher",
              },
              { type: "battle", enemyId: "cypher", locationId: "Shop" },
              {
                type: "textMessage",
                text: "CYPHER: You're ready, pizza hero.",
                faceHero: "cypher",
              },
              {
                type: "textMessage",
                text: "CYPHER: Now go out there and show those pizza lords who's boss! You're our only hope in saving our town from pizza tyranny.",
                faceHero: "cypher",
              },
              {
                type: "textMessage",
                text: "CYPHER: If you run into trouble and your pizzas need a rest, come talk to me and I can bring your pizzas back to good health!",
                faceHero: "cypher",
              },
            ],
          },
          {
            required: ["USED_PIZZA_STONE1", "USED_PIZZA_STONE2", "USED_PIZZA_STONE3"],
            events: [
              {
                type: "textMessage",
                text: "CYPHER: Be safe out there!",
                faceHero: "cypher"
              }
            ],
          },
          {
            required: ["QUEST_PIZZA_STONE"],
            events: [
              {
                type: "textMessage",
                text: "CYPHER: You can find the pizza stones right by the entrance.",
                faceHero: "cypher",
              },
            ],
          },
          {
            events: [
              {
                type: "textMessage",
                text: "CYPHER: Good job on your first day!",
                faceHero: "cypher",
              },
            ],
          },
        ],
      },
      pizzaStone1: {
        type: "PizzaStone",
        x: utils.withGrid(7),
        y: utils.withGrid(10),
        storyFlag: "USED_PIZZA_STONE1",
        pizzas: ["s001", "s002"],
      },
      pizzaStone2: {
        type: "PizzaStone",
        x: utils.withGrid(8),
        y: utils.withGrid(10),
        storyFlag: "USED_PIZZA_STONE2",
        pizzas: ["v001", "v002"],
      },
      pizzaStone3: {
        type: "PizzaStone",
        x: utils.withGrid(9),
        y: utils.withGrid(10),
        storyFlag: "USED_PIZZA_STONE3",
        pizzas: ["f001", "f002"],
      },
      npc8: {
        type: "Person",
        x: utils.withGrid(9),
        y: utils.withGrid(8),
        src: "/db/images/characters/people/mouse.png",
        behaviorLoop: [
          { type: "stand", direction: "left" }
        ],
        talking: [
          {
            events: [
              {
                type: "textMessage",
                text: "Ooooh knick knacks, my favorite!",
                faceHero: "npc8",
              },
            ],
          },
        ],
      }
    },
    walls: {
      [utils.asGridCoord(1, 3)]: true,
      [utils.asGridCoord(3, 3)]: true,
      [utils.asGridCoord(4, 3)]: true,
      [utils.asGridCoord(5, 3)]: true,
      [utils.asGridCoord(6, 3)]: true,
      [utils.asGridCoord(7, 3)]: true,
      [utils.asGridCoord(8, 3)]: true,
      [utils.asGridCoord(10, 3)]: true,
      [utils.asGridCoord(0, 4)]: true,
      [utils.asGridCoord(0, 5)]: true,
      [utils.asGridCoord(0, 6)]: true,
      [utils.asGridCoord(0, 7)]: true,
      [utils.asGridCoord(0, 8)]: true,
      [utils.asGridCoord(0, 9)]: true,
      [utils.asGridCoord(0, 10)]: true,
      [utils.asGridCoord(0, 11)]: true,
      [utils.asGridCoord(11, 4)]: true,
      [utils.asGridCoord(11, 5)]: true,
      [utils.asGridCoord(11, 6)]: true,
      [utils.asGridCoord(11, 7)]: true,
      [utils.asGridCoord(11, 8)]: true,
      [utils.asGridCoord(11, 9)]: true,
      [utils.asGridCoord(11, 10)]: true,
      [utils.asGridCoord(11, 11)]: true,
      [utils.asGridCoord(1, 12)]: true,
      [utils.asGridCoord(2, 12)]: true,
      [utils.asGridCoord(3, 12)]: true,
      [utils.asGridCoord(4, 12)]: true,
      [utils.asGridCoord(5, 13)]: true,
      [utils.asGridCoord(6, 12)]: true,
      [utils.asGridCoord(7, 12)]: true,
      [utils.asGridCoord(8, 12)]: true,
      [utils.asGridCoord(9, 12)]: true,
      [utils.asGridCoord(10, 12)]: true,
      [utils.asGridCoord(3, 8)]: true,
      [utils.asGridCoord(3, 9)]: true,
      [utils.asGridCoord(3, 10)]: true,
      [utils.asGridCoord(4, 8)]: true,
      [utils.asGridCoord(4, 9)]: true,
      [utils.asGridCoord(4, 10)]: true,
      [utils.asGridCoord(7, 8)]: true,
      [utils.asGridCoord(7, 9)]: true,
      [utils.asGridCoord(8, 8)]: true,
      [utils.asGridCoord(8, 9)]: true,
      [utils.asGridCoord(7, 6)]: true,
      [utils.asGridCoord(8, 6)]: true,
      [utils.asGridCoord(9, 6)]: true,
      [utils.asGridCoord(9, 5)]: true,
      [utils.asGridCoord(9, 4)]: true,
      [utils.asGridCoord(2, 4)]: true,
      [utils.asGridCoord(2, 5)]: true,
      [utils.asGridCoord(2, 6)]: true,
      [utils.asGridCoord(3, 6)]: true,
      [utils.asGridCoord(4, 6)]: true,
      [utils.asGridCoord(5, 6)]: true,
    },
    cutsceneSpaces: {
      [utils.asGridCoord(6, 6)]: [
        {
          required: ["START"],
          events: [
            { who: "cypher", type: "stand", direction: "right" },
            { who: "hero", type: "stand", direction: "left" },
            { type: "textMessage", text: "CYPHER: Wait, before you leave - you must learn of the dangers that lurk outside." },
            { who: "hero", type: "walk", direction: "up" },
            { who: "hero", type: "stand", direction: "left" },
            { type: "textMessage", text: "CYPHER: The pizza chefs running the restaurants in this town are trying to take over." },
            { type: "textMessage", text: "CYPHER: Their pizzas..... they have a life of their own." },
            { type: "textMessage", text: "CYPHER: To protect yourself, you must equip yourself with your own pizzas. You're lucky that I have pizza stones for you to use in this store!" },
            { type: "textMessage", text: "CYPHER: Using the pizza stones by the entrance, you can craft your own pizzas. Make sure to bake three so that you're extra prepared." },
            { type: "textMessage", text: "CYPHER: Talk to me again once you've received each pizza." },
            { type: "removeStoryFlag", flag: "START" },
            { type: "addStoryFlag", flag: "QUEST_PIZZA_STONE" }
          ],
        },
      ],
      [utils.asGridCoord(5, 12)]: [
        {
          required: ["QUEST_PIZZA_STONE"],
          events: [
            { who: "hero", type: "stand", direction: "up" },
            { type: "textMessage", text: "CYPHER: Hey, where are you going? You won't be safe out there without your pizzas!" },
            { who: "hero", type: "walk", direction: "up" },
          ],
        },
        {
          events: [
            {
              type: "changeMap",
              map: "Street",
              x: utils.withGrid(29),
              y: utils.withGrid(9),
              direction: "down",
            },
            { type: "addStoryFlag", flag: "EMBARKED_ON_JOURNEY" }
          ],
        },
      ]
    },
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
        isPlayerControlled: true,
      },
      npc3: {
        type: "Person",
        x: utils.withGrid(21),
        y: utils.withGrid(8),
        src: "/db/images/characters/people/regina.png",
        behaviorLoop: [
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "down" },
          { type: "walk", direction: "down" },
          { type: "walk", direction: "down" },
          { type: "walk", direction: "down" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "up" },
          { type: "walk", direction: "up" },
          { type: "walk", direction: "up" },
          { type: "walk", direction: "up" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
        ],
        talking: [
          {
            events: [
              {
                type: "textMessage",
                text: "I'm trying to get 10,000 steps in everyday. It's been challenging but building healthy habits is important!",
                faceHero: "npc3",
              }
            ],
          },
        ],
      },
      npc11: {
        type: "Person",
        x: utils.withGrid(24),
        y: utils.withGrid(9),
        src: "/db/images/characters/people/timmy.png",
        behaviorLoop: [
          { type: "stand", direction: "down" }
        ],
        talking: [
          {
            required: ["DEFEATED_GAME"],
            events: [
              {
                type: "textMessage",
                text: "You beat all those chefs?! You're bad ass!",
                faceHero: "npc11",
              }
            ],
          },
          {
            events: [
              {
                type: "textMessage",
                text: "Are you the hero that is fighting pizza tyranny? Please don't give up, we need you!",
                faceHero: "npc11",
              }
            ],
          }
        ],
      },
      johnny: {
        type: "Person",
        x: utils.withGrid(7),
        y: utils.withGrid(11),
        src: "/db/images/characters/people/johnny.png",
        behaviorLoop: [
          { type: "stand", direction: "down", time: 2000 },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "stand", direction: "down", time: 2000 },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" }
        ],
        talking: [
          {
            events: [
              {
                type: "textMessage",
                text: "JOHNNY: Hey..... is there a bathroom around here?",
                faceHero: "johnny",
              }
            ],
          },
        ],
      },
    },
    walls: {
      [utils.asGridCoord(3, 10)]: true,
      [utils.asGridCoord(3, 11)]: true,
      [utils.asGridCoord(3, 12)]: true,
      [utils.asGridCoord(3, 13)]: true,
      [utils.asGridCoord(3, 14)]: true,
      [utils.asGridCoord(3, 15)]: true,
      [utils.asGridCoord(3, 16)]: true,
      [utils.asGridCoord(3, 17)]: true,
      [utils.asGridCoord(3, 18)]: true,
      [utils.asGridCoord(4, 19)]: true,
      [utils.asGridCoord(5, 19)]: true,
      [utils.asGridCoord(6, 19)]: true,
      [utils.asGridCoord(7, 19)]: true,
      [utils.asGridCoord(8, 19)]: true,
      [utils.asGridCoord(9, 19)]: true,
      [utils.asGridCoord(10, 19)]: true,
      [utils.asGridCoord(11, 19)]: true,
      [utils.asGridCoord(12, 19)]: true,
      [utils.asGridCoord(13, 19)]: true,
      [utils.asGridCoord(14, 19)]: true,
      [utils.asGridCoord(15, 19)]: true,
      [utils.asGridCoord(16, 19)]: true,
      [utils.asGridCoord(17, 19)]: true,
      [utils.asGridCoord(18, 19)]: true,
      [utils.asGridCoord(19, 19)]: true,
      [utils.asGridCoord(20, 19)]: true,
      [utils.asGridCoord(21, 19)]: true,
      [utils.asGridCoord(22, 19)]: true,
      [utils.asGridCoord(23, 19)]: true,
      [utils.asGridCoord(24, 19)]: true,
      [utils.asGridCoord(25, 19)]: true,
      [utils.asGridCoord(26, 19)]: true,
      [utils.asGridCoord(27, 19)]: true,
      [utils.asGridCoord(28, 19)]: true,
      [utils.asGridCoord(29, 19)]: true,
      [utils.asGridCoord(30, 19)]: true,
      [utils.asGridCoord(31, 19)]: true,
      [utils.asGridCoord(32, 19)]: true,
      [utils.asGridCoord(33, 19)]: true,
      [utils.asGridCoord(34, 18)]: true,
      [utils.asGridCoord(34, 17)]: true,
      [utils.asGridCoord(34, 16)]: true,
      [utils.asGridCoord(34, 15)]: true,
      [utils.asGridCoord(34, 14)]: true,
      [utils.asGridCoord(34, 13)]: true,
      [utils.asGridCoord(34, 12)]: true,
      [utils.asGridCoord(34, 11)]: true,
      [utils.asGridCoord(34, 10)]: true,
      [utils.asGridCoord(33, 9)]: true,
      [utils.asGridCoord(32, 9)]: true,
      [utils.asGridCoord(31, 9)]: true,
      [utils.asGridCoord(30, 9)]: true,
      [utils.asGridCoord(29, 8)]: true,
      [utils.asGridCoord(28, 9)]: true,
      [utils.asGridCoord(28, 8)]: true,
      [utils.asGridCoord(27, 7)]: true,
      [utils.asGridCoord(26, 7)]: true,
      [utils.asGridCoord(26, 6)]: true,
      [utils.asGridCoord(26, 5)]: true,
      [utils.asGridCoord(25, 4)]: true,
      [utils.asGridCoord(24, 5)]: true,
      [utils.asGridCoord(24, 6)]: true,
      [utils.asGridCoord(24, 7)]: true,
      [utils.asGridCoord(23, 7)]: true,
      [utils.asGridCoord(22, 7)]: true,
      [utils.asGridCoord(21, 7)]: true,
      [utils.asGridCoord(20, 7)]: true,
      [utils.asGridCoord(19, 7)]: true,
      [utils.asGridCoord(18, 7)]: true,
      [utils.asGridCoord(17, 7)]: true,
      [utils.asGridCoord(16, 7)]: true,
      [utils.asGridCoord(15, 7)]: true,
      [utils.asGridCoord(14, 8)]: true,
      [utils.asGridCoord(13, 8)]: true,
      [utils.asGridCoord(12, 9)]: true,
      [utils.asGridCoord(11, 9)]: true,
      [utils.asGridCoord(10, 9)]: true,
      [utils.asGridCoord(9, 9)]: true,
      [utils.asGridCoord(8, 9)]: true,
      [utils.asGridCoord(7, 9)]: true,
      [utils.asGridCoord(6, 9)]: true,
      [utils.asGridCoord(5, 8)]: true,
      [utils.asGridCoord(4, 9)]: true,
      [utils.asGridCoord(5, 14)]: true,
      [utils.asGridCoord(6, 14)]: true,
      [utils.asGridCoord(7, 14)]: true,
      [utils.asGridCoord(8, 14)]: true,
      [utils.asGridCoord(16, 11)]: true,
      [utils.asGridCoord(16, 10)]: true,
      [utils.asGridCoord(16, 9)]: true,
      [utils.asGridCoord(17, 11)]: true,
      [utils.asGridCoord(17, 10)]: true,
      [utils.asGridCoord(17, 9)]: true,
      [utils.asGridCoord(18, 11)]: true,
      [utils.asGridCoord(19, 11)]: true,
      [utils.asGridCoord(25, 11)]: true,
      [utils.asGridCoord(25, 10)]: true,
      [utils.asGridCoord(25, 9)]: true,
      [utils.asGridCoord(26, 11)]: true,
      [utils.asGridCoord(26, 10)]: true,
      [utils.asGridCoord(26, 9)]: true,
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
              direction: "up",
            },
          ],
        },
      ],
      [utils.asGridCoord(29, 9)]: [
        {
          events: [
            {
              type: "changeMap",
              map: "Shop",
              x: utils.withGrid(5),
              y: utils.withGrid(12),
              direction: "up",
            },
          ],
        },
      ],
      [utils.asGridCoord(25, 5)]: [
        {
          events: [
            {
              type: "changeMap",
              map: "North",
              x: utils.withGrid(7),
              y: utils.withGrid(16),
              direction: "up",
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
        x: utils.withGrid(7),
        y: utils.withGrid(5),
      },
      npc4: {
        type: "Person",
        src: "/db/images/characters/people/hero.png",
        x: utils.withGrid(2),
        y: utils.withGrid(4),
        behaviorLoop: [
          { type: "stand", direction: "up" }
        ],
        talking: [
          {
            events: [
              {
                type: "textMessage",
                text: "They don't know my tummy hurts and I'm being so brave about it."
              }
            ],
          },
        ],
      },
      timmy: {
        type: "Person",
        x: utils.withGrid(5),
        y: utils.withGrid(5),
        src: "/db/images/characters/people/timmy.png",
        behaviorLoop: [
          { type: "stand", direction: "right", time: 1000 },
          { type: "walk", direction: "down" },
          { type: "walk", direction: "down" },
          { type: "walk", direction: "down" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "stand", direction: "up", time: 1000 },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "down" },
          { type: "stand", direction: "down", time: 1000 },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "up" },
          { type: "walk", direction: "up" },
          { type: "walk", direction: "up" },
          { type: "walk", direction: "right" },
          { type: "stand", direction: "up", time: 1000 },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "up" },
        ],
        talking: [
          {
            events: [
              {
                type: "textMessage",
                text: "TIMMY: Sorry, I'm really busy!",
                faceHero: "timmy",
              },
            ],
          },
        ],
      },
      npc5: {
        type: "Person",
        x: utils.withGrid(2),
        y: utils.withGrid(7),
        src: "/db/images/characters/people/mouse.png",
        behaviorLoop: [
          { type: "stand", direction: "right" }
        ],
        talking: [
          {
            events: [
              {
                type: "textMessage",
                text: "Mmmmmm, pizza. (He seems too focused on his pizza to notice you.)"
              }
            ],
          },
        ]
      },
      npc6: {
        type: "Person",
        x: utils.withGrid(9),
        y: utils.withGrid(10),
        src: "/db/images/characters/people/cypher.png",
        behaviorLoop: [
          { type: "stand", direction: "left" }
        ],
        talking: [
          {
            events: [
              {
                type: "textMessage",
                text: "I love pizza~ hehe",
                faceHero: "npc6",
              },
            ],
          },
        ],
      },
      npc7: {
        type: "Person",
        x: utils.withGrid(10),
        y: utils.withGrid(5),
        src: "/db/images/characters/people/regina.png",
        behaviorLoop: [
          { type: "stand", direction: "right" }
        ],
        talking: [
          {
            events: [
              {
                type: "textMessage",
                text: "Can I speak to your manager?",
                faceHero: "npc7",
              },
            ],
          },
        ],
      },
    },
    walls: {
      [utils.asGridCoord(1, 3)]: true,
      [utils.asGridCoord(2, 3)]: true,
      [utils.asGridCoord(3, 3)]: true,
      [utils.asGridCoord(4, 3)]: true,
      [utils.asGridCoord(5, 3)]: true,
      [utils.asGridCoord(6, 3)]: true,
      [utils.asGridCoord(7, 2)]: true,
      [utils.asGridCoord(8, 3)]: true,
      [utils.asGridCoord(9, 4)]: true,
      [utils.asGridCoord(10, 4)]: true,
      [utils.asGridCoord(11, 4)]: true,
      [utils.asGridCoord(12, 4)]: true,
      [utils.asGridCoord(0, 4)]: true,
      [utils.asGridCoord(0, 5)]: true,
      [utils.asGridCoord(0, 6)]: true,
      [utils.asGridCoord(0, 7)]: true,
      [utils.asGridCoord(0, 8)]: true,
      [utils.asGridCoord(0, 9)]: true,
      [utils.asGridCoord(0, 10)]: true,
      [utils.asGridCoord(0, 11)]: true,
      [utils.asGridCoord(13, 5)]: true,
      [utils.asGridCoord(13, 6)]: true,
      [utils.asGridCoord(13, 7)]: true,
      [utils.asGridCoord(13, 8)]: true,
      [utils.asGridCoord(13, 9)]: true,
      [utils.asGridCoord(13, 10)]: true,
      [utils.asGridCoord(13, 11)]: true,
      [utils.asGridCoord(1, 12)]: true,
      [utils.asGridCoord(2, 12)]: true,
      [utils.asGridCoord(3, 12)]: true,
      [utils.asGridCoord(4, 12)]: true,
      [utils.asGridCoord(5, 12)]: true,
      [utils.asGridCoord(6, 13)]: true,
      [utils.asGridCoord(7, 12)]: true,
      [utils.asGridCoord(8, 12)]: true,
      [utils.asGridCoord(9, 12)]: true,
      [utils.asGridCoord(10, 12)]: true,
      [utils.asGridCoord(11, 12)]: true,
      [utils.asGridCoord(12, 12)]: true,
      [utils.asGridCoord(6, 4)]: true,
      [utils.asGridCoord(6, 5)]: true,
      [utils.asGridCoord(1, 5)]: true,
      [utils.asGridCoord(2, 5)]: true,
      [utils.asGridCoord(3, 5)]: true,
      [utils.asGridCoord(4, 5)]: true,
      [utils.asGridCoord(3, 7)]: true,
      [utils.asGridCoord(3, 10)]: true,
      [utils.asGridCoord(8, 7)]: true,
      [utils.asGridCoord(8, 10)]: true,
      [utils.asGridCoord(11, 5)]: true,
      [utils.asGridCoord(11, 7)]: true,
      [utils.asGridCoord(12, 7)]: true,
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
              direction: "up",
            },
          ],
        },
      ],
      [utils.asGridCoord(6, 12)]: [
        {
          events: [
            {
              type: "changeMap",
              map: "Street",
              x: utils.withGrid(5),
              y: utils.withGrid(9),
              direction: "down",
            },
          ],
        },
      ],
    },
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
        y: utils.withGrid(9),
      },
      lavender: {
        type: "Person",
        x: utils.withGrid(9),
        y: utils.withGrid(6),
        src: "/db/images/characters/people/lavender.png",
        behaviorLoop: [
          { type: "stand", direction: "down", time: 1500 },
          { type: "walk", direction: "right" },
          { type: "stand", direction: "down", time: 2000 },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "up" },
          { type: "stand", direction: "up", time: 1000 },
          { type: "walk", direction: "right" },
          { type: "stand", direction: "up", time: 1000 },
          { type: "walk", direction: "down" },
          { type: "walk", direction: "down" },
          { type: "walk", direction: "down" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "stand", direction: "down", time: 2000 },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "up" },
          { type: "walk", direction: "up" },
          { type: "walk", direction: "right" }
        ],
        talking: [
          {
            required: ["DEFEATED_LAVENDER"],
            events: [
              {
                type: "textMessage",
                text: "LAVENDER: The best part about cooking is eating what you made hehe.",
                faceHero: "lavender",
              },
            ],
          },
          {
            events: [
              {
                type: "textMessage",
                text: "LAVENDER: I'm sorry I have to do this... the Iron Chef made me do it.",
                faceHero: "lavender",
              },
              { type: "battle", enemyId: "lavender", locationId: "Kitchen" },
              {
                type: "textMessage",
                text: "LAVENDER: Thank you for defeating me. Please defeat the rest too and save our town from this pizza tyranny!",
                faceHero: "lavender",
              },
              { type: "addStoryFlag", flag: "DEFEATED_LAVENDER" },
            ]
          },
        ]
      },
      eligor: {
        type: "Person",
        x: utils.withGrid(2),
        y: utils.withGrid(7),
        src: "/db/images/characters/people/eligor.png",
        behaviorLoop: [
          { type: "stand", direction: "left", time: 2000 },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "up" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "stand", direction: "down", time: 1000 },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "stand", direction: "left", time: 2000 },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "stand", direction: "down", time: 1000 },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "up" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "stand", direction: "left", time: 2000 },
          { type: "walk", direction: "down" },
          { type: "walk", direction: "down" }
        ],
        talking: [
          {
            required: ["DEFEATED_ELIGOR"],
            events: [
              {
                type: "textMessage",
                text: "CHEF ELIGOR: La la la~ Pizzaaaaaa~"
              },
            ],
          },
          {
            events: [
              {
                type: "textMessage",
                text: "ELIGOR: Ugh, fine.",
                faceHero: "eligor",
              },
              { type: "battle", enemyId: "eligor", locationId: "Kitchen" },
              {
                type: "textMessage",
                text: "ELIGOR: Just another day at work.",
                faceHero: "eligor",
              },
              { type: "addStoryFlag", flag: "DEFEATED_ELIGOR" },
            ]
          }
        ]
      },
      kenji: {
        type: "Person",
        x: utils.withGrid(6),
        y: utils.withGrid(4),
        src: "/db/images/characters/people/kenji.png",
        behaviorLoop: [
          { type: "stand", direction: "up", time: 3000 },
          { type: "walk", direction: "left" },
          { type: "stand", direction: "up", time: 3000 },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "stand", direction: "up", time: 3000 },
          { type: "walk", direction: "right" },
          { type: "stand", direction: "up", time: 3000 },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "stand", direction: "up", time: 3000 },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" }
        ],
        talking: [
          {
            required: ["DEFEATED_KENJI"],
            events: [
              {
                type: "textMessage",
                text: "(Wait..... is that Ratatouille under his hat?!)",
                faceHero: "kenji",
              },
            ],
          },
          {
            events: [
              {
                type: "textMessage",
                text: "KENJI: Ever since the Iron Chef came into town, our pizzas started acting strange.",
                faceHero: "kenji",
              },
              {
                type: "textMessage",
                text: "KENJI: Defeat my pizzas and save this town!",
                faceHero: "kenji",
              },
              { type: "battle", enemyId: "kenji", locationId: "Kitchen" },
              {
                type: "textMessage",
                text: "KENJI: You are the chosen one.",
                faceHero: "kenji",
              },
              { type: "addStoryFlag", flag: "DEFEATED_KENJI" },
            ]
          }
        ]
      },
    },
    walls: {
      [utils.asGridCoord(1, 3)]: true,
      [utils.asGridCoord(2, 3)]: true,
      [utils.asGridCoord(3, 3)]: true,
      [utils.asGridCoord(4, 3)]: true,
      [utils.asGridCoord(5, 3)]: true,
      [utils.asGridCoord(6, 3)]: true,
      [utils.asGridCoord(7, 3)]: true,
      [utils.asGridCoord(8, 3)]: true,
      [utils.asGridCoord(9, 3)]: true,
      [utils.asGridCoord(10, 3)]: true,
      [utils.asGridCoord(11, 4)]: true,
      [utils.asGridCoord(12, 4)]: true,
      [utils.asGridCoord(1, 5)]: true,
      [utils.asGridCoord(1, 6)]: true,
      [utils.asGridCoord(1, 7)]: true,
      [utils.asGridCoord(0, 4)]: true,
      [utils.asGridCoord(0, 8)]: true,
      [utils.asGridCoord(1, 9)]: true,
      [utils.asGridCoord(2, 9)]: true,
      [utils.asGridCoord(3, 10)]: true,
      [utils.asGridCoord(4, 10)]: true,
      [utils.asGridCoord(5, 11)]: true,
      [utils.asGridCoord(6, 10)]: true,
      [utils.asGridCoord(7, 10)]: true,
      [utils.asGridCoord(8, 10)]: true,
      [utils.asGridCoord(9, 10)]: true,
      [utils.asGridCoord(10, 10)]: true,
      [utils.asGridCoord(11, 10)]: true,
      [utils.asGridCoord(12, 10)]: true,
      [utils.asGridCoord(13, 9)]: true,
      [utils.asGridCoord(13, 8)]: true,
      [utils.asGridCoord(13, 7)]: true,
      [utils.asGridCoord(13, 6)]: true,
      [utils.asGridCoord(13, 5)]: true,
      [utils.asGridCoord(6, 7)]: true,
      [utils.asGridCoord(7, 7)]: true,
      [utils.asGridCoord(9, 7)]: true,
      [utils.asGridCoord(10, 7)]: true,
      [utils.asGridCoord(9, 9)]: true,
      [utils.asGridCoord(10, 9)]: true,
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
              direction: "down",
            },
          ],
        },
      ],
    },
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
        y: utils.withGrid(8),
      },
      mouse: {
        type: "Person",
        x: utils.withGrid(8),
        y: utils.withGrid(12),
        src: "/db/images/characters/people/mouse.png",
        behaviorLoop: [
          { type: "stand", direction: "down", time: 2000 },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "stand", direction: "down", time: 5000 },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" }
        ],
        talking: [
          {
            events: [
              {
                type: "textMessage",
                text: "MOUSE: Is there anything to eat in this town besides pizza?",
                faceHero: "mouse",
              },
            ],
          },
        ],
      },
      npc9: {
        type: "Person",
        x: utils.withGrid(6),
        y: utils.withGrid(6),
        src: "/db/images/characters/people/lavender.png",
        behaviorLoop: [
          { type: "stand", direction: "down", time: 3000 },
          { type: "stand", direction: "right", time: 1000 },
          { type: "stand", direction: "down", time: 3000 },
          { type: "stand", direction: "left", time: 1000 },
        ],
        talking: [
          {
            events: [
              {
                type: "textMessage",
                text: "Come try out our vegan pizzas! We promise you won't miss meat or your money back, guaranteed.",
                faceHero: "npc9",
              },
            ],
          },
        ],
      }
    },
    walls: {
      [utils.asGridCoord(1, 8)]: true,
      [utils.asGridCoord(1, 9)]: true,
      [utils.asGridCoord(1, 10)]: true,
      [utils.asGridCoord(1, 11)]: true,
      [utils.asGridCoord(1, 12)]: true,
      [utils.asGridCoord(1, 13)]: true,
      [utils.asGridCoord(1, 14)]: true,
      [utils.asGridCoord(2, 15)]: true,
      [utils.asGridCoord(3, 15)]: true,
      [utils.asGridCoord(4, 15)]: true,
      [utils.asGridCoord(5, 15)]: true,
      [utils.asGridCoord(6, 15)]: true,
      [utils.asGridCoord(6, 16)]: true,
      [utils.asGridCoord(7, 17)]: true,
      [utils.asGridCoord(8, 16)]: true,
      [utils.asGridCoord(8, 15)]: true,
      [utils.asGridCoord(9, 15)]: true,
      [utils.asGridCoord(10, 15)]: true,
      [utils.asGridCoord(11, 15)]: true,
      [utils.asGridCoord(12, 15)]: true,
      [utils.asGridCoord(13, 15)]: true,
      [utils.asGridCoord(14, 14)]: true,
      [utils.asGridCoord(14, 13)]: true,
      [utils.asGridCoord(14, 12)]: true,
      [utils.asGridCoord(14, 11)]: true,
      [utils.asGridCoord(14, 10)]: true,
      [utils.asGridCoord(14, 9)]: true,
      [utils.asGridCoord(14, 8)]: true,
      [utils.asGridCoord(14, 7)]: true,
      [utils.asGridCoord(13, 6)]: true,
      [utils.asGridCoord(12, 6)]: true,
      [utils.asGridCoord(11, 6)]: true,
      [utils.asGridCoord(10, 5)]: true,
      [utils.asGridCoord(9, 5)]: true,
      [utils.asGridCoord(8, 5)]: true,
      [utils.asGridCoord(7, 4)]: true,
      [utils.asGridCoord(6, 5)]: true,
      [utils.asGridCoord(5, 5)]: true,
      [utils.asGridCoord(4, 5)]: true,
      [utils.asGridCoord(3, 6)]: true,
      [utils.asGridCoord(3, 7)]: true,
      [utils.asGridCoord(2, 7)]: true,
      [utils.asGridCoord(7, 8)]: true,
      [utils.asGridCoord(7, 9)]: true,
      [utils.asGridCoord(7, 10)]: true,
      [utils.asGridCoord(8, 8)]: true,
      [utils.asGridCoord(8, 9)]: true,
      [utils.asGridCoord(8, 10)]: true,
      [utils.asGridCoord(9, 10)]: true,
      [utils.asGridCoord(10, 10)]: true,
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
              direction: "down",
            },
          ],
        },
      ],
      [utils.asGridCoord(7, 5)]: [
        {
          events: [
            {
              type: "changeMap",
              map: "Green",
              x: utils.withGrid(5),
              y: utils.withGrid(12),
              direction: "up",
            },
          ],
        },
      ],
      [utils.asGridCoord(7, 6)]: [
        {
          required: ["DEFEATED_IRON_CHEF"],
          events: [
            { type: "textMessage", text: "Congrats! You saved the town from pizza tyranny! Thanks for playing!" },
            { type: "removeStoryFlag", flag: "DEFEATED_IRON_CHEF" },
            { type: "addStoryFlag", flag: "DEFEATED_GAME" },
            { type: "changeMusic", soundName: "gameFinished" }
          ]
        }
      ]
    },
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
        y: utils.withGrid(10),
      },
      ironChef: {
        type: "Person",
        x: utils.withGrid(4),
        y: utils.withGrid(4),
        src: "/db/images/characters/people/ironChef.png",
        behaviorLoop: [
          { type: "stand", direction: "up", time: 2000 },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "stand", direction: "up", time: 2000 },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "stand", direction: "up", time: 2000 },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "stand", direction: "up", time: 2000 },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" }
        ],
        talking: [
          {
            required: ["DEFEATED_IRON_CHEF"],
            events: [
              {
                type: "textMessage",
                text: "IRON CHEF: ............ >:(",
                faceHero: "ironChef",
              },
            ],
          },
          {
            required: ["DEFEATED_ELIGOR", "DEFEATED_KENJI", "DEFEATED_LAVENDER"],
            events: [
              {
                type: "textMessage",
                text: "IRON CHEF: We're going to be the best pizza franchise in the world! Mwahahaha.....",
                faceHero: "ironChef",
              },
              { type: "battle", enemyId: "ironChef", locationId: "Green" },
              {
                type: "textMessage",
                text: "IRON CHEF: WHAT? How dare you keep me from pizza domination!",
                faceHero: "ironChef",
              },
              { type: "addStoryFlag", flag: "DEFEATED_IRON_CHEF" },
            ]
          },
          {
            events: [
              {
                type: "textMessage",
                text: "IRON CHEF: Hmph. Try defeating the other chefs in this town before you dare challenge me.",
                faceHero: "ironChef"
              }
            ]
          }
        ]
      },
      regina: {
        type: "Person",
        x: utils.withGrid(8),
        y: utils.withGrid(9),
        src: "/db/images/characters/people/regina.png",
        behaviorLoop: [
          { type: "stand", direction: "down", time: 1500 },
          { type: "walk", direction: "up" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "up" },
          { type: "stand", direction: "up", time: 1500 },
          { type: "walk", direction: "down" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "up" },
          { type: "walk", direction: "up" },
          { type: "walk", direction: "up" },
          { type: "walk", direction: "up" },
          { type: "stand", direction: "up", time: 1500 },
          { type: "walk", direction: "down" },
          { type: "walk", direction: "down" },
          { type: "walk", direction: "down" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "down" },
          { type: "walk", direction: "down" }
        ],
        talking: [
          {
            events: [
              {
                type: "textMessage",
                text: "REGINA: I just started working here and I noticed the head chef has an evil laugh.... should I be concerned?",
                faceHero: "regina",
              },
            ],
          },
        ],
      },
      npc10: {
        type: "Person",
        x: utils.withGrid(3),
        y: utils.withGrid(7),
        src: "/db/images/characters/people/timmy.png",
        behaviorLoop: [
          { type: "stand", direction: "up" },
        ],
        talking: [
          {
            events: [
              {
                type: "textMessage",
                text: "Om nom nom nom nom. Oh sorry, didn't see you there."
              },
            ],
          },
        ],
      },
      npc11: {
        type: "Person",
        x: utils.withGrid(7),
        y: utils.withGrid(10),
        src: "/db/images/characters/people/johnny.png",
        behaviorLoop: [
          { type: "stand", direction: "right" }
        ],
        talking: [
          {
            events: [
              {
                type: "textMessage",
                text: "I'm waiting for my date. Kinda nervous.",
                faceHero: "npc11",
              },
            ],
          },
        ],
      },
    },
    walls: {
      [utils.asGridCoord(0, 4)]: true,
      [utils.asGridCoord(0, 5)]: true,
      [utils.asGridCoord(1, 6)]: true,
      [utils.asGridCoord(2, 6)]: true,
      [utils.asGridCoord(3, 6)]: true,
      [utils.asGridCoord(4, 6)]: true,
      [utils.asGridCoord(5, 6)]: true,
      [utils.asGridCoord(6, 6)]: true,
      [utils.asGridCoord(0, 7)]: true,
      [utils.asGridCoord(0, 8)]: true,
      [utils.asGridCoord(0, 9)]: true,
      [utils.asGridCoord(0, 10)]: true,
      [utils.asGridCoord(0, 11)]: true,
      [utils.asGridCoord(10, 5)]: true,
      [utils.asGridCoord(10, 6)]: true,
      [utils.asGridCoord(10, 7)]: true,
      [utils.asGridCoord(10, 8)]: true,
      [utils.asGridCoord(10, 9)]: true,
      [utils.asGridCoord(10, 10)]: true,
      [utils.asGridCoord(10, 11)]: true,
      [utils.asGridCoord(1, 12)]: true,
      [utils.asGridCoord(2, 12)]: true,
      [utils.asGridCoord(3, 12)]: true,
      [utils.asGridCoord(4, 12)]: true,
      [utils.asGridCoord(5, 13)]: true,
      [utils.asGridCoord(6, 12)]: true,
      [utils.asGridCoord(7, 12)]: true,
      [utils.asGridCoord(8, 12)]: true,
      [utils.asGridCoord(9, 12)]: true,
      [utils.asGridCoord(1, 3)]: true,
      [utils.asGridCoord(2, 3)]: true,
      [utils.asGridCoord(3, 3)]: true,
      [utils.asGridCoord(4, 3)]: true,
      [utils.asGridCoord(5, 3)]: true,
      [utils.asGridCoord(6, 3)]: true,
      [utils.asGridCoord(7, 3)]: true,
      [utils.asGridCoord(8, 4)]: true,
      [utils.asGridCoord(9, 4)]: true,
      [utils.asGridCoord(3, 9)]: true,
      [utils.asGridCoord(8, 10)]: true,
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
              direction: "down",
            },
          ],
        },
      ],
    },
  },
}
