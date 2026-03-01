export type IndustryCategory =
  | 'finance'
  | 'healthcare'
  | 'education'
  | 'retail'
  | 'logistics'
  | 'customer-experience'
  | 'ethics-governance'
  | 'knowledge-management'
  | 'computer-vision';

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: IndustryCategory;
  tags: string[];
  featured: boolean;
  highlightMetric?: string;
  icon: string;
  status: 'completed' | 'ongoing';
}

export interface IndustryMeta {
  id: IndustryCategory;
  label: string;
  shortLabel: string;
  description: string;
  icon: string;
  color: string;
  projectCount: number;
}

export const industries: IndustryMeta[] = [
  {
    id: 'finance',
    label: 'Finance & Investments',
    shortLabel: 'Finance',
    description:
      'AI-powered research advisors, loan origination, dynamic pricing, and document intelligence',
    icon: 'TrendingUp',
    color: 'blue',
    projectCount: 5,
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    shortLabel: 'Healthcare',
    description: 'Risk dashboards, model comparison platforms, and clinical benchmarking',
    icon: 'Heart',
    color: 'red',
    projectCount: 2,
  },
  {
    id: 'education',
    label: 'Education & EdTech',
    shortLabel: 'EdTech',
    description: 'AI mock interviews, curriculum generators, assessment engines, and LMS platforms',
    icon: 'GraduationCap',
    color: 'violet',
    projectCount: 5,
  },
  {
    id: 'retail',
    label: 'Retail & E-Commerce',
    shortLabel: 'Retail',
    description:
      'Recommendation engines, microservice architectures, and context-aware recommenders',
    icon: 'ShoppingCart',
    color: 'amber',
    projectCount: 3,
  },
  {
    id: 'logistics',
    label: 'Logistics & Supply Chain',
    shortLabel: 'Logistics',
    description: 'Route optimization with genetic algorithms and reinforcement learning',
    icon: 'Truck',
    color: 'emerald',
    projectCount: 1,
  },
  {
    id: 'customer-experience',
    label: 'Customer Experience & NLP',
    shortLabel: 'CX & NLP',
    description: 'Feedback analytics, sentiment analysis, and churn prediction with MLOps',
    icon: 'MessageSquare',
    color: 'cyan',
    projectCount: 3,
  },
  {
    id: 'ethics-governance',
    label: 'Ethics & Governance',
    shortLabel: 'AI Ethics',
    description: 'Algorithmic bias analysis and ESG compliance tooling',
    icon: 'Scale',
    color: 'slate',
    projectCount: 1,
  },
  {
    id: 'knowledge-management',
    label: 'Knowledge Management',
    shortLabel: 'Knowledge',
    description: 'RAG-powered knowledge bases with voice agents and semantic search',
    icon: 'BookOpen',
    color: 'indigo',
    projectCount: 1,
  },
  {
    id: 'computer-vision',
    label: 'Computer Vision & Monitoring',
    shortLabel: 'Vision',
    description: 'Face detection, recognition, attention monitoring, and real-time tracking',
    icon: 'Eye',
    color: 'pink',
    projectCount: 4,
  },
];

export const projects: Project[] = [
  // ═══ FINANCE & INVESTMENTS (5) ═══
  {
    id: 'ai-investment-advisor',
    title: 'AI Investment Research Advisor',
    shortDescription: 'LangGraph-powered research advisor with explainable SHAP insights',
    fullDescription:
      'Built an agentic investment research advisor using LangGraph multi-agent orchestration, Claude API for deep analysis, and SHAP for explainable model outputs. The system autonomously researches stocks, evaluates risk, and generates comprehensive investment briefs with full transparency into its reasoning.',
    category: 'finance',
    tags: ['LangGraph', 'Claude API', 'SHAP', 'Python', 'Agentic AI'],
    featured: true,
    highlightMetric: 'Multi-agent orchestration',
    icon: 'TrendingUp',
    status: 'completed',
  },
  {
    id: 'loan-origination-system',
    title: 'Loan Origination System',
    shortDescription: 'ANN/CNN/RNN ensemble with face recognition KYC verification',
    fullDescription:
      'End-to-end loan origination platform combining a deep learning ensemble (ANN, CNN, RNN) for credit scoring with real-time face recognition for KYC verification. Reduced manual review workload by 60% while maintaining regulatory compliance across the entire origination pipeline.',
    category: 'finance',
    tags: ['ANN', 'CNN', 'RNN', 'Face Recognition', 'KYC', 'Deep Learning'],
    featured: false,
    highlightMetric: '60% less manual review',
    icon: 'FileCheck',
    status: 'completed',
  },
  {
    id: 'dynamic-pricing-engine',
    title: 'Dynamic Pricing Engine',
    shortDescription: 'Multi-armed bandit and Q-Learning for real-time price optimization',
    fullDescription:
      'Built a dynamic pricing engine powered by multi-armed bandit exploration and Q-Learning for real-time price optimization. The system continuously learns from market signals and customer behavior to maximize revenue while maintaining competitive positioning.',
    category: 'finance',
    tags: ['Multi-Armed Bandit', 'Q-Learning', 'Reinforcement Learning', 'Python'],
    featured: false,
    highlightMetric: 'Real-time optimization',
    icon: 'DollarSign',
    status: 'completed',
  },
  {
    id: 'intelligent-document-processor',
    title: 'Intelligent Document Processor',
    shortDescription: 'AI-powered trading document extraction and classification via Claude API',
    fullDescription:
      'Intelligent document processing system for trading documents using Claude API. Automatically extracts, classifies, and structures data from complex financial documents including trade confirmations, settlement instructions, and regulatory filings.',
    category: 'finance',
    tags: ['Claude API', 'NLP', 'Document AI', 'Python', 'OCR'],
    featured: false,
    highlightMetric: 'Automated extraction',
    icon: 'FileSearch',
    status: 'completed',
  },
  {
    id: 'bank-statement-analyzer',
    title: 'Bank Statement Analyzer',
    shortDescription: 'AI-powered converter turning raw statements into auditor-ready vouchers',
    fullDescription:
      'AI-powered bank statement analyzer that converts raw bank statements into auditor-ready vouchers using hybrid classification (AI + regex). Features a RAG chatbot for querying transaction data and professional Excel export with ZIP bundling for seamless handoff to audit teams.',
    category: 'finance',
    tags: ['RAG', 'Hybrid Classification', 'Python', 'Excel', 'Chatbot'],
    featured: true,
    highlightMetric: 'Auditor-ready output',
    icon: 'FileSpreadsheet',
    status: 'completed',
  },

  // ═══ HEALTHCARE (2) ═══
  {
    id: 'heart-disease-risk-dashboard',
    title: 'Heart Disease Risk Dashboard',
    shortDescription: 'Multi-model ML dashboard with bias mitigation for clinical use',
    fullDescription:
      'Heart disease risk prediction dashboard combining multiple ML models with built-in bias mitigation strategies. The dashboard provides clinicians with transparent risk assessments, model comparison metrics, and fairness audits across demographic groups to support equitable healthcare decisions.',
    category: 'healthcare',
    tags: ['Scikit-learn', 'Bias Mitigation', 'Dashboard', 'Python', 'Fairness AI'],
    featured: false,
    highlightMetric: 'Bias-mitigated predictions',
    icon: 'HeartPulse',
    status: 'completed',
  },
  {
    id: 'ai-model-comparison-dashboard',
    title: 'AI Model Comparison Dashboard',
    shortDescription: 'Hospital-level benchmarking and KPI forecasting platform',
    fullDescription:
      'AI model comparison dashboard designed for hospital-level benchmarking and KPI forecasting. Enables healthcare administrators to evaluate model performance across departments, forecast key performance indicators, and make data-driven decisions about AI deployment in clinical settings.',
    category: 'healthcare',
    tags: ['Benchmarking', 'KPI Forecasting', 'Dashboard', 'Python', 'ML'],
    featured: false,
    highlightMetric: 'Hospital-level KPIs',
    icon: 'BarChart3',
    status: 'completed',
  },

  // ═══ EDUCATION & EDTECH (5) ═══
  {
    id: 'ai-mock-interview-platform',
    title: 'AI Mock Interview & Roleplay Platform',
    shortDescription: 'Full-stack platform with AI avatars, STT, and real-time video analytics',
    fullDescription:
      'Full-stack micro-modular AI interview platform with GPT-5.2 for content generation, HeyGen streaming avatars via WebRTC, Deepgram Nova-2 STT with load-balanced WebSocket pools, real-time video analytics using OpenCV + dlib for eye contact and engagement scoring, FastAPI async backend on AWS RDS, and ReportLab-generated PDF reports with circular score gauges.',
    category: 'education',
    tags: ['GPT-5.2', 'HeyGen', 'WebRTC', 'Deepgram', 'OpenCV', 'dlib', 'FastAPI', 'AWS'],
    featured: true,
    highlightMetric: 'Real-time engagement scoring',
    icon: 'Video',
    status: 'completed',
  },
  {
    id: 'ai-curriculum-generator',
    title: 'AI Curriculum Generator',
    shortDescription: 'RAG-powered curriculum generation with GPT-4 and adaptive learning paths',
    fullDescription:
      'AI curriculum generator leveraging Retrieval-Augmented Generation (RAG) with GPT-4 to automatically create structured, pedagogically-sound curricula. Analyzes learning objectives and generates course outlines, lesson plans, and assessment rubrics tailored to specific educational contexts.',
    category: 'education',
    tags: ['RAG', 'GPT-4', 'Python', 'Education AI', 'NLP'],
    featured: false,
    highlightMetric: 'Automated curriculum design',
    icon: 'BookOpen',
    status: 'completed',
  },
  {
    id: 'ai-assessment-engine',
    title: 'AI Assessment Engine',
    shortDescription: 'Intelligent assessment generation and grading with Django + OpenAI',
    fullDescription:
      'AI-powered assessment engine built with Django and OpenAI that automatically generates contextual exam questions, provides intelligent grading with detailed feedback, and adapts difficulty based on student performance patterns over time.',
    category: 'education',
    tags: ['Django', 'OpenAI', 'Python', 'Assessment AI', 'Adaptive Learning'],
    featured: false,
    highlightMetric: 'Adaptive difficulty',
    icon: 'ClipboardCheck',
    status: 'completed',
  },
  {
    id: 'lms-platform-suite',
    title: 'LMS Platform Suite (3 Platforms)',
    shortDescription:
      'Three full LMS platforms with live classes, AI chat, and real-time dashboards',
    fullDescription:
      'Built three complete Learning Management System platforms featuring live video classes, AI-powered chat assistants, interactive flashcard systems, and real-time analytics dashboards. Each platform was customized for different educational contexts while sharing a common modular architecture.',
    category: 'education',
    tags: ['Next.js', 'React', 'WebSocket', 'AI Chat', 'Live Video', 'Dashboard'],
    featured: true,
    highlightMetric: '3 production platforms',
    icon: 'GraduationCap',
    status: 'completed',
  },

  // ═══ RETAIL & E-COMMERCE (3) ═══
  {
    id: 'two-tower-recommendation-engine',
    title: 'Two-Tower Recommendation Engine',
    shortDescription: 'Neural recommendation system with ONNX + Triton Inference Server',
    fullDescription:
      'Built a Two-Tower neural network recommendation engine optimized for production with ONNX model export and Triton Inference Server for high-throughput serving. The system handles millions of user-item pairs in real-time with sub-10ms latency for personalized product recommendations.',
    category: 'retail',
    tags: ['Two-Tower Networks', 'ONNX', 'Triton', 'TensorFlow', 'Recommendation Systems'],
    featured: true,
    highlightMetric: '<10ms inference latency',
    icon: 'ShoppingCart',
    status: 'completed',
  },
  {
    id: 'gyco-retail-platform',
    title: 'GYCO Retail Platform',
    shortDescription: '7-service microarchitecture with AI recommendations and visual search',
    fullDescription:
      'GYCO Retail — a 7-service microarchitecture e-commerce platform featuring AI-powered product recommendations, visual search capabilities, and Medusa Commerce integration. Built for scale with independent service deployment and inter-service communication via event-driven architecture.',
    category: 'retail',
    tags: ['Microservices', 'Medusa Commerce', 'Visual Search', 'AI Recommendations', 'Docker'],
    featured: false,
    highlightMetric: '7 independent services',
    icon: 'Store',
    status: 'completed',
  },
  {
    id: 'context-aware-recommender',
    title: 'Context-Aware Recommender',
    shortDescription: 'CTGAN synthetic data augmentation with TensorFlow embeddings',
    fullDescription:
      'Context-aware recommendation system using CTGAN for synthetic data augmentation to handle cold-start problems and TensorFlow embeddings for rich user-item representations. The system adapts recommendations based on contextual signals like time, location, and browsing behavior.',
    category: 'retail',
    tags: ['CTGAN', 'TensorFlow', 'Embeddings', 'Synthetic Data', 'Context-Aware'],
    featured: false,
    highlightMetric: 'Cold-start solved',
    icon: 'Sparkles',
    status: 'completed',
  },

  // ═══ LOGISTICS & SUPPLY CHAIN (1) ═══
  {
    id: 'route-optimization-engine',
    title: 'Route Optimization Engine',
    shortDescription: 'Genetic algorithms + Q-Learning for dynamic re-routing and carbon analysis',
    fullDescription:
      'Route optimization system using genetic algorithms combined with Q-Learning for dynamic re-routing, intelligent zone clustering, and carbon footprint analysis. Optimizes delivery routes in real-time while balancing cost efficiency with environmental impact metrics.',
    category: 'logistics',
    tags: [
      'Genetic Algorithms',
      'Q-Learning',
      'Reinforcement Learning',
      'Route Optimization',
      'Carbon Analysis',
    ],
    featured: false,
    highlightMetric: 'Dynamic re-routing',
    icon: 'Route',
    status: 'completed',
  },

  // ═══ CUSTOMER EXPERIENCE & NLP (3) ═══
  {
    id: 'customer-feedback-analytics',
    title: 'Customer Feedback Analytics',
    shortDescription: 'Fine-tuned DistilBERT for sentiment classification at scale',
    fullDescription:
      'Customer feedback analytics platform powered by a fine-tuned DistilBERT model for high-accuracy sentiment classification. Processes thousands of reviews, support tickets, and survey responses to surface actionable insights and trend analysis for product teams.',
    category: 'customer-experience',
    tags: ['DistilBERT', 'Fine-tuning', 'NLP', 'Sentiment Analysis', 'Python'],
    featured: false,
    highlightMetric: 'Fine-tuned DistilBERT',
    icon: 'MessageSquare',
    status: 'completed',
  },
  {
    id: 'sales-sentiment-analysis',
    title: 'Sales Sentiment Analysis',
    shortDescription: 'Real-time call analysis using Whisper STT + DistilBERT pipeline',
    fullDescription:
      'Sales sentiment analysis system that processes live sales calls in real-time using OpenAI Whisper for speech-to-text and DistilBERT for sentiment classification. Provides sales managers with call quality scores, emotional trajectory charts, and coaching recommendations.',
    category: 'customer-experience',
    tags: ['Whisper', 'DistilBERT', 'Speech-to-Text', 'Real-time', 'Sentiment Analysis'],
    featured: false,
    highlightMetric: 'Live call analysis',
    icon: 'Phone',
    status: 'completed',
  },
  {
    id: 'customer-churn-prediction',
    title: 'Customer Churn Prediction',
    shortDescription: 'Full MLOps pipeline with Prometheus monitoring and automated retraining',
    fullDescription:
      'Customer churn prediction system built with a full MLOps pipeline including automated model training, A/B testing, Prometheus monitoring for model drift detection, and automated retraining triggers. Deployed with CI/CD pipelines for continuous model improvement.',
    category: 'customer-experience',
    tags: ['MLOps', 'Prometheus', 'CI/CD', 'Model Monitoring', 'Churn Prediction'],
    featured: false,
    highlightMetric: 'Full MLOps pipeline',
    icon: 'UserMinus',
    status: 'completed',
  },

  // ═══ ETHICS & GOVERNANCE (1) ═══
  {
    id: 'esg-algorithmic-bias-analysis',
    title: 'ESG Algorithmic Bias Analysis',
    shortDescription: 'COMPAS and NYPD dataset analysis with governance recommendations',
    fullDescription:
      'ESG algorithmic bias analysis conducted on COMPAS recidivism and NYPD Stop-and-Frisk datasets. Produced comprehensive governance recommendations and interactive dashboards exposing disparate impact metrics, fairness constraints, and actionable remediation strategies for policymakers.',
    category: 'ethics-governance',
    tags: ['Fairness AI', 'Bias Analysis', 'ESG', 'COMPAS', 'Dashboard', 'Governance'],
    featured: false,
    highlightMetric: 'Policy-grade recommendations',
    icon: 'Scale',
    status: 'completed',
  },

  // ═══ KNOWLEDGE MANAGEMENT (1) ═══
  {
    id: 'secondbrain-knowledge-base',
    title: 'SecondBrain Knowledge Base',
    shortDescription: 'RAG-powered knowledge base with voice agent and multi-level caching',
    fullDescription:
      'SecondBrain — a RAG-powered knowledge base featuring a voice agent interface, semantic search, and multi-level caching that reduced response times from 45 seconds to under 100 milliseconds. Built for teams that need instant, conversational access to their organizational knowledge.',
    category: 'knowledge-management',
    tags: ['RAG', 'Voice Agent', 'Semantic Search', 'Caching', 'Vector Database'],
    featured: true,
    highlightMetric: '45s → <100ms response time',
    icon: 'Brain',
    status: 'completed',
  },

  // ═══ COMPUTER VISION & MONITORING (4) ═══
  {
    id: 'yolov5-face-detection',
    title: 'YOLOv5 Real-Time Face Detection',
    shortDescription: 'Real-time face detection system powered by YOLOv5 object detection',
    fullDescription:
      'Real-time face detection system built on YOLOv5 architecture, optimized for high frame-rate video streams. Handles multiple simultaneous faces with bounding box tracking, confidence scoring, and integration-ready REST API endpoints for downstream applications.',
    category: 'computer-vision',
    tags: ['YOLOv5', 'Object Detection', 'Real-time', 'Python', 'PyTorch'],
    featured: false,
    highlightMetric: 'Real-time detection',
    icon: 'ScanFace',
    status: 'completed',
  },
  {
    id: 'dlib-face-recognition',
    title: 'dlib 128-D Face Recognition',
    shortDescription: '128-dimensional face encoding for identity verification and matching',
    fullDescription:
      'Face recognition system using dlib 128-dimensional face encodings for accurate identity verification and matching. The system generates robust facial embeddings that enable reliable person identification across varying lighting conditions, angles, and partial occlusions.',
    category: 'computer-vision',
    tags: ['dlib', 'Face Recognition', '128-D Encodings', 'Python', 'OpenCV'],
    featured: false,
    highlightMetric: '128-D face encodings',
    icon: 'Fingerprint',
    status: 'completed',
  },
  {
    id: 'opencv-haar-cascade',
    title: 'OpenCV Haar Cascade Systems',
    shortDescription: 'Haar Cascade-based detection systems for face and feature identification',
    fullDescription:
      'Suite of computer vision systems built on OpenCV Haar Cascade classifiers for face and feature detection. Optimized for edge deployment scenarios where lightweight, fast detection is required without GPU dependencies.',
    category: 'computer-vision',
    tags: ['OpenCV', 'Haar Cascade', 'Edge Computing', 'Python', 'Real-time'],
    featured: false,
    highlightMetric: 'Edge-optimized',
    icon: 'Camera',
    status: 'completed',
  },
  {
    id: 'mediapipe-eye-tracker',
    title: 'Eye Tracker with MediaPipe',
    shortDescription: 'MediaPipe-powered gaze tracking for attention monitoring and analytics',
    fullDescription:
      'Eye tracking and attention monitoring system built with MediaPipe for real-time gaze estimation. Tracks eye movement patterns, blink rates, and attention focus areas to provide engagement scoring for educational and professional settings.',
    category: 'computer-vision',
    tags: ['MediaPipe', 'Eye Tracking', 'Attention Monitoring', 'Python', 'Real-time'],
    featured: false,
    highlightMetric: 'Real-time gaze tracking',
    icon: 'Eye',
    status: 'completed',
  },
];

export function getProjectsByCategory(category: IndustryCategory): Project[] {
  return projects.filter((p) => p.category === category);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.id === slug);
}
