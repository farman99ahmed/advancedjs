class QueenAttack {
    constructor(position_1, position_2) {
        this.position_1 = position_1;
        this.position_2 = position_2;
    }

    static validateInputs(position_1, position_2) {
        if (position_1[0] > 7 || position_1[0] < 0 || position_1[1] > 7 || position_1[1] < 0)
            return false
        if (position_2[0] > 7 || position_2[0] < 0 || position_2[1] > 7 || position_2[1] < 0)
            return false
        return true
    }

    canAttack() {
        if (this.position_1[0] == this.position_2[0])
            return true;

        if (this.position_1[1] == this.position_2[1])
            return true;

        if (Math.abs(this.position_1[0] - this.position_2[0]) == Math.abs(this.position_1[1] - this.position_2[1]))
            return true;

        return false;
    }
}

const position_1 = [7, 8];
const position_2 = [7, 6];

if (QueenAttack.validateInputs(position_1, position_2)) {
    const board = new QueenAttack(position_1, position_2);
    console.log(board.canAttack());
} else {
    console.log("Invalid Inputs");
}