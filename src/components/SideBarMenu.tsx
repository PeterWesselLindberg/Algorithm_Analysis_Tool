import type React from "react";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Nav, Navbar, NavLink } from "react-bootstrap";

export type SubMenuItem = {
  id: string,
  comp?: React.ComponentType
}
export type MenuItem = {
    label: string,
    subItems: SubMenuItem[]
    
}

interface SideBarMenuProps {
    items: MenuItem[],
    onSelectItem: (item: string) => void
}

const SideBarMenu = ({ items, onSelectItem}: SideBarMenuProps) => {
  return (
  <Navbar className="sidebar-navbar">
    <Nav variant="pills" className="flex-column sidebar-nav">
     {items.map((item, index) => (
        <Accordion key={item.label}>
          <AccordionItem eventKey={"link-" + index.toString()} >
            <AccordionHeader>
              {item.label}
            </AccordionHeader>
            <AccordionBody>
              {item.subItems?.map((subItem, subIndex) => 
              <NavLink 
                eventKey={"link-" + index.toString() + '.' + subIndex.toString()} 
                onClick={() => {onSelectItem(subItem.id)}}>
                  {subItem.id}
              </NavLink>
              )}
            </AccordionBody>
          </AccordionItem>
        </Accordion>

      ))}
    </Nav>
  </Navbar>
  );
}

export default SideBarMenu