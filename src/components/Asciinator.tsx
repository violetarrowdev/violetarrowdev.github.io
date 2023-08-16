// TODO: This should all be done as preprocessing for images.

import { Component } from 'react';
import PropTypes from 'prop-types';
import { Console } from './Exports';

const asciiMap: string = '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,"^`\'. ';

interface AsciinatorProps {
    imageRef: string
}

interface AsciinatorState {
    asciiFull: string
}

/**
 * Draws images as ascii.
 */
export default class Asciinator extends Component<AsciinatorProps, AsciinatorState> {
    private canvas: OffscreenCanvas | null = null;
    private bitmap: ImageBitmap | null = null;

    static propTypes = {
        imageRef: PropTypes.string.isRequired
    }

    state = {
        asciiFull: ""
    }

    componentDidMount() {
        let image: HTMLImageElement = new Image()
        image.src = this.props.imageRef
        image.decode().then(() => {
            createImageBitmap(image).then((bmp) => {
                this.bitmap = bmp;
                console.log("Image fetch successful for " + this.props.imageRef)
                this.canvas = new OffscreenCanvas(bmp.height, bmp.width)
                let ctx: OffscreenCanvasRenderingContext2D | null = this.canvas.getContext("2d")
                ctx?.drawImage(bmp, 0, 0);
                console.log("Image bitmap transferred")
                if (ctx !== null) { 
                    this.asciinate(ctx);
                }
            }, (rejectReason) => {
                console.log(rejectReason)
            })
        })
        
    }

    componentWillUnmount() {
        this.bitmap?.close();
    }

    private asciinate(ctx: OffscreenCanvasRenderingContext2D) {
        if (this.canvas != null) {
            console.log("Canvas is not null");
            let width = ctx.canvas.width
            let imgData: Uint8ClampedArray = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height).data;
            let lumaArray = Asciinator.grayscale(imgData);
            let asciiString: string = "";
            console.log("Canvas width: " + width);
            for (let i = 0; i < lumaArray.length; i++) {
                if (i !== 0 && (i % width) === 0) {
                    asciiString += "\n"
                }
                let lumaVal: number = lumaArray[i]
                let asciiIndex: number = Math.ceil((255 - lumaVal) / 255.0 * (asciiMap.length - 1))
                asciiString += asciiMap[asciiIndex]
            }
            this.setState({
                asciiFull: asciiString
            });
            console.log(this.state.asciiFull)
        }
    }

    static grayscale(imgData: Uint8ClampedArray): Uint8ClampedArray {
        let lumaLength: number = imgData.length / 4;
        let lumaArray = new Uint8ClampedArray(lumaLength);
        for (let i = 0; i < lumaLength; i++) {
            let [r, g, b, a] = imgData.slice(4*i, 4*(i+1));
            let luma = (r * 0.299 + g * 0.587 + 0.114 * b) * (a / 255.0);
            lumaArray[i] = luma
        }
        return lumaArray;
    }

    render() {
        return <div className="ascii">
            <Console fullText={this.state.asciiFull} textInterval={1} swipeInterval={1} useFlasher={false} isDynamic={true} charsPerLoop={1200} />
        </div>
    }
}