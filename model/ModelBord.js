export class ModelBord {
    constructor() {
        this.vakjes=new Array(6);

        for (let i=0;i<6;i++)
        {
            this.vakjes[i]=new Array(7);
        }

        // Het zet in alle vakken van de model "leeg"
        for(let rij=0;rij<6;rij++)
            for(let kolom=0;kolom<7;kolom++)
                this.vakjes[rij][kolom]="leeg";
    }
}