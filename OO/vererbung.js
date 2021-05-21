/*Hinweis: Man sollte Englisch und Deutsch nicht so vermischen :-)*/

class Fach{
    constructor(name=""){
        this.name = name;
    }
}

class Note{
    constructor(fach){
        if(!(fach instanceof Fach)){
            throw Error("wrong arguments");
        }
        this.fach = fach;
    }
    get note(){
        throw Error("not implemented");
    }

    toString(){
        return `${this.fach.name}: ${this.note}`
    }

    static round(note) /*Alternative: In eine Math-Util Klasse auslagern*/
    {
        return (Math.round(note * 4) / 4);
    }
}

class MuendlicheNote extends Note
{
    constructor(fach, experteA, experteB) {
        super(fach);
        this.experteA =  experteA;
        this.experteB =  experteB;
    }

    get note(){
        return MuendlicheNote.round((this.experteA * 2 + this.experteB) / 3);
    }

    toString(){
        return super.toString() + ` (66% ${this.experteA} / 33% ${this.experteB})`
    }
}

class SchriftlicheNote extends Note
{
    constructor(fach, pruefungsNote) {
        super(fach);
        this.pruefungsNote =  pruefungsNote;
    }

    get note(){
        return this.pruefungsNote;
    }
}

class Student{
    constructor(name){
        this.name = name;
        this.noten = [];
    }

    addNote(note){
        if(note instanceof  Note)
        {
            this.noten.push(note)
        }
    }

    avg(){
        return this.noten.reduce((previousValue, note)=> previousValue + note.note,0) / this.noten.length;
    }
    passed(){
        return this.noten.length > 0 && this.avg() >= 4;
    }

    toString(){
        return `Name: ${this.name}\n  Durchschnitt: ${this.avg()}\n    ${this.noten.join("\n    ")}\n  Bestanden: ${this.passed() ? "Ja" : "Nein"}`
    }
}

let deutsch = new Fach("Deutsch");
let mathe = new Fach("Mathe");

let student = new Student("Iris");
student.addNote(new MuendlicheNote(deutsch, 3.5, 4));
student.addNote(new SchriftlicheNote(mathe, 5));
console.log(student.toString(), "OOD Übung");

student.addNote(new SchriftlicheNote(deutsch, 6));
console.log(student.toString(), "OOD Übung");
