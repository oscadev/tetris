export default class Piece {
    constructor(type) {
        this.type = type
        this.coordinates = []
        
        switch (type) {
            case "square":
                this.coordinates = [4, 5, 16, 17];
                break
            case "line":
                this.coordinates = [3, 4, 5, 6];
                break
            case "t":
                this.coordinates = [4, 5, 6, 17];
                break
            case "magic":
                this.coordinates = [1,2,3,4,5,6,7,8,9,10];
                break
        }

    }

    greet() {
        return `the type is: ${this.type}`
    }

    position() {

        return this.coordinates
    }

    canMove(direction, filled) {
        let testDummy = []
        let canMove = true
        switch (direction) {
            case "down":
                console.log("tested move down")
                testDummy = this.coordinates.map(e => e+12)
                testDummy.forEach(e=>{
                    if(filled.includes(e)){
                        canMove = false
                    }
                })
                return canMove;
                break;
            case "left":
                console.log("tested move left")
                testDummy = this.coordinates.map(e => e-1);
                testDummy.forEach(e=>{
                    if(filled.includes(e)){
                        canMove = false
                    }
                })
                return canMove;
                
                break;
            case "right":
                console.log("moved right")
                testDummy = this.coordinates.map(e => e+1)
                testDummy.forEach(e=>{
                    if(filled.includes(e)){
                        canMove = false
                    }
                })
                return canMove;
                break;

        }

    }

    move(direction) {
        switch (direction) {
            case "down":
                console.log("moved down")
                this.coordinates = this.coordinates.map(e => e+12)
                this.position()
                break;
            case "left":
                console.log("moved left")
                this.coordinates = this.coordinates.map(e => e-1)
                this.position()
                break;
            case "right":
                console.log("moved right")
                this.coordinates = this.coordinates.map(e => e+1)
                this.position()
                break;

        }
    }
}