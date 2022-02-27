import React from 'react';
import './App.css';
import Row from './Row';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:9001/api/word')
      .then(response => response.text())
      .then((word) => {
          const rows = Array(6).fill({ guessed: false, enabled: false, guess: '', word: word });
          this.setState({ rows: rows });
      });
  }

  render() {
    return (
      <div>
        {this.state.rows.map((row, index) => (this.renderRow(row, index)))}
      </div>
    );
  }

  renderRow(row, index) {
    return (<Row key={index} enabled={row.enabled} guessed={row.guessed} guess={row.guess} word={row.word}></Row>);
  }
}

export default App;