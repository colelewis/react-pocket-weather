import { useState, useEffect } from 'react';

function Clock() {
    const [now, setTime] = useState(new Date()); //use current date when triggering an update

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => {
            clearInterval(timer);
        }
    }, []);
    return now.toLocaleString();
};

export default Clock;


