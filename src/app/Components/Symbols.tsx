import { useEffect, useState } from 'react';

interface Symbol {
    symbol: string;
    // Add other properties as needed
}

interface Trade {
    id: number;
    price: string;
    qty: string;
    time: number;
    // Add other properties as needed
}

const BinanceSymbolList = () => {
    const [symbols, setSymbols] = useState<Symbol[]>([]);
    const [selectedSymbol, setSelectedSymbol] = useState<string | null>("ETHBTC");
    const [trades, setTrades] = useState<Trade[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [searchDropdown, setSearchDropdown] = useState<Symbol[]>([]);

    // Fetch symbols from the API
    useEffect(() => {
        fetch('https://api.binance.com/api/v3/exchangeInfo')
            .then((response) => response.json())
            .then((data) => setSymbols(data.symbols));
    }, []);

    // Filter symbols based on search query
    useEffect(() => {
        setSearchDropdown(symbols.filter(symbol =>
            symbol.symbol.toLowerCase().includes(searchQuery.toLowerCase())
        ));
    }, [searchQuery, symbols]);

    // Fetch trade data for the selected symbol
    useEffect(() => {
        if (selectedSymbol) {
            fetch(`https://api.binance.com/api/v3/trades?symbol=${selectedSymbol}`)
                .then((response) => response.json())
                .then((data) => setTrades(data));
        }
    }, [selectedSymbol]);

    const handleSymbolSelect = (symbol: string) => {
        setSelectedSymbol(symbol);
    };

    const handleDownload = () => {
        // Convert trades to Excel format
        const header = Object.keys(trades[0]).join(',');
        const rows = trades.map(trade => Object.values(trade).join(',')).join('\n');
        const csvContent = `data:text/csv;charset=utf-8,${header}\n${rows}`;

        // Create a download link and trigger click
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'trades.csv');
        document.body.appendChild(link);
        link.click();
    };

    return (
        <div className="max-h-screen">
            <div className="flex justify-start ml-20">
                <div className=" bg-white rounded-lg shadow-lg p-4 max-w-[1600px] min-w-[95%]">
                    <div className="flex justify-between mb-4">
                        <div className='flex items-center relative'>
                            <div className="text-lg font-semibold mr-2">Symbol:</div>
                            <select
                                id="symbolSelect"
                                value={selectedSymbol || ''}
                                onChange={(e) => handleSymbolSelect(e.target.value)}
                                className="w-400px p-2 border border-gray-300 rounded mr-2"
                            >
                                <option value="">Select a symbol</option>
                                {symbols.map((symbol) => (
                                    <option key={symbol.symbol} value={symbol.symbol}>{symbol.symbol}</option>
                                ))}
                            </select>
                            <div className='relative'>
                                <input
                                    type="text"
                                    placeholder="Search symbol..."
                                    className="w-200px p-2 border border-gray-300 rounded"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setShowDropdown(true);
                                    }}
                                />
                                {showDropdown && searchQuery.length > 0 && (
                                    <div className="absolute bg-white border border-gray-300 rounded w-200px mt-1 max-h-[400px] overflow-y-scroll">
                                        {searchDropdown.map((symbol) => (
                                            <div
                                                key={symbol.symbol}
                                                className="p-2 cursor-pointer hover:bg-gray-200"
                                                onClick={() => {
                                                    setSelectedSymbol(symbol.symbol);
                                                    setSearchQuery('');
                                                    setShowDropdown(false);
                                                }}
                                            >
                                                {symbol.symbol}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <button onClick={handleDownload} className="p-2 bg-blue-500 text-white rounded ">Download CSV</button>
                    </div>

                    {selectedSymbol && (
                        <div className="overflow-y-auto max-h-[500px]">
                            <h2 className="text-lg font-semibold mb-2">Trades for {selectedSymbol}</h2>
                            <table className="w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr>
                                        {trades.length > 0 &&
                                            Object.keys(trades[0]).map((key) => (
                                                <th key={key} className="border border-gray-300 p-2">
                                                    {key}
                                                </th>
                                            ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {trades.map((trade) => (
                                        <tr key={trade.id}>
                                            {Object.values(trade).map((value, index) => (
                                                <td key={index} className="border border-gray-300 p-2">
                                                    {value}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BinanceSymbolList;
