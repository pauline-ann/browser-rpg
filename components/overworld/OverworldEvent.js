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

        const sceneTransition = new SceneTransition()
        sceneTransition.init(document.querySelector(".game-container"), () => {
            this.map.overworld.startMap(window.OverworldMaps[this.event.map])
            resolve()

            sceneTransition.fadeOut()
        })
    }

    // battle encounter event
    battle(resolve) {
        const battle = new Battle({
            enemy: Enemies[this.event.enemyId],
            onComplete: (playerWon) => {
                resolve(playerWon ? "WON_BATTLE" : "LOST_BATTLE")
            }
        })
        battle.init(document.querySelector(".game-container"))
    }

    // pause menu is opened
    pause(resolve) {
        this.map.isPaused = true
        const menu = new PauseMenu({
            onComplete: () => {
                resolve()
                this.map.isPaused = false
                this.map.overworld.startGameLoop()
            }
        })
        menu.init(document.querySelector(".game-container"))
    }

    addStoryFlag(resolve) {
        window.playerState.storyFlags[this.event.flag] = true
        resolve()
    }

    init() {
        return new Promise(resolve => {
            this[this.event.type](resolve)
        })
    }
}