/* PLAYER
 * ----------------------------------------------
 * ID: int
 * Name: string
 * MovementList: Moviment[]
 * PiecesList: Piece[]
 * RemovePiece(_place: Piece): void
 * NewPlace(_place: Place): void
 */

const PLAYER_POSITION = {
    UP: 'up',
    DOWN: 'down'
}
class Player {
    constructor(_id, _name, _color, _playerPosition) {
        this.ID = _id;
        this.Name = _name;
        this.Color = _color;
        this.MovimentList = [];
        this.PieceList = [];

        this._Reset(_playerPosition);
    }

    _Reset = function (_playerPosition) {
        this.MovimentList.length = 0;
        this.PieceList.length = 0;
        let pawnLine, warriorLine;
        if (_playerPosition == PLAYER_POSITION.UP) {
            pawnLine = LINE[7];
            warriorLine = LINE[8];
        } else {
            pawnLine = LINE[2];
            warriorLine = LINE[1];
        }

        //PAWNs
        this.PieceList.push(
            new Piece(PIECE_NAME.PAWN, new Place(pawnLine, COLUMN[1])),
            new Piece(PIECE_NAME.PAWN, new Place(pawnLine, COLUMN[2])),
            new Piece(PIECE_NAME.PAWN, new Place(pawnLine, COLUMN[3])),
            new Piece(PIECE_NAME.PAWN, new Place(pawnLine, COLUMN[4])),
            new Piece(PIECE_NAME.PAWN, new Place(pawnLine, COLUMN[5])),
            new Piece(PIECE_NAME.PAWN, new Place(pawnLine, COLUMN[6])),
            new Piece(PIECE_NAME.PAWN, new Place(pawnLine, COLUMN[7])),
            new Piece(PIECE_NAME.PAWN, new Place(pawnLine, COLUMN[8]))
        );

        //WARRIORs
        this.PieceList.push(
            new Piece(PIECE_NAME.KING, new Place(warriorLine, COLUMN[5])),//e
            new Piece(PIECE_NAME.QUEEN, new Place(warriorLine, COLUMN[4])),//d
            new Piece(PIECE_NAME.BISHOP, new Place(warriorLine, COLUMN[3])),//c
            new Piece(PIECE_NAME.BISHOP, new Place(warriorLine, COLUMN[6])),//f
            new Piece(PIECE_NAME.KNIGHT, new Place(warriorLine, COLUMN[2])),//b
            new Piece(PIECE_NAME.KNIGHT, new Place(warriorLine, COLUMN[7])),//g
            new Piece(PIECE_NAME.ROOK, new Place(warriorLine, COLUMN[1])),//a
            new Piece(PIECE_NAME.ROOK, new Place(warriorLine, COLUMN[8]))//h
        );
    }

    RemovePiece = function (_piece) {
        this.PieceList = this.PieceList.filter(p => p !== _piece);
    }



    //-------------------------------------------------
    //I realize that it won´t be necessary
    NewPlace = function (_place) {
        console.log("new place for player " + this.Name);
    }
    //-------------------------------------------------

}