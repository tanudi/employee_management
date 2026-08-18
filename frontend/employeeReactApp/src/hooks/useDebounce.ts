import { useEffect, useState } from "react";

export default function useDebounce(searchText: string, delay: number) {
    const [debounceText, setDebounceText] = useState<string>(searchText);

    useEffect(() => {
        let timer = setTimeout(() => {
            setDebounceText(searchText)
        }, delay)

        return () => {
            clearTimeout(timer)
        };
        
    }, [searchText, delay])
    return debounceText;
}