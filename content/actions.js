window.Actions = {
    damage1: {
        name: "Whomp!",
        type: "normal",
        success: [
            { type: "textMessage", text: "{CASTER} user Whomp!" },
            { type: "animation", animation: "spin" },
            { type: "stateChange", damage: 10 }
        ]
    }
}