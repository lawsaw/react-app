import React from 'react';

export default class extends React.Component {

    state = {
        grid: [
            [
                {id: 1, value: false},
                {id: 2, value: false},
                {id: 3, value: false},
            ],
            [
                {id: 4, value: false},
                {id: 5, value: false},
                {id: 6, value: false},
            ],
            [
                {id: 7, value: false},
                {id: 8, value: false},
                {id: 9, value: false},
            ] 
        ],
        symbol: 'X'
    }

    copyDeep = (obj) => {
        let res;
        if(Array.isArray(obj)) {
            let cloneArr = [];
            for(let i in obj) {
                cloneArr.push(this.copyDeep(obj[i]));
            }
            res = cloneArr;
        } else if(Object.prototype.toString(obj) == 'Object object') {
            let cloneObj = {};
            for(let i in obj) {
                cloneObj[i] = this.copyDeep(obj[i]);
            }
            res = cloneObj;
        }
         else {
             res = obj;
        }
        return res;
    }

    togglePlayer = () => {
        let { symbol } = this.state;
        this.state.symbol = symbol == 'X' ? '0' : 'X';
    }

    resetGame = () => {
        let { grid } = this.state;
        let gridNew = this.copyDeep(grid);
        gridNew.map(r => r.map(c => {
            c.value = false;
        }))
        this.setState(() => ({
            grid: gridNew
        }));
    }

    isWinner = () => {
        let { symbol } = this.state;
        let winners = [
            [
                this.getValue(1),
                this.getValue(2),
                this.getValue(3)
            ],
            [
                this.getValue(4),
                this.getValue(5),
                this.getValue(6)
            ],
            [
                this.getValue(7),
                this.getValue(8),
                this.getValue(9)
            ],
            [
                this.getValue(1),
                this.getValue(4),
                this.getValue(7)
            ],
            [
                this.getValue(2),
                this.getValue(5),
                this.getValue(8)
            ],
            [
                this.getValue(3),
                this.getValue(6),
                this.getValue(9)
            ],
            [
                this.getValue(1),
                this.getValue(5),
                this.getValue(9)
            ],
            [
                this.getValue(3),
                this.getValue(5),
                this.getValue(7)
            ]
        ];
        winners.forEach((comb) => {
            if(comb[0] !=false && comb[0] === comb[1] && comb[1] === comb[2]) {
                alert(`Игрок с ${symbol} победил!`);
                this.resetGame();
                return comb;
            }
        })
        return false;
    }

    getValue = (id) => {
        let { grid } = this.state;
        let value;
        grid.forEach((row) => {
            row.forEach((cell) => {
                if (cell.id === id) {
                    value = cell.value;
                }
            })
        });
        return value;
    }

    handleClick = (id) => {
        let { grid, symbol } = this.state;
        let gridNew = this.copyDeep(grid);
        let changedCell;
        gridNew.forEach((row) => {
            row.find((cell) => {
                if (cell.id === id) {
                    changedCell = cell;
                }
            })
        });
        changedCell.value = changedCell.value == false ? symbol : changedCell.value;
        this.setState(() => ({
            grid: gridNew
        }));
        this.isWinner();
        this.togglePlayer();

    }

    renderGrid = () => {
        let { grid } = this.state;
        return grid.map((item, index) => {
            let row = (
                <div className="grid-row">
                    {
                        item.map((el, index) => {
                            return (
                                <div className="grid-cell" onClick={() => this.handleClick(el.id)}>
                                    {el.value}
                                </div>
                            )
                        })
                    }
                </div>
            )
            return row;
        })
    }

    render() {
        let grid = this.renderGrid();
        return (
            <div className="grid">
                {grid}
            </div>
        )
    }
}