import { useEffect, useState } from 'react';
import magnify from "./magnify.svg"
import Image from 'next/image';
import SymbolDropdown from "./SymbolDropdown"

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
    // Fetch symbols from the API
    useEffect(() => {
        fetch('https://api.binance.com/api/v3/exchangeInfo')
            .then((response) => response.json())
            .then((data) => setSymbols(data.symbols));
    }, []);

    // Fetch trade data for the selected symbol
    useEffect(() => {
        if (selectedSymbol) {
            fetch(`https://api.binance.com/api/v3/trades?symbol=${selectedSymbol}`)
                .then((response) => response.json())
                .then((data) => setTrades(data));
        }
    }, [selectedSymbol]);


    // Filter symbols based on search query
    useEffect(() => {
        setSearchDropdown(symbols.filter(symbol =>
            symbol.symbol.toLowerCase().includes(searchQuery.toLowerCase())
        ));
    }, [searchQuery, symbols]);

    // Fetch trade data for the selected symbol


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
            <div className="flex justify-center">
                <div className="glass max-w-[1600px] min-w-[95%] flex flex-col gap-6 pb-4">
                    <div className='text-4xl font-bold'>
                        Order Book
                    </div>
                    <div className='text-md font-medium text-gray-400'>
                        Unlock the secrets of the blockchain with real-time cryptocurrency details at your<br /> fingertips. Stay informed, stay ahead in the world of digital assets
                    </div>
                    <div className="flex justify-between mb-4">
                        <SymbolDropdown
                            symbols={symbols}
                            selectedSymbol={selectedSymbol}
                            setSelectedSymbol={setSelectedSymbol}
                            setSearchQuery={setSearchQuery}
                            setShowDropdown={setShowDropdown}
                            searchQuery={searchQuery}
                            searchDropdown={searchDropdown}
                        />
                        <div className='flex gap-2'>
                            <select
                                id="symbolSelect"
                                value={selectedSymbol || ''}
                                onChange={(e) => setSelectedSymbol(e.target.value)}
                                className="w-[200px] p-2 border border-gray-300 rounded mr-2 ml-2"
                            >
                                <option value="">Select a symbol</option>
                                {symbols.map((symbol) => (
                                    <option key={symbol.symbol} value={symbol.symbol}>{symbol.symbol}</option>
                                ))}
                            </select>
                            <button onClick={handleDownload} className="p-2 bg-[#e57173fb] text-white rounded mr-6">Download CSV</button>
                        </div>

                    </div>
                    {selectedSymbol && (
                        <div className="overflow-y-auto max-h-[450px] hide-scrollbar">
                            <h2 className="text-lg font-semibold mb-2">Trades for {selectedSymbol}</h2>
                            <table className="w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr>
                                        {trades.length > 0 &&
                                            Object.keys(trades[0]).map((key) => (
                                                <th key={key} className="border border-gray-300 p-2 text-left text-white bg-[#ed787a]">
                                                    {key}
                                                </th>
                                            ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {trades.map((trade) => (
                                        <tr key={trade.id} className="hover:bg-gray-100">
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
