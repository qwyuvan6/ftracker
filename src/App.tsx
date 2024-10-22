import React, { useState, useEffect } from 'react';
import { Wallet, PieChart, DollarSign, Plus, Minus, UserCircle } from 'lucide-react';
import { supabase } from './supabaseClient';
import { User } from '@supabase/supabase-js';
import Dashboard from './components/Dashboard';
import ExpenseForm from './components/ExpenseForm';
import BudgetForm from './components/BudgetForm';
import Auth from './components/Auth';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-indigo-600 flex items-center">
            <Wallet className="mr-2" /> Personal Finance Tracker
          </h1>
          {user && (
            <div className="flex items-center">
              <UserCircle className="mr-2" />
              <span>{user.email}</span>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {user ? (
          <>
            <nav className="flex space-x-4 mb-8">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  activeTab === 'dashboard'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-indigo-600 hover:bg-indigo-100'
                }`}
              >
                <PieChart className="mr-2" size={20} /> Dashboard
              </button>
              <button
                onClick={() => setActiveTab('addExpense')}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  activeTab === 'addExpense'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-indigo-600 hover:bg-indigo-100'
                }`}
              >
                <Minus className="mr-2" size={20} /> Add Expense
              </button>
              <button
                onClick={() => setActiveTab('setBudget')}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  activeTab === 'setBudget'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-indigo-600 hover:bg-indigo-100'
                }`}
              >
                <Plus className="mr-2" size={20} /> Set Budget
              </button>
            </nav>

            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'addExpense' && <ExpenseForm />}
            {activeTab === 'setBudget' && <BudgetForm />}
          </>
        ) : (
          <Auth />
        )}
      </main>

      <footer className="bg-white mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          © 2023 Personal Finance Tracker. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;