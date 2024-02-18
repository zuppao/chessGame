/* PIECE
 * ----------------------------------------------
 * Name: string
 * Place: Place
 * CheckMoviment(_place: Place): bool
 */

const PIECE_NAME = {
    KING: 'King',
    QUEEN: 'Queen',
    BISHOP: 'Bishop',
    KNIGHT: 'Knight',
    ROOK: 'Rook',
    PAWN: 'Pawn'
}

const PieceMoviments = {
    King(_currentPlace, _newPlace) {
        console.log("checking the moviment of an King...");
        return true;
    },
    Queen(_currentPlace, _newPlace) {
        console.log("checking the moviment of an Queen...");
        return true;
    },
    Bishop(_currentPlace, _newPlace) {
        console.log("checking the moviment of an Bishop...");
        return true;
    },
    Knight(_currentPlace, _newPlace) {
        console.log("checking the moviment of an Knight...");
        return true;
    },
    Rook(_currentPlace, _newPlace) {
        console.log("checking the moviment of an Rook...");
        return true;
    },
    Pawn(_currentPlace, _newPlace) {
        console.log("checking the moviment of an Pawn...");
        return true;
    }
}


class Piece {
    constructor(_name, _place) {
        this.Name = _name;
        this.Place = _place;
    }

    CheckMoviment = function (_place) {
        const pieceMoviment = PieceMoviments[this.Name];
        let result = pieceMoviment(this.Place, _place);

        //assuming the ne position for this piece....
        if (result == true) {
            this.Place.Line = _place.Line;
            this.Place.Column = _place.Column;
        }

        return result;
    }
}