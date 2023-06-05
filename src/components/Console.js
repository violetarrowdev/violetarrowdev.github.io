import { Component } from 'react';
import { ConsoleManager } from './ConsoleManager.js'

export default class Console extends Component {

    state = {
        text: "",
        index: 0,
        flasher: " ",
        textLoop: null
    }

    toggleFlasher() {
        // Flasher code
        let flasherLoop = null;
        if (this.props.useFlasher) {
            let flasherInterval = 600;
            flasherLoop = setInterval(() => {
                if (this.state.flasher === " ") {
                    this.setState({
                        flasher: "_",
                    });
                } else {
                    this.setState({
                        flasher: " ",
                    });
                }
            }, flasherInterval);
        }

        return flasherLoop;
    }

    animateText() {
        // Text animating code
        let textInterval = 80;
        const animation = () => {
            if (this.state.index < this.props.fullText.length) {
                this.setState({
                    text: this.state.text + this.props.fullText[this.state.index],
                    index: this.state.index + 1,
                })
            } else {
                clearInterval(this.state.textLoop)
                this.setState({
                    textLoop: null
                })
                ConsoleManager.getInstance()?.clearLast();
            }
        }
        
        this.setState({
            textLoop: setInterval(animation, textInterval)
        })
    }

    componentDidMount() {
        ConsoleManager.getInstance().add(this)

        this.toggleFlasher();
    }

    render() {
        return <span>{this.state.text}{this.state.flasher}</span>
    }
}