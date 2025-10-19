import { Icon, IconProps } from "@tabler/icons-react";
import Link from "next/link";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type ItemsType = {
  title: string;
  items: {
    name: string;
    url: string;
    Icon?: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
  }[];
};

export const List = ({ title, items }: ItemsType) => {
  return (
    <div className="flex flex-col items-start gap-2">
      <h2 className="text-lg font-bold">{title}</h2>
      <ul className="flex flex-col items-start list-inside pl-2">
        {items.map((item, index) => (
          <li key={index}>
            <Link
              href={item.url}
              className="flex items-center gap-1 text-sm text-white hover:text-orange-400"
            >
              {item.name}
              {item.Icon && <item.Icon className="inline-block ml-1 text-green-400" width={16}/>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
