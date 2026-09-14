export const projectCaseStudies = [
  {
    slug: "dash-2-enterprise-ai-assistant",
    title: "DASH 2.0 Enterprise AI Assistant",
    seoTitle: "DASH 2.0 Enterprise AI Assistant | Pathan Afnan Khan",
    description:
      "A secure enterprise conversational AI assistant built with LangChain and Azure OpenAI, with SSO, access controls, tenant isolation and auditability.",
    category: "Agentic AI / Enterprise GenAI",
    role: "Agentic AI Specialist",
    organization: "DeliverHealth Solutions",
    period: "2026",
    challenge:
      "Enterprise users needed a faster way to discover internal knowledge without weakening security, access control or audit requirements.",
    solution:
      "Designed and shipped a conversational AI layer over enterprise knowledge using LangChain and Azure OpenAI. The system integrated SSO, secure APIs, access-aware retrieval, tenant isolation and audit logging so responses stayed grounded in information the user was authorized to access.",
    architecture: [
      "LangChain orchestration with Azure OpenAI",
      "Access-aware retrieval and tenant isolation",
      "SSO / OAuth-based authentication",
      "Secure API layer and audit logging",
      "Latency, uptime and adoption monitoring",
    ],
    outcomes: [
      "Passed enterprise security review",
      "Approximately 200 ms average latency after go-live optimization",
      "Reduced friction for secure enterprise knowledge access",
    ],
    stack: ["Python", "LangChain", "Azure OpenAI", "FastAPI", "SSO", "REST APIs"],
    keywords: ["enterprise AI assistant", "Azure OpenAI", "LangChain", "agentic AI", "secure RAG"],
  },
  {
    slug: "supply-chain-data-marketplace",
    title: "Enterprise Supply Chain Data Marketplace",
    seoTitle: "Supply Chain Data Marketplace AI Platform | Pathan Afnan Khan",
    description:
      "An enterprise data marketplace initiative combining metadata, governance and AI-assisted discovery across supply-chain data products.",
    category: "Enterprise Data / AI",
    role: "AI Engineer",
    organization: "Global Supply Chain Enterprise",
    period: "2023–2026",
    challenge:
      "Business and analytics teams were spending too much time finding trustworthy data, understanding ownership and navigating fragmented metadata across enterprise systems.",
    solution:
      "Built AI-assisted discovery capabilities around a governed data marketplace, connecting metadata from Unity Catalog, Collibra and ServiceNow. The work included semantic discovery, metadata pipelines and generative AI features that made data products easier to understand and reuse.",
    architecture: [
      "Enterprise metadata ingestion pipelines",
      "Unity Catalog, Collibra and ServiceNow integration",
      "Semantic search over governed data products",
      "LLM-assisted metadata and glossary generation",
      "Role-aware enterprise discovery workflows",
    ],
    outcomes: [
      "Program-level annual savings estimated at approximately £5M",
      "Faster governed discovery across enterprise data assets",
      "Improved reuse of existing data products and metadata",
    ],
    stack: ["Python", "SQL", "Unity Catalog", "Collibra", "ServiceNow", "LLMs"],
    keywords: ["data marketplace", "enterprise metadata", "AI data discovery", "Unity Catalog", "Collibra"],
  },
  {
    slug: "rag-semantic-search",
    title: "RAG Semantic Search for Enterprise Data Discovery",
    seoTitle: "Enterprise RAG Semantic Search | Pathan Afnan Khan",
    description:
      "A retrieval-augmented semantic search experience designed to help enterprise users find relevant governed data assets faster.",
    category: "RAG / Search",
    role: "AI Engineer",
    organization: "Global Supply Chain Enterprise",
    period: "2023–2026",
    challenge:
      "Keyword search was not enough for business users who described data needs in natural language and often did not know the exact dataset, table or terminology to search for.",
    solution:
      "Implemented semantic retrieval over enterprise metadata using embeddings, metadata filtering and relevance-focused ranking. The experience translated natural-language intent into better matches while preserving governance context and source traceability.",
    architecture: [
      "Semantic chunking of metadata-rich records",
      "Embedding-based retrieval",
      "Metadata filters for business domain and ownership",
      "Reranking and relevance evaluation",
      "Source-aware responses and citations",
    ],
    outcomes: [
      "Approximately 50% reduction in data-discovery time",
      "More relevant results for natural-language queries",
      "Improved discoverability of governed enterprise data assets",
    ],
    stack: ["Python", "Embeddings", "Vector Search", "RAG", "SQL", "Enterprise Metadata"],
    keywords: ["enterprise RAG", "semantic search", "vector search", "data discovery", "retrieval augmented generation"],
  },
  {
    slug: "genai-data-glossary",
    title: "Generative AI Data Glossary Automation",
    seoTitle: "Generative AI Data Glossary Automation | Pathan Afnan Khan",
    description:
      "A GenAI workflow that generates and standardizes enterprise glossary definitions from technical metadata and business context.",
    category: "Generative AI / Data Governance",
    role: "AI Engineer",
    organization: "Global Supply Chain Enterprise",
    period: "2023–2026",
    challenge:
      "Creating high-quality business glossary definitions manually was slow, inconsistent and difficult to scale across thousands of enterprise data assets.",
    solution:
      "Built a controlled LLM workflow that used technical metadata and business context to draft glossary definitions, with structured output, guardrails and review steps before publication.",
    architecture: [
      "Metadata-to-prompt transformation",
      "Structured LLM outputs",
      "Terminology and style guardrails",
      "Human review workflow",
      "Integration with enterprise governance processes",
    ],
    outcomes: [
      "Approximately £920K in estimated savings",
      "Approximately 4,500 person-hours saved",
      "More consistent glossary definitions at enterprise scale",
    ],
    stack: ["Python", "LLMs", "Prompt Engineering", "Structured Outputs", "Data Governance"],
    keywords: ["generative AI", "data glossary", "data governance AI", "LLM automation", "enterprise metadata"],
  },
  {
    slug: "resume-analyzer-rag",
    title: "Resume Analyzer with RAG and Reranking",
    seoTitle: "Resume Analyzer RAG System | Pathan Afnan Khan",
    description:
      "A retrieval-augmented resume search and analysis system using section-aware chunking, embeddings, metadata filters and reranking.",
    category: "RAG / NLP",
    role: "AI / ML Engineer",
    organization: "Independent Build",
    period: "2025–2026",
    challenge:
      "Resume search often fails when recruiter language and candidate wording differ, especially for synonyms, seniority and related skills.",
    solution:
      "Built a RAG pipeline that chunks resumes by semantic sections, stores embeddings with structured metadata, filters by role and seniority, and reranks retrieved candidates with a cross-encoder. Added citation-style evidence so matches could be verified against the source resume.",
    architecture: [
      "Section-aware resume chunking",
      "OpenAI / BGE embeddings",
      "Pinecone or pgvector retrieval",
      "Role, skills and seniority metadata filters",
      "Cross-encoder reranking and source citations",
    ],
    outcomes: [
      "Evaluated with precision@k and MRR",
      "Improved synonym matching with a domain dictionary plus reranking",
      "More explainable candidate matches through source evidence",
    ],
    stack: ["Python", "RAG", "BGE", "OpenAI Embeddings", "Pinecone", "pgvector", "Cross-Encoder"],
    keywords: ["resume analyzer", "RAG", "reranking", "semantic recruitment search", "vector database"],
  },
  {
    slug: "slide-narrator-multimodal-ai",
    title: "Slide Narrator — Multimodal AI Presentation Intelligence",
    seoTitle: "Multimodal Slide Narrator AI | Pathan Afnan Khan",
    description:
      "A multimodal pipeline that understands presentation slides using OCR, table extraction, image captioning and grounded LLM summarization.",
    category: "Multimodal AI",
    role: "Data Scientist / AI Engineer",
    organization: "Selected AI Project",
    period: "2025–2026",
    challenge:
      "Presentation slides mix text, charts, tables and images, so plain text extraction loses structure and often produces weak summaries or narration.",
    solution:
      "Designed a slide-aware multimodal pipeline that extracts text with OCR, preserves tables, captions visual elements and stores metadata for each slide element. The LLM then generates grounded summaries and narration with review checkpoints and style adaptation for different audiences.",
    architecture: [
      "OCR and layout-aware text extraction",
      "Table extraction and structure preservation",
      "Image captioning for visual context",
      "Slide-level chunking and element metadata",
      "Grounded summarization with human-in-the-loop review",
    ],
    outcomes: [
      "Better preservation of slide structure and context",
      "More grounded narration across text, tables and images",
      "Audience-aware explanation and summarization workflows",
    ],
    stack: ["Python", "OCR", "Multimodal LLMs", "Image Captioning", "RAG", "Structured Metadata"],
    keywords: ["multimodal AI", "slide narrator", "OCR", "presentation AI", "LLM summarization"],
  },
  {
    slug: "gwen-ai-workflow-automation",
    title: "GWEN AI Workflow Automation Platform",
    seoTitle: "AI Workflow Automation with FastAPI | Pathan Afnan Khan",
    description:
      "AI-powered enterprise workflow automation built with Python and FastAPI microservices, orchestration and data pipelines.",
    category: "AI Automation / Backend",
    role: "Data Scientist / AI Engineer",
    organization: "GWEN AI / Aviato Consulting",
    period: "2022–2023",
    challenge:
      "Operational workflows depended on repetitive manual steps and slow data movement between interfaces and internal systems.",
    solution:
      "Built Python and FastAPI microservices to automate enterprise workflows, with orchestration around data-processing pipelines and reusable service integrations. Airflow was used for scheduled pipeline execution where appropriate.",
    architecture: [
      "FastAPI microservices",
      "Python workflow orchestration",
      "Airflow DAGs and ETL pipelines",
      "API integrations between enterprise systems",
      "Operational monitoring and error handling",
    ],
    outcomes: [
      "Approximately 40% reduction in data-processing time",
      "Approximately 30% reduction in interface task time",
      "More repeatable and maintainable enterprise workflows",
    ],
    stack: ["Python", "FastAPI", "Airflow", "REST APIs", "ETL", "SQL"],
    keywords: ["AI workflow automation", "FastAPI", "Airflow", "Python automation", "enterprise AI"],
  },
];

export const projectBySlug = Object.fromEntries(
  projectCaseStudies.map((project) => [project.slug, project])
);
