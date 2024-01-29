import { OccupantEntity } from "@/types";
import { QueryDocumentSnapshot } from "firebase/firestore";
import "@/assets/OpenSans-normal.js";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
/**
 * OpenSans
 * normal
 */
const allCol: Record<keyof OccupantEntity, string> = {
    created_at: "Ajouté le",
    deleted_at: "Supprimé le",
    email: "E-mail",
    nom: "Nom",
    owner: "Gérant",
    phone: "Téléphone",
    updated_at: "Dernier Update",
};
const generatePdf = async (
    occupants: QueryDocumentSnapshot<OccupantEntity, OccupantEntity>[],
    extra: {
        column: (keyof OccupantEntity)[];
    },
) => {
    const doc = new jsPDF();
    doc.setFont("OpenSans", "normal");

    const column = extra.column.map((item) => allCol[item]);
    const data = occupants.map((raw) => {
        const occupant = raw.data();
        return extra.column.reduce((prev, cur) => {
            if (
                cur == "deleted_at" ||
                cur == "created_at" ||
                cur == "updated_at"
            )
                prev.push(occupant[cur].toDate().toLocaleDateString());
            else prev.push(occupant[cur]);
            return prev;
        }, []);
    });

    autoTable(doc, {
        head: [column],
        body: data,
        styles: { font: "OpenSans", fontSize: 9 },
    });

    doc.save(`liste_occupants_${Date.now()}`);
};

export default generatePdf;
