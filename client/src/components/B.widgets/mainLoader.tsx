import { X } from 'lucide-react';
import { ButtonSvg, Loader } from '../A.features';
import { useSocket, useSocketStore } from '../../shared';
import { useState } from 'react';

export const MainLoader = () => {
    const { isConnection }= useSocketStore()
    const { getStatus, status, disconnect } = useSocket();
    const [ open, setOpen ] = useState(true)
    const handleClick = () => {
        disconnect()
        setOpen(false)
    }
    return (
        <div
        className={`mainLoader${(!isConnection === open)?'Open':'Close'}`}
        >
            <ButtonSvg
            customClassName='mainLoaderCloseButton'
            icon={<X size={20} />}
            additionalClick={handleClick}
            />
            <div id="mainLoaderBody">
                <h2>{getStatus()}</h2>
                <Loader size={100} isLoad />
            </div>
        </div>
    );
};