var game, playerA, playerB, turnPlayer, selectedPiece, selectedPlace;
var bgColorA = 'bg-warning', bgColorB = 'bg-default', bgColorSelected = 'bg-info';

$(function () {
    ResetGame();

    $(btRestart).on('click', function () {
        ResetGame();
    });

});



function ResetGame() {
    playerA = new Player(1, 'James', 'text-danger', PLAYER_POSITION.UP);
    playerB = new Player(2, 'Bond', 'text-gray', PLAYER_POSITION.DOWN);
    game = new Game(playerA, playerB);
    turnPlayer = playerB;
    ChangeTurn();
    selectedPiece = null;
    targetPlace = '';

    let cells = '';
    let bgColor = '';
    let paint = true;

    //create the board
    for (let l = 8; l >= 1; l--) {
        cells += '<div class="row">';
        for (let c = 1; c <= 8; c++) {

            if (paint) {
                bgColor = bgColorA;
            } else {
                bgColor = bgColorB;
            }

            let idCell = 'idCell_' + LINE[l] + COLUMN[c];
            let idPiece = 'idPiece_' + LINE[l] + COLUMN[c];
            cells += '<div class="col-auto placeXY ' + bgColor + ' text-center p-0"><div id="' + idCell+'" class="pieceContainer border border-secondary" onClick="PlaceClicked(' + l + ',' + c + ')">' +
                '<i id="' + idPiece + '" class=""></i>' +
                '</div></div>';

            paint = !paint;
        }

        paint = !paint;
        cells += '</div>';
    }
    $("#board").empty();
    $("#board").append(cells);

    PlacePieces(playerA.PieceList, playerA.Color);
    PlacePieces(playerB.PieceList, playerB.Color);
}

function PlacePieces(_pieceList, _color) {
    _pieceList.forEach(function (piece) {
        let idPlace = 'idPiece_' + piece.Place.Line + piece.Place.Column;
        $('#' + idPlace).addClass('fas fa-chess-' + piece.Name.toLowerCase());
        $('#' + idPlace).addClass(_color);
    });
}

function ChangeTurn() {
    if (turnPlayer == playerB) {
        turnPlayer = playerA;
    } else {
        turnPlayer = playerB;
    }

    $("#lbTurn").text(turnPlayer.Name);
    let lbClass = $("#lbTurn").attr('class');
    $("#lbTurn").removeClass(lbClass);
    $("#lbTurn").addClass(turnPlayer.Color);


}

function RedrawPieces() {
    for (let l = 8; l >= 1; l--) {
        for (let c = 1; c <= 8; c++) {
            let idPiece = 'idPiece_' + LINE[l] + COLUMN[c];
            let iClass = $("#" + idPiece).attr('class');
            $("#" + idPiece).removeClass(iClass);
        }
    }

    PlacePieces(playerA.PieceList, playerA.Color);
    PlacePieces(playerB.PieceList, playerB.Color);
}

function PlaceClicked(_l, _c) {
    if (selectedPiece == null) {
        let result = IsMyPiece(LINE[_l], COLUMN[_c]);
        if (result != null) {
            SelectPiece(result);
        }
    } else {
        //check if the target|clicked Place has some of my pieces
        let result = IsMyPiece(LINE[_l], COLUMN[_c]);
        if (result != null) {
            SelectPiece(result);
            return;
        }

        //ok, the moviment is possible....
        //create the moviment Obj
        let newPlace = new Place(LINE[_l], COLUMN[_c]);
        let newMoviment = new Moviment(turnPlayer.ID, selectedPiece, newPlace);

        //pass it to 'engine' to perform the moviment and checks....
        let continueGame = game.NewMoviment(newMoviment);
        if (continueGame == true) {
            //the game continues, redraw the moviment on the screen
            RedrawPieces();

            //changing the turn
            SelectPiece(null);
            ChangeTurn();
        }
    }
}


function IsMyPiece(_l, _c) {
    let result = null;

    turnPlayer.PieceList.forEach(function (piece) {
        if (piece.Place.Line === _l && piece.Place.Column === _c) {
            result = piece;
        }
    });
    return result;
}

function SelectPiece(_piece) {
    if (selectedPiece != null) {
        //unpainting the current selection
        let idCellCurrent = 'idCell_' + selectedPiece.Place.Line + selectedPiece.Place.Column;
        $('#' + idCellCurrent).removeClass(bgColorSelected);
    }

    selectedPiece = _piece;
    if (selectedPiece != null) {
        let idCellNew = 'idCell_' + selectedPiece.Place.Line + selectedPiece.Place.Column;
        $('#' + idCellNew).addClass(bgColorSelected);

        selectedPlace = new Place(selectedPiece.Place.Line, selectedPiece.Place.Column);
    } else {
        let idCellCurrent = 'idCell_' + selectedPlace.Line + selectedPlace.Column;
        $('#' + idCellCurrent).removeClass(bgColorSelected);
        selectedPlace = null;
    }
}