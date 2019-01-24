import { Piece } from './Piece';

export class Board {
    pieces: any[];
    lastMove: any;
    turnToMove: string;
    timeWhite: number;
    timeBlack: number;
    capturedPiecesWhite = [];
    capturedPiecesBlack = [];
    whiteRookCaps: Piece[];
    whiteKnightCaps: Piece[];
    whiteBishopCaps: Piece[];
    whiteQueenCaps: Piece[];
    whiteKingCaps: Piece[];
    whitePawnCaps: Piece[];
    blackRookCaps: Piece[];
    blackKnightCaps: Piece[];
    blackBishopCaps: Piece[];
    blackQueenCaps: Piece[];
    blackKingCaps: Piece[];
    blackPawnCaps: Piece[];
    blackPiecesValue = 0;
    whitePiecesValue = 0;
    whiteOnCheck: Boolean;
    blackOnCheck: Boolean;
    history: any[];
    defaultPosition = [
        ['br', 'bh', 'bb', 'bq', 'bk', 'bb', 'bh', 'br'],
        ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
        ['wr', 'wh', 'wb', 'wq', 'wk', 'wb', 'wh', 'wr']
    ];
    castling = ['a8', 'a1', 'e1', 'e8', 'h8', 'h1'];

    constructor(startPosition?: any[], time?: number) {
        this.pieces = [];
        this.history = [];
        this.whiteOnCheck = false;
        this.blackOnCheck = false;
        this.timeBlack = time;
        this.timeWhite = time;
        if (typeof this.timeBlack === 'undefined') {
            this.timeBlack = 1800;
            this.timeWhite = 1800;
        }
        this.turnToMove = 'white';
        if (typeof startPosition === 'undefined') {
            this.drawBoard(this.defaultPosition);
        } else {
            this.drawBoard(startPosition);
        }
        this.whiteRookCaps = [];
        this.whiteKnightCaps = [];
        this.whiteBishopCaps = [];
        this.whiteQueenCaps = [];
        this.whiteKingCaps = [];
        this.whitePawnCaps = [];
        this.blackRookCaps = [];
        this.blackKnightCaps = [];
        this.blackBishopCaps = [];
        this.blackQueenCaps = [];
        this.blackKingCaps = [];
        this.blackPawnCaps = [];
    }

    drawBoard(startPosition: any[]) {
        this.pieces = [];
        this.blackPiecesValue = 0;
        this.whitePiecesValue = 0;
        for ( let row = 0; row < 8 ; row ++) {
            const rowArray = [];
            for ( let column = 0; column < 8; column ++) {
                const piece = new Piece(startPosition[row][column], 4);
                rowArray.push(piece);
                if (piece.color === 'black' && piece.name !== 'king') {
                    this.blackPiecesValue = this.blackPiecesValue + piece.value;
                }
                if (piece.color === 'white' && piece.name !== 'king') {
                    this.whitePiecesValue = this.whitePiecesValue + piece.value;
                }
            }
            this.pieces.push(rowArray);
        }
    }

    move(from: string, to: string): any {
        const columns = {
            a: 0,
            b: 1,
            c: 2,
            d: 3,
            e: 4,
            f: 5,
            g: 6,
            h: 7
        };
        const rows = {
            1: 7,
            2: 6,
            3: 5,
            4: 4,
            5: 3,
            6: 2,
            7: 1,
            8: 0
        };
        const rowTarget = rows[to.substr(1, 1)];
        const columnTarget = columns[to.substr(0, 1)];
        const rowSource = rows[from.substr(1, 1)];
        const columnSource = columns[from.substr(0, 1)];
        let Target = this.pieces[rowTarget][columnTarget];
        const Source = this.pieces[rowSource][columnSource];
        // Un jugador no puede capturar sus propias piezas
        if ( Source.color === Target.color) {
            return;
        }
        // Un casillero en blanco no debe capturar piezas
        if (typeof Source.color === 'undefined' ) {
            return;
        }
        this.pieces[rowTarget][columnTarget] = this.pieces[rowSource][columnSource];
        this.pieces[rowSource][columnSource] = new Piece();
        this.checkCastling(rowSource, columnSource, 'moved');
        // Enroque
        if ( Source.name === 'king' && (rowSource === 0 && rowTarget === 0 && columnSource === 4)) {
            if (columnTarget === 2) {
                this.pieces[0][3] = this.pieces[0][0];
                this.pieces[0][0] = new Piece();
            }
            if (columnTarget === 6) {
                this.pieces[0][5] = this.pieces[0][7];
                this.pieces[0][7] = new Piece();
            }
        }
        if ( Source.name === 'king' && (rowSource === 7 && rowTarget === 7 && columnSource === 4)) {
            if (columnTarget === 2) {
                this.pieces[7][3] = this.pieces[7][0];
                this.pieces[7][0] = new Piece();
            }
            if (columnTarget === 6) {
                this.pieces[7][5] = this.pieces[7][7];
                this.pieces[7][7] = new Piece();
            }
        }
        // Comida al paso
        if (Source.name === 'pawn' && Source.color === 'white' && rowSource === 3 && this.lastMove.moved.getNegativeColor() === 'white' && this.lastMove.moved.name === 'pawn' && rowSource === this.lastMove.rowTarget) {
            if (this.pieces[rowSource][columnTarget].name === 'pawn') {
                Target = this.pieces[rowSource][columnTarget];
                this.pieces[rowSource][columnTarget] = new Piece();
            }
        }
        if (Source.name === 'pawn' && Source.color === 'black' && rowSource === 4 && this.lastMove.moved.getNegativeColor() === 'black' && this.lastMove.moved.name === 'pawn' && rowSource === this.lastMove.rowTarget) {
            if (this.pieces[rowSource][columnTarget].name === 'pawn') {
                Target = this.pieces[rowSource][columnTarget];
                this.pieces[rowSource][columnTarget] = new Piece();
            }
        }
        let promoter = '';
        if ( Source.name === 'pawn' && (rowSource === 1 && rowTarget === 0)) {
            promoter = 'white';
        }
        if ( Source.name === 'pawn' && (rowSource === 6 && rowTarget === 7)) {
            promoter = 'black';
        }
        this.lastMove = {rowSource: rowSource, columnSource: columnSource, rowTarget: rowTarget, columnTarget: columnTarget, moved: Source, captured: Target, promoter: promoter};
        this.turnToMove = Source.getNegativeColor();
        if ( typeof Target.name !== 'undefined') {
            this.addCaptured(Source, Target);
        }
        this.blackPiecesValue = 0;
        this.whitePiecesValue = 0;
        this.pieces.forEach(fila => {
            fila.forEach(piece => {
                if (piece.color === 'black' && piece.name !== 'king') {
                    this.blackPiecesValue = this.blackPiecesValue + piece.value;
                }
                if (piece.color === 'white' && piece.name !== 'king') {
                    this.whitePiecesValue = this.whitePiecesValue + piece.value;
                }
            });
        });
        const newMove = {id: this.history.length + 1, move: from + to};
        this.history.push(newMove);
        this.checkCheck();
        return this.lastMove;
    }

    addCaptured(Source: Piece, Target: Piece) {
        const toAdd = Target;
        toAdd.size = 1;
        toAdd.refresh();
        if (Source.color === 'white') {
            switch (Source.name) {
                case 'rook':
                    this.whiteRookCaps.push(toAdd);
                    break;
                case 'knight':
                    this.whiteKnightCaps.push(toAdd);
                    break;
                case 'bishop':
                    this.whiteBishopCaps.push(toAdd);
                    break;
                case 'queen':
                    this.whiteQueenCaps.push(toAdd);
                    break;
                case 'king':
                    this.whiteKingCaps.push(toAdd);
                    break;
                case 'pawn':
                    this.whitePawnCaps.push(toAdd);
                    break;
            }
        } else {
            switch (Source.name) {
                case 'rook':
                    this.blackRookCaps.push(toAdd);
                    break;
                case 'knight':
                    this.blackKnightCaps.push(toAdd);
                    break;
                case 'bishop':
                    this.blackBishopCaps.push(toAdd);
                    break;
                case 'queen':
                    this.blackQueenCaps.push(toAdd);
                    break;
                case 'king':
                    this.blackKingCaps.push(toAdd);
                    break;
                case 'pawn':
                    this.blackPawnCaps.push(toAdd);
                    break;
            }
        }
    }

    setPawnPromotion(cords: string, value: string) {
        const columns = {
            a: 0,
            b: 1,
            c: 2,
            d: 3,
            e: 4,
            f: 5,
            g: 6,
            h: 7
        };
        const rows = {
            1: 7,
            2: 6,
            3: 5,
            4: 4,
            5: 3,
            6: 2,
            7: 1,
            8: 0
        };
        const rowTarget = rows[cords.substr(1, 1)];
        const columnTarget = columns[cords.substr(0, 1)];
        this.pieces[rowTarget][columnTarget] = new Piece(value, 4);
    }

    deleteFromCastling(cord: string) {
        let match = false;
        this.castling.forEach((item, index) => {
            if (item === cord) {
                match = true;
                this.castling.splice(index, 1);
            }
        });
        return match;
    }

    checkEnPassant(row: number, column: number) {
        if (typeof this.lastMove === 'undefined') {
            return;
        }
        const shadowPawn = new Piece('', 4);
        shadowPawn.set('pawn', 'capture');
        if (this.pieces[row][column].color === 'white' && row === 3 && this.lastMove.moved.getNegativeColor() === 'white' && this.lastMove.moved.name === 'pawn' && row === this.lastMove.rowTarget) {
            if (column < 7) {
                if (this.lastMove.columnTarget === column + 1) {
                    this.pieces[2][column + 1] = shadowPawn;
                }
            }
            if (column > 0) {
                if (this.lastMove.columnTarget === column - 1) {
                    this.pieces[2][column - 1] = shadowPawn;
                }
            }
        }
        if (this.pieces[row][column].color === 'black' && row === 4 && this.lastMove.moved.getNegativeColor() === 'black' && this.lastMove.moved.name === 'pawn' && row === this.lastMove.rowTarget) {
            if (column < 7) {
                if (this.lastMove.columnTarget === column + 1) {
                    this.pieces[5][column + 1] = shadowPawn;
                }
            }
            if (column > 0) {
                if (this.lastMove.columnTarget === column - 1) {
                    this.pieces[5][column - 1] = shadowPawn;
                }
            }
        }
    }

    isInCastling(cord: string) {
        let match = false;
        this.castling.forEach((item, index) => {
            if (item === cord) {
                match = true;
            }
        });
        return match;
    }

    checkCastling(row: number, column: number, command: string) {
        const shadowKing = new Piece('sk', 4);
        switch (command) {
            case 'moved':
                if (row === 0 && column === 4) {
                    this.deleteFromCastling('a8');
                    this.deleteFromCastling('h8');
                    this.deleteFromCastling('e8');
                }

                if (row === 0 && column === 0) {
                    this.deleteFromCastling('a8');
                }

                if (row === 0 && column === 7) {
                    this.deleteFromCastling('h8');
                }

                if (row === 7 && column === 4) {
                    this.deleteFromCastling('a1');
                    this.deleteFromCastling('h1');
                    this.deleteFromCastling('e1');
                }

                if (row === 7 && column === 0) {
                    this.deleteFromCastling('a1');
                }

                if (row === 7 && column === 7) {
                    this.deleteFromCastling('h1');
                }
            break;
            case 'verificar':
                const boardNow = this.getCurrentPosition();
                if (row === 0 && column === 4) {
                    if (boardNow[0][1] === '' && boardNow[0][2] === '' && boardNow[0][3] === '' && this.isInCastling('e8') && this.isInCastling('a8')) {
                        this.pieces[0][2] = shadowKing;
                    }
                    if (boardNow[0][5] === '' && boardNow[0][6] === '' && this.isInCastling('e8') && this.isInCastling('h8')) {
                        this.pieces[0][6] = shadowKing;
                    }
                }
                if (row === 7 && column === 4) {
                    if (boardNow[7][1] === '' && boardNow[7][2] === '' && boardNow[7][3] === '' && this.isInCastling('e1') && this.isInCastling('a1')) {
                        this.pieces[7][2] = shadowKing;
                    }
                    if (boardNow[7][5] === '' && boardNow[7][6] === '' && this.isInCastling('e1') && this.isInCastling('h1')) {
                        this.pieces[7][6] = shadowKing;
                    }
                }
            break;
        }

    }

    drawShadow(row: number, column: number, currentPiece: Piece): Boolean {
        const shadowPiece = new Piece('', 4);
        let toReturn = false;
        let name = currentPiece.name;
        if (this.pieces[row][column].color !== currentPiece.color) {
            if (this.pieces[row][column].getNegativeColor() === currentPiece.color) {
                shadowPiece.color = 'capture';
                name = this.pieces[row][column].name;
                toReturn = true;
            } else {
                shadowPiece.color = 'shadow';
                toReturn = false;
            }
            shadowPiece.set(name, shadowPiece.color);
            this.pieces[row][column] = shadowPiece;
        } else {
            toReturn = true;
        }
        return toReturn;
    }

    isEnemyKing(row: number, column: number, color: string): Boolean {
        return this.pieces[row][column].name === 'king' && this.pieces[row][column].getNegativeColor() === color;
    }

    setCheck(row: number, column: number, color: string): Boolean {
        let toReturn = false;
        if (this.isEnemyKing(row, column, color)) {
            this.pieces[row][column].color = 'check2' + this.pieces[row][column].color;
            this.pieces[row][column].refresh();
            toReturn = true;
        }
        if (this.pieces[row][column].color === 'black' || this.pieces[row][column].color === 'white') {
            toReturn = true;
        }
        return toReturn;
    }

    checkCheck() {
        for (let row = 0; row <= 7; row++) {
            for (let column = 0; column <= 7; column++) {
                let currentPiece: Piece;
                currentPiece = this.pieces[row][column];
                switch (currentPiece.name) {
                    case 'knight':
                        if (row < 7) {
                            if (column < 6) {
                                this.setCheck(row + 1, column + 2, currentPiece.color);
                            }
                            if (column >= 2) {
                                this.setCheck(row + 1, column - 2, currentPiece.color);
                            }
                        }
                        if (row >= 1) {
                            if (column < 6) {
                                this.setCheck(row - 1, column + 2, currentPiece.color);
                            }
                            if (column >= 2) {
                                this.setCheck(row - 1, column - 2, currentPiece.color);
                            }
                        }
                        if (row >= 2) {
                            if (column < 7) {
                                this.setCheck(row - 2, column + 1, currentPiece.color);
                            }
                            if (column >= 1) {
                                this.setCheck(row - 2, column - 1, currentPiece.color);
                            }
                        }
                        if (row < 6) {
                            if (column < 7) {
                                this.setCheck(row + 2, column + 1, currentPiece.color);
                            }
                            if (column >= 1) {
                                this.setCheck(row + 2, column - 1, currentPiece.color);
                            }
                        }
                    break;
                    case 'rook':
                        for ( let i = row + 1; i < 8; i++) {
                            if (this.setCheck(i, column, currentPiece.color)) {
                                break;
                            }
                        }
                        for ( let i = column + 1; i < 8; i++) {
                            if (this.setCheck(row, i, currentPiece.color)) {
                                break;
                            }
                        }
                        for ( let i = row - 1; i >= 0; i--) {
                            if (this.setCheck(i, column, currentPiece.color)) {
                                break;
                            }
                        }
                        for ( let i = column - 1; i >= 0; i--) {
                            if (this.setCheck(row, i, currentPiece.color)) {
                                break;
                            }
                        }
                    break;
                    case 'bishop':
                        for ( let i = row + 1,  j = column + 1; i < 8 && j < 8; i++, j++) {
                            if (this.setCheck(i, j, currentPiece.color)) {
                                break;
                            }
                        }
                        for ( let i = row - 1,  j = column - 1; i >= 0 && j >= 0; i--, j--) {
                            if (this.setCheck(i, j, currentPiece.color)) {
                                break;
                            }
                        }
                        for ( let i = row + 1,  j = column - 1; i < 8 && j >= 0; i++, j--) {
                            if (this.setCheck(i, j, currentPiece.color)) {
                                break;
                            }
                        }
                        for ( let i = row - 1,  j = column + 1; i >= 0 && j < 8; i--, j++) {
                            if (this.setCheck(i, j, currentPiece.color)) {
                                break;
                            }
                        }
                    break;
                    case 'queen':
                        for ( let i = row + 1,  j = column + 1; i < 8 && j < 8; i++, j++) {
                            if (this.setCheck(i, j, currentPiece.color)) {
                                break;
                            }
                        }
                        for ( let i = row - 1,  j = column - 1; i >= 0 && j >= 0; i--, j--) {
                            if (this.setCheck(i, j, currentPiece.color)) {
                                break;
                            }
                        }
                        for ( let i = row + 1,  j = column - 1; i < 8 && j >= 0; i++, j--) {
                            if (this.setCheck(i, j, currentPiece.color)) {
                                break;
                            }
                        }
                        for ( let i = row - 1,  j = column + 1; i >= 0 && j < 8; i--, j++) {
                            if (this.setCheck(i, j, currentPiece.color)) {
                                break;
                            }
                        }
                        for ( let i = row + 1; i < 8; i++) {
                            if (this.setCheck(i, column, currentPiece.color)) {
                                break;
                            }
                        }
                        for ( let i = column + 1; i < 8; i++) {
                            if (this.setCheck(row, i, currentPiece.color)) {
                                break;
                            }
                        }
                        for ( let i = row - 1; i >= 0; i--) {
                            if (this.setCheck(i, column, currentPiece.color)) {
                                break;
                            }
                        }
                        for ( let i = column - 1; i >= 0; i--) {
                            if (this.setCheck(row, i, currentPiece.color)) {
                                break;
                            }
                        }
                    break;
                    case 'pawn':
                        if (currentPiece.color === 'black') {
                            if (row > 0 && row < 7) {
                                if (column < 7) {
                                    this.setCheck(row + 1, column + 1, currentPiece.color);
                                }
                                if (column > 0) {
                                    this.setCheck(row + 1, column - 1, currentPiece.color);
                                }
                            }
                        }
                        if (currentPiece.color === 'white') {
                            if (row > 0 && row < 7) {
                                if (column < 7) {
                                    this.setCheck(row - 1, column + 1, currentPiece.color);
                                }
                                if (column > 0) {
                                    this.setCheck(row - 1, column - 1, currentPiece.color);
                                }
                            }
                        }
                    break;
                }
            }
        }
    }

    checkMate() {

    }

    checkPosibilities(row: number, column: number) {
        this.findChecks();
        console.log(this.whiteOnCheck);
        console.log(this.blackOnCheck);
        let currentPiece: Piece;
        currentPiece = this.pieces[row][column];
        if (currentPiece.color !== this.turnToMove) {
            return;
        }
        switch (currentPiece.name) {
            case 'knight':
                if (row < 7) {
                    if (column < 6) {
                        this.drawShadow(row + 1, column + 2, currentPiece);
                    }
                    if (column >= 2) {
                        this.drawShadow(row + 1, column - 2, currentPiece);
                    }
                }
                if (row >= 1) {
                    if (column < 6) {
                        this.drawShadow(row - 1, column + 2, currentPiece);
                    }
                    if (column >= 2) {
                        this.drawShadow(row - 1, column - 2, currentPiece);
                    }
                }
                if (row >= 2) {
                    if (column < 7) {
                        this.drawShadow(row - 2, column + 1, currentPiece);
                    }
                    if (column >= 1) {
                        this.drawShadow(row - 2, column - 1, currentPiece);
                    }
                }
                if (row < 6) {
                    if (column < 7) {
                        this.drawShadow(row + 2, column + 1, currentPiece);
                    }
                    if (column >= 1) {
                        this.drawShadow(row + 2, column - 1, currentPiece);
                    }
                }
            break;
            case 'rook':
                for ( let i = row + 1; i < 8; i++) {
                    if (this.drawShadow(i, column, currentPiece)) {
                        break;
                    }
                }
                for ( let i = column + 1; i < 8; i++) {
                    if (this.drawShadow(row, i, currentPiece)) {
                        break;
                    }
                }
                for ( let i = row - 1; i >= 0; i--) {
                    if (this.drawShadow(i, column, currentPiece)) {
                        break;
                    }
                }
                for ( let i = column - 1; i >= 0; i--) {
                    if (this.drawShadow(row, i, currentPiece)) {
                        break;
                    }
                }
            break;
            case 'bishop':
                for ( let i = row + 1,  j = column + 1; i < 8 && j < 8; i++, j++) {
                    if (this.drawShadow(i, j, currentPiece)) {
                        break;
                    }
                }
                for ( let i = row - 1,  j = column - 1; i >= 0 && j >= 0; i--, j--) {
                    if (this.drawShadow(i, j, currentPiece)) {
                        break;
                    }
                }
                for ( let i = row + 1,  j = column - 1; i < 8 && j >= 0; i++, j--) {
                    if (this.drawShadow(i, j, currentPiece)) {
                        break;
                    }
                }
                for ( let i = row - 1,  j = column + 1; i >= 0 && j < 8; i--, j++) {
                    if (this.drawShadow(i, j, currentPiece)) {
                        break;
                    }
                }
            break;
            case 'queen':
                for ( let i = row + 1,  j = column + 1; i < 8 && j < 8; i++, j++) {
                    if (this.drawShadow(i, j, currentPiece)) {
                        break;
                    }
                }
                for ( let i = row - 1,  j = column - 1; i >= 0 && j >= 0; i--, j--) {
                    if (this.drawShadow(i, j, currentPiece)) {
                        break;
                    }
                }
                for ( let i = row + 1,  j = column - 1; i < 8 && j >= 0; i++, j--) {
                    if (this.drawShadow(i, j, currentPiece)) {
                        break;
                    }
                }
                for ( let i = row - 1,  j = column + 1; i >= 0 && j < 8; i--, j++) {
                    if (this.drawShadow(i, j, currentPiece)) {
                        break;
                    }
                }
                for ( let i = row + 1; i < 8; i++) {
                    if (this.drawShadow(i, column, currentPiece)) {
                        break;
                    }
                }
                for ( let i = column + 1; i < 8; i++) {
                    if (this.drawShadow(row, i, currentPiece)) {
                        break;
                    }
                }
                for ( let i = row - 1; i >= 0; i--) {
                    if (this.drawShadow(i, column, currentPiece)) {
                        break;
                    }
                }
                for ( let i = column - 1; i >= 0; i--) {
                    if (this.drawShadow(row, i, currentPiece)) {
                        break;
                    }
                }
            break;
            case 'king':
                if (row === 0) {
                    this.checkCastling(row, column, 'verificar');
                    this.drawShadow(row + 1, column, currentPiece);
                    if (column > 0) {
                        this.drawShadow(row, column - 1, currentPiece);
                        this.drawShadow(row + 1, column - 1, currentPiece);
                    }
                    if (column < 7) {
                        this.drawShadow(row, column + 1, currentPiece);
                        this.drawShadow(row + 1, column + 1, currentPiece);
                    }
                }
                if (row > 0 && row < 7) {
                    this.drawShadow(row - 1, column, currentPiece);
                    this.drawShadow(row + 1, column, currentPiece);
                    if (column > 0) {
                        this.drawShadow(row + 1, column - 1, currentPiece);
                        this.drawShadow(row - 1, column - 1, currentPiece);
                        this.drawShadow(row, column - 1, currentPiece);
                    }
                    if (column < 7) {
                        this.drawShadow(row + 1, column + 1, currentPiece);
                        this.drawShadow(row - 1, column + 1, currentPiece);
                        this.drawShadow(row, column + 1, currentPiece);
                    }
                }
                if (row === 7) {
                    this.checkCastling(row, column, 'verificar');
                    this.drawShadow(row - 1, column, currentPiece);
                    if (column > 0) {
                        this.drawShadow(row, column - 1, currentPiece);
                        this.drawShadow(row - 1, column - 1, currentPiece);
                    }
                    if (column < 7) {
                        this.drawShadow(row, column + 1, currentPiece);
                        this.drawShadow(row - 1, column + 1, currentPiece);
                    }
                }
            break;
            case 'pawn':
                const shadowPawn = new Piece('sp', 4);
                this.checkEnPassant(row, column);
                if (currentPiece.color === 'black') {
                    if (row === 1) {
                        if (this.pieces[row + 1][column].color !== 'black' && this.pieces[row + 1][column].color !== 'white') {
                            this.pieces[row + 1][column] = shadowPawn;
                            if (this.pieces[row + 2][column].color !== 'black' && this.pieces[row + 2][column].color !== 'white') {
                                this.pieces[row + 2][column] = shadowPawn;
                            }
                        }
                    }
                    if (row > 1 && row < 7) {
                        if (this.pieces[row + 1][column].color !== 'black' && this.pieces[row + 1][column].color !== 'white') {
                            this.pieces[row + 1][column] = shadowPawn;
                        }
                    }
                    if (row > 0 && row < 7) {
                        if (column < 7) {
                            if (this.pieces[row + 1][column + 1].color === 'white') {
                                const eatPawn = new Piece('', 4);
                                eatPawn.set(this.pieces[row + 1][column + 1].name, 'capture');
                                this.pieces[row + 1][column + 1] = eatPawn;
                            }
                        }
                        if (column > 0) {
                            if (this.pieces[row + 1][column - 1].color === 'white') {
                                const eatPawn = new Piece('', 4);
                                eatPawn.set(this.pieces[row + 1][column - 1].name, 'capture');
                                this.pieces[row + 1][column - 1] = eatPawn;
                            }
                        }
                    }
                }
                if (currentPiece.color === 'white') {
                    if (row === 6) {
                        if (this.pieces[row - 1][column].color !== 'black' && this.pieces[row - 1][column].color !== 'white') {
                            this.pieces[row - 1][column] = shadowPawn;
                            if (this.pieces[row - 2][column].color !== 'black' && this.pieces[row - 2][column].color !== 'white') {
                                this.pieces[row - 2][column] = shadowPawn;
                            }
                        }
                    }
                    if (row > 0 && row < 6) {
                        if (this.pieces[row - 1][column].color !== 'black' && this.pieces[row - 1][column].color !== 'white') {
                            this.pieces[row - 1][column] = shadowPawn;
                        }
                    }
                    if (row > 0 && row < 7) {
                        if (column < 7) {
                            if (this.pieces[row - 1][column + 1].color === 'black') {
                                const eatPawn = new Piece('', 4);
                                eatPawn.set(this.pieces[row - 1][column + 1].name, 'capture');
                                this.pieces[row - 1][column + 1] = eatPawn;
                            }
                        }
                        if (column > 0) {
                            if (this.pieces[row - 1][column - 1].color === 'black') {
                                const eatPawn = new Piece('', 4);
                                eatPawn.set(this.pieces[row - 1][column - 1].name, 'capture');
                                this.pieces[row - 1][column - 1] = eatPawn;
                            }
                        }
                    }
                }
            break;
        }
    }

    findChecks() {
        this.whiteOnCheck = false;
        this.blackOnCheck = false;
        this.pieces.forEach(fila => {
            fila.forEach(piece => {
                if (piece.color === 'check2white') {
                    this.whiteOnCheck = true;
                }
                if (piece.color === 'check2black') {
                    this.blackOnCheck = true;
                }
            });
        });
    }

    getCurrentPosition() {
        const toReturn = [];
        this.pieces.forEach(row => {
            const toReturnrow = [];
            row.forEach(pieza => {
                toReturnrow.push(pieza.getLabel());
            });
            toReturn.push(toReturnrow);
        });
        return toReturn;
    }
}
