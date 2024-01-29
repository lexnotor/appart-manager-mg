import "@/assets/OpenSans-normal.js";
import { PaymentEntity } from "@/types";
import { QueryDocumentSnapshot } from "firebase/firestore";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
/**
 * OpenSans
 * normal
 */
const allCol: Partial<Record<keyof PaymentEntity, string>> = {
    created_at: "Ajouté le",
    deleted_at: "Supprimé le",
    updated_at: "Dernier Update",
    amount: "Montant",
    appart: "Appartement",
    date: "Mois",
    label: "Designation",
    occupant: "Occupant",
};
const generatePdf = async (
    payments: QueryDocumentSnapshot<PaymentEntity, PaymentEntity>[],
    extra: {
        column: (keyof PaymentEntity)[];
    },
) => {
    const doc = new jsPDF({
        orientation: extra.column.length > 4 ? "landscape" : "portrait",
    });
    doc.setFont("OpenSans", "normal");

    const column = extra.column.map((item) => allCol[item]);

    const data = payments.map((raw) => {
        const payment = raw.data();
        return extra.column.reduce((prev, cur) => {
            if (
                cur == "deleted_at" ||
                cur == "created_at" ||
                cur == "updated_at"
            )
                prev.push(payment[cur].toDate().toLocaleDateString());
            else if (cur == "appart") prev.push(payment[cur].title);
            else if (cur == "occupant") prev.push(payment[cur].nom);
            else if (cur == "date") {
                const date = new Date(
                    payment[cur].year,
                    payment[cur].month,
                    payment[cur].day,
                );
                prev.push(date.toLocaleDateString());
            } else prev.push(payment[cur]);

            return prev;
        }, []);
    });

    autoTable(doc, {
        head: [column],
        body: data,
        styles: { font: "OpenSans", fontSize: 9 },
    });

    doc.save(`liste_paiements_${Date.now()}`);
};

export default generatePdf;
