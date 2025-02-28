import { useState, useEffect } from "react";
import { NumericFormat } from 'react-number-format';
import { FaTrash, FaEdit } from 'react-icons/fa';

interface Debt {
    id: number;
    name: string;
    installments: number;
    value: number;
    total: number;
}

function App() {
    const [name, setName] = useState<string>("");
    const [value, setValue] = useState<string>("");
    const [installments, setInstallments] = useState<string>("");
    const [total, setTotal] = useState<number>(0);
    const [debts, setDebts] = useState<Debt[]>([]);
    const [editingDebt, setEditingDebt] = useState<Debt | null>(null);

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

    const handleEdit = (debt: Debt) => {
        setName(debt.name);
        setInstallments(debt.installments.toString());
        setValue(`R$ ${debt.value}`);
        setEditingDebt(debt);
    }

    const handleDelete = (id: number) => {
        const updatedDebts = debts.filter((debt) => debt.id !== id);
        setDebts(updatedDebts);
    }

    return (
        <main className="flex justify-center items-center h-screen bg-[#f2f5f6]">
            <div className="bg-white w-5/6 p-5 rounded-lg shadow-md">
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
                {debts.length > 0 && (
                <div className="mt-5">
                    <h1 className="text-lg font-semibold mb-2">Lista de Dívidas:</h1>
                    <table className="w-full text-left table-auto min-w-max">
                        <thead>
                            <tr className="border-b border-slate-300 bg-slate-50">
                                <th className="p-4 text-sm font-normal leading-none text-slate-500">Nome</th>
                                <th className="p-4 text-sm font-normal leading-none text-slate-500">Quantidade de parcelas</th>
                                <th className="p-4 text-sm font-normal leading-none text-slate-500">Valor da parcela</th>
                                <th className="p-4 text-sm font-normal leading-none text-slate-500">Total</th>
                                <th className="p-4 text-sm font-normal leading-none text-slate-500"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {debts.map((debt) => (
                                <tr className="hover:bg-slate-50" key={debt.id}>
                                    <td className="p-4 border-b border-slate-200 py-5">{debt.name}</td>
                                    <td className="p-4 border-b border-slate-200 py-5">{`${debt.installments}x`}</td>
                                    <td className="p-4 border-b border-slate-200 py-5">{`R$${debt.value.toFixed(2)}`}</td>
                                    <td className="p-4 border-b border-slate-200 py-5">{`R$${debt.total.toFixed(2)}`}</td>
                                    <td className="py-5 border-b border-slate-200">
                                        <div className="flex justify-center gap-2 m-0">
                                            <button
                                                onClick={() => handleEdit(debt)}
                                                className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-500 cursor-pointer transition-colors"
                                            >
                                                <FaEdit />
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleDelete(debt.id)}
                                                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 cursor-pointer transition-colors"
                                            >
                                                <FaTrash />
                                                Excluir
                                            </button>   
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                )}
            </div>
        </main>
    );
}

export default App;