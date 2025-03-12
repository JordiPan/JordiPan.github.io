export class AiModel {
    decide(board) {
        console.log(board);
        let random = Math.floor(Math.random() * 7);
        return random;
    }
}