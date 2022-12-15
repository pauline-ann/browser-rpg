// will be invisible when AI enemies are using this class
// what move to use, who to use it on
class SubmissionMenu {
    constructor({ caster, enemy, onComplete, items, replacements }) {
        this.caster = caster
        this.enemy = enemy
        this.replacements = replacements
        this.onComplete = onComplete

        let quantityMap = {}

        items.forEach(item => {

            if (item.team !== caster.team) {
                return
            }

            let existing = quantityMap[item.actionId]
            if (existing) {
                existing.quantity += 1
                return
            }

            quantityMap[item.actionId] = {
                actionId: item.actionId,
                quantity: 1,
                instanceId: item.instanceId
            }
        })
        this.items = Object.values(quantityMap)
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
                    description: Actions["damage1"].description,
                    handler: () => {
                        this.menuSubmit(Actions["damage1"])
                    }
                },
                {
                    label: "Toppings",
                    description: "Choose a pizza topping spell",
                    handler: () => {
                        this.keyboardMenu.setOptions(this.getPages().toppings)
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
                        this.keyboardMenu.setOptions(this.getPages().replacements)
                    }
                }
            ],
            toppings: [
                ...this.caster.actions.map(key => {
                    const action = Actions[key]
                    return {
                        label: action.name,
                        description: action.description || "This is a cool move.",
                        handler: () => {
                            this.menuSubmit(action)
                        }
                    }
                }),
                backOption
            ],
            items: [
                ...this.items.map(item => {
                    const action = Actions[item.actionId]
                    return {
                        label: action.name,
                        description: action.description || "This is a cool item.",
                        details: () => {
                            return "x" + item.quantity
                        },
                        handler: () => {
                            this.menuSubmit(action, item.instanceId)
                        }
                    }
                }),
                backOption
            ],
            replacements: [
                ...this.replacements.map(replacement => {
                    return {
                        label: replacement.name,
                        description: replacement.description,
                        handler: () => {
                            // swap me in, coach!
                            this.menuSubmitReplacement(replacement)
                        }
                    }
                }),
                backOption
            ]
        }
    }

    // if swapping, end submission and notify system that a replacement is underway
    menuSubmitReplacement(replacement) {
        this.keyboardMenu?.end()
        this.onComplete({
            replacement
        })
    }

    menuSubmit(action, instanceId = null) {
        const target = action.targetType === "friendly" ? this.caster : this.enemy

        this.keyboardMenu?.end()
        this.onComplete({
            action,
            target,
            instanceId
        })
    }

    // AI battle decision
    decide() {
        const maxIndex = this.caster.actions.length - 1

        // if caster has a status already, then simply attack
        if (this.caster.status) {
            this.menuSubmit(Actions[this.caster.actions[maxIndex]])
            return
        }

        // choose a random action
        const randomIndex = utils.randomIntFromInterval(0, maxIndex)
        this.menuSubmit(Actions[this.caster.actions[randomIndex]])
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