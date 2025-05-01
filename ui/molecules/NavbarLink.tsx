import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";
import { ReactNode } from "react";

const navbarLinkVariants = cva(
  "flex flex-row items-center justify-center rounded-t-2xl p-4 text-2xl transition-colors",
  {
    variants: {
      active: {
        true: "border-seniorBankLightBlue bg-seniorBankDarkBlue font-bold text-white",
        false: "hover:bg-seniorBankLightBlue hover:text-seniorBankDarkBlue",
      },
    },
  },
);

interface NavbarLinkProps extends VariantProps<typeof navbarLinkVariants> {
  path: string;
  title: string;
  icon: ReactNode;
}

const NavbarLink = ({ path, title, icon, ...variants }: NavbarLinkProps) => {
  return (
    <Link href={path} className={navbarLinkVariants(variants)}>
      <span className="flex flex-row items-center gap-2">
        {icon}
        {title}
      </span>
    </Link>
  );
};

export default NavbarLink;
