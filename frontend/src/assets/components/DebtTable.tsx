import { FaTrash, FaEdit } from 'react-icons/fa';
import { Debt } from '../types/debt';

interface DebtTableProps {
    debts: Debt[];
    setDebts: React.Dispatch<React.SetStateAction<Debt[]>>;
    setEditingDebt: React.Dispatch<React.SetStateAction<Debt | null>>;
}

function DebtTable({ debts, setDebts, setEditingDebt }: DebtTableProps) {
    const handleEditDebt = (debt: Debt) => {
        setEditingDebt(debt);
    }

    const handleDeleteDebt = (id: number) => {
        setDebts(debts.filter((debt) => debt.id !== id));
    }

    return (
        debts.length > 0 && (
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
                                            onClick={() => handleEditDebt(debt)}
                                            className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-500 cursor-pointer transition-colors"
                                        >
                                            <FaEdit />
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDeleteDebt(debt.id)}
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
        )
    );
}

export default DebtTable;