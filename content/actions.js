window.Actions = {
    damage1: {
        name: "Whomp!",
        success: [
            { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
            { type: "animation", animation: "spin" },
            { type: "stateChange", damage: 10 }
        ]
    },
    // TODO fix bug - caster shouldn't heal same turn
    saucyStatus: {
        name: "Tomato Squeeze",
        targetType: "friendly",
        success: [
            { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
            { type: "stateChange", status: { type: "saucy", expiresIn: 3 } },
            { type: "textMessage", text: "{CASTER} is feeling saucy!" },
        ]
    },
    clumsyStatus: {
        name: "Olive Oil",
        targetType: "unfriendly",
        success: [
            { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
            { type: "animation", animation: "glob", color: "#dafd2a" },
            { type: "stateChange", status: { type: "clumsy", expiresIn: 3 } },
            { type: "textMessage", text: "{TARGET} is slipping everywhere!" },
        ]
    },
    // Items
    item_recoverStatus: {
        name: "Heating Lamp",
        description: "Warm and cozy vibes. Remove status ailments.",
        targetType: "friendly",
        success: [
            { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
            { type: "stateChange", status: null },
            { type: "textMessage", text: "Feeling fresh!" }
        ]
    },
    item_recoverHp: {
        name: "Parmesan",
        description: "Mmm... cheese.",
        targetType: "friendly",
        success: [
            { type: "textMessage", text: "{CASTER} sprinkles on some {ACTION}!" },
            { type: "stateChange", recover: 10 },
            { type: "textMessage", text: "{CASTER} recovers 10 HP!" }
        ]
    }
}