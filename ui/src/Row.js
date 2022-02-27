import React from 'react';
import './Row.css';
import Tile from "./Tile";

class Row extends React.Component {
    constructor(props) {
        super(props);
        let tiles = Array(5).fill({ value: '', guess: { correctLetter: false, correctLocation: false } });
        this.state = {
            guess: props.guess,
            tiles: tiles,
            enabled: props.enabled,
            guessed: props.guessed,
            word: props.word
        };
    }

    onTileGuessed(i, letter) {
        const tiles = this.state.tiles.slice();
        tiles[i] = { enabled: false, value: letter, guess: { correctLetter: false, correctLocation: false } };
        if (i !== this.state.tiles.length - 1)
            tiles[i + 1] = { enabled: true, value: '', guess: { correctLetter: false, correctLocation: false } }
        else
            this.setState({ enabled: true, guessed: false });
        this.setState({ tiles: tiles });
    }

    handleGuess() {
        const guess = this.state.tiles.map(tile => tile.value).join('');
        this.setState({ enabled: false, guessed: true, guess: guess });

        const word = this.state.word.split('');

        const attempts = word.map((e) => { return { letter: e, guessed: false } });
        const tiles = this.state.tiles;

        tiles.forEach((tile, index) => {
            const value = tile.value;
            const occurrences = word.reduce((a, e, i) => {
                if (e === value)
                    a.push(i);
                return a;
            }, []);

            if (occurrences.length > 0) {
                const attempt = attempts.find(e => e.letter === value && !e.guessed);
                if (attempt) {
                    attempt.guessed = true;
                    tile.guess.correctLetter = true;
                    tile.guess.correctLocation = occurrences.some((e) => e === index);
                }
            }
        });

        this.setState({ tiles: tiles });
    }

    render() {
        const { enabled, guessed } = this.state;
        return (
            <main>
                {this.state.tiles.map((tile, index) => (this.renderTile(index, tile)))}
                {enabled && !guessed ? <button onClick={() => this.handleGuess()}>Enter</button> : <span></span>}
            </main>
        );
    }

    renderTile(i, tile) {
        return (
            <Tile
                key={i}
                index={i}
                rowIndex={this.props.key}
                guess={tile.guess}
                onTileGuessed={(i, letter) => this.onTileGuessed(i, letter)}
                value={tile.value}>
            </Tile>
        );
    }
}

export default Row;