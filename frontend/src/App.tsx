import { useState } from "react";
import DebtForm from "./assets/components/DebtForm";
import DebtTable from "./assets/components/DebtTable";
import { Debt } from "./assets/types/debt";

function App() {
    const [debts, setDebts] = useState<Debt[]>([]);
    const [editingDebt, setEditingDebt] = useState<Debt | null>(null);

    return (
        <main className="flex justify-center items-center h-screen bg-[#f2f5f6]">
            <div className="bg-white w-5/6 p-5 rounded-lg shadow-md">
                <DebtForm
                    debts={debts}
                    setDebts={setDebts}
                    editingDebt={editingDebt}
                    setEditingDebt={setEditingDebt}
                />
                <DebtTable
                    debts={debts}
                    setDebts={setDebts}
                    setEditingDebt={setEditingDebt}
                />
            </div>
        </main>
    );
}

export default App;