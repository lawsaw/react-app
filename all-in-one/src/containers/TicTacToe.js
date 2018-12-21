import React, { Component } from 'react';

export default class extends Component {

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
        } else if(Object.prototype.toString(obj) === 'Object object') {
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
        this.setState(() => ({
            symbol: symbol === 'X' ? '0' : 'X'
        }))
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
        this.setState(() => ({
            symbol: 'X'
        }));
        return false;
    }

    isWinner = () => {
        let { symbol } = this.state;

        let winners = [
            [1,2,3],
            [4,5,6],
            [7,8,9],
            [1,4,7],
            [2,5,8],
            [3,6,9],
            [1,5,9],
            [3,5,7]
        ];

        let value_1, value_2, value_3;

        winners.forEach((comb) => {
            value_1 = this.getValue(comb[0]);
            value_2 = this.getValue(comb[1]);
            value_3 = this.getValue(comb[2]);
            if(value_1 !== false && value_1 === value_2 && value_2 === value_3) {
                alert(`Игрок с ${symbol} победил!`);
                this.resetGame();
                return comb;
            }
        })
        this.togglePlayer();
        return false;
    }

    getValue = (id) => {

        // let {grid} = this.state;
        // return grid[Math.floor(pos/3)][pos%3].value;

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
        changedCell.value = changedCell.value === false ? symbol : changedCell.value;

        setTimeout(() => {
            this.isWinner();
        },100);

        this.setState(() => ({
            grid: gridNew
        }));

        return id;
    }

    renderGrid = () => {
        let { grid } = this.state;
        return grid.map((item, index1) => {
            let row = (
                <div key={index1} className="grid-row">
                    {
                        item.map((el, index2) => {
                            return (
                                <div key={index2} className="grid-cell" onClick={() => this.handleClick(el.id)}>
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