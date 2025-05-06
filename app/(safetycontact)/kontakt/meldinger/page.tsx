import MessagePage from "@/app/(seniorbank)/(user)/meldinger/(components)/MessagePage";
import { MessageType } from "@/lib/types";

const messageData: MessageType[] = [
  {
    id: "1",
    title: "Sikkerhetsoppdatering",
    content:
      "Vi har oppdatert våre sikkerhetsprotokoller. Vennligst logg inn og bekreft din identitet for å sikre at kontoen din er trygg.",
    date: "10.10.2025",
    isRead: false,
    icon: "shield",
    iconColor: "#EC7B7C",
    iconBgColor: "#FDEBE8",
    borderColor: "#EC7B7C",
  },
  {
    id: "2",
    title: "Viktig sikkerhetsvarsel",
    content:
      "Det har vært et forsøk på uautorisert tilgang til kontoen din. Vi anbefaler at du endrer passordet ditt umiddelbart.",
    date: "08.10.2025",
    isRead: false,
    icon: "alert",
    iconColor: "#EC7B7C",
    iconBgColor: "#FDEBE8",
    borderColor: "#EC7B7C",
  },
  {
    id: "3",
    title: "Tofaktorautentisering aktivert",
    content:
      "Tofaktorautentisering er nå aktivert for kontoen din. Dette gir et ekstra lag med sikkerhet.",
    date: "05.10.2025",
    isRead: true,
    icon: "lock",
    iconColor: "#005AA4",
    iconBgColor: "#C2E7DA",
    borderColor: "#70C7A9",
  },
  {
    id: "4",
    title: "Sikkerhetsoppdatering fullført",
    content:
      "Vi har fullført en systemoppdatering for å forbedre sikkerheten. Ingen handling er nødvendig fra din side.",
    date: "01.10.2025",
    isRead: true,
    icon: "settings",
    iconColor: "#005AA4",
    iconBgColor: "#B3CEE4",
    borderColor: "#B3CEE4",
  },
  {
    id: "5",
    title: "Passordpåminnelse",
    content:
      "Det er en stund siden du sist oppdaterte passordet ditt. Vi anbefaler at du endrer det for å opprettholde sikkerheten.",
    date: "25.09.2025",
    isRead: true,
    icon: "key",
    iconColor: "#005AA4",
    iconBgColor: "#D3D3E8",
    borderColor: "#B3CEE4",
  },
  {
    id: "6",
    title: "Ny sikkerhetsfunksjon tilgjengelig",
    content:
      "Vi har lansert en ny funksjon for å varsle deg om mistenkelig aktivitet. Aktiver den i innstillingene dine i dag.",
    date: "20.09.2025",
    isRead: true,
    icon: "notification",
    iconColor: "#005AA4",
    iconBgColor: "#D3D3E8",
    borderColor: "#B3CEE4",
  },
];

export default function SafetyContactMessagePage() {
  return <MessagePage messageData={messageData} safetyContact />;
}
