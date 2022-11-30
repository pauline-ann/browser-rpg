// will be invisible when AI enemies are using this class
// what move to use, who to use it on
class SubmissionMenu {
    constructor({ caster, opponent, onComplete }) {
        this.caster = caster
        this.opponent = opponent
        this.onComplete = onComplete
    }

    getPages() {
        return {
            root: [
                {
                    label: "Attack",
                    description: "Choose an attack",
                    handler: () => {
                        // do something when chosen
                        console.log("attack")
                    }
                },
                {
                    label: "Items",
                    description: "Choose an item",
                    handler: () => {
                        // do something when chosen
                    }
                },
                {
                    label: "Swap",
                    description: "Change to another pizza",
                    handler: () => {
                        // do something when chosen
                    }
                }
            ]
        }
    }

    decide() {
        this.onComplete({
            action: Actions[this.caster.actions[0]],
            target: this.opponent // TODO target could come from action, ex) when healing
        })
    }

    showMenu(container) {
        this.keyboardMenu = new KeyboardMenu()
        this.keyboardMenu.init(container) // inject menu into dom
        this.keyboardMenu.setOptions(this.getPages().root)
    }

    init(container) {
        if (this.caster.isPlayerControlled) {
            // show some UI
            this.showMenu(container)
        } else {
            this.decide()
        }
    }
}