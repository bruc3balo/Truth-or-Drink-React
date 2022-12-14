import { useRive } from '@rive-app/react-canvas';
import React from 'react';
import {todRiv} from "../static/static";


const Cheers = ({width, height, loop = false}) => {
    const { rive, RiveComponent } = useRive({
        src: todRiv(),
        autoplay: true,
    });

    return (
        <div className="center-column">
            <div className="splash">
                <RiveComponent
                    style={{width: width ?? 433.988, height: height ?? 387.212}}
                    onMouseEnter={() => rive && rive.play()}
                    onMouseLeave={() => rive && (loop ? rive.play() : rive.pause())}
                />
            </div>
        </div>
    );
}

export default Cheers;

