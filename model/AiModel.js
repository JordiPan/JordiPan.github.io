export class AiModel {
    constructor() {
        this.validColumns = [];
    }
    //moet nog checken of de kolom vol is
    decide(board, difficulty, rowCount, colCount) {
        switch(difficulty) {
            case 'easy':
                return this.easyAi(board);
            case 'medium':
                return this.mediumAi(board);
            // case 'hard':
            //     return this.hardAi(board, rowCount, colCount);
            default:
                return this.easyAi(board);
        }
        
    }

    easyAi(board) {
        this.updateValidCols(board);
        console.log(board)
        console.log("valid: "+this.validColumns);
        let chosenColumn = this.validColumns[Math.floor(Math.random() * this.validColumns.length)];
        console.log("chosen: "+chosenColumn);
        return chosenColumn;
    }

    mediumAi(board) {
        //doet basic checks en kijkt of hij kan winnen
    }
    //check of de kolom vol is
    updateValidCols(board) {
        this.validColumns = [];
        for (let i = 0; i < 7; i++) {
            if (board[0][i] == "-") {
                this.validColumns.push(i);
            }
        }
    }
    // updateValidCols(board) {
    //     for (let i = 0; i < 7; i++) {
    //         if (board[0][i] != "-") {
    //             console.log("removing: "+i);
    //             this.validColumns.splice(i, 1);
    //         }
    //     }
    // }
}