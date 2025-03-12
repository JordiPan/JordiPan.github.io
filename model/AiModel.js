export class AiModel {
    //moet nog checken of de kolom vol is
    decide(board) {
        console.log(board);
        let random = Math.floor(Math.random() * 7);
        console.log("chosen column: ", random+1);
        return random;
    }
}