import Navbar from "@/ui/organisms/NavBar";
import {
  House,
  Landmark,
  ArrowLeftRight,
  Wallet,
  Settings,
} from "lucide-react";

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
  {
    title: "Innstillinger",
    icon: <Settings className="size-8" />,
    path: "/innstillinger",
  },
];

const SeniorbankNavbar = () => {
  return <Navbar variant="seniorbank" links={links} />;
};

export default SeniorbankNavbar;
