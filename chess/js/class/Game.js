/* GAME
 * ----------------------------------------------
 * PlayerA: Player
 * PlayerB: Player
 * MovementList: Moviment[]
 * NewMoviment(_moviment: Moviment): bool
 * CheckPossibility(_moviment: Moviment): bool
 * IsKingDead(_playerID: int): bool
 */

class Game {
    constructor(_playerA, _playerB) {
        this.PlayerA = _playerA;
        this.PlayerB = _playerB;
        this.MovimentList = [];
    }



    NewMoviment = function (_moviment) {
        //This will be the main method that will control the behavior of the game (ENGINE)

        let result = this._CheckPossibility(_moviment);
        if (result == true) {
            //log...
            //this.MovementList.push(_moviment);


            //getting opponent ID
            let opponentId;
            if (_moviment.PlayerID == this.PlayerA.ID) {
                this.PlayerA.MovimentList.push(_moviment);//add the moviment on Player A log
                opponentId = this.PlayerB.ID;
            } else {
                this.PlayerB.MovimentList.push(_moviment);//add the moviment on Player B log
                opponentId = this.PlayerA.ID;
            }

            //check if target Place has some opponent piece
            this._CheckOpponentPieces(opponentId, _moviment.NewPlace);


            //check if King was captured
            let kingWasCaptured = this._IsKingDead(opponentId);
            console.log("... the king of the player " + opponentId + " was captured: " + kingWasCaptured);
            if (kingWasCaptured == true) {
                console.log("game over!");
                return false;// the game  won´t continue...
            }
        }

        return true;//return true to continue the game...
    }

    _CheckPossibility = function (_moviment) {
        //check and assume the new place for this piece if it´s possible
        let result = _moviment.Piece.CheckMoviment(_moviment.NewPlace);

        if (result == false) {//the destination place is out of reach of the current Piece
            return result;
        }

        return result;
    }


    _CheckOpponentPieces = function (_playerID, _newPlace) {
        let opponentPlayer;
        if (_playerID == this.PlayerA.ID) {
            opponentPlayer = this.PlayerA;
        } else {
            opponentPlayer = this.PlayerB;
        }

        opponentPlayer.PieceList.forEach(function (piece) {
            if (piece.Place.Line == _newPlace.Line && piece.Place.Column == _newPlace.Column) {
                opponentPlayer.RemovePiece(piece);
            }
        });

    }


    _IsKingDead = function (_playerID) {
        let opponentPlayer, result = true;
        if (_playerID == this.PlayerA.ID) {
            opponentPlayer = this.PlayerA;
        } else {
            opponentPlayer = this.PlayerB;
        }

        opponentPlayer.PieceList.forEach(function (piece) {
            if (piece.Name === PIECE_NAME.KING) {
                result = false;//the king is alive / is on the game....
            }
        });

        return result;
    }

}