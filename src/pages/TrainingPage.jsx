import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, ArrowRight } from 'lucide-react';
import SectionHeading from '../components/atoms/SectionHeading';

const trainingModules = [
  {
    id: 'soil-selection',
    title: 'Miraa Soil & Variety Selection',
    summary: 'Learn how soil type, drainage, and variety choice shape your Miraa yield and quality.',
    duration: '18 min',
    difficulty: 'Beginner',
  },
  {
    id: 'soil-fertility',
    title: 'Organic Soil Fertility',
    summary: 'Build soil nutrition naturally with compost, mulch, and cover cropping for stronger yields.',
    duration: '20 min',
    difficulty: 'Intermediate',
  },
  {
    id: 'irrigation-practices',
    title: 'Efficient Miraa Irrigation',
    summary: 'Master watering schedules, drip systems, and water-saving practices for steady growth.',
    duration: '18 min',
    difficulty: 'Beginner',
  },
  {
    id: 'pest-management',
    title: 'Pest & Disease Management',
    summary: 'Protect your crop with scouting, natural sprays, and safe disease control methods.',
    duration: '22 min',
    difficulty: 'Intermediate',
  },
  {
    id: 'harvest-quality',
    title: 'Harvest Timing & Quality Control',
    summary: 'Learn how to harvest Miraa at the right stage and keep quality high for better prices.',
    duration: '18 min',
    difficulty: 'Beginner',
  },
  {
    id: 'market-linkages',
    title: 'Market Linkages & Pricing',
    summary: 'Understand how to compare prices, negotiate with buyers, and improve earnings.',
    duration: '20 min',
    difficulty: 'Intermediate',
  },
];

export default function TrainingPage() {
  return (
    <div className="space-y-6">
      <SectionHeading
        title="Training & Sustainability"
        subtitle="Read, learn, and grow with six practical Miraa lessons. Open any lesson to read the full learning content."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {trainingModules.map(mod => (
          <div key={mod.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow">
            <div className="h-40 bg-gradient-to-br from-emerald-100 to-white p-4 flex flex-col justify-end">
              <div className="text-xs uppercase tracking-[0.2em] font-semibold text-emerald-600 mb-2">Lesson</div>
              <h3 className="text-lg font-bold text-gray-900">{mod.title}</h3>
            </div>
            <div className="p-5">
              <p className="text-sm text-gray-600 mb-4">{mod.summary}</p>
              <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-4">
                <span className="rounded-full bg-gray-100 px-3 py-1">{mod.duration}</span>
                <span className="rounded-full bg-gray-100 px-3 py-1">{mod.difficulty}</span>
              </div>
              <Link
                to={`/training/${mod.id}`}
                className="inline-flex items-center gap-2 text-emerald-700 font-semibold hover:text-emerald-900"
              >
                Open lesson <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-5 flex flex-col sm:flex-row items-start gap-4">
        <div className="p-3 bg-emerald-200 text-emerald-700 rounded-full">
          <Leaf size={24} />
        </div>
        <div>
          <h4 className="font-bold text-emerald-800">Learning made practical</h4>
          <p className="text-sm text-emerald-700 mt-1">Each lesson opens into clear reading content you can follow step-by-step. This short course is designed to help you learn Miraa farming faster and start applying it right away.</p>
        </div>
      </div>
    </div>
  );
}
