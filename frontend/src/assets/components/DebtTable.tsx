import { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Debt } from '../types/debt';

interface DebtTableProps {
    debts: Debt[];
    setDebts: React.Dispatch<React.SetStateAction<Debt[]>>;
    setEditingDebt: React.Dispatch<React.SetStateAction<Debt | null>>;
}

function DebtTable({ debts, setDebts, setEditingDebt }: DebtTableProps) {
    const [selectedMonth, setSelectedMonth] = useState<string>('general');

    const handleEditDebt = (debt: Debt) => {
        setEditingDebt(debt);
    }

    const handleDeleteDebt = (id: number) => {
        setDebts(debts.filter((debt) => debt.id !== id));
    }

    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(event.target.value);
    }

    const filterDebts = (month: string) => {
        if (month === 'general') {
            return debts;
        }
        return debts.filter((debt) => debt.months.includes(month));
    }

    const filteredDebts = filterDebts(selectedMonth);

    return (
        debts.length > 0 && (
            <div className="mt-5">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-lg font-semibold mb-2">Lista de Dívidas:</h1>
                    <select
                        name="debt-month"
                        id="debt-month"
                        className="p-2 border border-[#e0e0e0] rounded-md"
                        value={selectedMonth}
                        onChange={handleMonthChange}
                    >
                        <option value="general">Geral</option>
                        <option value="january">Janeiro</option>
                        <option value="february">Fevereiro</option>
                        <option value="march">Março</option>
                        <option value="april">Abril</option>
                        <option value="may">Maio</option>
                        <option value="june">Junho</option>
                        <option value="july">Julho</option>
                        <option value="august">Agosto</option>
                        <option value="september">Setembro</option>
                        <option value="october">Outubro</option>
                        <option value="november">Novembro</option>
                        <option value="december">Dezembro</option>
                    </select>
                </div>
                {filteredDebts.length > 0 ? (
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
                            {filteredDebts.map((debt) => (
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
                ) : (
                    <p className="text-center text-lg font-semibold">Nenhuma dívida encontrada pertencente a esse mês</p>
                )}
            </div>
        )
    );
}

export default DebtTable;