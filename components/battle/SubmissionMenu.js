// will be invisible when AI enemies are using this class
// what move to use, who to use it on
class SubmissionMenu {
    constructor({ caster, opponent, onComplete }) {
        this.caster = caster
        this.opponent = opponent
        this.onComplete = onComplete
    }

    decide() {
        this.onComplete({
            action: Actions[this.caster.actions[0]],
            target: this.opponent // TODO target could come from action, ex) when healing
        })
    }

    init(container) {
        this.decide()
    }
}