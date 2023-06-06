import { Component } from 'react';
import ConsoleManager from './ConsoleManager'
import * as Events from './Events';
import PropTypes from 'prop-types';

interface ConsoleState {
    text: string,
    index: number,
    flasher: FlasherState,
    pauseListener: Function | null
}

interface ConsoleProps {
    useFlasher?: boolean,
    /**
     * Determines whether animations on this console object can be paused or reversed.
     */
    dontClear?: boolean,
    fullText: string
}

const enum FlasherState {
    On = "_",
    Off = " ",
    None = ""
}

/**
 * A snippet of text that plays a typing animation. Gets added to ConsoleManager's animation queue on mounting.
 */
export default class Console extends Component<ConsoleProps, ConsoleState> {

    private textLoop: NodeJS.Timer | null = null;
    private flasherLoop: NodeJS.Timer | null = null;
    private queueLoc: number = -1;

    static propTypes = {
        useFlasher: PropTypes.bool,
        dontClear: PropTypes.bool,
        fullText: PropTypes.string.isRequired
    };

    state = {
        text: "",
        index: 0,
        flasher: FlasherState.None,
        pauseListener: null
    }

    /**
     * Begins animating the flasher, if enabled for this console.
     */
    animateFlasher(): void {
        // Flasher code
        if (this.props.useFlasher && this.flasherLoop === null) {
            this.setState({
                flasher: FlasherState.Off
            });
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
            this.flasherLoop = loop;
        }
    }

    /**
     * Begins animating this text until fullText is revealed.
     */
    animateText(): boolean {
        if (this.textLoop === null) {
            let textInterval = 40;
            const animation = () => {
                if (!this.isDoneAnimating()) {
                    this.setState({
                        text: this.state.text + this.props.fullText[this.state.index],
                        index: this.state.index + 1,
                    })
                } else {
                    this.stopTextAnimation(true);
                }
            }
            
            this.textLoop = setInterval(animation, textInterval);
            this.activateListener();
            console.log("Console " + this.queueLoc + " began animating.")
            return true;
        } else {
            return false;
        }
    }

    /**
     * Plays an animation clearing the text on string.
     */
    swipeText(): boolean {
        if (!this.props.dontClear && !this.isAnimating()) {
            let swipeInterval = 30
            const animation = () => {
                if (this.state.index > 0) {
                    this.setState({
                        text: this.state.text.slice(0, -1),
                        index: this.state.index - 1
                    });
                } else {
                    this.stopTextAnimation(true);
                }
            }

            this.textLoop = setInterval(animation, swipeInterval)
            console.log("Console " + this.queueLoc + " began clearing.")
            this.activateListener();
            return true;
        } else {
            console.log("Console " + this.queueLoc + " has this textLoop: " + this.textLoop);
            console.log("Console " + this.queueLoc + " refuses to swipe!")
            return false;
        }
    }

    /**
     * Stops animating the text on this console if it's currently animating, otherwise does nothing. Cannot be paused early if {@link ConsoleProps.dontClear} is true.
     */
    stopTextAnimation(force: boolean = false) {
        if (this.textLoop !== null && (!this.props.dontClear || this.isDoneAnimating() || force)) {
            console.log("Console " + this.queueLoc + " is clearing textLoop: " + this.textLoop);
            clearInterval(this.textLoop)
            this.textLoop = null;
            console.log("Console " + this.queueLoc + " has new textLoop: " + this.textLoop);
            ConsoleManager.getInstance().proceed(this);
            console.log("Console " + this.queueLoc + " stopped.")
        }
        this.removeListener();
    }

    stopFlasher() {
        if (this.flasherLoop !== null) {
            clearInterval(this.flasherLoop);
            this.flasherLoop = null;
            this.setState({
                flasher: FlasherState.None
            });
        }
    }

    activateListener() {
        var listener = () => {
            this.stopTextAnimation();
        };
        this.setState({
            pauseListener: listener,
        })
        window.addEventListener(Events.pauseAnimationsEvent, listener);
    }

    removeListener() {
        if (this.state.pauseListener !== null) {
            window.removeEventListener(Events.pauseAnimationsEvent, this.state.pauseListener)
        }
        this.setState({
            pauseListener: null
        })
    }

    updateLoc(offset: number) {
        this.queueLoc += offset;
    }

    componentDidMount() {
        this.queueLoc = ConsoleManager.getInstance().add(this)
        this.animateFlasher();
    }

    componentWillUnmount() {
        console.log("Console " + this.queueLoc + " is unmounting!");
        ConsoleManager.getInstance().remove(this.queueLoc);
        this.removeListener();
        this.stopTextAnimation(true);
        this.stopFlasher();
    }

    isDoneAnimating(): boolean {
        return this.state.index === this.props.fullText.length;
    }

    isAnimating(): boolean {
        return this.textLoop !== null;
    }

    render() {
        return <span>{this.state.text}{this.state.flasher}</span>
    }
}