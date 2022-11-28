window.BattleAnimations = {
    async spin(event, onComplete) {
        const element = event.caster.pizzaElement
        const animationClassName = event.caster.team === "player" ? "battle-spin-right" : "battle-spin-left"
        element.classList.add(animationClassName)

        // remove class when animation is fully complete
        element.addEventListener("animationend", () => {
            element.classList.remove(animationClassName)
        }, { once: true })

        // complete battle cycle when opponents collide
        await utils.wait(100)
        onComplete()
    }
}