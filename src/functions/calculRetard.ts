import { AppartEntity, PaymentEntity } from "@/types";
import { QueryDocumentSnapshot } from "firebase/firestore";

const calculRetard = (payload: {
    payments: QueryDocumentSnapshot<PaymentEntity, PaymentEntity>[];
    appart: QueryDocumentSnapshot<AppartEntity>;
}): any => {
    const occupant = payload.appart.data().occupant;
    if (!occupant) return false;

    const payment = payload.payments
        .filter((item) => item.data().occupant.id == occupant.id)
        .filter((item) => item.data().appart.id == payload.appart.id)
        .sort(
            (a, b) =>
                new Date(b.data().date.year, b.data().date.month).getTime() -
                new Date(a.data().date.year, a.data().date.month).getTime(),
        )[0];

    const now = new Date();
    now.setDate(1);

    if (
        new Date(
            payment.data().date.year,
            payment.data().date.month,
            payment.data().date.day,
        ).getTime() < now.getTime()
    )
        return true;
};

export default calculRetard;
