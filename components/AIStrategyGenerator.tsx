
import React, { useState } from 'react';
import { generateMarketingStrategy, StrategyOutput } from '../services/geminiService';

export const AIStrategyGenerator: React.FC = () => {
  const [goal, setGoal] = useState('');
  const [result, setResult] = useState<StrategyOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const data = await generateMarketingStrategy(goal);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError('生成中にエラーが発生しました。時間を置いて再度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-inner">
        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              解決したい課題や目標を入力
            </label>
            <textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="例: 新規のECサイトの認知度を、AIを活用して1ヶ月で2倍にしたい。"
              className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none h-32 text-slate-800"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !goal.trim()}
            className={`w-full py-4 rounded-2xl font-bold text-white transition-all flex items-center justify-center space-x-2 ${
              loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100'
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>AIが戦略を立案中...</span>
              </>
            ) : (
              <span>戦略を生成する</span>
            )}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-8 animate-fade-in space-y-6">
            <div className="p-6 bg-white rounded-2xl border border-blue-100 shadow-sm">
              <h4 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Strategy Concept</h4>
              <p className="text-xl font-bold text-slate-900">{result.concept}</p>
            </div>
            
            <div className="space-y-4">
              {result.steps.map((step, i) => (
                <div key={i} className="flex items-start space-x-4 p-4 bg-white rounded-2xl border border-slate-100">
                  <span className="flex-shrink-0 w-8 h-8 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </span>
                  <p className="text-slate-700 text-sm leading-relaxed">{step}</p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 italic text-sm text-blue-800">
              <span className="font-bold not-italic mr-2">Pro Tip:</span>
              {result.tips}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
