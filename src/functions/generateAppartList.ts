import "@/assets/OpenSans-normal.js";
import { AppartEntity } from "@/types";
import { QueryDocumentSnapshot } from "firebase/firestore";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
/**
 * OpenSans
 * normal
 */
const allCol: Partial<Record<keyof AppartEntity, string>> = {
    created_at: "Ajouté le",
    deleted_at: "Supprimé le",
    owner: "Gérant",
    updated_at: "Dernier Update",
    estate: "Propriété",
    price: "Prix (/mois)",
    price_unit: "Devise",
    title: "Designation",
};
const generatePdf = async (
    apparts: QueryDocumentSnapshot<AppartEntity, AppartEntity>[],
    extra: {
        column: (keyof AppartEntity)[];
    },
) => {
    const doc = new jsPDF({
        orientation: extra.column.length > 4 ? "landscape" : "portrait",
    });
    doc.setFont("OpenSans", "normal");

    const column = extra.column.map((item) => allCol[item]);
    const data = apparts.map((raw) => {
        const appart = raw.data();
        return extra.column.reduce((prev, cur) => {
            if (
                cur == "deleted_at" ||
                cur == "created_at" ||
                cur == "updated_at"
            )
                prev.push(appart[cur].toDate().toLocaleDateString());
            else if (cur == "estate") prev.push(appart[cur].title);
            else prev.push(appart[cur]);

            return prev;
        }, []);
    });

    autoTable(doc, {
        head: [column],
        body: data,
        styles: { font: "OpenSans", fontSize: 9 },
    });

    doc.save(`liste_apparts_${Date.now()}`);
};

export default generatePdf;
