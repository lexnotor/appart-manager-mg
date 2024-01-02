import PaymentList from "@/components/PaymentList";

const PaiementPage = () => {
    return (
        <div className="p-4 flex flex-col gap-8">
            <header className="flex justify-between">
                <h2 className="text-2xl font-bold">Paiements</h2>
            </header>

            <PaymentList />
        </div>
    );
};

export default PaiementPage;
