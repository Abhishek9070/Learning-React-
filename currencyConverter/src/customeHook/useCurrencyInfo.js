import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});

    useEffect(() => {
        const controller = new AbortController();

        async function fetchCurrencyInfo() {
            try {
                const response = await fetch(
                    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`,
                    { signal: controller.signal }
                );
                const result = await response.json();
                setData(result[currency] || {});
            } catch (error) {
                if (error.name !== "AbortError") {
                    setData({});
                }
            }
        }

        fetchCurrencyInfo();

        return () => controller.abort();
    }, [currency]);

    return data;
}

export default useCurrencyInfo;
