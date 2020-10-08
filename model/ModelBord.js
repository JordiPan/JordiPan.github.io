export class ModelBord {
    constructor() {
        // Maakt automatisch 42 <div> vakjes
        this.container = document.getElementById("cont");
        for(let i = 0; i < 42; i++) {
            this.backside = document.createElement("div");
            this.backside.className = 'items';
            this.container.appendChild(this.backside);
        }
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