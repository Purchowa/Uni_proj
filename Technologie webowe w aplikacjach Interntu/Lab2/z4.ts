abstract class Animal{
    constructor(protected name: string){}
    abstract makeSound(): string;
}

export class Dog extends Animal{
    constructor(name: string){
        super(name);
    }

    makeSound(): string{
        return "Woof";
    }
}

export class Cat extends Animal{
    constructor(name: string){
        super(name);
    }

    makeSound(): string{
        return "Miau";
    }
}