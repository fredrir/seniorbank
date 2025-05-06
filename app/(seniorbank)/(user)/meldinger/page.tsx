import { MessageType } from "@/lib/types";
import MessagePage from "./(components)/MessagePage";

const messageData: MessageType[] = [
  {
    id: "1",
    title: "Viktig informasjon om din konto",
    content:
      "Vi har oppdatert våre vilkår og betingelser. Vennligst les gjennom og godkjenn de nye vilkårene.",
    date: "05.05.2025",
    isRead: false,
    icon: "bell",
    iconColor: "#EC7B7C",
    iconBgColor: "#FDEBE8",
    borderColor: "#EC7B7C",
  },
  {
    id: "2",
    title: "Sikkerhetsvarsling",
    content:
      "Vi har oppdaget uvanlig aktivitet på din konto. Vennligst bekreft at det var deg som logget inn fra en ny enhet.",
    date: "03.05.2025",
    isRead: false,
    icon: "shield",
    iconColor: "#EC7B7C",
    iconBgColor: "#FDEBE8",
    borderColor: "#EC7B7C",
  },
  {
    id: "3",
    title: "Kvartalsrapport",
    content:
      "Din kvartalsrapport for Q1 2025 er nå tilgjengelig. Klikk for å se detaljer om din økonomi.",
    date: "01.04.2025",
    isRead: true,
    icon: "mail",
    iconColor: "#005AA4",
    iconBgColor: "#C2E7DA",
    borderColor: "#70C7A9",
  },
  {
    id: "4",
    title: "Systemoppdatering",
    content:
      "Vi har oppdatert våre systemer for å gi deg en bedre brukeropplevelse. Nye funksjoner inkluderer forbedret sikkerhet og raskere overføringer.",
    date: "15.03.2025",
    isRead: true,
    icon: "settings",
    iconColor: "#005AA4",
    iconBgColor: "#B3CEE4",
    borderColor: "#B3CEE4",
  },
  {
    id: "5",
    title: "Betalingspåminnelse",
    content:
      "Dette er en påminnelse om at din regning på kr 1.250,00 forfaller til betaling om 3 dager.",
    date: "10.03.2025",
    isRead: true,
    icon: "credit-card",
    iconColor: "#005AA4",
    iconBgColor: "#D3D3E8",
    borderColor: "#B3CEE4",
  },
  {
    id: "6",
    title: "Ny tjeneste tilgjengelig",
    content:
      "Vi har lansert en ny sparekonto med høyere rente. Sjekk ut vårt tilbud og start å spare mer i dag!",
    date: "01.03.2025",
    isRead: true,
    icon: "alert",
    iconColor: "#005AA4",
    iconBgColor: "#D3D3E8",
    borderColor: "#B3CEE4",
  },
];

export default function UserMeldingPage() {
  return <MessagePage messageData={messageData} />;
}
