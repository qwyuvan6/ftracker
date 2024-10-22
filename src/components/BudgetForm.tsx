import React, { useState } from 'react';
import { DollarSign, Tag } from 'lucide-react';
import { supabase } from '../supabaseClient';

const BudgetForm = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = supabase.auth.getUser();
    if (!user) {
      alert('You must be signed in to set a budget.');
      return;
    }
    try {
      const { data, error } = await supabase
        .from('budgets')
        .upsert(
          { user_id: (await user).data.user?.id, amount: parseFloat(amount), category },
          { onConflict: 'user_id,category' }
        );
      
      if (error) throw error;
      
      alert('Budget set successfully!');
      setAmount('');
      setCategory('');
    } catch (error) {
      console.error('Error setting budget:', error);
      alert('Failed to set budget.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center text-indigo-600">Set Budget</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Budget Amount
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="0.00"
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">Select a category</option>
              <option value="food">Food</option>
              <option value="transportation">Transportation</option>
              <option value="utilities">Utilities</option>
              <option value="entertainment">Entertainment</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Set Budget
        </button>
      </form>
    </div>
  );
};

export default BudgetForm;