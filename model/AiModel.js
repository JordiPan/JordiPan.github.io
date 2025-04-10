export class AiModel {
    //misschien enum van maken
    static directions = [
        { row: 0, col: 1 },  // Horizontaal
        { row: 1, col: 0 },  // Verticaal
        { row: 1, col: 1 },  // Diagonaal (rechts)
        { row: 1, col: -1 }  // Diagonaal (links)
      ];

    constructor() {
        this.aiName = 'ai';
        this.difficulty;
        this.board;
        this.validColumns = [];
        this.validPositions = [];
        this.thinkingTime = 500;
    }
    getDifficulty() {
        return this.difficulty;
    }
    setDifficulty(diff) {
        this.difficulty = diff;
    }
    //moet nog checken of de kolom vol is
    decide(board) {
        this.board = board;
        
        switch(this.difficulty) {
            case 'easy':
                return this.easyAi();
            case 'medium':
                return this.mediumAi();
            // case 'hard':
            //     return this.hardAi(board, rowCount, colCount);
            default:
                return this.easyAi();
        }
        
    }

    easyAi() {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.updateValidCols();
                let chosenColumn = this.validColumns[Math.floor(Math.random() * this.validColumns.length)];
                resolve(chosenColumn);
            }, this.thinkingTime);
        });
    }

    mediumAi() {
        //doet basic checks en kijkt of hij kan winnen of verliezen
        return new Promise((resolve) => {
            setTimeout(() => {
                this.updateValidCols();

                //win
                let chosenColumn = this.checkWinPlacements('red');
                if (chosenColumn !== false) {
                    resolve(chosenColumn);
                }

                //block
                chosenColumn = this.checkWinPlacements('blue');
                if (chosenColumn !== false) {
                    resolve(chosenColumn);
                }

                chosenColumn = this.validColumns[Math.floor(Math.random() * this.validColumns.length)];
                resolve(chosenColumn);
            }, this.thinkingTime);
        });
    }
    //check of de kolom vol is
    updateValidCols() {
        this.validColumns = [];
        
        for (let i = 0; i < 7; i++) {
            if (this.board[0][i] == "") {
                this.validColumns.push(i);
            }
        }
    }
    //het is anders dan de checkwin van de player, omdat de ai nog niet geplaatst heeft
    checkWinPlacements(color) {
        this.validPositions = [];
        this.getValidPositions();
        
        for (let i = 0; i < this.validPositions.length; i++) { 
            for (let { row: dirRow, col: dirCol } of AiModel.directions) {
                const forwardCount = this.counter(this.validPositions[i].row, this.validPositions[i].col, dirRow, dirCol, color);
                const backwardCount = this.counter(this.validPositions[i].row, this.validPositions[i].col, -dirRow, -dirCol, color);
                //het telt de geplaatste fische 2 keer, daarom - 1
                const count = forwardCount + backwardCount - 1;
                if (count >= 4) return this.validPositions[i].col;
            }
        }
        return false;
    }
    
    counter(row, col, dirRow, dirCol, color) {
        //eerste fische is al geteld sinds het positie eigenlijk nog leeg is
        let count = 1;
        row += dirRow;
        col += dirCol;
        while (
            row >= 0 && row < 6 &&
            col >= 0 && col < 7 &&
            this.board[row][col] === color
        ) {
            count++;
            row += dirRow;
            col += dirCol;
        }
        
        return count;
    }

    getValidPositions() {
        for (let col = 0; col < 7; col++) {
            for(let row = 5; row >= 0; row--) {
                if (this.board[row][col] == "") {
                    this.validPositions.push({row: row, col: col});
                    break;
                }
            }
        }
    }
    getName() {
        return this.aiName;
    }
}