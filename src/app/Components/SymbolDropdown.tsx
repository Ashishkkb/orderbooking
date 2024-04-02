import magnify from "./magnify.svg"
import Image from 'next/image';

interface Symbol {
    symbol: string;
    // Add other properties as needed
}


interface SymbolDropdownProps {
    symbols: Symbol[];
    selectedSymbol: string | null;
    setSelectedSymbol: (symbol: string) => void;
    setSearchQuery: (query: string) => void;
    setShowDropdown: (show: boolean) => void;
    searchQuery: string;
    searchDropdown: Symbol[];
}

const SymbolDropdown = ({
    symbols,
    selectedSymbol,
    setSelectedSymbol,
    setSearchQuery,
    setShowDropdown,
    searchQuery,
    searchDropdown,
}: SymbolDropdownProps) => (
    <>
                <div className='relative'>
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search symbol..."
                    className="w-[800px] p-2 border border-gray-300 rounded"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowDropdown(true);
                    }}
                />
                <Image
                    src={magnify}
                    alt="magnification"
                    className="absolute right-2 top-3 h-4 w-4 text-gray-500 cursor-pointer"
                    onClick={() => {
                        // Handle search action here
                    }}
                />
            </div>
            {searchDropdown && searchQuery.length > 0 && (
                <div className="absolute bg-white rounded w-200 mt-1 max-h-[400px] overflow-y-scroll">
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
    </>

)


export default SymbolDropdown;