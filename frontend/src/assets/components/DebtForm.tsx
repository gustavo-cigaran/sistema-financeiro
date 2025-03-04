import { useState, useEffect } from "react";
import { NumericFormat } from 'react-number-format';
import { Debt } from "../types/debt";

interface DebtFormProps {
    debts: Debt[];
    setDebts: React.Dispatch<React.SetStateAction<Debt[]>>;
    editingDebt: Debt | null;
    setEditingDebt: React.Dispatch<React.SetStateAction<Debt | null>>;
}

function DebtForm({ debts, setDebts, editingDebt, setEditingDebt }: DebtFormProps) {
    const [name, setName] = useState<string>("");
    const [value, setValue] = useState<string>("");
    const [installments, setInstallments] = useState<string>("");
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        if (editingDebt) {
            setName(editingDebt.name);
            setInstallments(editingDebt.installments.toString());
            setValue(`R$ ${editingDebt.value}`);
            setTotal(editingDebt.total);
        }
    }, [editingDebt]);

    useEffect(() => {
        const parsedValue = parseFloat(value.replace("R$ ", "").replace(/\./g, "").replace(",", ".")) || 0;
        const parsedInstallments = parseFloat(installments);

        if (!isNaN(parsedValue) && !isNaN(parsedInstallments)) {
            setTotal(parsedValue * parsedInstallments);
        } else {
            setTotal(0);
        }
    }, [value, installments]);

    const handleAddDebt = (event: React.FormEvent) => {
        event.preventDefault();

        const newDebt: Debt = {
            id: Date.now(),
            name: name,
            installments: parseFloat(installments),
            value: parseFloat(value.replace("R$ ", "").replace(/\./g, "").replace(",", ".")),
            total: total,
        };

        if (editingDebt) {
            const updatedDebts = debts.map((debt) => debt.id === editingDebt.id ? newDebt : debt);
            setDebts(updatedDebts);
            setEditingDebt(null);
        } else {
            setDebts([...debts, newDebt]);
        }

        setName("");
        setInstallments("");
        setValue("");
    };

    return (
        <>
            <form onSubmit={handleAddDebt} className="flex gap-2">
                <div>
                    <label
                        htmlFor="debt-name"
                        className="mb-2 block text-base font-medium text-[#07074D]"
                    >
                        Nome:
                    </label>
                    <input
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        type="text"
                        name="debt-name"
                        placeholder="Ex: Cartão de Crédito"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label
                        htmlFor="debt-installments"
                        className="mb-2 block text-base font-medium text-[#07074D]"
                    >
                        Parcelas:
                    </label>
                    <input
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        type="number"
                        name="debt-installments"
                        placeholder="Ex: 2"
                        value={installments}
                        onChange={(e) => setInstallments(e.target.value)}
                    />
                </div>
                <div>
                    <label
                        htmlFor="debt-value"
                        className="mb-2 block text-base font-medium text-[#07074D]"
                    >
                        Valor:
                    </label>
                    <NumericFormat
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix="R$ "
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        placeholder="Ex: R$ 250,00"
                        value={value}
                        onValueChange={(values) => setValue(values.formattedValue)}
                    />
                </div>
                <div>
                    <label
                        htmlFor="debt-total"
                        className="mb-2 block text-base font-medium text-[#07074D]"
                    >
                        Total:
                    </label>
                    <input
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        type="text"
                        name="debt-total"
                        readOnly
                        value={`R$ ${total.toFixed(2)}`}
                    />
                </div>
                <button
                    type="submit"
                    className="h-13 hover:shadow-form rounded-md bg-[#6A64F1] py-2 px-6 ml-3 text-center text-base font-semibold text-white outline-none self-end cursor-pointer whitespace-nowrap"
                >
                    {editingDebt ? "Salvar Edição" : "Adicionar"}
                </button>
            </form>
        </>
    );
}

export default DebtForm;