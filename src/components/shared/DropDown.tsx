import { useState } from 'react';

interface DropdownProps {
  options: string[];
  onSelect?: (value: string) => void;
  label?: string;
}

export const DropDown = ({ options, onSelect, label = "Opzioni" }: DropdownProps) => {
  const [selected, setSelected] = useState<string>(label);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  const handleSelect = (option: string) => {
    setSelected(option);
    close();
    if (onSelect) onSelect(option);
  };

  return (
    <div className="relative inline-block text-left w-52">

      <button
        type="button"
        aria-label='open close dropdown'
        onClick={toggle}
        className="flex items-center justify-between w-full bg-white border border-gray-300 px-4 py-2.5 rounded-md shadow-sm hover:border-blue-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      >
        <span className="font-medium text-gray-700 truncate">{selected}</span>

        <svg 
          className={`w-8 h-8 cursor-pointer text-black transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 16L6 10H18L12 16Z" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Overlay invisibile che copre tutto lo schermo: chiude al click fuori */}
          <div 
            className="fixed inset-0 z-40 cursor-default" 
            onClick={close} 
          />
          
          <div className="absolute z-50 mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-150">
            <div className="py-1 max-h-60 overflow-y-auto">
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={`cursor-pointer block w-full text-left px-4 py-2 text-sm transition-colors
                    ${selected === option 
                      ? 'bg-blue-50 text-blue-700 font-semibold' 
                      : 'text-gray-700 hover:bg-charcoal-5'
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DropDown;