import Navbar from "@/ui/organisms/NavBar";

const links = [
  {
    title: "Hjem",
    path: "/kontakt",
    icon: null,
  },
  {
    title: "Bekreft",
    path: "/kontakt/bekreft",
    icon: null,
  },
  {
    title: "Kontakt",
    path: "/kontakt/kontakt",
    icon: null,
  },
];

const ContactNavbar = () => {
  return <Navbar variant="contact" links={links} />;
};

export default ContactNavbar;
