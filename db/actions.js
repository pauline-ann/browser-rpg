window.Actions = {
    damage1: {
        name: "Whomp!",
        description: "Perform a basic attack",
        success: [
            { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
            { type: "animation", animation: "spin" },
            { type: "stateChange", damage: 10 }
        ]
    },
    saucyStatus: {
        name: "Tomato Squeeze",
        description: "Make yourself extra saucy - heal 5HP for 3 turns.",
        targetType: "friendly",
        success: [
            { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
            { type: "stateChange", status: { type: "saucy", expiresIn: 3 } },
            { type: "textMessage", text: "{CASTER} is feeling saucy!" },
        ]
    },
    clumsyStatus: {
        name: "Olive Oil",
        description: "Make your enemy too slippery to attack - your enemy has a chance of missing for 3 turns.",
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