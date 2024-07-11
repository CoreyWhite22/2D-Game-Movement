class GameCharacter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      keys: {
        ArrowUp: false,
        ArrowDown: false,
        ArrowLeft: false,
        ArrowRight: false
      }
    };
  }

  handleKeyDown = (event) => {
    if (this.state.keys.hasOwnProperty(event.key)) {
      this.setState({ keys: { ...this.state.keys, [event.key]: true } });
    }
  }

  handleKeyUp = (event) => {
    if (this.state.keys.hasOwnProperty(event.key)) {
      this.setState({ keys: { ...this.state.keys, [event.key]: false } });
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    this.interval = setInterval(this.moveCharacter, 16.67);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    clearInterval(this.interval);
  }
  moveCharacter = () => {
    let newX = this.state.x;
    let newY = this.state.y;
  
    if (this.state.keys.ArrowUp) {
      newY = Math.max(0, this.state.y - .03);
    }
    if (this.state.keys.ArrowDown) {
      newY = Math.min(12.34, this.state.y + .03); // Limit y to the height of the game box minus character height
    }
    if (this.state.keys.ArrowLeft) {
      newX = Math.max(0, this.state.x - .03);
    }
    if (this.state.keys.ArrowRight) {
      newX = Math.min(6.5, this.state.x + .03); // Limit x to the width of the game box minus character width
    }
  
    this.setState({ x: newX, y: newY });
  }
  
  render() {
    const { x, y } = this.state;
    const style = {
      left: `${x * 50}px`,
      top: `${y * 50}px`,
      position: 'absolute'
    };

    return (
      <div className="game-character" style={style}></div>
    );
  }
}

ReactDOM.render(<GameCharacter />, document.getElementById('root'));