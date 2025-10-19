import Link from "next/link";

export const Menu = () => {
  const menuItems = [
    { name: "Inverno", path: "/" },
    { name: "Verão", path: "/about" },
    { name: "Bebê", path: "/services" },
    { name: "Meninos", path: "/contact" },
    { name: "Meninas", path: "/contact" },
  ];
  return (
    <nav className="p-4">
      <ul className="flex space-x-4 gap-2 items-center justify-center">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className="flex items-center justify-center w-24 h-10 hover:border-b-4 hover:border-primary transition-colors duration-300"
          >
            <Link
              href={item.path}
              className="text-primary hover:text-secondary"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
