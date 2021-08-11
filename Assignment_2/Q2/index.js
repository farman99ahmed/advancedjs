class QueenAttack {
    constructor(position_1, position_2) {
        this.position_1 = position_1;
        this.position_2 = position_2;
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

const position_1 = [0, 0];
const position_2 = [7, 7];

const board = new QueenAttack(position_1, position_2);
console.log(board.canAttack());