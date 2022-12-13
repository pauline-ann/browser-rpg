class Combatant {
  constructor(config, battle) {
    Object.keys(config).forEach(key => {
      this[key] = config[key]
    })
    this.hp = this.hp ?? this.maxHp // default to max HP if HP is undefined
    this.battle = battle
  }

  get hpPercent() {
    const percent = (this.hp / this.maxHp) * 100
    const greaterThanZero = percent > 0
    return greaterThanZero ? percent : 0
  }

  get xpPercent() {
    return (this.xp / this.maxXp) * 100
  }

  get isActive() {
    return this.battle?.activeCombatants[this.team] === this.id
  }

  get xpGiven() {
    return this.level * 40
  }

  createElement() {
    this.hudElement = document.createElement("div")
    this.hudElement.classList.add("Combatant")
    this.hudElement.setAttribute("data-combatant", this.id)
    this.hudElement.setAttribute("data-team", this.team)
    this.hudElement.innerHTML = (`
          <p class="Combatant_name">${this.name}</p>
          <p class="Combatant_level"></p>
          <div class="Combatant_character_crop">
            <img class="Combatant_character" alt="${this.name}" src="${this.src}" />
          </div>
          <img class="Combatant_type" src="${this.icon}" alt="${this.type}" />
          <svg viewBox="0 0 26 3" class="Combatant_life-container">
            <rect x=0 y=0 width="0%" height=1 fill="#82ff71" />
            <rect x=0 y=1 width="0%" height=2 fill="#3ef126" />
          </svg>
          <svg viewBox="0 0 26 2" class="Combatant_xp-container">
            <rect x=0 y=0 width="0%" height=1 fill="#ffd76a" />
            <rect x=0 y=1 width="0%" height=1 fill="#ffc934" />
          </svg>
          <p class="Combatant_status"></p>
        `)

    this.pizzaElement = document.createElement("img")
    this.pizzaElement.classList.add("Pizza")
    this.pizzaElement.setAttribute("src", this.src)
    this.pizzaElement.setAttribute("alt", this.name)
    this.pizzaElement.setAttribute("data-team", this.team)

    // save reference to hp and xp bars since it will be updating often
    this.hpFills = this.hudElement.querySelectorAll(".Combatant_life-container > rect")
    this.xpFills = this.hudElement.querySelectorAll(".Combatant_xp-container > rect")
  }

  // fill in all stateful values in dom
  // allow the values on the class to be changed
  update(changes = {}) {
    // update anything incoming with dynamic loop
    Object.keys(changes).forEach(key => {
      this[key] = changes[key]
    })

    // update active flag to show correct enemy + hud
    this.hudElement.setAttribute("data-active", this.isActive)
    this.pizzaElement.setAttribute("data-active", this.isActive)

    // update HP and XP bars
    this.hpFills.forEach(rect => rect.style.width = `${this.hpPercent}%`)
    this.xpFills.forEach(rect => rect.style.width = `${this.xpPercent}%`)

    // update level on screen
    this.hudElement.querySelector(".Combatant_level").innerText = this.level

    // update status
    const statusElement = this.hudElement.querySelector(".Combatant_status")
    if (this.status) {
      statusElement.innerText = this.status.type
      statusElement.style.display = "block"
    } else {
      statusElement.innerText = ""
      statusElement.style.display = "none"
    }
  }

  getReplacedEvents(originalEvents) {
    // clumsy status has 30% chance of being successful
    if (this.status?.type === "clumsy" && utils.probability(.3)) {
      return [{ type: "textMessage", text: `${this.name} flops over!` }]
    }

    return originalEvents
  }

  getPostEvents() {
    if (this.status?.type === "saucy") {
      return [
        { type: "textMessage", text: "Feelin' saucy!" },
        { type: "stateChange", recover: 5, onCaster: true },
        { type: "textMessage", text: "{CASTER} healed 5 HP!" },
      ]
    }
    return []
  }

  decrementStatus() {
    if (this.status?.expiresIn > 0) {
      this.status.expiresIn -= 1
      if (this.status.expiresIn === 0) {
        const currentStatus = utils.capitalizeFirstLetter(this.status.type)
        this.update({
          status: null
        })
        return {
          type: "textMessage",
          text: `${currentStatus} status expired!`
        }
      }
    }
    return null
  }

  init(container) {
    this.createElement()
    container.appendChild(this.hudElement) // inject into container the element that was created
    container.appendChild(this.pizzaElement) // show pizzas in battle
    this.update()
  }
}