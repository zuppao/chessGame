/* PLACE
 * ----------------------------------------------
 * Line: LINE
 * Column: COLUMN
 */

const LINE = {
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8'
}

const COLUMN = {
    1: 'A',
    2: 'B',
    3: 'C',
    4: 'D',
    5: 'E',
    6: 'F',
    7: 'G',
    8: 'H'
}

class Place {
    constructor(_line, _column) {
        this.Line = _line;
        this.Column = _column;
    }
}