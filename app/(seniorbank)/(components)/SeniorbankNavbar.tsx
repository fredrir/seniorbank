import Navbar from "@/ui/organisms/NavBar";
import { House, Landmark, ArrowLeftRight, Wallet } from "lucide-react";

const links = [
  {
    title: "Hjem",
    icon: <House className="size-8" />,
    path: "/",
  },
  {
    title: "Konto",
    icon: <Landmark className="size-8" />,
    path: "/konto",
  },
  {
    title: "Overfør",
    icon: <ArrowLeftRight className="size-8" />,
    path: "/overfor",
  },
  {
    title: "Betal",
    icon: <Wallet className="size-8" />,
    path: "/betal",
  },
];

const SeniorbankNavbar = () => {
  return <Navbar variant="seniorbank" links={links} />;
};

export default SeniorbankNavbar;
