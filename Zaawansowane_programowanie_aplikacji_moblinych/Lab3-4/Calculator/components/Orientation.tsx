import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

export enum OrientationType{
    Portrait,
    Landscape
}

export function Orientation(): OrientationType{
    const [orientation, setOrientation] = useState(OrientationType.Portrait);

    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({window:{width, height}}) => {
            if (height < width)
                setOrientation(OrientationType.Landscape);
            else
                setOrientation(OrientationType.Portrait);
        });

        return () => {
            subscription.remove();
        }
    }, []);

    return orientation;
}