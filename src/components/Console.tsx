import { Component } from 'react';
import { ConsoleManager } from './ConsoleManager'
import PropTypes from 'prop-types';

interface ConsoleState {
    text: string,
    index: number,
    flasher: FlasherState,
    textLoop: NodeJS.Timer | null,
    flasherLoop: NodeJS.Timer | null
}

interface ConsoleProps {
    useFlasher: boolean | undefined,
    fullText: string
}

const enum FlasherState {
    On = "_",
    Off = " "
}

/**
 * A snippet of text that plays a typing animation. Gets added to ConsoleManager's animation queue on mounting.
 */
export default class Console extends Component<ConsoleProps, ConsoleState> {

    static propTypes = {
        useFlasher: PropTypes.bool,
        fullText: PropTypes.string.isRequired
    };

    state = {
        text: "",
        index: 0,
        flasher: FlasherState.Off,
        textLoop: null,
        flasherLoop: null
    }

    /**
     * Begins animating the flasher, if enabled for this console.
     */
    animateFlasher(): void {
        // Flasher code
        if (this.props.useFlasher) {
            let flasherInterval = 600;
            let loop = setInterval(() => {
                if (this.state.flasher === " ") {
                    this.setState({
                        flasher: FlasherState.On,
                    });
                } else {
                    this.setState({
                        flasher: FlasherState.Off,
                    });
                }
            }, flasherInterval);
            // Add a reference to this loop
            this.setState({
                flasherLoop: loop
            });
        }
    }

    /**
     * Begins animating this text until fullText is revealed.
     */
    animateText(): void {
        let textInterval = 80;
        const animation = () => {
            if (this.state.index < this.props.fullText.length) {
                this.setState({
                    text: this.state.text + this.props.fullText[this.state.index],
                    index: this.state.index + 1,
                })
            } else {
                this.stopTextAnimation(true);
            }
        }
        
        this.setState({
            textLoop: setInterval(animation, textInterval)
        })
    }

    /**
     * Stops animating the text on this console if it's currently animating, otherwise does nothing. 
     * 
     * @param clearFromQueue Specifies whether to clear this animation from the console manager queue.
     */
    stopTextAnimation(clearFromQueue: boolean) {
        if (this.state.textLoop !== null) {
            clearInterval(this.state.textLoop)
            this.setState({
                textLoop: null
            })

            if (clearFromQueue) {
                ConsoleManager.getInstance()?.clearLast();
            }
        }
    }

    componentDidMount(): void {
        ConsoleManager.getInstance().add(this)

        this.animateFlasher();
    }

    render() {
        return <span>{this.state.text}{this.state.flasher}</span>
    }
}