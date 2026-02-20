'use client';

// Improvement #20: Robot recommendation engine based on industry/budget/use-case filters

import { useState, useMemo } from 'react';
import Link from 'next/link';

interface RobotRec {
  id: string;
  name: string;
  manufacturer: string;
  price: number;
  category: string;
  useCases: string[];
  industries: string[];
  budgetTier: 'budget' | 'mid' | 'premium' | 'enterprise';
  score: number;
  highlight: string;
}

const robotDatabase: Omit<RobotRec, 'score'>[] = [
  { id: 'unitree-g1', name: 'Unitree G1', manufacturer: 'Unitree', price: 22000, category: 'Research', useCases: ['research', 'education', 'development'], industries: ['education', 'research'], budgetTier: 'budget', highlight: 'Best value research platform' },
  { id: 'unitree-h1', name: 'Unitree H1', manufacturer: 'Unitree', price: 90000, category: 'Enterprise', useCases: ['logistics', 'inspection', 'manufacturing'], industries: ['manufacturing', 'logistics', 'energy'], budgetTier: 'premium', highlight: 'High-performance industrial humanoid' },
  { id: 'figure-02', name: 'Figure 02', manufacturer: 'Figure AI', price: 80000, category: 'Enterprise', useCases: ['manufacturing', 'assembly', 'logistics'], industries: ['manufacturing', 'automotive', 'logistics'], budgetTier: 'premium', highlight: 'AI-powered conversational manufacturing robot' },
  { id: 'tesla-optimus-gen-2', name: 'Tesla Optimus Gen 2', manufacturer: 'Tesla', price: 30000, category: 'Enterprise', useCases: ['general', 'manufacturing', 'logistics'], industries: ['manufacturing', 'logistics', 'retail'], budgetTier: 'mid', highlight: 'Best all-around value for enterprise' },
  { id: 'agility-digit', name: 'Agility Digit', manufacturer: 'Agility Robotics', price: 75000, category: 'Enterprise', useCases: ['logistics', 'warehouse'], industries: ['logistics', 'retail', 'ecommerce'], budgetTier: 'premium', highlight: 'Purpose-built for warehouse logistics' },
  { id: 'sanctuary-phoenix', name: 'Sanctuary AI Phoenix', manufacturer: 'Sanctuary AI', price: 100000, category: 'Enterprise', useCases: ['general', 'retail', 'healthcare'], industries: ['retail', 'healthcare', 'hospitality'], budgetTier: 'enterprise', highlight: 'Canadian-made general purpose humanoid' },
  { id: '1x-neo', name: '1X NEO', manufacturer: '1X Technologies', price: 30000, category: 'Consumer', useCases: ['home', 'hospitality', 'eldercare'], industries: ['hospitality', 'healthcare', 'residential'], budgetTier: 'mid', highlight: 'Lightest full-size home humanoid' },
  { id: 'boston-dynamics-atlas', name: 'Boston Dynamics Atlas', manufacturer: 'Boston Dynamics', price: 250000, category: 'Enterprise', useCases: ['manufacturing', 'inspection', 'research'], industries: ['manufacturing', 'energy', 'research'], budgetTier: 'enterprise', highlight: 'Most agile humanoid robot ever built' },
  { id: 'fourier-gr-2', name: 'Fourier GR-2', manufacturer: 'Fourier Intelligence', price: 55000, category: 'Research', useCases: ['research', 'healthcare', 'education'], industries: ['healthcare', 'research', 'education'], budgetTier: 'mid', highlight: 'Healthcare-focused humanoid platform' },
  { id: 'unitree-g1-edu', name: 'Unitree G1 EDU', manufacturer: 'Unitree', price: 16000, category: 'Research', useCases: ['education', 'development', 'research'], industries: ['education'], budgetTier: 'budget', highlight: 'Most affordable humanoid for learning' },
];

const industries = ['manufacturing', 'logistics', 'healthcare', 'education', 'research', 'retail', 'hospitality', 'energy', 'automotive', 'residential', 'ecommerce'];
const useCases = ['general', 'manufacturing', 'logistics', 'research', 'education', 'home', 'healthcare', 'retail', 'inspection', 'assembly', 'warehouse', 'hospitality', 'eldercare', 'development'];
const budgetTiers = [
  { id: 'budget', label: 'Under $25K', range: [0, 25000] },
  { id: 'mid', label: '$25K–$75K', range: [25000, 75000] },
  { id: 'premium', label: '$75K–$150K', range: [75000, 150000] },
  { id: 'enterprise', label: '$150K+', range: [150000, Infinity] },
];

export default function RecommendPage() {
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedUseCases, setSelectedUseCases] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string[]>([]);

  const toggleItem = (list: string[], item: string, setter: (v: string[]) => void) => {
    setter(list.includes(item) ? list.filter(x => x !== item) : [...list, item]);
  };

  const recommendations = useMemo(() => {
    return robotDatabase.map(robot => {
      let score = 0;
      // Industry match
      if (selectedIndustries.length > 0) {
        const matches = robot.industries.filter(i => selectedIndustries.includes(i)).length;
        score += matches * 30;
      }
      // Use case match
      if (selectedUseCases.length > 0) {
        const matches = robot.useCases.filter(u => selectedUseCases.includes(u)).length;
        score += matches * 25;
      }
      // Budget match
      if (selectedBudget.length > 0) {
        if (selectedBudget.includes(robot.budgetTier)) score += 20;
      }
      // Base score if no filters
      if (selectedIndustries.length === 0 && selectedUseCases.length === 0 && selectedBudget.length === 0) {
        score = 50;
      }
      return { ...robot, score };
    })
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score);
  }, [selectedIndustries, selectedUseCases, selectedBudget]);

  const hasFilters = selectedIndustries.length > 0 || selectedUseCases.length > 0 || selectedBudget.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Robot Recommendations</span>
      </nav>

      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Smart Match</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Find Your Perfect Robot
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Select your industry, use case, and budget to get personalized robot recommendations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <div className="space-y-6">
          {/* Industry */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Industry</h3>
            <div className="flex flex-wrap gap-2">
              {industries.map(ind => (
                <button
                  key={ind}
                  onClick={() => toggleItem(selectedIndustries, ind, setSelectedIndustries)}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors capitalize ${
                    selectedIndustries.includes(ind)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>

          {/* Use Case */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Use Case</h3>
            <div className="flex flex-wrap gap-2">
              {useCases.map(uc => (
                <button
                  key={uc}
                  onClick={() => toggleItem(selectedUseCases, uc, setSelectedUseCases)}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors capitalize ${
                    selectedUseCases.includes(uc)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {uc}
                </button>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Budget</h3>
            <div className="space-y-2">
              {budgetTiers.map(tier => (
                <button
                  key={tier.id}
                  onClick={() => toggleItem(selectedBudget, tier.id, setSelectedBudget)}
                  className={`w-full text-left text-xs px-3 py-2 rounded-lg font-medium transition-colors ${
                    selectedBudget.includes(tier.id)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {tier.label}
                </button>
              ))}
            </div>
          </div>

          {hasFilters && (
            <button
              onClick={() => { setSelectedIndustries([]); setSelectedUseCases([]); setSelectedBudget([]); }}
              className="w-full text-xs text-gray-400 hover:text-gray-600 font-medium py-2"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              {hasFilters ? `${recommendations.length} Matches` : 'All Robots'}
            </h2>
            {hasFilters && (
              <span className="text-xs text-gray-400">Sorted by relevance</span>
            )}
          </div>

          <div className="space-y-4">
            {recommendations.map((robot, i) => (
              <Link
                key={robot.id}
                href={`/robots/${robot.id}`}
                className="block bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:border-blue-200 dark:hover:border-blue-800 transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl flex items-center justify-center text-lg shrink-0">
                    {i === 0 && hasFilters ? '🏆' : '🤖'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider">{robot.manufacturer}</p>
                        <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{robot.name}</h3>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                          ${robot.price.toLocaleString()}
                        </p>
                        {hasFilters && (
                          <div className="flex items-center gap-1 mt-1">
                            <div className="h-1.5 w-12 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                                style={{ width: `${Math.min(100, robot.score)}%` }}
                              />
                            </div>
                            <span className="text-[9px] text-gray-400">{robot.score}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{robot.highlight}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {robot.industries.map(ind => (
                        <span
                          key={ind}
                          className={`text-[9px] px-2 py-0.5 rounded-full capitalize ${
                            selectedIndustries.includes(ind) ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-semibold' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                          }`}
                        >
                          {ind}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {recommendations.length === 0 && (
            <div className="text-center py-16">
              <p className="text-4xl mb-4">🔍</p>
              <p className="text-gray-500 dark:text-gray-400">No robots match your current filters. Try broadening your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
