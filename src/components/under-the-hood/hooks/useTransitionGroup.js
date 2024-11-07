import React, {useEffect, useState} from "react";

export function useTransitionGroup(stateItems) {
    const items = stateItems.map(item => ({...item, ref: React.createRef(null)}))
    const [timeoutMs, setTimeoutMs] = useState(0)
    useEffect(() => {
        const element = document.querySelector('.under-the-hood')
        const style = window.getComputedStyle(element);
        const value = style.getPropertyValue('--loop-spin-duration-ms');
        setTimeoutMs(parseInt(value) / 2)
    }, [])
    return {items, timeoutMs}
}