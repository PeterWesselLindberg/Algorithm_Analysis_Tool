import { useState } from "react";
import Navbar from "./components/Navbar";
import NumberList from "./components/NumberList";

function LaptopsPage() {
  return <h2>Laptops Page</h2>;
}

function PhonesPage() {
  return <h2>Phones Page</h2>;
}

function SupportPage() {
  return <h2>Support Page</h2>;
}

function TrainingPage() {
  return <h2>Training Page</h2>;
}

function App() {
  const menuItems = [
    {
      label: "Products",
      submenu: [
        { label: "Laptops", content: () => <NumberList numbers={[1]}/>},
        { label: "Phones", content: PhonesPage }
      ]
    },
    {
      label: "Services",
      submenu: [
        { label: "Support", content: SupportPage },
        { label: "Training", content: TrainingPage }
      ]
    }
  ];

  const [ActivePage, setActivePage] =
    useState<React.ComponentType>(() => LaptopsPage);

  return (
    <div className="d-flex">
      <div style={{ width: "280px" }}>
        <Navbar
          items={menuItems}
          onSelectSubmenu={(component) =>
            setActivePage(() => component)
          }
        />
      </div>

      <div className="flex-grow-1 p-4">
        <ActivePage />
      </div>
    </div>
  );
}

export default App;