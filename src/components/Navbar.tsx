import React, { useState } from "react";

interface SubMenuItem {
  label: string;
  content: React.ComponentType;
}

interface MenuItem {
  label: string;
  submenu: SubMenuItem[];
}

interface NavbarProps {
  items: MenuItem[];
  onSelectSubmenu: (
    component: React.ComponentType
  ) => void;
}

const Navbar = ({
  items,
  onSelectSubmenu
}: NavbarProps) => {
  const [openIndex, setOpenIndex] =
    useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(
      openIndex === index ? null : index
    );
  };

  return (
    <ul className="list-group">
      {items.map((item, index) => (
        <li
          key={item.label}
          className="list-group-item p-0"
        >
          {/* Main menu */}
          <button
            className="btn w-100 text-start rounded-0"
            onClick={() => toggle(index)}
          >
            {item.label}
            {" "}
            {openIndex === index ? "▲" : "▼"}
          </button>

          {/* Submenu */}
          <div
            className={`collapse ${
              openIndex === index ? "show" : ""
            }`}
          >
            <ul className="list-group list-group-flush">
              {item.submenu.map((sub) => (
                <li
                  key={sub.label}
                  className="list-group-item border-0 p-0"
                >
                  <button
                    className="btn w-100 text-start rounded-0 border-0 bg-transparent ps-5"
                    onClick={() =>
                      onSelectSubmenu(sub.content)
                    }
                  >
                    {sub.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </li>
      ))}
    </ul>
  );
};

export default Navbar;