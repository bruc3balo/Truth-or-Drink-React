import { useRive } from '@rive-app/react-canvas';
import todRive from './tod.riv';

const Cheers = () => {
    const { rive, RiveComponent } = useRive({
        src: todRive,
        autoplay: true,
    });



    return (
        <div className="rivDiv">
            <RiveComponent
                style={{width: 433.988, height: 387.212}}
                onMouseEnter={() => rive && rive.play()}
                onMouseLeave={() => rive && rive.pause()}
            />
        </div>
);
}

export default Cheers;

