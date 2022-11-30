// will be invisible when AI enemies are using this class
// what move to use, who to use it on
class SubmissionMenu {
    constructor({ caster, opponent, onComplete }) {
        this.caster = caster
        this.opponent = opponent
        this.onComplete = onComplete
    }

    getPages() {

        const backOption = {
            label: "Back",
            description: "Go to previous page",
            handler: () => {
                this.keyboardMenu.setOptions(this.getPages().root)
            }
        }

        return {
            root: [
                {
                    label: "Attack",
                    description: "Choose an attack",
                    handler: () => {
                        this.keyboardMenu.setOptions(this.getPages().attacks)
                    }
                },
                {
                    label: "Items",
                    description: "Choose an item",
                    handler: () => {
                        this.keyboardMenu.setOptions(this.getPages().items)
                    }
                },
                {
                    label: "Swap",
                    description: "Change to another pizza",
                    handler: () => {
                        // do something when chosen
                    }
                }
            ],
            attacks: [
                ...this.caster.actions.map(key => {
                    const action = Action[key]
                    return {
                        label: action.name,
                        description: action.description,
                        handler: () => {
                            this.menuSubmit(action)
                        }
                    }
                }),
                backOption
            ],
            items: [
                // items will go here
                backOption
            ]
        }
    }

    // TODO item submit
    menuSubmit(action, instanceId = null) {

        this.keyboardMenu?.end()

        this.onComplete({
            action,
            target: this.opponent // TODO target could come from action, ex) when healing
        })
    }

    decide() {
        // TODO enemies should randomly decide what to do
        this.menuSubmit(Actions[this.caster.actions[0]])
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