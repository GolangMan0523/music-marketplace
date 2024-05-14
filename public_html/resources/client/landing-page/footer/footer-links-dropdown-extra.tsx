import React, {useState, useEffect, useRef} from 'react';
import {ArrowCircleDownIcon} from '@common/icons/material/ArrowCircleDown';
import {useSettings} from '@common/core/settings/use-settings';
import {Trans} from '@common/i18n/trans';
import {CustomMenu} from '@common/menus/custom-menu';

interface FooterLinksDropdownExtraProps {
  className?: string;
  padding?: string;
  menuPosition?: string;
}

export function FooterLinksDropdownExtra({
  className,
  padding,
  menuPosition = 'default',
}: FooterLinksDropdownExtraProps) {
  const [isOpen, setIsOpen] = useState(false);
  const settings = useSettings();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const getMenuContent = () => {
    const menu = settings.menus.find(m => m.positions?.includes(menuPosition));

    if (!menu) return [];

    return menu.items || [];
  };

  const menuContent = getMenuContent();

  function Menus({
    menuPosition,
    className,
  }: {
    menuPosition: string;
    className?: string;
  }) {
    const settings = useSettings();
    const menu = settings.menus.find(m => m.positions?.includes(menuPosition));

    if (!menu) return null;

    return <CustomMenu menu={menu} className={className || 'text-primary'} />;
  }

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`border-gray-300 hover:bg-gray-100 flex items-center border bg-black p-2 focus:outline-none ${padding}`}
      >
        <h6 className="text-gray-600 mr-2 font-bold uppercase">
          <Trans message="Extra" />
        </h6>
        <ArrowCircleDownIcon
          className={`text-gray-600 transform transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="border-gray-300 absolute left-0 mt-2 w-full bg-black shadow-md">
          {/* Use the Menus component here */}
          <Menus
            menuPosition={menuPosition}
            className="text-gray-100 flex flex-col items-start gap-0"
          />
        </div>
      )}
    </div>
  );
}
