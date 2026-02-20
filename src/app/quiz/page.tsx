'use client';

import { useState } from 'react';
import Link from 'next/link';

interface QuizStep {
  question: string;
  options: { label: string; value: string; icon: string }[];
}

const steps: QuizStep[] = [
  {
    question: 'What will the robot be used for?',
    options: [
      { label: 'Home assistance & personal use', value: 'home', icon: '🏠' },
      { label: 'Education & research', value: 'research', icon: '🔬' },
      { label: 'Manufacturing & warehouse', value: 'industrial', icon: '🏭' },
      { label: 'Retail & customer service', value: 'retail', icon: '🛍️' },
      { label: 'Healthcare & elderly care', value: 'healthcare', icon: '🏥' },
      { label: 'Events & entertainment', value: 'entertainment', icon: '🎭' },
    ],
  },
  {
    question: 'What\'s your budget range (CAD)?',
    options: [
      { label: 'Under $15,000', value: 'budget-low', icon: '💰' },
      { label: '$15,000 – $50,000', value: 'budget-mid', icon: '💰💰' },
      { label: '$50,000 – $150,000', value: 'budget-high', icon: '💰💰💰' },
      { label: '$150,000+', value: 'budget-premium', icon: '💎' },
      { label: 'Flexible / lease preferred', value: 'budget-flex', icon: '📋' },
    ],
  },
  {
    question: 'Is shipping to Canada important?',
    options: [
      { label: 'Yes — must ship to Canada now', value: 'canada-yes', icon: '🇨🇦' },
      { label: 'Preferred but not required', value: 'canada-preferred', icon: '🌍' },
      { label: 'No — researching globally', value: 'canada-no', icon: '🌐' },
    ],
  },
  {
    question: 'How important is dexterity (hand manipulation)?',
    options: [
      { label: 'Critical — needs to handle objects', value: 'dex-critical', icon: '🤲' },
      { label: 'Nice to have', value: 'dex-nice', icon: '👋' },
      { label: 'Not important', value: 'dex-none', icon: '🚶' },
    ],
  },
  {
    question: 'Do you need developer/SDK access?',
    options: [
      { label: 'Yes — full ROS 2 / API access', value: 'sdk-full', icon: '💻' },
      { label: 'Some customization ability', value: 'sdk-some', icon: '⚙️' },
      { label: 'No — out-of-the-box operation', value: 'sdk-none', icon: '📦' },
    ],
  },
];

interface Recommendation {
  robotIds: string[];
  robotNames: string[];
  reasoning: string;
  confidence: 'high' | 'medium';
}

function getRecommendation(answers: string[]): Recommendation {
  const [useCase, budget, canada, dexterity, sdk] = answers;

  // Home use
  if (useCase === 'home') {
    if (budget === 'budget-low' || budget === 'budget-mid') {
      return {
        robotIds: ['1x-neo', '1x-neo-beta', 'softbank-pepper'],
        robotNames: ['1X NEO', '1X NEO Beta', 'SoftBank Pepper'],
        reasoning: 'For home use on a budget, the 1X NEO family is the world\'s first consumer humanoid designed for home living. SoftBank Pepper offers a proven, lower-cost option for social interaction.',
        confidence: 'high',
      };
    }
    return {
      robotIds: ['1x-neo-beta', '1x-neo', 'sanctuary-ai-phoenix-gen2'],
      robotNames: ['1X NEO Beta', '1X NEO', 'Sanctuary AI Phoenix Gen 2'],
      reasoning: 'The 1X NEO Beta offers the latest home robotics technology with upgraded hands and vision. Sanctuary AI Phoenix Gen 2 provides Canadian-made quality for home and care applications.',
      confidence: 'high',
    };
  }

  // Research
  if (useCase === 'research') {
    if (budget === 'budget-low') {
      return {
        robotIds: ['unitree-r1', 'galbot-g1', 'unitree-g1'],
        robotNames: ['Unitree R1', 'Galbot G1', 'Unitree G1'],
        reasoning: 'For budget research, the Unitree R1 ($5,900 USD) is unbeatable value. The Galbot G1 offers open-source hackability. The Unitree G1 EDU adds more DOF and a better compute platform.',
        confidence: 'high',
      };
    }
    if (budget === 'budget-mid') {
      return {
        robotIds: ['unitree-g1', 'galbot-g1', 'kepler-forerunner-k2'],
        robotNames: ['Unitree G1 EDU', 'Galbot G1', 'Kepler Forerunner K2'],
        reasoning: 'The Unitree G1 EDU ($27K) is the go-to research platform with NVIDIA Jetson Orin and full ROS 2 support. Galbot G1 for open-source development. Kepler K2 for more industrial research.',
        confidence: 'high',
      };
    }
    return {
      robotIds: ['unitree-h1-2', 'fourier-gr-1', 'boston-dynamics-atlas'],
      robotNames: ['Unitree H1-2', 'Fourier GR-1', 'Boston Dynamics Atlas'],
      reasoning: 'For advanced research with bigger budgets, the Unitree H1-2 offers cold-weather operation and upgraded compute. Fourier GR-1 excels in healthcare research. Atlas is the gold standard for locomotion research.',
      confidence: 'high',
    };
  }

  // Industrial
  if (useCase === 'industrial') {
    if (budget === 'budget-mid') {
      return {
        robotIds: ['kepler-forerunner-k2', 'kepler-forerunner', 'apptronik-apollo'],
        robotNames: ['Kepler Forerunner K2', 'Kepler Forerunner', 'Apptronik Apollo'],
        reasoning: 'The Kepler K2 at $22K is the cheapest enterprise humanoid available. The original Forerunner adds more DOF. Apply for an Apptronik Apollo pilot if your budget can stretch.',
        confidence: 'medium',
      };
    }
    if (budget === 'budget-high') {
      return {
        robotIds: ['apptronik-apollo-2', 'figure-02', 'sanctuary-ai-phoenix-gen2'],
        robotNames: ['Apptronik Apollo 2', 'Figure 02', 'Sanctuary AI Phoenix Gen 2'],
        reasoning: 'Apollo 2 offers 6-hour battery with hot-swap, perfect for shift work. Figure 02 is proven in BMW factories. Sanctuary AI Phoenix Gen 2 is the Canadian choice with Magna automotive partnership.',
        confidence: 'high',
      };
    }
    return {
      robotIds: ['figure-02', 'agility-digit-v2', 'apptronik-apollo-2'],
      robotNames: ['Figure 02', 'Agility Digit V2', 'Apptronik Apollo 2'],
      reasoning: 'For premium industrial deployment, Figure 02 leads with OpenAI-powered task learning. Agility Digit V2 dominates warehouse logistics. Apollo 2 offers the best battery life in the class.',
      confidence: 'high',
    };
  }

  // Retail
  if (useCase === 'retail') {
    return {
      robotIds: ['softbank-pepper', 'sanctuary-ai-phoenix-gen2', 'engineered-arts-ameca'],
      robotNames: ['SoftBank Pepper', 'Sanctuary AI Phoenix Gen 2', 'Engineered Arts Ameca'],
      reasoning: 'Pepper is the proven choice with 15,000+ retail deployments. Phoenix Gen 2 offers Canadian-made general-purpose assistance. Ameca provides the most impressive human interaction for premium retail experiences.',
      confidence: 'high',
    };
  }

  // Healthcare
  if (useCase === 'healthcare') {
    return {
      robotIds: ['sanctuary-ai-phoenix-gen2', 'fourier-gr-1', '1x-neo-beta'],
      robotNames: ['Sanctuary AI Phoenix Gen 2', 'Fourier GR-1', '1X NEO Beta'],
      reasoning: 'Sanctuary AI Phoenix Gen 2 is purpose-built for Canadian healthcare with domestic support. Fourier has a decade of medical robotics expertise. 1X NEO Beta offers gentle, safe home care assistance.',
      confidence: 'medium',
    };
  }

  // Entertainment
  if (useCase === 'entertainment') {
    return {
      robotIds: ['engineered-arts-ameca', 'softbank-pepper', 'unitree-r1'],
      robotNames: ['Engineered Arts Ameca', 'SoftBank Pepper', 'Unitree R1'],
      reasoning: 'Ameca is the undisputed leader for exhibitions and entertainment with its lifelike facial expressions. Pepper excels at event interaction. The Unitree R1 provides an affordable, dynamic demo platform.',
      confidence: 'high',
    };
  }

  // Fallback
  return {
    robotIds: ['unitree-g1', '1x-neo', 'sanctuary-ai-phoenix-gen2'],
    robotNames: ['Unitree G1', '1X NEO', 'Sanctuary AI Phoenix Gen 2'],
    reasoning: 'Based on your requirements, we recommend exploring these three versatile options spanning different price points and capabilities.',
    confidence: 'medium',
  };
}

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<Recommendation | null>(null);

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setResult(getRecommendation(newAnswers));
    }
  };

  const restart = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const progress = ((currentStep + (result ? 1 : 0)) / steps.length) * 100;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Home</Link>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Robot Quiz</span>
      </nav>

      <div className="text-center mb-8">
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">Interactive</p>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">What Robot is Right for Me?</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          Answer 5 quick questions and we&apos;ll recommend the best humanoid robots for your needs.
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full mb-8 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {!result ? (
        <div className="animate-fade-in">
          {/* Step counter */}
          <div className="text-center mb-6">
            <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
              Question {currentStep + 1} of {steps.length}
            </span>
          </div>

          {/* Question */}
          <h2 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-8">
            {steps[currentStep].question}
          </h2>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {steps[currentStep].options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleAnswer(opt.value)}
                className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-all text-left group"
              >
                <span className="text-2xl shrink-0">{opt.icon}</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                  {opt.label}
                </span>
              </button>
            ))}
          </div>

          {/* Back button */}
          {currentStep > 0 && (
            <div className="text-center mt-6">
              <button
                onClick={goBack}
                className="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                ← Back to previous question
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results */
        <div className="animate-fade-in-up">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-semibold mb-4">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              {result.confidence === 'high' ? 'Strong Match' : 'Good Match'}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Your Recommended Robots</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto text-sm">{result.reasoning}</p>
          </div>

          <div className="space-y-4 mb-8">
            {result.robotIds.map((id, i) => (
              <Link
                key={id}
                href={`/robots/${id}`}
                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl flex items-center justify-center text-2xl shrink-0">
                  {i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    #{i + 1} — {result.robotNames[i]}
                  </h3>
                  <p className="text-xs text-gray-400 dark:text-gray-500">View full specs, pricing, and availability →</p>
                </div>
                <svg className="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-blue-500 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/compare?robots=${result.robotIds.join(',')}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-colors"
            >
              Compare These Robots ⚖️
            </Link>
            <button
              onClick={restart}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold text-sm rounded-xl transition-colors"
            >
              Retake Quiz 🔄
            </button>
            <Link
              href="/inquiry"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold text-sm rounded-xl transition-colors"
            >
              Get Expert Advice 📞
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
