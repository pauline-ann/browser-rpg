class ReplacementMenu {
    constructor({ replacements, onComplete }) {
        this.replacements = replacements
        this.onComplete = onComplete
    }

    decide() {
        this.menuSubmit(this.replacements[0]) // configure AI to make smart decision
    }

    menuSubmit(replacement) {
        this.onComplete(replacement)
    }

    showMenu(container) {
        this.keyboardMenu = new KeyboardMenu()
        this.keyboardMenu.init(container)
        this.keyboardMenu.setOptions(this.replacements.map(combatant => {
            return {
                label: combatant.name,
                description: combatant.description,
                handler: () => {
                    this.menuSubmit(combatant)
                }
            }
        }))
    }

    // TODO if only one combatant left in team, automatically choose that one for the player
    init(container) {
        if (this.replacements[0].isPlayerControlled) {
            this.showMenu(container)
            return
        }
        this.decide()
    }
}