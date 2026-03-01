import {
  PrismaClient,
  UserRole,
  MembershipRole,
  Plan,
  SubscriptionStatus,
  TicketPriority,
  TicketStatus,
  PostStatus,
  ModelCategory,
  InvoiceStatus,
  DeploymentStatus,
  ProjectStatus,
  MilestoneStatus,
  DeliverableType,
  MessageType,
} from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';
import { createHash } from 'crypto';

const connectionString = process.env['DATABASE_URL'] ?? '';
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // Clean existing data (in reverse dependency order)
  await prisma.projectActivity.deleteMany();
  await prisma.projectMessage.deleteMany();
  await prisma.deliverable.deleteMany();
  await prisma.milestone.deleteMany();
  await prisma.projectMember.deleteMany();
  await prisma.project.deleteMany();
  await prisma.webhookDelivery.deleteMany();
  await prisma.webhookEndpoint.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.ticketMessage.deleteMany();
  await prisma.supportTicket.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.usageLog.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.deployment.deleteMany();
  await prisma.aiModel.deleteMany();
  await prisma.apiKey.deleteMany();
  await prisma.membership.deleteMany();
  await prisma.organization.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.enterpriseLead.deleteMany();
  await prisma.user.deleteMany();

  console.log('  Cleaned existing data');

  // ── USERS ──
  const passwordHash = await bcrypt.hash('Password123!', 12);

  // Co-founders (SUPER_ADMIN)
  const vidit = await prisma.user.create({
    data: {
      email: 'vidit@cognispace.com',
      passwordHash,
      fullName: 'Vidit K Bhatnagar',
      role: UserRole.SUPER_ADMIN,
      emailVerified: true,
      emailVerifiedAt: new Date(),
      onboardingCompleted: true,
      lastLoginAt: new Date(),
    },
  });

  const aditya = await prisma.user.create({
    data: {
      email: 'aditya@cognispace.com',
      passwordHash,
      fullName: 'Aditya Tripathi',
      role: UserRole.SUPER_ADMIN,
      emailVerified: true,
      emailVerifiedAt: new Date(),
      onboardingCompleted: true,
      lastLoginAt: new Date(),
    },
  });

  const jyothi = await prisma.user.create({
    data: {
      email: 'jyothi@cognispace.com',
      passwordHash,
      fullName: 'S. Jyothi Swaroop',
      role: UserRole.SUPER_ADMIN,
      emailVerified: true,
      emailVerifiedAt: new Date(),
      onboardingCompleted: true,
      lastLoginAt: new Date(),
    },
  });

  // Team member
  const teamDev = await prisma.user.create({
    data: {
      email: 'dev@cognispace.com',
      passwordHash,
      fullName: 'Rahul Sharma',
      role: UserRole.TEAM_MEMBER,
      emailVerified: true,
      emailVerifiedAt: new Date(),
      onboardingCompleted: true,
      lastLoginAt: new Date(),
    },
  });

  // Client user
  const clientUser = await prisma.user.create({
    data: {
      email: 'client@techstartup.com',
      passwordHash,
      fullName: 'Sarah Chen',
      role: UserRole.CLIENT,
      emailVerified: true,
      emailVerifiedAt: new Date(),
      onboardingCompleted: true,
    },
  });

  console.log('  Created 5 users (3 co-founders, 1 team member, 1 client)');

  // ── ORGANIZATIONS ──
  const cogniOrg = await prisma.organization.create({
    data: {
      name: 'Cognispace',
      slug: 'cognispace',
      plan: Plan.ENTERPRISE,
      stripeCustomerId: 'cus_cognispace_001',
    },
  });

  const clientOrg = await prisma.organization.create({
    data: {
      name: 'TechStartup Inc',
      slug: 'techstartup',
      plan: Plan.PRO,
      stripeCustomerId: 'cus_techstartup_001',
    },
  });

  console.log('  Created 2 organizations');

  // ── MEMBERSHIPS ──
  await prisma.membership.createMany({
    data: [
      {
        userId: vidit.id,
        orgId: cogniOrg.id,
        role: MembershipRole.OWNER,
        acceptedAt: new Date(),
      },
      {
        userId: aditya.id,
        orgId: cogniOrg.id,
        role: MembershipRole.OWNER,
        acceptedAt: new Date(),
      },
      {
        userId: jyothi.id,
        orgId: cogniOrg.id,
        role: MembershipRole.OWNER,
        acceptedAt: new Date(),
      },
      {
        userId: teamDev.id,
        orgId: cogniOrg.id,
        role: MembershipRole.MEMBER,
        invitedBy: vidit.id,
        acceptedAt: new Date(),
      },
      {
        userId: clientUser.id,
        orgId: clientOrg.id,
        role: MembershipRole.OWNER,
        acceptedAt: new Date(),
      },
    ],
  });

  console.log('  Created 5 memberships');

  // ── AI MODELS ──
  const models = await Promise.all([
    prisma.aiModel.create({
      data: {
        name: 'Cogni-4 Turbo',
        slug: 'cogni-4-turbo',
        category: ModelCategory.NLP,
        description:
          'Our most capable language model. Excels at complex reasoning, creative writing, code generation, and multi-turn conversation. 128K context window.',
        capabilities: [
          'text-generation',
          'summarization',
          'translation',
          'code-generation',
          'reasoning',
        ],
        pricingInput: 0.01,
        pricingOutput: 0.03,
        maxTokens: 4096,
        contextWindow: 128000,
        provider: 'cognispace',
      },
    }),
    prisma.aiModel.create({
      data: {
        name: 'Cogni-4 Mini',
        slug: 'cogni-4-mini',
        category: ModelCategory.NLP,
        description:
          'Fast and cost-efficient language model for everyday tasks. Great for classification, extraction, and simple generation. 32K context window.',
        capabilities: ['text-generation', 'classification', 'extraction', 'summarization'],
        pricingInput: 0.001,
        pricingOutput: 0.002,
        maxTokens: 4096,
        contextWindow: 32000,
        provider: 'cognispace',
      },
    }),
    prisma.aiModel.create({
      data: {
        name: 'Cogni Vision',
        slug: 'cogni-vision',
        category: ModelCategory.VISION,
        description:
          'Advanced image understanding model. Analyzes images, generates descriptions, answers visual questions, and extracts text from documents.',
        capabilities: ['image-analysis', 'ocr', 'visual-qa', 'image-description'],
        pricingInput: 0.005,
        pricingOutput: 0.015,
        maxTokens: 4096,
        contextWindow: 16000,
        provider: 'cognispace',
      },
    }),
    prisma.aiModel.create({
      data: {
        name: 'Cogni Embed',
        slug: 'cogni-embed',
        category: ModelCategory.EMBEDDING,
        description:
          'High-quality text embedding model for semantic search, clustering, and similarity. 1536-dimensional vectors with excellent retrieval performance.',
        capabilities: ['text-embedding', 'semantic-search', 'clustering'],
        pricingInput: 0.0001,
        pricingOutput: 0,
        maxTokens: 8192,
        contextWindow: 8192,
        provider: 'cognispace',
      },
    }),
    prisma.aiModel.create({
      data: {
        name: 'Cogni Audio',
        slug: 'cogni-audio',
        category: ModelCategory.AUDIO,
        description:
          'Speech-to-text and audio understanding model. Supports 50+ languages with automatic language detection and speaker diarization.',
        capabilities: ['speech-to-text', 'transcription', 'translation', 'speaker-diarization'],
        pricingInput: 0.006,
        pricingOutput: 0,
        maxTokens: 0,
        contextWindow: 0,
        provider: 'cognispace',
      },
    }),
  ]);

  console.log('  Created 5 AI models');

  // ── DEPLOYMENTS ──
  await prisma.deployment.createMany({
    data: models.map((model) => ({
      modelId: model.id,
      version: '1.0.0',
      endpoint: `https://api.cognispace.com/v1/models/${model.slug}`,
      region: 'us-east-1',
      status: DeploymentStatus.ACTIVE,
      healthCheckUrl: `https://api.cognispace.com/v1/models/${model.slug}/health`,
    })),
  });

  console.log('  Created 5 deployments');

  // ── API KEYS ──
  const createKeyHash = (key: string) => createHash('sha256').update(key).digest('hex');

  await prisma.apiKey.createMany({
    data: [
      {
        userId: vidit.id,
        orgId: cogniOrg.id,
        keyHash: createKeyHash('cog_live_vidit_key_001'),
        keyPrefix: 'cog_live',
        name: 'Production Key',
        scopes: ['inference:read', 'inference:write', 'models:read', 'usage:read', 'billing:read'],
        rateLimit: 500,
        lastUsedAt: new Date(),
      },
      {
        userId: vidit.id,
        orgId: cogniOrg.id,
        keyHash: createKeyHash('cog_test_vidit_key_002'),
        keyPrefix: 'cog_test',
        name: 'Development Key',
        scopes: ['inference:read', 'inference:write', 'models:read'],
        rateLimit: 100,
        lastUsedAt: new Date(Date.now() - 86400000),
      },
      {
        userId: teamDev.id,
        orgId: cogniOrg.id,
        keyHash: createKeyHash('cog_live_dev_key_001'),
        keyPrefix: 'cog_live',
        name: 'Rahul Dev Key',
        scopes: ['inference:read', 'inference:write', 'models:read', 'usage:read'],
        rateLimit: 200,
        lastUsedAt: new Date(Date.now() - 3600000),
      },
      {
        userId: clientUser.id,
        orgId: clientOrg.id,
        keyHash: createKeyHash('cog_live_client_key_001'),
        keyPrefix: 'cog_live',
        name: 'TechStartup Production',
        scopes: ['inference:read', 'inference:write', 'models:read', 'usage:read'],
        rateLimit: 200,
      },
      {
        userId: clientUser.id,
        orgId: clientOrg.id,
        keyHash: createKeyHash('cog_test_client_key_001'),
        keyPrefix: 'cog_test',
        name: 'TechStartup Staging',
        scopes: ['inference:read', 'inference:write'],
        rateLimit: 50,
      },
    ],
  });

  console.log('  Created 5 API keys');

  // ── SUBSCRIPTIONS ──
  const now = new Date();
  const periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  await prisma.subscription.createMany({
    data: [
      {
        orgId: cogniOrg.id,
        stripeSubscriptionId: 'sub_cogni_001',
        plan: Plan.ENTERPRISE,
        status: SubscriptionStatus.ACTIVE,
        currentPeriodStart: periodStart,
        currentPeriodEnd: periodEnd,
      },
      {
        orgId: clientOrg.id,
        stripeSubscriptionId: 'sub_techstartup_001',
        plan: Plan.PRO,
        status: SubscriptionStatus.ACTIVE,
        currentPeriodStart: periodStart,
        currentPeriodEnd: periodEnd,
      },
    ],
  });

  console.log('  Created 2 subscriptions');

  // ── INVOICES ──
  await prisma.invoice.createMany({
    data: [
      {
        orgId: clientOrg.id,
        stripeInvoiceId: 'inv_techstartup_001',
        amountDue: 4900,
        amountPaid: 4900,
        status: InvoiceStatus.PAID,
        periodStart: new Date(now.getFullYear(), now.getMonth() - 1, 1),
        periodEnd: new Date(now.getFullYear(), now.getMonth(), 0),
      },
      {
        orgId: clientOrg.id,
        stripeInvoiceId: 'inv_techstartup_002',
        amountDue: 4900,
        amountPaid: 0,
        status: InvoiceStatus.OPEN,
        periodStart: periodStart,
        periodEnd: periodEnd,
      },
    ],
  });

  console.log('  Created 2 invoices');

  // ── USAGE LOGS (50 entries) ──
  const statusCodes = [200, 200, 200, 200, 200, 200, 200, 200, 201, 400, 429, 500];
  const endpoints = ['/v1/inference', '/v1/models', '/v1/embeddings', '/v1/transcribe'];
  const users = [vidit, aditya, jyothi, teamDev, clientUser];

  for (let i = 0; i < 50; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const model = models[Math.floor(Math.random() * models.length)];
    const daysAgo = Math.floor(Math.random() * 30);

    if (user && model) {
      await prisma.usageLog.create({
        data: {
          userId: user.id,
          modelId: model.id,
          endpoint: endpoints[Math.floor(Math.random() * endpoints.length)] ?? '/v1/inference',
          method: 'POST',
          statusCode: statusCodes[Math.floor(Math.random() * statusCodes.length)] ?? 200,
          tokensInput: Math.floor(Math.random() * 2000) + 100,
          tokensOutput: Math.floor(Math.random() * 1000) + 50,
          latencyMs: Math.floor(Math.random() * 800) + 50,
          ipAddress: '203.0.113.' + Math.floor(Math.random() * 255),
          createdAt: new Date(Date.now() - daysAgo * 86400000 - Math.random() * 86400000),
        },
      });
    }
  }

  console.log('  Created 50 usage logs');

  // ── BLOG POSTS ──
  await prisma.blogPost.createMany({
    data: [
      {
        title: 'Introducing Cogni-4 Turbo: Our Most Capable Model Yet',
        slug: 'introducing-cogni-4-turbo',
        excerpt:
          'Today we launch Cogni-4 Turbo with 128K context window, improved reasoning, and 3x faster inference.',
        content:
          'We are excited to announce the launch of Cogni-4 Turbo, our most advanced language model to date...',
        category: 'Product',
        tags: ['product-launch', 'nlp', 'cogni-4'],
        authorId: vidit.id,
        status: PostStatus.PUBLISHED,
        publishedAt: new Date(Date.now() - 7 * 86400000),
        viewCount: 2847,
      },
      {
        title: 'Building Production AI Pipelines: A Complete Guide',
        slug: 'building-production-ai-pipelines',
        excerpt:
          'Learn how to take your AI prototype from notebook to production with best practices for reliability and scale.',
        content:
          'Moving from a working prototype to a production AI system is one of the most challenging transitions in software engineering...',
        category: 'Engineering',
        tags: ['tutorial', 'production', 'best-practices'],
        authorId: teamDev.id,
        status: PostStatus.PUBLISHED,
        publishedAt: new Date(Date.now() - 14 * 86400000),
        viewCount: 1523,
      },
      {
        title: 'The Future of Multimodal AI: Vision, Audio, and Beyond',
        slug: 'future-of-multimodal-ai',
        excerpt:
          'Exploring how multimodal AI models are transforming industries and what developers need to know.',
        content:
          'The AI landscape is rapidly evolving beyond text-only models. Multimodal AI represents the next frontier...',
        category: 'Research',
        tags: ['research', 'multimodal', 'vision', 'audio'],
        authorId: aditya.id,
        status: PostStatus.PUBLISHED,
        publishedAt: new Date(Date.now() - 21 * 86400000),
        viewCount: 987,
      },
    ],
  });

  console.log('  Created 3 blog posts');

  // ── SUPPORT TICKETS ──
  const ticket1 = await prisma.supportTicket.create({
    data: {
      userId: clientUser.id,
      orgId: clientOrg.id,
      subject: 'Rate limit exceeded unexpectedly',
      category: 'Technical',
      priority: TicketPriority.HIGH,
      status: TicketStatus.IN_PROGRESS,
      assigneeId: teamDev.id,
    },
  });

  const ticket2 = await prisma.supportTicket.create({
    data: {
      userId: clientUser.id,
      orgId: clientOrg.id,
      subject: 'How to upgrade from Pro to Enterprise?',
      category: 'Billing',
      priority: TicketPriority.LOW,
      status: TicketStatus.RESOLVED,
      assigneeId: vidit.id,
      resolvedAt: new Date(Date.now() - 86400000),
    },
  });

  // ── TICKET MESSAGES ──
  await prisma.ticketMessage.createMany({
    data: [
      {
        ticketId: ticket1.id,
        senderId: clientUser.id,
        content:
          'We are hitting rate limits even though our usage should be well within the Pro plan limits. Our dashboard shows 150 requests per minute but our limit is 200.',
      },
      {
        ticketId: ticket1.id,
        senderId: teamDev.id,
        content:
          'Hi Sarah, thanks for reporting this. I can see your account is making concurrent requests from multiple API keys. The rate limit is applied per key, not per organization. Let me check your key configuration.',
        isInternal: false,
      },
      {
        ticketId: ticket2.id,
        senderId: clientUser.id,
        content:
          'We are growing fast and would like to upgrade to Enterprise. What are the next steps?',
      },
      {
        ticketId: ticket2.id,
        senderId: vidit.id,
        content:
          "Hi Sarah! Great to hear about your growth. I'd love to set up a call to discuss your Enterprise needs. You can also fill out the enterprise form on our website and we'll reach out within 24 hours.",
      },
    ],
  });

  console.log('  Created 2 support tickets with messages');

  // ── NOTIFICATIONS ──
  await prisma.notification.createMany({
    data: [
      {
        userId: clientUser.id,
        type: 'usage_warning',
        title: 'Usage at 80%',
        body: 'Your organization TechStartup Inc has used 80,000 of 100,000 monthly API calls.',
        metadata: { percentage: 80, orgId: clientOrg.id },
      },
      {
        userId: vidit.id,
        type: 'system_announcement',
        title: 'New Model Available',
        body: 'Cogni-4 Turbo is now available in the model catalog with 128K context window.',
        readAt: new Date(),
      },
      {
        userId: teamDev.id,
        type: 'ticket_assigned',
        title: 'New Ticket Assigned',
        body: 'You have been assigned to ticket: Rate limit exceeded unexpectedly.',
      },
    ],
  });

  console.log('  Created 3 notifications');

  // ── WEBHOOK ENDPOINTS ──
  const webhook = await prisma.webhookEndpoint.create({
    data: {
      orgId: clientOrg.id,
      url: 'https://api.techstartup.com/webhooks/cognispace',
      secret: 'whsec_techstartup_test_secret_001',
      events: ['inference.completed', 'usage.limit.warning', 'invoice.payment_succeeded'],
      isActive: true,
    },
  });

  const firstModel = models[0];
  await prisma.webhookDelivery.createMany({
    data: [
      {
        endpointId: webhook.id,
        event: 'inference.completed',
        payload: firstModel
          ? { modelId: firstModel.id, tokens: 1250, latencyMs: 320 }
          : { tokens: 1250, latencyMs: 320 },
        statusCode: 200,
        latencyMs: 45,
        attemptNumber: 1,
      },
      {
        endpointId: webhook.id,
        event: 'usage.limit.warning',
        payload: { percentage: 80, orgId: clientOrg.id },
        statusCode: 200,
        latencyMs: 52,
        attemptNumber: 1,
      },
    ],
  });

  console.log('  Created 1 webhook endpoint with 2 deliveries');

  // ── ENTERPRISE LEAD ──
  await prisma.enterpriseLead.create({
    data: {
      companyName: 'MegaCorp Industries',
      companyWebsite: 'https://megacorp.com',
      companySize: '1,000+',
      industry: 'Finance',
      useCase:
        'We need custom fine-tuned models for financial document analysis and risk assessment across our portfolio of 200+ funds.',
      timeline: '1-3 months',
      budgetRange: '$20,000+/mo',
      modelsOfInterest: ['NLP / Text Generation', 'Embeddings / Search', 'Custom Fine-tuned'],
      monthlyVolume: '10M+',
      integrationReqs: ['REST API', 'Python SDK', 'Custom SLA'],
      contactName: 'Morgan Blake',
      contactEmail: 'morgan.blake@megacorp.com',
      contactPhone: '+1-555-0199',
      contactTitle: 'VP of Engineering',
      meetingFormat: 'Video call',
      referralSource: 'Conference',
    },
  });

  console.log('  Created 1 enterprise lead');

  // ── PROJECTS ──

  const project1 = await prisma.project.create({
    data: {
      orgId: clientOrg.id,
      name: 'AI-Powered Customer Support Platform',
      slug: 'ai-customer-support',
      description:
        'Build a custom AI customer support platform with intelligent ticket routing, automated responses using GPT-4, sentiment analysis, and a real-time dashboard for support team managers. Integrates with Zendesk and Slack.',
      status: ProjectStatus.IN_PROGRESS,
      startDate: new Date(Date.now() - 45 * 86400000),
      targetEndDate: new Date(Date.now() + 60 * 86400000),
      budgetAmount: 7500000, // $75,000
      techStack: ['Next.js', 'Python', 'PostgreSQL', 'OpenAI GPT-4', 'Redis', 'WebSocket'],
      tags: ['AI', 'SaaS', 'Customer Support', 'NLP'],
      progressPercent: 45,
    },
  });

  const project2 = await prisma.project.create({
    data: {
      orgId: clientOrg.id,
      name: 'Predictive Analytics Dashboard',
      slug: 'predictive-analytics',
      description:
        'Design and develop a predictive analytics dashboard for supply chain optimization. Uses machine learning models to forecast demand, identify bottlenecks, and recommend inventory adjustments.',
      status: ProjectStatus.DISCOVERY,
      startDate: new Date(Date.now() - 5 * 86400000),
      targetEndDate: new Date(Date.now() + 120 * 86400000),
      budgetAmount: 12000000, // $120,000
      techStack: ['React', 'Python', 'TensorFlow', 'PostgreSQL', 'D3.js'],
      tags: ['AI', 'Analytics', 'Supply Chain', 'ML'],
      progressPercent: 5,
    },
  });

  const project3 = await prisma.project.create({
    data: {
      orgId: clientOrg.id,
      name: 'Document Intelligence System',
      slug: 'document-intelligence',
      description:
        'Automated document processing system for legal contracts. Extracts key clauses, identifies risks, compares against templates, and generates compliance reports using AI.',
      status: ProjectStatus.COMPLETED,
      startDate: new Date(Date.now() - 180 * 86400000),
      targetEndDate: new Date(Date.now() - 30 * 86400000),
      actualEndDate: new Date(Date.now() - 25 * 86400000),
      budgetAmount: 4500000, // $45,000
      techStack: ['Next.js', 'Python', 'OCR', 'GPT-4', 'MongoDB'],
      tags: ['AI', 'Legal', 'Document Processing'],
      progressPercent: 100,
    },
  });

  console.log('  ✓ Created 3 projects');

  // ── PROJECT MEMBERS ──
  await prisma.projectMember.createMany({
    data: [
      // Project 1: AI Customer Support
      { projectId: project1.id, userId: clientUser.id, role: 'client' },
      { projectId: project1.id, userId: vidit.id, role: 'lead' },
      { projectId: project1.id, userId: teamDev.id, role: 'member' },
      // Project 2: Predictive Analytics
      { projectId: project2.id, userId: clientUser.id, role: 'client' },
      { projectId: project2.id, userId: aditya.id, role: 'lead' },
      // Project 3: Document Intelligence (completed)
      { projectId: project3.id, userId: clientUser.id, role: 'client' },
      { projectId: project3.id, userId: jyothi.id, role: 'lead' },
      { projectId: project3.id, userId: teamDev.id, role: 'member' },
    ],
  });

  console.log('  ✓ Created project members');

  // ── MILESTONES ──
  // Project 1 milestones
  const m1_1 = await prisma.milestone.create({
    data: {
      projectId: project1.id,
      title: 'Discovery & Requirements',
      description: 'Gather requirements, map user journeys, define technical architecture.',
      status: MilestoneStatus.APPROVED,
      sortOrder: 1,
      dueDate: new Date(Date.now() - 30 * 86400000),
      completedAt: new Date(Date.now() - 32 * 86400000),
    },
  });

  const m1_2 = await prisma.milestone.create({
    data: {
      projectId: project1.id,
      title: 'UI/UX Design',
      description: 'Complete design system, wireframes, and high-fidelity mockups for all screens.',
      status: MilestoneStatus.APPROVED,
      sortOrder: 2,
      dueDate: new Date(Date.now() - 15 * 86400000),
      completedAt: new Date(Date.now() - 14 * 86400000),
    },
  });

  const m1_3 = await prisma.milestone.create({
    data: {
      projectId: project1.id,
      title: 'Core Platform Development',
      description: 'Build ticket routing engine, AI response generation, and agent dashboard.',
      status: MilestoneStatus.IN_PROGRESS,
      sortOrder: 3,
      dueDate: new Date(Date.now() + 20 * 86400000),
    },
  });

  const m1_4 = await prisma.milestone.create({
    data: {
      projectId: project1.id,
      title: 'Integration & Testing',
      description: 'Integrate with Zendesk and Slack. End-to-end testing and UAT.',
      status: MilestoneStatus.UPCOMING,
      sortOrder: 4,
      dueDate: new Date(Date.now() + 45 * 86400000),
    },
  });

  const m1_5 = await prisma.milestone.create({
    data: {
      projectId: project1.id,
      title: 'Launch & Handoff',
      description: 'Production deployment, documentation, training, and project handoff.',
      status: MilestoneStatus.UPCOMING,
      sortOrder: 5,
      dueDate: new Date(Date.now() + 60 * 86400000),
    },
  });

  console.log('  ✓ Created 5 milestones for Project 1');

  // ── DELIVERABLES ──
  await prisma.deliverable.createMany({
    data: [
      {
        projectId: project1.id,
        milestoneId: m1_1.id,
        title: 'Technical Requirements Document',
        description:
          'Comprehensive requirements specification covering functional, non-functional, and integration requirements.',
        type: DeliverableType.DOCUMENT,
        externalUrl: 'https://docs.google.com/document/d/example-trd',
        approvedAt: new Date(Date.now() - 30 * 86400000),
        approvedBy: clientUser.id,
      },
      {
        projectId: project1.id,
        milestoneId: m1_1.id,
        title: 'System Architecture Diagram',
        description: 'High-level system architecture showing all services, APIs, and data flows.',
        type: DeliverableType.DOCUMENT,
        externalUrl: 'https://miro.com/board/example-arch',
        approvedAt: new Date(Date.now() - 30 * 86400000),
        approvedBy: clientUser.id,
      },
      {
        projectId: project1.id,
        milestoneId: m1_2.id,
        title: 'Figma Design File',
        description: 'Complete UI/UX design for agent dashboard, customer portal, and admin panel.',
        type: DeliverableType.DESIGN,
        externalUrl: 'https://figma.com/file/example-design',
        approvedAt: new Date(Date.now() - 14 * 86400000),
        approvedBy: clientUser.id,
      },
      {
        projectId: project1.id,
        milestoneId: m1_3.id,
        title: 'Staging Environment',
        description: 'Live staging URL with current development build for review.',
        type: DeliverableType.DEPLOYMENT,
        externalUrl: 'https://staging.customer-support-ai.cognispace.dev',
        version: '0.3.2',
      },
      {
        projectId: project1.id,
        milestoneId: m1_3.id,
        title: 'GitHub Repository',
        description: 'Source code repository with CI/CD pipeline configured.',
        type: DeliverableType.CODE,
        externalUrl: 'https://github.com/cognispace/ai-customer-support',
      },
    ],
  });

  console.log('  ✓ Created 5 deliverables');

  // ── PROJECT MESSAGES ──
  await prisma.projectMessage.createMany({
    data: [
      {
        projectId: project1.id,
        senderId: vidit.id,
        content:
          "Hi Sarah! Welcome to the project portal. The discovery phase is complete and we've uploaded the TRD and architecture diagram for your review. Let us know if you have any questions!",
        type: MessageType.TEXT,
        isRead: true,
        readAt: new Date(Date.now() - 29 * 86400000),
        createdAt: new Date(Date.now() - 30 * 86400000),
      },
      {
        projectId: project1.id,
        senderId: clientUser.id,
        content:
          'Thanks Vidit! The architecture looks solid. One question — can we also integrate with our existing Intercom setup in phase 2?',
        type: MessageType.TEXT,
        isRead: true,
        readAt: new Date(Date.now() - 28 * 86400000),
        createdAt: new Date(Date.now() - 29 * 86400000),
      },
      {
        projectId: project1.id,
        senderId: vidit.id,
        content:
          "Absolutely! We've actually designed the integration layer to be extensible, so adding Intercom in phase 2 will be straightforward. I'll add it to the roadmap.",
        type: MessageType.TEXT,
        isRead: true,
        readAt: new Date(Date.now() - 27 * 86400000),
        createdAt: new Date(Date.now() - 28 * 86400000),
      },
      {
        projectId: project1.id,
        senderId: teamDev.id,
        content:
          'Quick update: The staging environment is now live with the latest build (v0.3.2). Ticket routing AI is working with ~85% accuracy. Check it out and let us know your feedback!',
        type: MessageType.TEXT,
        isRead: false,
        createdAt: new Date(Date.now() - 2 * 86400000),
      },
      {
        projectId: project1.id,
        senderId: clientUser.id,
        content:
          'This is impressive! The routing feels natural. Can we schedule a call this week to discuss the response generation quality?',
        type: MessageType.TEXT,
        isRead: false,
        createdAt: new Date(Date.now() - 1 * 86400000),
      },
    ],
  });

  console.log('  ✓ Created 5 project messages');

  // ── PROJECT ACTIVITIES ──
  await prisma.projectActivity.createMany({
    data: [
      {
        projectId: project1.id,
        userId: vidit.id,
        action: 'project_created',
        details: { name: 'AI-Powered Customer Support Platform' },
        createdAt: new Date(Date.now() - 45 * 86400000),
      },
      {
        projectId: project1.id,
        userId: vidit.id,
        action: 'status_changed',
        details: { from: 'DISCOVERY', to: 'IN_PROGRESS' },
        createdAt: new Date(Date.now() - 30 * 86400000),
      },
      {
        projectId: project1.id,
        userId: vidit.id,
        action: 'milestone_completed',
        details: { milestone: 'Discovery & Requirements' },
        createdAt: new Date(Date.now() - 30 * 86400000),
      },
      {
        projectId: project1.id,
        userId: clientUser.id,
        action: 'deliverable_approved',
        details: { deliverable: 'Technical Requirements Document' },
        createdAt: new Date(Date.now() - 30 * 86400000),
      },
      {
        projectId: project1.id,
        userId: clientUser.id,
        action: 'deliverable_approved',
        details: { deliverable: 'Figma Design File' },
        createdAt: new Date(Date.now() - 14 * 86400000),
      },
      {
        projectId: project1.id,
        userId: teamDev.id,
        action: 'deliverable_uploaded',
        details: { deliverable: 'Staging Environment', version: '0.3.2' },
        createdAt: new Date(Date.now() - 2 * 86400000),
      },
    ],
  });

  console.log('  ✓ Created 6 project activities');

  console.log('\n✅ Database seeded successfully!');
  console.log('   Co-founders:');
  console.log('     vidit@cognispace.com / Password123! (SUPER_ADMIN)');
  console.log('     aditya@cognispace.com / Password123! (SUPER_ADMIN)');
  console.log('     jyothi@cognispace.com / Password123! (SUPER_ADMIN)');
  console.log('   Team:');
  console.log('     dev@cognispace.com / Password123! (TEAM_MEMBER)');
  console.log('   Client:');
  console.log('     client@techstartup.com / Password123! (CLIENT)');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
