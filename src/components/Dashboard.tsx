import React, { useEffect, useState } from 'react';
import { PieChart, BarChart, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { supabase } from '../supabaseClient';

interface Expense {
  amount: number;
  category: string;
  date: string;
}

interface Budget {
  amount: number;
  category: string;
}

const Dashboard = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = await supabase.auth.getUser();
      if (!user.data.user) return;

      const { data: expensesData, error: expensesError } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', user.data.user.id);

      const { data: budgetsData, error: budgetsError } = await supabase
        .from('budgets')
        .select('*')
        .eq('user_id', user.data.user.id);

      if (expensesError) console.error('Error fetching expenses:', expensesError);
      else setExpenses(expensesData as Expense[]);

      if (budgetsError) console.error('Error fetching budgets:', budgetsError);
      else setBudgets(budgetsData as Budget[]);
    };

    fetchData();
  }, []);

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalBudget = budgets.reduce((sum, budget) => sum + budget.amount, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <DollarSign className="mr-2 text-green-500" /> Total Budget
        </h2>
        <p className="text-3xl font-bold text-green-500">${totalBudget.toLocaleString()}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <TrendingDown className="mr-2 text-red-500" /> Total Expenses
        </h2>
        <p className="text-3xl font-bold text-red-500">${totalExpenses.toLocaleString()}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <TrendingUp className="mr-2 text-blue-500" /> Remaining Budget
        </h2>
        <p className="text-3xl font-bold text-blue-500">${(totalBudget - totalExpenses).toLocaleString()}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 col-span-full md:col-span-1">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <PieChart className="mr-2 text-indigo-500" /> Expense Breakdown
        </h2>
        <div className="h-64 flex items-center justify-center">
          <p className="text-gray-500">Pie chart visualization goes here</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 col-span-full md:col-span-1">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <BarChart className="mr-2 text-indigo-500" /> Budget vs Expenses
        </h2>
        <div className="h-64 flex items-center justify-center">
          <p className="text-gray-500">Bar chart visualization goes here</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;