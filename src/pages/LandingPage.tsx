import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, PlusIcon, MinusIcon, BoxIcon, TruckIcon, Factory, CameraIcon, LineChartIcon, CheckIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navigation from '../components/Navigation';
const LandingPage: React.FC = () => {
  const {
    isAuthenticated
  } = useAuth();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };
  const faqItems = [{
    question: "How does Sprout'n help with cash flow management?",
    answer: 'We reduce your first order costs from sampling fees to negotiating the best unit price for you. We also give you access to some of the best freight costs on the market and guide you through the entire production process helping you avoid first time mistakes. All this helps maintain better cash flow throughout the first 12-24 months'
  }, {
    question: 'How do you simplify the manufacturing process?',
    answer: 'We handle the complex aspects of manufacturing and logistics by vetting suppliers, negotiating terms, managing quality control, and coordinating shipping. This allows you to focus on other aspects of your business'
  }, {
    question: 'How long does it typically take to bring a product to market?',
    answer: 'While timelines vary based on product complexity, our streamlined process typically reduces time-to-market by 30-40% compared to entrepreneurs navigating the process alone. Most products can go from concept to market in 6-8 months. We help guide you through optimizing your time during manufacturing and delivery phases to ensure you are ready to hit the ground running instantly'
  }, {
    question: 'Can you help with idea validation?',
    answer: 'Absolutely! If after our initial conversation and research we present an unfavorable market opportunity report, we will not encourage you to continue on as a client. Our goal is to stop you from investing unnecessarily in ideas'
  }];
  return <div className="bg-gradient-to-br from-charcoal-800 to-charcoal-900 min-h-screen w-full text-white">
      <Navigation />
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 to-charcoal-800/50 z-0"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-primary-500/20 via-transparent to-transparent"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-primary-500/10 via-transparent to-transparent"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 max-w-7xl mx-auto px-4">
              The place where startup ideas come to life
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
              Bringing your business ideas from concept to market with less risk
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to={isAuthenticated ? '/create-project' : '/login'} className="px-8 py-3 bg-primary-500 text-white font-medium rounded-md hover:bg-primary-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary-500/30">
                Get Started
                <ArrowRightIcon className="ml-2 h-5 w-5 inline" />
              </Link>
              <Link to="/services" className="px-8 py-3 border border-gray-500 text-gray-300 font-medium rounded-md hover:bg-charcoal-700 hover:text-white transition-all duration-300">
                Learn More
              </Link>
            </div>
          </div>
          <div className="mt-16 max-w-4xl mx-auto relative">
            <div className="bg-charcoal-700/70 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600 shadow-2xl">
              <div className="relative w-full h-64 md:h-80">
                <svg viewBox="0 0 1000 500" className="w-full h-full">
                  {/* World map background */}
                  <rect width="1000" height="500" fill="#1a1d21" opacity="0.3" />
                  {/* Grid pattern */}
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2d8a63" strokeOpacity="0.05" strokeWidth="1" />
                  </pattern>
                  <rect width="1000" height="500" fill="url(#grid)" />
                  {/* Simplified World Map - Major Continents */}
                  {/* North America */}
                  <path d="M100,120 L160,100 L200,110 L240,150 L250,200 L220,250 L180,270 L150,250 L120,220 L100,180 Z" fill="#2d8a63" fillOpacity="0.1" stroke="#2d8a63" strokeOpacity="0.2" strokeWidth="1" />
                  {/* South America */}
                  <path d="M220,280 L240,320 L220,380 L180,420 L160,380 L170,320 L200,290 Z" fill="#2d8a63" fillOpacity="0.1" stroke="#2d8a63" strokeOpacity="0.2" strokeWidth="1" />
                  {/* Europe */}
                  <path d="M420,100 L470,110 L500,130 L480,170 L440,180 L420,160 L400,140 Z" fill="#2d8a63" fillOpacity="0.1" stroke="#2d8a63" strokeOpacity="0.2" strokeWidth="1" />
                  {/* Africa */}
                  <path d="M420,190 L480,190 L520,240 L500,320 L460,350 L420,330 L400,280 L410,230 Z" fill="#2d8a63" fillOpacity="0.1" stroke="#2d8a63" strokeOpacity="0.2" strokeWidth="1" />
                  {/* Asia */}
                  <path d="M500,100 L600,80 L700,100 L750,150 L700,200 L650,220 L600,210 L550,180 L520,150 L500,140 Z" fill="#2d8a63" fillOpacity="0.1" stroke="#2d8a63" strokeOpacity="0.2" strokeWidth="1" />
                  {/* Australia */}
                  <path d="M750,300 L820,290 L850,320 L830,360 L780,370 L750,340 Z" fill="#2d8a63" fillOpacity="0.1" stroke="#2d8a63" strokeOpacity="0.2" strokeWidth="1" />
                  {/* Latitude/Longitude lines */}
                  <path d="M0,250 L1000,250" stroke="#2d8a63" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="5,5" />
                  <path d="M0,150 L1000,150" stroke="#2d8a63" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="5,5" />
                  <path d="M0,350 L1000,350" stroke="#2d8a63" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="5,5" />
                  <path d="M500,0 L500,500" stroke="#2d8a63" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="5,5" />
                  <path d="M250,0 L250,500" stroke="#2d8a63" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="5,5" />
                  <path d="M750,0 L750,500" stroke="#2d8a63" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="5,5" />
                  {/* Connection lines showing supply chain flow */}
                  <path d="M 200,240 C 250,200 300,180 350,240" fill="none" stroke="#57b987" strokeWidth="2" strokeDasharray="10,5" />
                  <path d="M 450,240 C 500,200 550,180 600,240" fill="none" stroke="#57b987" strokeWidth="2" strokeDasharray="10,5" />
                  <path d="M 700,240 C 750,200 800,180 850,240" fill="none" stroke="#57b987" strokeWidth="2" strokeDasharray="10,5" />
                  <path d="M 350,280 C 400,320 450,340 500,300" fill="none" stroke="#57b987" strokeWidth="2" strokeDasharray="10,5" />
                  <path d="M 600,280 C 650,320 700,340 750,300" fill="none" stroke="#57b987" strokeWidth="2" strokeDasharray="10,5" />
                  {/* Global shipping routes */}
                  <path d="M 180,250 Q 300,280 450,250 T 650,260 T 800,280" fill="none" stroke="#57b987" strokeOpacity="0.3" strokeWidth="8" />
                  <path d="M 750,340 Q 650,380 500,350 T 300,370 T 200,350" fill="none" stroke="#57b987" strokeOpacity="0.3" strokeWidth="8" />
                  <path d="M 480,180 Q 550,200 600,180" fill="none" stroke="#57b987" strokeOpacity="0.3" strokeWidth="6" />
                  {/* Main Factory in North America */}
                  <g transform="translate(180, 200)">
                    <rect x="0" y="0" width="60" height="40" rx="3" fill="#1f6f4e" />
                    <rect x="10" y="-15" width="10" height="15" fill="#1f6f4e" />
                    <rect x="30" y="-20" width="10" height="20" fill="#1f6f4e" />
                    <rect x="45" y="-12" width="8" height="12" fill="#1f6f4e" />
                    <rect x="5" y="10" width="50" height="25" fill="#175c40" />
                    <rect x="15" y="15" width="10" height="10" fill="#267d59" />
                    <rect x="35" y="15" width="10" height="10" fill="#267d59" />
                    <path d="M 0,25 L 60,25" stroke="#267d59" strokeWidth="2" />
                    <text x="30" y="55" textAnchor="middle" fill="#7bc8a1" fontSize="12" fontWeight="bold">
                      Manufacturing
                    </text>
                    <circle cx="0" cy="0" r="15" fill="#57b987" fillOpacity="0.1" stroke="#57b987" strokeOpacity="0.3" strokeWidth="1">
                      <animate attributeName="r" values="15;25;15" dur="3s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.1;0.3;0.1" dur="3s" repeatCount="indefinite" />
                    </circle>
                  </g>
                  {/* Factory in Europe */}
                  <g transform="translate(450, 150)">
                    <rect x="0" y="0" width="50" height="35" rx="3" fill="#1f6f4e" />
                    <rect x="8" y="-12" width="8" height="12" fill="#1f6f4e" />
                    <rect x="22" y="-15" width="8" height="15" fill="#1f6f4e" />
                    <rect x="36" y="-10" width="8" height="10" fill="#1f6f4e" />
                    <rect x="5" y="8" width="40" height="22" fill="#175c40" />
                    <rect x="10" y="13" width="8" height="8" fill="#267d59" />
                    <rect x="25" y="13" width="8" height="8" fill="#267d59" />
                    <rect x="38" y="13" width="8" height="8" fill="#267d59" />
                    <path d="M 0,22 L 50,22" stroke="#267d59" strokeWidth="1" />
                    <text x="25" y="45" textAnchor="middle" fill="#7bc8a1" fontSize="10" fontWeight="bold">
                      Production
                    </text>
                    <circle cx="0" cy="0" r="12" fill="#57b987" fillOpacity="0.1" stroke="#57b987" strokeOpacity="0.3" strokeWidth="1">
                      <animate attributeName="r" values="12;20;12" dur="4s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.1;0.3;0.1" dur="4s" repeatCount="indefinite" />
                    </circle>
                  </g>
                  {/* Factory in Asia */}
                  <g transform="translate(650, 180)">
                    <rect x="0" y="0" width="55" height="38" rx="3" fill="#1f6f4e" />
                    <rect x="10" y="-14" width="9" height="14" fill="#1f6f4e" />
                    <rect x="25" y="-18" width="9" height="18" fill="#1f6f4e" />
                    <rect x="40" y="-12" width="9" height="12" fill="#1f6f4e" />
                    <rect x="5" y="9" width="45" height="24" fill="#175c40" />
                    <rect x="12" y="14" width="9" height="9" fill="#267d59" />
                    <rect x="28" y="14" width="9" height="9" fill="#267d59" />
                    <rect x="42" y="14" width="9" height="9" fill="#267d59" />
                    <path d="M 0,24 L 55,24" stroke="#267d59" strokeWidth="1.5" />
                    <text x="27" y="50" textAnchor="middle" fill="#7bc8a1" fontSize="12" fontWeight="bold">
                      Assembly
                    </text>
                    <circle cx="0" cy="0" r="14" fill="#57b987" fillOpacity="0.1" stroke="#57b987" strokeOpacity="0.3" strokeWidth="1">
                      <animate attributeName="r" values="14;22;14" dur="3.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.1;0.3;0.1" dur="3.5s" repeatCount="indefinite" />
                    </circle>
                  </g>
                  {/* Distribution Center in North America */}
                  <g transform="translate(220, 250)">
                    <rect x="0" y="0" width="50" height="30" rx="3" fill="#343a41" />
                    <rect x="5" y="5" width="40" height="20" fill="#2d3238" />
                    <rect x="10" y="5" width="5" height="20" fill="#343a41" strokeWidth="0.5" stroke="#2d3238" />
                    <rect x="20" y="5" width="5" height="20" fill="#343a41" strokeWidth="0.5" stroke="#2d3238" />
                    <rect x="30" y="5" width="5" height="20" fill="#343a41" strokeWidth="0.5" stroke="#2d3238" />
                    <rect x="40" y="5" width="5" height="20" fill="#343a41" strokeWidth="0.5" stroke="#2d3238" />
                    <path d="M 0,15 L 50,15" stroke="#434C54" strokeWidth="0.5" />
                    <text x="25" y="40" textAnchor="middle" fill="#7bc8a1" fontSize="10" fontWeight="bold">
                      Distribution
                    </text>
                  </g>
                  {/* Distribution Center in Europe */}
                  <g transform="translate(480, 220)">
                    <rect x="0" y="0" width="50" height="30" rx="3" fill="#343a41" />
                    <rect x="5" y="5" width="40" height="20" fill="#2d3238" />
                    <rect x="10" y="5" width="5" height="20" fill="#343a41" strokeWidth="0.5" stroke="#2d3238" />
                    <rect x="20" y="5" width="5" height="20" fill="#343a41" strokeWidth="0.5" stroke="#2d3238" />
                    <rect x="30" y="5" width="5" height="20" fill="#343a41" strokeWidth="0.5" stroke="#2d3238" />
                    <rect x="40" y="5" width="5" height="20" fill="#343a41" strokeWidth="0.5" stroke="#2d3238" />
                    <path d="M 0,15 L 50,15" stroke="#434C54" strokeWidth="0.5" />
                    <text x="25" y="40" textAnchor="middle" fill="#7bc8a1" fontSize="10" fontWeight="bold">
                      Warehouse
                    </text>
                  </g>
                  {/* Distribution Center in Asia */}
                  <g transform="translate(700, 220)">
                    <rect x="0" y="0" width="50" height="30" rx="3" fill="#343a41" />
                    <rect x="5" y="5" width="40" height="20" fill="#2d3238" />
                    <rect x="10" y="5" width="5" height="20" fill="#343a41" strokeWidth="0.5" stroke="#2d3238" />
                    <rect x="20" y="5" width="5" height="20" fill="#343a41" strokeWidth="0.5" stroke="#2d3238" />
                    <rect x="30" y="5" width="5" height="20" fill="#343a41" strokeWidth="0.5" stroke="#2d3238" />
                    <rect x="40" y="5" width="5" height="20" fill="#343a41" strokeWidth="0.5" stroke="#2d3238" />
                    <path d="M 0,15 L 50,15" stroke="#434C54" strokeWidth="0.5" />
                    <text x="25" y="40" textAnchor="middle" fill="#7bc8a1" fontSize="10" fontWeight="bold">
                      Distribution
                    </text>
                  </g>
                  {/* Retail Store in North America */}
                  <g transform="translate(150, 300)">
                    <rect x="0" y="0" width="40" height="25" rx="2" fill="#267d59" />
                    <rect x="5" y="5" width="30" height="15" fill="#1f6f4e" />
                    <rect x="15" y="20" width="10" height="5" fill="#267d59" />
                    <path d="M 10,0 L 10,5 M 20,0 L 20,5 M 30,0 L 30,5" stroke="#57b987" strokeWidth="1" />
                    <rect x="10" y="10" width="20" height="10" fill="#343a41" />
                    <text x="20" y="35" textAnchor="middle" fill="#7bc8a1" fontSize="10" fontWeight="bold">
                      Retail
                    </text>
                  </g>
                  {/* Retail Store in Europe */}
                  <g transform="translate(420, 280)">
                    <rect x="0" y="0" width="40" height="25" rx="2" fill="#267d59" />
                    <rect x="5" y="5" width="30" height="15" fill="#1f6f4e" />
                    <rect x="15" y="20" width="10" height="5" fill="#267d59" />
                    <path d="M 10,0 L 10,5 M 20,0 L 20,5 M 30,0 L 30,5" stroke="#57b987" strokeWidth="1" />
                    <rect x="10" y="10" width="20" height="10" fill="#343a41" />
                    <text x="20" y="35" textAnchor="middle" fill="#7bc8a1" fontSize="10" fontWeight="bold">
                      Retail
                    </text>
                  </g>
                  {/* Retail Store in Asia */}
                  <g transform="translate(750, 250)">
                    <rect x="0" y="0" width="40" height="25" rx="2" fill="#267d59" />
                    <rect x="5" y="5" width="30" height="15" fill="#1f6f4e" />
                    <rect x="15" y="20" width="10" height="5" fill="#267d59" />
                    <path d="M 10,0 L 10,5 M 20,0 L 20,5 M 30,0 L 30,5" stroke="#57b987" strokeWidth="1" />
                    <rect x="10" y="10" width="20" height="10" fill="#343a41" />
                    <text x="20" y="35" textAnchor="middle" fill="#7bc8a1" fontSize="10" fontWeight="bold">
                      Retail
                    </text>
                  </g>
                  {/* Cargo Ships */}
                  <g transform="translate(350, 300)">
                    <path d="M 0,0 L 60,0 L 55,15 L 5,15 Z" fill="#343a41" />
                    <rect x="20" y="-10" width="25" height="10" fill="#2d3238" />
                    <rect x="5" y="5" width="50" height="5" fill="#57b987" opacity="0.7" />
                    <path d="M 30,0 Q 35,-5 40,0" stroke="#434C54" strokeWidth="1" fill="none" />
                    <text x="30" y="25" textAnchor="middle" fill="#7bc8a1" fontSize="10">
                      Ocean Freight
                    </text>
                    <animateMotion path="M 0,0 L 50,10 L 100,0" dur="10s" repeatCount="indefinite" />
                  </g>
                  <g transform="translate(600, 350)">
                    <path d="M 0,0 L 60,0 L 55,15 L 5,15 Z" fill="#343a41" />
                    <rect x="20" y="-10" width="25" height="10" fill="#2d3238" />
                    <rect x="5" y="5" width="50" height="5" fill="#57b987" opacity="0.7" />
                    <path d="M 30,0 Q 35,-5 40,0" stroke="#434C54" strokeWidth="1" fill="none" />
                    <text x="30" y="25" textAnchor="middle" fill="#7bc8a1" fontSize="10">
                      Shipping
                    </text>
                    <animateMotion path="M 0,0 L -50,-10 L -100,0" dur="12s" repeatCount="indefinite" />
                  </g>
                  {/* Airplanes */}
                  <g transform="translate(500, 130)">
                    <path d="M 0,0 L 40,0 L 35,5 L 30,5 L 25,10 L 5,10 L 0,5 Z" fill="#343a41" />
                    <path d="M 15,10 L 15,15 L 25,15 L 25,10" fill="#343a41" />
                    <path d="M 5,0 L 5,5 M 15,0 L 15,7 M 25,0 L 25,7 M 35,0 L 35,5" stroke="#57b987" strokeWidth="0.5" />
                    <text x="20" y="25" textAnchor="middle" fill="#7bc8a1" fontSize="10">
                      Air Freight
                    </text>
                    <animateMotion path="M 0,0 L 100,20 L 200,0" dur="8s" repeatCount="indefinite" />
                  </g>
                  <g transform="translate(300, 100)">
                    <path d="M 0,0 L 40,0 L 35,5 L 30,5 L 25,10 L 5,10 L 0,5 Z" fill="#343a41" />
                    <path d="M 15,10 L 15,15 L 25,15 L 25,10" fill="#343a41" />
                    <path d="M 5,0 L 5,5 M 15,0 L 15,7 M 25,0 L 25,7 M 35,0 L 35,5" stroke="#57b987" strokeWidth="0.5" />
                    <text x="20" y="25" textAnchor="middle" fill="#7bc8a1" fontSize="10">
                      Air Freight
                    </text>
                    <animateMotion path="M 0,0 L -100,20 L -200,0" dur="7s" repeatCount="indefinite" />
                  </g>
                  {/* Delivery Trucks */}
                  <g transform="translate(250, 320)">
                    <rect x="0" y="0" width="30" height="15" rx="2" fill="#57b987" />
                    <rect x="20" y="3" width="15" height="9" rx="1" fill="#7bc8a1" />
                    <circle cx="8" cy="15" r="3" fill="#272a30" />
                    <circle cx="22" cy="15" r="3" fill="#272a30" />
                    <text x="15" y="25" textAnchor="middle" fill="#7bc8a1" fontSize="9">
                      Delivery
                    </text>
                    <animateMotion path="M 0,0 L -30,10 L -60,0" dur="5s" repeatCount="indefinite" />
                  </g>
                  <g transform="translate(520, 260)">
                    <rect x="0" y="0" width="30" height="15" rx="2" fill="#57b987" />
                    <rect x="20" y="3" width="15" height="9" rx="1" fill="#7bc8a1" />
                    <circle cx="8" cy="15" r="3" fill="#272a30" />
                    <circle cx="22" cy="15" r="3" fill="#272a30" />
                    <text x="15" y="25" textAnchor="middle" fill="#7bc8a1" fontSize="9">
                      Delivery
                    </text>
                    <animateMotion path="M 0,0 L -30,-10 L -60,0" dur="6s" repeatCount="indefinite" />
                  </g>
                  <g transform="translate(680, 270)">
                    <rect x="0" y="0" width="30" height="15" rx="2" fill="#57b987" />
                    <rect x="20" y="3" width="15" height="9" rx="1" fill="#7bc8a1" />
                    <circle cx="8" cy="15" r="3" fill="#272a30" />
                    <circle cx="22" cy="15" r="3" fill="#272a30" />
                    <text x="15" y="25" textAnchor="middle" fill="#7bc8a1" fontSize="9">
                      Delivery
                    </text>
                    <animateMotion path="M 0,0 L 30,10 L 60,0" dur="4s" repeatCount="indefinite" />
                  </g>
                  {/* Shipping containers */}
                  <g transform="translate(800, 220)">
                    <rect x="0" y="0" width="40" height="20" rx="1" fill="#57b987" />
                    <rect x="2" y="2" width="36" height="16" fill="#267d59" />
                    <path d="M 2,10 L 38,10" stroke="#57b987" strokeWidth="1" />
                    <path d="M 10,2 L 10,18 M 20,2 L 20,18 M 30,2 L 30,18" stroke="#57b987" strokeWidth="0.5" />
                    <text x="20" y="30" textAnchor="middle" fill="#7bc8a1" fontSize="9">
                      Container
                    </text>
                  </g>
                  {/* Digital elements - data points & connections */}
                  <g>
                    <circle cx="180" cy="200" r="5" fill="#57b987" fillOpacity="0.5">
                      <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="fillOpacity" values="0.5;0.8;0.5" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="450" cy="150" r="5" fill="#57b987" fillOpacity="0.5">
                      <animate attributeName="r" values="5;7;5" dur="3s" repeatCount="indefinite" />
                      <animate attributeName="fillOpacity" values="0.5;0.8;0.5" dur="3s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="650" cy="180" r="5" fill="#57b987" fillOpacity="0.5">
                      <animate attributeName="r" values="5;7;5" dur="2.5s" repeatCount="indefinite" />
                      <animate attributeName="fillOpacity" values="0.5;0.8;0.5" dur="2.5s" repeatCount="indefinite" />
                    </circle>
                    <path d="M 180,200 L 450,150" stroke="#57b987" strokeWidth="1" strokeDasharray="5,5" strokeOpacity="0.3" />
                    <path d="M 450,150 L 650,180" stroke="#57b987" strokeWidth="1" strokeDasharray="5,5" strokeOpacity="0.3" />
                    <path d="M 650,180 L 700,220" stroke="#57b987" strokeWidth="1" strokeDasharray="5,5" strokeOpacity="0.3" />
                    <path d="M 180,200 L 220,250" stroke="#57b987" strokeWidth="1" strokeDasharray="5,5" strokeOpacity="0.3" />
                    <path d="M 450,150 L 480,220" stroke="#57b987" strokeWidth="1" strokeDasharray="5,5" strokeOpacity="0.3" />
                  </g>
                  {/* Location pins for key hubs */}
                  <g transform="translate(180, 200)">
                    <path d="M -5,-15 A 5,5 0 0,1 5,-15 L 0,0 Z" fill="#e74c3c" />
                    <circle cx="0" cy="-15" r="3" fill="#c0392b" />
                  </g>
                  <g transform="translate(450, 150)">
                    <path d="M -5,-15 A 5,5 0 0,1 5,-15 L 0,0 Z" fill="#e74c3c" />
                    <circle cx="0" cy="-15" r="3" fill="#c0392b" />
                  </g>
                  <g transform="translate(650, 180)">
                    <path d="M -5,-15 A 5,5 0 0,1 5,-15 L 0,0 Z" fill="#e74c3c" />
                    <circle cx="0" cy="-15" r="3" fill="#c0392b" />
                  </g>
                  {/* Legend */}
                  <g transform="translate(20, 430)">
                    <rect x="0" y="0" width="200" height="60" rx="3" fill="#1a1d21" fillOpacity="0.5" />
                    <text x="10" y="15" fill="#ffffff" fontSize="10" fontWeight="bold">
                      Global Supply Chain Network
                    </text>
                    <rect x="10" y="25" width="8" height="8" fill="#1f6f4e" />
                    <text x="25" y="32" fill="#ffffff" fontSize="8">
                      Manufacturing
                    </text>
                    <rect x="10" y="40" width="8" height="8" fill="#343a41" />
                    <text x="25" y="47" fill="#ffffff" fontSize="8">
                      Distribution
                    </text>
                    <rect x="80" y="25" width="8" height="8" fill="#267d59" />
                    <text x="95" y="32" fill="#ffffff" fontSize="8">
                      Retail
                    </text>
                    <path d="M 80,40 L 88,40" stroke="#57b987" strokeWidth="2" strokeDasharray="2,1" />
                    <text x="95" y="47" fill="#ffffff" fontSize="8">
                      Supply Routes
                    </text>
                    <circle cx="140" cy="29" r="4" fill="#e74c3c" />
                    <text x="155" y="32" fill="#ffffff" fontSize="8">
                      Key Hubs
                    </text>
                    <circle cx="140" cy="44" r="4" fill="#57b987" fillOpacity="0.5" />
                    <text x="155" y="47" fill="#ffffff" fontSize="8">
                      Data Points
                    </text>
                  </g>
                </svg>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 -left-4 h-16 bg-gradient-to-t from-charcoal-800 to-transparent z-10"></div>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Services
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              From your first sample to launch ready
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-charcoal-700/50 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600 hover:border-primary-500 transition-all duration-300 group">
              <div className="text-primary-400 mb-4">
                <BoxIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Sampling</h3>
              <p className="text-gray-300 mb-4">
                Turning product concepts to tangible samples
              </p>
              <Link to="/services/prototyping" className="text-primary-400 group-hover:text-primary-300 inline-flex items-center">
                Learn more{' '}
                <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="bg-charcoal-700/50 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600 hover:border-primary-500 transition-all duration-300 group">
              <div className="text-primary-400 mb-4">
                <TruckIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Sourcing</h3>
              <p className="text-gray-300 mb-4">
                Finding you reliable manufacturers suited to your budget and needs
              </p>
              <Link to="/services/sourcing" className="text-primary-400 group-hover:text-primary-300 inline-flex items-center">
                Learn more{' '}
                <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="bg-charcoal-700/50 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600 hover:border-primary-500 transition-all duration-300 group">
              <div className="text-primary-400 mb-4">
                <Factory className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Manufacturing and freight</h3>
              <p className="text-gray-300 mb-4">
                Executing manufacturing and freight logistics ensuring seamless production and delivery
              </p>
              <Link to="/services/manufacturing" className="text-primary-400 group-hover:text-primary-300 inline-flex items-center">
                Learn more{' '}
                <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          <div className="mt-8 grid md:grid-cols-2 gap-8">
            <div className="bg-charcoal-700/50 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600 hover:border-primary-500 transition-all duration-300 group">
              <div className="text-primary-400 mb-4">
                <CameraIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Product shots</h3>
              <p className="text-gray-300 mb-4">
                Making you launch ready with professional product shots that drive sales
              </p>
              <Link to="/services/photography" className="text-primary-400 group-hover:text-primary-300 inline-flex items-center">
                Learn more{' '}
                <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="bg-charcoal-700/50 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600 hover:border-primary-500 transition-all duration-300 group">
              <div className="text-primary-400 mb-4">
                <LineChartIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Marketing</h3>
              <p className="text-gray-300 mb-4">
                Creating extensive marketing launch plans that promote brand awareness and sales
              </p>
              <Link to="/services/marketing" className="text-primary-400 group-hover:text-primary-300 inline-flex items-center">
                Learn more{' '}
                <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900/10 via-transparent to-transparent"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why do business ideas fail
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Our services are strategically designed to address and prevent the core challenges that lead to startup failure
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-charcoal-700/30 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600">
              <div className="text-4xl font-bold text-primary-400 mb-3">
                82%
              </div>
              <p className="text-gray-300">fail due to cash flow problems</p>
            </div>
            <div className="bg-charcoal-700/30 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600">
              <div className="text-4xl font-bold text-primary-400 mb-3">
                38%
              </div>
              <p className="text-gray-300">
                fail by not having a good business plan
              </p>
            </div>
            <div className="bg-charcoal-700/30 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600">
              <div className="text-4xl font-bold text-primary-400 mb-3">
                14%
              </div>
              <p className="text-gray-300">
                fail because of a lack of marketing
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Process Section */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our process</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              A strategic process, adaptable to your pace and needs
            </p>
          </div>
          <div className="space-y-6">
            {[{
            number: '01',
            title: 'Sample your vision',
            description: 'Turn your idea into a physical product with our years of experience'
          }, {
            number: '02',
            title: 'Find the best supplier for you',
            description: "We'll find you three reliable suppliers to choose from that meet your manufacturing and budget requirements"
          }, {
            number: '03',
            title: 'Place bulk orders and have them delivered',
            description: 'Leverage our experience in manufacturing and freight logistics to ensure smooth operations and competitive costs'
          }, {
            number: '04',
            title: 'Showcase your product',
            description: 'Get special pricing on professional product shots based on your own inspiration for your website and marketing assets'
          }, {
            number: '05',
            title: 'Why do business ideas fail',
            description: 'Get an extensive marketing launch plan to successfully introduce your product to the market ensuring your marketing dollars are spent wisely'
          }].map((step, index) => <div key={index} className="flex items-start bg-charcoal-700/30 backdrop-blur-sm p-6 rounded-xl border border-charcoal-600 hover:border-primary-500 transition-all duration-300">
                <div className="text-xl font-bold text-primary-400 mr-6">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
              </div>)}
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Frequently asked questions
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              You asked, so we've answered truthfully
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            {faqItems.map((faq, index) => <div key={index} className="mb-4 bg-charcoal-700/30 backdrop-blur-sm rounded-xl border border-charcoal-600 overflow-hidden">
                <button onClick={() => toggleFaq(index)} className="flex justify-between items-center w-full text-left p-6 focus:outline-none">
                  <h3 className="text-lg font-medium">{faq.question}</h3>
                  <span>
                    {openFaqIndex === index ? <MinusIcon className="h-5 w-5 text-primary-400" /> : <PlusIcon className="h-5 w-5 text-primary-400" />}
                  </span>
                </button>
                {openFaqIndex === index && <div className="px-6 pb-6">
                    <p className="text-gray-300">{faq.answer}</p>
                  </div>}
              </div>)}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 to-transparent"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to bring your idea to life?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
            Join the entrepreneurs who are successfully bringing their products
            to market with our help.
          </p>
          <Link to={isAuthenticated ? '/create-project' : '/login'} className="px-8 py-3 bg-primary-500 text-white font-medium rounded-md hover:bg-primary-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary-500/30">
            Get Started
            <ArrowRightIcon className="ml-2 h-5 w-5 inline" />
          </Link>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-charcoal-900 border-t border-charcoal-700 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:justify-between">
            <div className="mb-8 md:mb-0">
              <img src="/IMG_8336.png" alt="Sprout'n Logo" className="h-8 mb-4" />
              <p className="text-gray-500 max-w-xs">
                From concept to market, we're with you every step of the way.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                  Services
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/services/prototyping" className="text-gray-400 hover:text-primary-400 transition-colors">
                      Prototyping
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/sourcing" className="text-gray-400 hover:text-primary-400 transition-colors">
                      Sourcing & Manufacturing
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/photography" className="text-gray-400 hover:text-primary-400 transition-colors">
                      Photography
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/marketing" className="text-gray-400 hover:text-primary-400 transition-colors">
                      Marketing
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                  Company
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/about" className="text-gray-400 hover:text-primary-400 transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className="text-gray-400 hover:text-primary-400 transition-colors">
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                  Legal
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/terms" className="text-gray-400 hover:text-primary-400 transition-colors">
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link to="/privacy" className="text-gray-400 hover:text-primary-400 transition-colors">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link to="/cookies" className="text-gray-400 hover:text-primary-400 transition-colors">
                      Cookies
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-charcoal-700 text-center md:text-left text-gray-500">
            <p>© {new Date().getFullYear()} Sprout'n. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>;
};
export default LandingPage;