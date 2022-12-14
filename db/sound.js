window.Sfx = {
    damage: new Howl({
        src: [
            'https://assets.codepen.io/21542/howler-push.mp3',
        ]
    }),
    recover: new Howl({
        src: [
            'https://assets.codepen.io/21542/howler-sfx-levelup.mp3'
        ]
    })
}

window.Music = {
    overworld: new Howl({
        src: [
            "https://assets.codepen.io/21542/howler-demo-bg-music.mp3"
        ],
        loop: true
    })
}

// TODO
// add sfx for when combatant dies
// add music for battle
// add sfx for level up
// add music for boss battle