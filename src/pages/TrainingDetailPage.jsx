import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SectionHeading from '../components/atoms/SectionHeading';

const trainingModules = [
  {
    id: 'soil-selection',
    title: 'Miraa Soil & Variety Selection',
    summary: 'Learn how soil type, drainage, and variety choice shape your Miraa yield and quality.',
    duration: '18 min',
    difficulty: 'Beginner',
    content: [
      {
        heading: 'Choose the right soil',
        body: 'Miraa thrives in well-drained, sandy-loam soils with good organic matter. Avoid heavy clay and waterlogged areas. Test soil pH and aim for a slightly acidic range between 5.5 and 6.5 for optimal growth.',
      },
      {
        heading: 'Pick proven Miraa varieties',
        body: 'Select high-yielding, pest-tolerant varieties that match local climate conditions. Early maturity varieties help farmers capture market windows, while late-maturing types often produce richer leaves with better aroma.',
      },
      {
        heading: 'Prepare the field',
        body: 'Clear weeds and loosen the topsoil before planting. Add compost or well-rotted manure to improve structure and moisture retention, and keep young plants shaded during establishment.',
      },
    ],
    resourceLink: 'https://www.fao.org/farmers/en/soil-health',
  },
  {
    id: 'soil-fertility',
    title: 'Organic Soil Fertility for Miraa',
    summary: 'Build soil nutrition naturally with compost, mulch, and cover cropping for stronger, sustainable production.',
    duration: '20 min',
    difficulty: 'Intermediate',
    content: [
      {
        heading: 'Feed the soil first',
        body: 'Use organic inputs such as compost, farmyard manure, and green mulch to improve soil structure and nutrient cycling. Healthy soil supports healthy Miraa plants and reduces costs over time.',
      },
      {
        heading: 'Mulch for moisture and weed control',
        body: 'Apply a 5–8 cm layer of organic mulch around Miraa bases to retain soil moisture, suppress weeds, and keep roots cool during dry periods.',
      },
      {
        heading: 'Rotate and cover crop',
        body: 'Plant cover crops during fallow periods to add nitrogen, reduce erosion, and recharge the soil. Legume cover crops like cowpea or beans are excellent partners for soil health.',
      },
    ],
    resourceLink: 'https://www.agrilinks.org/resource/conservation-agriculture',
  },
  {
    id: 'irrigation-practices',
    title: 'Efficient Miraa Irrigation',
    summary: 'Master watering schedules, drip systems, and water-saving practices for steady growth and quality.',
    duration: '18 min',
    difficulty: 'Beginner',
    content: [
      {
        heading: 'Water at the right time',
        body: 'Irrigate in the early morning or late afternoon to reduce evaporation loss. Frequent, light watering is better than heavy flooding, especially for young Miraa plants.',
      },
      {
        heading: 'Use drip or low-volume irrigation',
        body: 'Drip and trickle irrigation deliver water directly to the root zone with minimal waste. This helps keep leaves dry and lowers the risk of fungal disease.',
      },
      {
        heading: 'Monitor soil moisture',
        body: 'Use simple checks like finger probing or moisture meters to avoid overwatering. Healthy soil should feel damp but not saturated.',
      },
    ],
    resourceLink: 'https://www.worldbank.org/en/topic/water',
  },
  {
    id: 'pest-management',
    title: 'Pest & Disease Management',
    summary: 'Protect your miraa crop with preventive scouting, natural sprays, and safe disease control methods.',
    duration: '22 min',
    difficulty: 'Intermediate',
    content: [
      {
        heading: 'Scout regularly',
        body: 'Inspect leaves and stems at least twice a week to catch pests like mirids, aphids, and mites early. Early detection is the best way to prevent large infestations.',
      },
      {
        heading: 'Use natural controls first',
        body: 'Apply neem oil, soap sprays, or botanical extracts where possible. These options reduce pest pressure without harming beneficial insects or soil life.',
      },
      {
        heading: 'Practice clean farming',
        body: 'Remove dead leaves, trim infected branches, and keep the farm tidy to reduce disease spread. Healthy plants are far less vulnerable to pests.',
      },
    ],
    resourceLink: 'https://www.cabi.org/cpc',
  },
  {
    id: 'harvest-quality',
    title: 'Harvest Timing & Quality Control',
    summary: 'Learn how to harvest miraa at the right stage and maintain top quality for higher market value.',
    duration: '18 min',
    difficulty: 'Beginner',
    content: [
      {
        heading: 'Harvest at peak freshness',
        body: 'Pick miraa when leaves are fully developed but still green and firm. Avoid harvesting during the hottest part of the day to preserve aroma and moisture.',
      },
      {
        heading: 'Sort and grade carefully',
        body: 'Separate clean, tender shoots from damaged or yellowing material. High-quality grading commands better prices from traders and buyers.',
      },
      {
        heading: 'Handle with care',
        body: 'Use clean baskets or trays and avoid squeezing bundles. Gentle handling keeps the leaves bright and market-ready.',
      },
    ],
    resourceLink: 'https://www.fao.org/post-harvest',
  },
  {
    id: 'market-linkages',
    title: 'Market Linkages & Pricing',
    summary: 'Understand how to compare prices, negotiate with buyers, and use market insights to improve earnings.',
    duration: '20 min',
    difficulty: 'Intermediate',
    content: [
      {
        heading: 'Track daily prices',
        body: 'Keep a simple market price notebook or spreadsheet. Knowing average local prices helps you decide the best day to sell and avoid low-price days.',
      },
      {
        heading: 'Build buyer relationships',
        body: 'Work with trusted traders and cooperatives. Long-term relationships often bring more consistent demand and better payment terms.',
      },
      {
        heading: 'Prepare quality bundles',
        body: 'Deliver clean, properly packaged miraa in the sizes buyers expect. Better presentation often results in higher prices and repeat business.',
      },
    ],
    resourceLink: 'https://www.ifc.org/market-linkages',
  },
];

export default function TrainingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const module = trainingModules.find(item => item.id === id);

  if (!module) {
    return (
      <div className="space-y-6">
        <SectionHeading title="Training Module Not Found" subtitle="Please select one of the available modules from the Learn page." />
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
          <p className="text-gray-600">The module you requested is not available. Go back to the full training library and choose another lesson.</p>
          <button
            onClick={() => navigate('/training')}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700 transition"
          >
            Back to Learn
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <SectionHeading title={module.title} subtitle={module.summary} />
          <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-600">
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1">Duration: {module.duration}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1">Difficulty: {module.difficulty}</span>
          </div>
        </div>
        <button
          onClick={() => navigate('/training')}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
        >
          <ArrowLeft size={16} /> Back to lessons
        </button>
      </div>

      <div className="grid gap-5">
        {module.content.map((section, index) => (
          <div key={index} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{section.heading}</h3>
            <p className="text-gray-600 leading-relaxed">{section.body}</p>
          </div>
        ))}
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-5 text-gray-800">
        <h4 className="font-bold text-emerald-900">Learn more</h4>
        <p className="mt-2 text-sm text-gray-700">For additional practical guidance, explore this resource:</p>
        <a href={module.resourceLink} target="_blank" rel="noreferrer" className="inline-flex mt-3 items-center gap-2 text-emerald-700 font-semibold hover:text-emerald-900">
          Open research guide <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
