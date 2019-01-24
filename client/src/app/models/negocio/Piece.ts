export class Piece {
    name: string;
    color: string;
    value: number;
    size: number;
    image: string;

    constructor(value?: string, size?: number) {
        this.size = size;
        if ( typeof this.size === 'undefined') {
            this.size = 1;
        }
        if ( typeof value === 'undefined') {
            value = '';
        }
        this.getPiece(value);
    }

    public set(name: string, color: string) {
        this.name = name;
        this.color = color;
        const Valores = {
            rook: 5,
            knight: 3,
            bishop: 3,
            queen: 9,
            king: 1000,
            pawn: 1,
        };
        this.value = Valores[this.name];
        this.size = 4;
        this.image = this.color + ' fas fa-chess-' + this.name + ' fa-' + this.size.toString() + 'x';
    }

    public refresh() {
        this.image = this.color + ' fas fa-chess-' + this.name + ' fa-' + this.size.toString() + 'x';
    }

    getPiece(value: string) {
        let name = '';
        let color = '';
        const Colors = {
            b: 'black',
            w: 'white',
            s: 'shadow',
        };
        const Names = {
            r: 'rook',
            h: 'knight',
            b: 'bishop',
            q: 'queen',
            k: 'king',
            p: 'pawn',
        };
        color = Colors[value.substr(0, 1)];
        name = Names[value.substr(1, 1)];
        this.set(name, color);
    }

    getLabel() {
        const Colors = {
            black: 'b',
            white: 'w',
            shadow: 's',
            check2white: 'w',
            check2black: 'b',
        };
        const Names = {
            rook: 'r',
            knight: 'h',
            bishop: 'b',
            queen: 'q',
            king: 'k',
            pawn: 'p',
        };
        if (typeof this.color === 'undefined') {
            return '';
        } else {
            return Colors[this.color] + Names[this.name];
        }
    }

    getNegativeColor() {
        if (this.color === 'black') {
            return 'white';
        }
        if (this.color === 'white') {
            return 'black';
        }
        return '';
    }
}
