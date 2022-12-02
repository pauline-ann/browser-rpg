class Progress {
    constructor() {
        this.mapId = "DemoRoom"
        this.startingHeroX = 0
        this.startingHeroY = 0
        this.startingHeroDirection = "down"
        this.saveFileKey = "PizzaLegends_SaveFile1"
        // TODO make multiple save files - change out which key data is being saved to. retrieve list of save files.
    }

    // save files to local storage in browser
    save() {
        window.localStorage.setItem(this.saveFileKey, JSON.stringify({
            mapId: this.mapId,
            startingHeroX: this.startingHeroX,
            startingHeroY: this.startingHeroY,
            startingHeroDirection: this.startingHeroDirection,
            playerState: {
                pizzas: playerState.pizzas,
                lineup: playerState.lineup,
                items: playerState.items,
                storyFlags: playerState.storyFlags
            }
        }))
    }

    getSaveFile() {
        const file = window.localStorage.getItem(this.getSaveFile)
        return file ? JSON.parse(file) : null
    }

    // load files from local storage in browser
    load() {
        const file = this.getSaveFile()
        if (file) {
            this.mapId = file.mapId
            this.startingHeroX = file.startingHeroX
            this.startingHeroY = file.startingHeroY
            this.startingHeroDirection = file.startingHeroDirection

            Object.keys(file.playerState).forEach(key => {
                playerState[key] = file.playerState[key]
            })
        }

    }
}