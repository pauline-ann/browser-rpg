window.Actions = {
    damage1: {
        name: "Whomp!",
        type: "normal",
        success: [
            { type: "textMessage", text: "{CASTER} user Whomp!" },
            { type: "animation", animation: "define here" }, // TODO
            { type: "stateChange", damage: 10 }
        ]
    }
}