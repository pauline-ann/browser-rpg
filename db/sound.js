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
    }),
    victory: new Howl({
        src: [
            './db/music/Victorious.wav'
        ]
    }),
    loss: new Howl({
        src: [
            './db/music/To Suffer a Loss (Game Over).wav'
        ]
    }),
    save: new Howl({
        src: [
            './db/music/Save.mp3',
        ]
    }),
    levelUp: new Howl({
        src: [
            './db/music/Level Up.mp3',
        ],
        volume: 0.2
    }),
    faint: new Howl({
        src: [
            './db/music/Pixel Death.mp3',
        ]
    }),
}

window.Music = {
    overworld: new Howl({
        src: [
            "./db/music/Merch City.wav"
        ],
        loop: true
    }),
    battle: new Howl({
        src: [
            "./db/music/I've Got Your Back! (Full).wav"
        ],
        loop: true
    }),
    gameFinished: new Howl({
        src: [
            "./db/music/How Did We Do.wav"
        ],
        loop: true
    })
}
