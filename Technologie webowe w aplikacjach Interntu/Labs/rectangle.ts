
class Point{
    constructor(private x: number, private y: number){}

    move(vector: Point){
        this.x += vector.x;
        this.y += vector.y;
    }

    length(){
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    static createVector(pointA: Point, pointB: Point): Point{
        return new Point(pointB.x - pointA.x, pointB.y - pointA.y);
    }
}

class Rectangle{
    constructor(private vertices: Point[]){
        const VERTICES_NUM = 4;

        if (vertices.length !== VERTICES_NUM){
            throw Error(`Rectangle must have ${VERTICES_NUM} vertices!`);
        }
    }

    move(vector: Point): void{
        this.vertices.forEach(vertex => vertex.move(vector));
    }

    getArea(): number{
        return Point.createVector(this.vertices[1], this.vertices[0]).length() *
        Point.createVector(this.vertices[3], this.vertices[0]).length();
    }

}

export {Point, Rectangle};