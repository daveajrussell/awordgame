import React from 'react';
import './Tile.css';

class Tile extends React.Component {
    constructor(props) {
        super(props);
    }

    handleKeyPress(e) {
        const key = e.key.toLowerCase();
        if (key >= 'a' && key <= 'z') {
            this.props.onTileGuessed(this.props.index, key);
            return true;
        }
        e.preventDefault();
        return false;
    }

    render() {
        const { index, value, guess, rowIndex } = this.props;
        return (
            <input
                accessKey={(index + 1) * rowIndex}
                type="text"
                maxLength="1"
                className={guess.correctLetter && guess.correctLocation ? 'correct-location' : guess.correctLetter ? 'correct-letter' : ''}
                onKeyPress={(e) => this.handleKeyPress(e)}
                defaultValue={value} />
        );
    }
}

export default Tile;