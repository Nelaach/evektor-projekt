import { useState, useLayoutEffect} from 'react'

const Hardware = () => {

    // data - actual variable, setData - function for manipulation data variable
    const [hardware, setHardware] = useState([])

    const fetchData = async () => {
        try {
            let response = await fetch(
                `/hardware`, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            let data = await response.json();
            setHardware(data);
        } catch {
            console.log("Fetching hardware from SnipeIt failed");
        }
    }

    useLayoutEffect(() => {
        fetchData();
    }, []);

    return hardware
}

export default Hardware