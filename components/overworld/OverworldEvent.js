class OverworldEvent {
    constructor({ map, event }) {
        this.map = map
        this.event = event
    }

    stand(resolve) {
        const who = this.map.gameObjects[this.event.who]
        who.startBehavior({
            map: this.map
        }, {
            type: "stand",
            direction: this.event.direction,
            time: this.event.time
        })

        // set up a handler to complete when correct person is done walking, then resolve event
        const completeHandler = e => {
            if (e.detail.whoId === this.event.who) {
                document.removeEventListener("PersonStandingComplete", completeHandler)
                resolve()
            }
        }

        document.addEventListener("PersonStandingComplete", completeHandler)
    }

    walk(resolve) {
        const who = this.map.gameObjects[this.event.who]
        who.startBehavior({
            map: this.map
        }, {
            type: "walk",
            direction: this.event.direction,
            retry: true // not always appropriate to do, ex) playable character
        })

        // set up a handler to complete when correct person is done walking, then resolve event
        const completeHandler = e => {
            if (e.detail.whoId === this.event.who) {
                document.removeEventListener("PersonWalkingComplete", completeHandler)
                resolve()
            }
        }

        document.addEventListener("PersonWalkingComplete", completeHandler)
    }

    textMessage(resolve) {
        if (this.event.faceHero) {
            const obj = this.map.gameObjects[this.event.faceHero]
            obj.direction = utils.oppositeDirection(this.map.gameObjects["hero"].direction)
        }

        const message = new TextMessage({
            text: this.event.text,
            onComplete: () => resolve() // doing it this way decouples it from the overworld
        })
        message.init(document.querySelector(".game-container"))
    }

    // call method from Overworld.js that changes map
    changeMap(resolve) {

        // deactivate mounted objects from previous map
        Object.values(this.map.gameObjects).forEach(obj => {
            obj.isMounted = false
        })

        const sceneTransition = new SceneTransition()
        sceneTransition.init(document.querySelector(".game-container"), () => {
            this.map.overworld.startMap(window.OverworldMaps[this.event.map], {
                x: this.event.x,
                y: this.event.y,
                direction: this.event.direction
            })
            resolve()

            sceneTransition.fadeOut()
        })
    }

    // play sfx
    playSfx(resolve) {
        window.Sfx[this.event.soundName].play()
        resolve()
    }

    // change background music
    changeMusic(resolve) {

        // stop all music playing
        window.Music.overworld.stop()

        // change music to given song
        window.Music[this.event.soundName].play()

        resolve()
    }

    // battle encounter event
    battle(resolve) {
        const battle = new Battle({
            enemy: Enemies[this.event.enemyId],
            location: this.event.locationId,
            onComplete: (playerWon) => {
                resolve(playerWon ? "WON_BATTLE" : "LOST_BATTLE")
            }
        })
        battle.init(document.querySelector(".game-container"))
    }

    // pause menu is opened by pressing "esc"
    pause(resolve) {
        this.map.isPaused = true
        const menu = new PauseMenu({
            progress: this.map.overworld.progress,
            onComplete: () => {
                resolve()
                this.map.isPaused = false
                this.map.overworld.startGameLoop()
            }
        })
        menu.init(document.querySelector(".game-container"))
    }

    // add story flag to player state
    addStoryFlag(resolve) {
        window.playerState.storyFlags[this.event.flag] = true
        resolve()
    }

    // remove story flag from player state
    removeStoryFlag(resolve) {
        window.playerState.storyFlags[this.event.flag] = false
        resolve()
    }

    craftingMenu(resolve) {
        const menu = new CraftingMenu({
            pizzas: this.event.pizzas,
            onComplete: () => {
                resolve()
            }
        })
        menu.init(document.querySelector(".game-container"))
    }

    restPizzas(resolve) {
        // update pizza health in player state
        const playerState = window.playerState
        Object.keys(playerState.pizzas).forEach(pizzaId => {
            const playerStatePizza = playerState.pizzas[pizzaId]
            playerStatePizza.hp = playerStatePizza.maxHp // bring back to full health
        })

        // send signal to update
        utils.emitEvent("PlayerStateUpdated")

        // play recover sfx
        window.Sfx.recover.play()
        resolve()
    }

    init() {
        return new Promise(resolve => {
            this[this.event.type](resolve)
        })
    }
}