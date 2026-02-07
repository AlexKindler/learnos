import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  const alex = await db.user.findFirst({ where: { email: "alex@learnos.dev" } });
  const maya = await db.user.findFirst({ where: { email: "maya@learnos.dev" } });
  const jordan = await db.user.findFirst({ where: { email: "jordan@learnos.dev" } });
  const luna = await db.user.findFirst({ where: { email: "luna@learnos.dev" } });
  const sam = await db.user.findFirst({ where: { email: "sam@learnos.dev" } });

  if (!alex || !maya || !jordan || !luna || !sam) {
    console.error("Run the main seed first: npx prisma db seed");
    process.exit(1);
  }

  const quests = await Promise.all([
    // ========== BUSINESS (3 quests) ==========
    db.quest.upsert({
      where: { slug: "startup-fundamentals" },
      update: {},
      create: {
        title: "Startup Fundamentals: From Idea to MVP",
        slug: "startup-fundamentals",
        description: "Learn the lean startup methodology. Validate ideas, find product-market fit, build an MVP, and pitch to investors — all without writing a line of code.",
        category: "Business",
        difficulty: "beginner",
        duration: "2 weeks",
        xpReward: 200,
        published: true,
        creatorId: alex!.id,
        milestones: {
          create: [
            { title: "Idea Validation", description: "Learn to test ideas before building", content: "# Idea Validation\n\nMost startups fail not because of bad execution, but because they build something nobody wants.\n\n## The Mom Test\n\nDon't ask \"Would you use this?\" — people lie to be nice. Instead:\n- Ask about their **past behavior**, not future intentions\n- Ask about **specific problems**, not hypothetical solutions\n- Ask \"What have you tried so far?\" and \"How much time/money does this cost you?\"\n\n## Validation Methods\n\n1. **Customer Interviews**: Talk to 20+ potential users\n2. **Landing Page Test**: Build a simple page describing your product and measure signups\n3. **Smoke Test**: Offer the product before it exists (e.g., Zappos photographed shoes from stores)\n4. **Competitor Analysis**: If competitors exist, that validates demand\n\n## Challenge\n\nPick a startup idea (real or hypothetical) and:\n1. Define your target customer in one sentence\n2. Write 5 Mom Test-style interview questions\n3. Identify 3 competitors and what they do differently\n4. Describe a smoke test you could run in 48 hours", order: 0, type: "lesson", xpReward: 25 },
            { title: "Business Model Canvas", description: "Map your business on one page", content: "# Business Model Canvas\n\nThe Business Model Canvas maps your entire business on a single page.\n\n## The 9 Blocks\n\n1. **Customer Segments**: Who are your customers?\n2. **Value Propositions**: What pain do you solve?\n3. **Channels**: How do customers find you?\n4. **Customer Relationships**: How do you retain them?\n5. **Revenue Streams**: How do you make money?\n6. **Key Resources**: What do you need to operate?\n7. **Key Activities**: What must you do daily?\n8. **Key Partners**: Who helps you deliver?\n9. **Cost Structure**: What are your expenses?\n\n## Revenue Models\n\n| Model | Example | Pros | Cons |\n|-------|---------|------|------|\n| Subscription | Netflix | Recurring revenue | High churn risk |\n| Freemium | Spotify | Large user base | Low conversion |\n| Marketplace | Airbnb | Network effects | Chicken-and-egg |\n| SaaS | Slack | Scalable | Long sales cycle |\n| Transaction fee | Stripe | Scales with usage | Volume dependent |\n\n## Challenge\n\nFill out a complete Business Model Canvas for your startup idea. For each block, write 2-3 bullet points.", order: 1, type: "exercise", xpReward: 30 },
            { title: "MVP & Launch Strategy", description: "Define your minimum viable product", content: "# MVP & Launch Strategy\n\n## What is an MVP?\n\nThe smallest version of your product that lets you learn from real users.\n\n**MVP is NOT:**\n- A prototype with every feature\n- A polished final product\n- Just a landing page\n\n**MVP IS:**\n- The core value proposition, delivered simply\n- Something real users can actually use\n- A learning tool, not a selling tool\n\n## MVP Examples\n\n- **Dropbox**: A 3-minute demo video (before writing any code)\n- **Airbnb**: Founders rented their own apartment\n- **Buffer**: A landing page with pricing, no product\n- **Zappos**: Bought shoes at retail, sold online\n\n## Launch Checklist\n\n1. Define success metrics (signups, retention, revenue)\n2. Identify your first 100 users (where will they come from?)\n3. Set up analytics (track everything)\n4. Plan your feedback loop (how will you learn from users?)\n5. Set a timeline (2-4 weeks max for MVP)\n\n## Challenge\n\nDefine your MVP:\n1. List every feature you can think of\n2. Cut it down to the 3 most essential features\n3. Describe how you'd build it in 2 weeks\n4. Write your launch plan for getting 100 users", order: 2, type: "exercise", xpReward: 30 },
            { title: "Boss Battle: Pitch Deck", description: "Create a compelling investor pitch", content: "# Boss Battle: Pitch Deck\n\nCreate a complete startup pitch following the classic 10-slide format.\n\n## The 10 Slides\n\n1. **Title**: Company name, one-line description, your name\n2. **Problem**: The pain point (make it relatable)\n3. **Solution**: Your product in simple terms\n4. **Market Size**: TAM, SAM, SOM with numbers\n5. **Business Model**: How you make money\n6. **Traction**: Any early results, signups, revenue\n7. **Competition**: Positioning matrix (you vs. them)\n8. **Team**: Why you're the right people\n9. **Financials**: 3-year projections (revenue, costs)\n10. **Ask**: What you need and what you'll do with it\n\n## Requirements\n\nSubmit a written pitch deck (describe each slide's content in detail). Include:\n- A compelling narrative that connects all 10 slides\n- Real market size data (research it)\n- A competitive advantage that's defensible\n- Realistic financial projections", order: 3, type: "boss-battle", xpReward: 55 },
          ],
        },
      },
    }),

    db.quest.upsert({
      where: { slug: "product-management-essentials" },
      update: {},
      create: {
        title: "Product Management Essentials",
        slug: "product-management-essentials",
        description: "Think like a product manager. Learn user research, prioritization frameworks, roadmap planning, metrics, and stakeholder management.",
        category: "Business",
        difficulty: "intermediate",
        duration: "2 weeks",
        xpReward: 250,
        published: true,
        creatorId: maya!.id,
        milestones: {
          create: [
            { title: "User Research & Discovery", description: "Understand what users actually need", content: "# User Research & Discovery\n\n## Research Methods\n\n### Qualitative (Why?)\n- **User interviews**: 1-on-1 conversations (30-45 min)\n- **Contextual inquiry**: Watch users in their environment\n- **Diary studies**: Users log experiences over time\n- **Usability testing**: Watch users try your product\n\n### Quantitative (What?)\n- **Surveys**: Broad data collection\n- **Analytics**: Behavioral data (funnels, retention)\n- **A/B testing**: Compare variations\n\n## Jobs To Be Done (JTBD)\n\nPeople don't buy products — they hire them to do a job.\n\n> \"When I [situation], I want to [motivation], so I can [outcome].\"\n\nExample: \"When I'm commuting, I want to learn something useful, so I can feel like I'm not wasting time.\"\n\n## Challenge\n\n1. Pick a product you use daily\n2. Write 3 JTBD statements for different user segments\n3. Design a 5-question user interview guide\n4. Describe how you'd recruit 10 participants", order: 0, type: "lesson", xpReward: 30 },
            { title: "Prioritization Frameworks", description: "Decide what to build and when", content: "# Prioritization Frameworks\n\n## RICE Scoring\n\n**R**each × **I**mpact × **C**onfidence / **E**ffort = Priority Score\n\n| Factor | Scale | Description |\n|--------|-------|-------------|\n| Reach | # users/quarter | How many people this affects |\n| Impact | 0.25, 0.5, 1, 2, 3 | How much it moves the needle |\n| Confidence | 0-100% | How sure are you? |\n| Effort | person-months | How long it takes |\n\n## MoSCoW Method\n\n- **Must have**: Launch blockers\n- **Should have**: Important but not critical\n- **Could have**: Nice-to-haves\n- **Won't have**: Explicitly out of scope\n\n## Impact vs Effort Matrix\n\n```\n        High Impact\n            |\n  Quick     |    Big\n  Wins      |    Bets\n------------|------------\n  Fill      |    Money\n  Ins       |    Pit\n            |\n        Low Impact\n  Low Effort    High Effort\n```\n\n## Challenge\n\nYou're the PM for LearnOS. Prioritize these features using RICE:\n1. AI-generated quests\n2. Mobile app\n3. Collaborative coding editor\n4. Quest rating/review system\n5. Streak notifications\n6. Dark mode improvements\n\nScore each and explain your reasoning.", order: 1, type: "exercise", xpReward: 35 },
            { title: "Metrics & Analytics", description: "Measure what matters", content: "# Metrics & Analytics\n\n## North Star Metric\n\nOne metric that captures the core value your product delivers.\n\n- **Spotify**: Time spent listening\n- **Airbnb**: Nights booked\n- **Slack**: Messages sent\n- **LearnOS**: Milestones completed per week\n\n## The Pirate Metrics (AARRR)\n\n1. **Acquisition**: How do users find you? (signups, traffic sources)\n2. **Activation**: Do they have a great first experience? (completed onboarding)\n3. **Retention**: Do they come back? (weekly active users)\n4. **Revenue**: Do they pay? (conversion rate, ARPU)\n5. **Referral**: Do they tell others? (invite rate, NPS)\n\n## Leading vs Lagging Indicators\n\n- **Lagging**: Revenue, churn (already happened)\n- **Leading**: Feature adoption, engagement (predicts future)\n\n## Challenge\n\nDefine a metrics framework for LearnOS:\n1. What's the North Star metric? Why?\n2. Define one metric for each AARRR stage\n3. Identify 2 leading indicators that predict churn\n4. Design a dashboard with the 5 most important metrics", order: 2, type: "exercise", xpReward: 35 },
            { title: "Boss Battle: Product Roadmap", description: "Create a 6-month product roadmap", content: "# Boss Battle: Product Roadmap\n\nCreate a complete 6-month product roadmap for LearnOS.\n\n## Requirements\n\n1. **Vision Statement**: Where is LearnOS headed? (1 paragraph)\n2. **Themes**: 3-4 strategic themes for the next 6 months\n3. **Monthly Breakdown**: For each month, list:\n   - 2-3 features/initiatives\n   - The theme each belongs to\n   - Expected impact on North Star metric\n   - Rough effort estimate (S/M/L)\n4. **Dependencies**: What must be built first?\n5. **Risks**: Top 3 risks and mitigation strategies\n6. **Success Criteria**: How you'll know the roadmap succeeded\n\nPresent your roadmap in a clear, structured format.", order: 3, type: "boss-battle", xpReward: 60 },
          ],
        },
      },
    }),

    db.quest.upsert({
      where: { slug: "digital-marketing-growth" },
      update: {},
      create: {
        title: "Digital Marketing & Growth Hacking",
        slug: "digital-marketing-growth",
        description: "Master the channels and tactics that drive growth. SEO, content marketing, social media, email, paid ads, and viral loops — with real frameworks and case studies.",
        category: "Business",
        difficulty: "beginner",
        duration: "10 days",
        xpReward: 175,
        published: true,
        creatorId: luna!.id,
        milestones: {
          create: [
            { title: "Growth Fundamentals", description: "Understand the growth mindset and funnel", content: "# Growth Fundamentals\n\n## The Growth Mindset\n\nGrowth isn't just marketing — it's a systematic process of experimentation.\n\n## The Growth Loop\n\n```\nNew User → Activation → Engagement → Monetization → Referral → New User\n```\n\nEvery feature should feed back into bringing more users.\n\n## Growth Channels\n\n### Organic (Free)\n- **SEO**: Rank in Google for relevant searches\n- **Content Marketing**: Blog posts, guides, videos\n- **Social Media**: Build community and share value\n- **Word of Mouth**: Make your product so good people talk about it\n- **Community**: Forums, Discord, Reddit\n\n### Paid\n- **Search Ads**: Google Ads, Bing Ads\n- **Social Ads**: Facebook, Instagram, LinkedIn, TikTok\n- **Influencer Marketing**: Partner with relevant creators\n- **Sponsorships**: Podcasts, newsletters, events\n\n## Challenge\n\nPick a startup (real or imagined) and:\n1. Identify the top 3 growth channels and why\n2. For each channel, describe one specific tactic\n3. Estimate the cost per acquisition for each\n4. Which channel would you test first and why?", order: 0, type: "lesson", xpReward: 25 },
            { title: "Content & SEO Strategy", description: "Create content that ranks and converts", content: "# Content & SEO Strategy\n\n## SEO Basics\n\n### On-Page SEO\n- **Title tags**: Include primary keyword, under 60 characters\n- **Meta descriptions**: Compelling summary, under 155 characters\n- **Headings**: H1 for title, H2/H3 for structure\n- **Internal links**: Connect related content\n- **URL structure**: `/blog/startup-fundamentals` not `/blog/post-123`\n\n### Keyword Research\n\n1. Brainstorm topics your audience searches for\n2. Use tools: Google Suggest, Answer the Public, Ahrefs\n3. Target long-tail keywords (less competition)\n4. Check search intent: informational vs transactional\n\n## Content Types That Work\n\n| Type | Example | Goal |\n|------|---------|------|\n| How-to guides | \"How to validate a startup idea\" | Traffic |\n| Listicles | \"10 best tools for PMs\" | Shares |\n| Case studies | \"How we grew to 10K users\" | Trust |\n| Templates | \"Free business model canvas\" | Leads |\n| Comparison | \"Notion vs Obsidian\" | Conversion |\n\n## Challenge\n\nCreate a content strategy for LearnOS:\n1. Define 5 target keywords with search intent\n2. Write outlines for 3 blog posts\n3. Describe a lead magnet you'd create\n4. Plan a content calendar for one month (8 pieces)", order: 1, type: "exercise", xpReward: 30 },
            { title: "Boss Battle: Growth Experiment", description: "Design and analyze a growth experiment", content: "# Boss Battle: Growth Experiment\n\nDesign a complete growth experiment from hypothesis to analysis.\n\n## Requirements\n\n1. **Hypothesis**: \"If we [change], then [metric] will [improve] by [amount] because [reasoning]\"\n2. **Experiment Design**:\n   - What you're testing (A vs B)\n   - Target audience and sample size\n   - Duration (how long to run it)\n   - Success metric and how you'll measure it\n3. **Implementation Plan**: Step-by-step how you'd set it up\n4. **Mock Results**: Create realistic data for both outcomes:\n   - Scenario A: The experiment wins\n   - Scenario B: The experiment loses\n5. **Analysis**: For each scenario:\n   - Is the result statistically significant? (explain)\n   - What would you do next?\n   - What did you learn?\n\nSubmit your complete experiment document.", order: 2, type: "boss-battle", xpReward: 50 },
          ],
        },
      },
    }),

    // ========== FINANCE (2 quests) ==========
    db.quest.upsert({
      where: { slug: "personal-finance-mastery" },
      update: {},
      create: {
        title: "Personal Finance Mastery",
        slug: "personal-finance-mastery",
        description: "Take control of your money. Budgeting, investing, compound interest, retirement planning, and building wealth — practical knowledge for your financial future.",
        category: "Finance",
        difficulty: "beginner",
        duration: "10 days",
        xpReward: 175,
        published: true,
        creatorId: jordan!.id,
        milestones: {
          create: [
            { title: "Budgeting & Saving", description: "Build a budget that actually works", content: "# Budgeting & Saving\n\n## The 50/30/20 Rule\n\n- **50% Needs**: Rent, food, utilities, insurance, minimum debt payments\n- **30% Wants**: Entertainment, dining out, subscriptions, hobbies\n- **20% Savings**: Emergency fund, investments, extra debt payments\n\n## Emergency Fund\n\nBefore investing, save 3-6 months of expenses in a high-yield savings account.\n\n## Tracking Your Money\n\n1. List all income sources\n2. Categorize every expense for the past month\n3. Identify the top 3 \"money leaks\" (subscriptions you don't use, impulse purchases)\n4. Set specific savings goals with deadlines\n\n## The Latte Factor\n\n$5/day × 365 days = $1,825/year\nInvested at 8% for 30 years = $206,000\n\nSmall daily expenses compound dramatically.\n\n## Challenge\n\n1. Create a monthly budget using the 50/30/20 rule (use real or estimated numbers)\n2. Identify 3 expenses you could reduce or eliminate\n3. Calculate how much you'd save in 1 year by cutting those expenses\n4. Set 3 financial goals (1 month, 1 year, 5 years)", order: 0, type: "lesson", xpReward: 25 },
            { title: "Investing Fundamentals", description: "Understand stocks, bonds, index funds, and compound interest", content: "# Investing Fundamentals\n\n## Asset Classes\n\n| Asset | Risk | Return | Liquidity |\n|-------|------|--------|-----------|\n| Savings Account | Very Low | 4-5% | High |\n| Bonds | Low | 4-6% | Medium |\n| Index Funds | Medium | 8-10% | High |\n| Individual Stocks | High | Varies | High |\n| Real Estate | Medium | 8-12% | Low |\n| Crypto | Very High | Varies | High |\n\n## The Power of Compound Interest\n\n```\nA = P(1 + r/n)^(nt)\n\nP = $10,000 initial investment\nr = 8% annual return\nn = 12 (monthly compounding)\nt = 30 years\n\nA = $10,000 × (1.00667)^360 = $109,357\n```\n\n$10K becomes $109K in 30 years without adding a penny.\n\n## Index Funds: The Simple Strategy\n\nWarren Buffett's advice: Most people should just buy a low-cost S&P 500 index fund.\n\n- **S&P 500 index fund**: Owns the 500 largest US companies\n- **Average return**: ~10% annually since 1926\n- **Expense ratio**: 0.03% (vs 1-2% for active funds)\n- **No stock picking needed**\n\n## Dollar-Cost Averaging\n\nInvest the same amount regularly regardless of price. This removes emotion and timing risk.\n\n## Challenge\n\n1. If you invest $200/month at 8% annual return, how much will you have in 10, 20, and 30 years?\n2. Compare: $10,000 invested at age 25 vs age 35 (both earning 8% until age 65)\n3. Explain why low fees matter using a concrete example\n4. Design a simple investment portfolio for a 25-year-old", order: 1, type: "exercise", xpReward: 30 },
            { title: "Debt, Taxes & Retirement", description: "Manage debt and plan for the long term", content: "# Debt, Taxes & Retirement\n\n## Good Debt vs Bad Debt\n\n**Good debt** (used to build wealth):\n- Mortgage (appreciating asset)\n- Student loans (higher earning potential)\n- Business loans (generates income)\n\n**Bad debt** (depreciating or consumable):\n- Credit card debt (15-25% interest!)\n- Car loans on luxury vehicles\n- Personal loans for vacations\n\n## Debt Payoff Strategies\n\n**Avalanche Method**: Pay highest interest rate first (mathematically optimal)\n**Snowball Method**: Pay smallest balance first (psychologically motivating)\n\n## Tax-Advantaged Accounts\n\n| Account | Tax Benefit | Best For |\n|---------|------------|----------|\n| 401(k) | Pre-tax contributions | Employer match |\n| Roth IRA | Tax-free growth | Young/low income |\n| HSA | Triple tax advantage | Health savings |\n| 529 | Tax-free for education | College savings |\n\n## The 4% Rule\n\nIn retirement, withdraw 4% of your portfolio per year.\nTo retire on $50K/year, you need: $50,000 / 0.04 = **$1,250,000**\n\n## Challenge\n\n1. Calculate how long it would take to pay off $5,000 in credit card debt at 20% APR paying $200/month\n2. How much do you need to retire at 55 on $60K/year? At 65?\n3. Explain the difference between a traditional and Roth IRA\n4. Create a 5-year financial plan for someone earning $60K/year with $10K in student loans", order: 2, type: "exercise", xpReward: 30 },
            { title: "Boss Battle: Financial Plan", description: "Create a comprehensive personal financial plan", content: "# Boss Battle: Financial Plan\n\nCreate a complete personal financial plan for a fictional (or real) person.\n\n## Profile\n\nAge: 28, Income: $75,000/year, Student loans: $25,000 at 5%, Credit card: $3,000 at 19%, Savings: $5,000, 401(k): $8,000 (employer matches 4%)\n\n## Requirements\n\n1. **Monthly Budget**: Full 50/30/20 breakdown with specific line items\n2. **Debt Strategy**: Which method? What order? Timeline to debt-free?\n3. **Emergency Fund Plan**: How much needed? How long to build it?\n4. **Investment Strategy**: Asset allocation, account types, monthly contributions\n5. **Retirement Projection**: When can they retire? How much will they have?\n6. **5-Year Milestones**: Specific financial goals for each year\n7. **Risk Management**: Insurance recommendations\n\nSubmit your complete financial plan.", order: 3, type: "boss-battle", xpReward: 55 },
          ],
        },
      },
    }),

    db.quest.upsert({
      where: { slug: "crypto-blockchain-fundamentals" },
      update: {},
      create: {
        title: "Crypto & Blockchain Fundamentals",
        slug: "crypto-blockchain-fundamentals",
        description: "Understand the technology behind cryptocurrency. Blockchain mechanics, consensus algorithms, DeFi, smart contracts, and the future of decentralized systems.",
        category: "Finance",
        difficulty: "intermediate",
        duration: "2 weeks",
        xpReward: 225,
        published: true,
        creatorId: sam!.id,
        milestones: {
          create: [
            { title: "How Blockchain Works", description: "Understand the technology from first principles", content: "# How Blockchain Works\n\n## The Problem\n\nHow do strangers trust each other without a middleman (bank, government)?\n\n## The Solution: Distributed Ledger\n\nA blockchain is a chain of blocks, where each block contains:\n- A list of transactions\n- A timestamp\n- A hash of the previous block (creates the \"chain\")\n- A nonce (proof of work)\n\n## Key Concepts\n\n### Hashing\n```\nSHA-256(\"Hello\") → 185f8db32271fe25f561a6fc938b2e264306ec304eda518007d1764826381969\nSHA-256(\"hello\") → 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824\n```\nTiny change → completely different hash. This makes tampering detectable.\n\n### Consensus Mechanisms\n\n| Mechanism | How It Works | Pros | Cons |\n|-----------|-------------|------|------|\n| Proof of Work | Solve puzzles to validate | Very secure | Energy intensive |\n| Proof of Stake | Stake coins to validate | Energy efficient | Rich get richer |\n\n### Decentralization\n\nNo single point of failure. Thousands of nodes independently verify every transaction.\n\n## Challenge\n\n1. Explain in your own words why changing one block invalidates the entire chain\n2. Compare Proof of Work vs Proof of Stake — which is better and why?\n3. Name 3 real-world problems (non-crypto) that blockchain could solve\n4. What are the limitations of blockchain technology?", order: 0, type: "lesson", xpReward: 25 },
            { title: "Crypto Economics", description: "Understand tokenomics, DeFi, and market dynamics", content: "# Crypto Economics\n\n## Tokenomics\n\n**Supply factors:**\n- Total supply (max coins ever created)\n- Circulating supply (coins currently available)\n- Inflation/deflation rate\n- Halving events (Bitcoin halves mining rewards every 4 years)\n\n**Demand factors:**\n- Utility (what can you do with the token?)\n- Store of value narrative\n- Network effects\n- Speculation\n\n## DeFi (Decentralized Finance)\n\n| DeFi Concept | Traditional Equivalent | Example |\n|-------------|----------------------|--------|\n| DEX | Stock exchange | Uniswap |\n| Lending | Bank loans | Aave, Compound |\n| Stablecoins | Bank deposits | USDC, DAI |\n| Yield farming | Savings interest | Various |\n| NFTs | Certificates/deeds | Digital ownership |\n\n## Market Analysis\n\n- **Market cap** = Price × Circulating Supply\n- **Fully diluted** = Price × Total Supply\n- **TVL** (Total Value Locked) = Assets in DeFi protocols\n\n## Challenge\n\n1. Pick a cryptocurrency and analyze its tokenomics (supply, demand drivers, distribution)\n2. Explain how a decentralized exchange works without a middleman\n3. What risks does DeFi have that traditional finance doesn't?\n4. Is Bitcoin more like digital gold or a currency? Argue both sides.", order: 1, type: "exercise", xpReward: 35 },
            { title: "Boss Battle: Blockchain Analysis", description: "Analyze a blockchain project end-to-end", content: "# Boss Battle: Blockchain Analysis\n\nConduct a thorough analysis of a blockchain project.\n\n## Choose Your Project\n\nPick any blockchain project (Ethereum, Solana, Polkadot, Chainlink, etc.)\n\n## Requirements\n\n1. **Technology**: What consensus mechanism? How fast? How scalable?\n2. **Tokenomics**: Supply, distribution, inflation, utility\n3. **Ecosystem**: What's built on it? Developer activity?\n4. **Team & Governance**: Who's behind it? How are decisions made?\n5. **Competition**: How does it compare to 2 competitors?\n6. **Risks**: Top 3 technical and economic risks\n7. **Thesis**: Would you invest? Why or why not? (This is educational, not financial advice)\n\nSubmit your complete analysis report.", order: 2, type: "boss-battle", xpReward: 55 },
          ],
        },
      },
    }),

    // ========== MATH & SCIENCE (2 quests) ==========
    db.quest.upsert({
      where: { slug: "statistics-for-everyone" },
      update: {},
      create: {
        title: "Statistics for Everyone",
        slug: "statistics-for-everyone",
        description: "Make sense of data in everyday life. Probability, distributions, hypothesis testing, and common statistical fallacies — no heavy math required.",
        category: "Math",
        difficulty: "beginner",
        duration: "10 days",
        xpReward: 175,
        published: true,
        creatorId: jordan!.id,
        milestones: {
          create: [
            { title: "Thinking in Probability", description: "Build intuition for chance and uncertainty", content: "# Thinking in Probability\n\n## Why Probability Matters\n\nEvery decision involves uncertainty. Understanding probability helps you:\n- Make better decisions under uncertainty\n- Spot misleading statistics in the news\n- Evaluate risks accurately\n\n## Basic Rules\n\n**Probability** = Favorable outcomes / Total outcomes\n\n- Probability of heads on a fair coin: 1/2 = 50%\n- Probability of rolling a 6: 1/6 ≈ 16.7%\n\n## The Birthday Paradox\n\nIn a room of just 23 people, there's a 50% chance two share a birthday. With 70 people, it's 99.9%!\n\nWhy? Because we're checking ALL pairs, not just one specific match.\n\n## Bayes' Theorem (Intuitive Version)\n\nA medical test is 95% accurate. You test positive. What's the probability you're actually sick?\n\n**If the disease affects 1 in 1000 people:**\n- 1 true positive (you, sick)\n- 50 false positives (healthy people who test positive)\n- Your actual chance of being sick: 1/51 ≈ 2%\n\nThe base rate matters enormously!\n\n## Challenge\n\n1. Explain the Monty Hall problem and why switching is better\n2. You flip 10 heads in a row. What's the probability of heads on the 11th flip? Why?\n3. A weather app says 30% chance of rain. What does that actually mean?\n4. Find a real news headline that misuses statistics and explain the error", order: 0, type: "lesson", xpReward: 25 },
            { title: "Distributions & Averages", description: "Understand how data is shaped", content: "# Distributions & Averages\n\n## Measures of Center\n\n- **Mean**: Sum of values / count (sensitive to outliers)\n- **Median**: Middle value when sorted (robust to outliers)\n- **Mode**: Most frequent value\n\n## When Mean Lies\n\n10 people in a bar. Average salary: $50K.\nJeff Bezos walks in. Average salary: $15 billion.\n\nThe **median** barely changes. Always ask which average is being used!\n\n## Normal Distribution (Bell Curve)\n\n- 68% of data within 1 standard deviation\n- 95% within 2 standard deviations\n- 99.7% within 3 standard deviations\n\nHeight, test scores, measurement errors — many things are normally distributed.\n\n## Skewed Distributions\n\n- **Right-skewed** (long right tail): Income, house prices, social media followers\n- **Left-skewed** (long left tail): Age at retirement, test scores near maximum\n\n## Challenge\n\n1. Give 3 real-world examples where median is better than mean\n2. A dataset has mean = 60, median = 45. What can you infer about the shape?\n3. Your test score is 1.5 standard deviations above the mean. What percentile are you approximately?\n4. Why are social media follower counts right-skewed?", order: 1, type: "exercise", xpReward: 30 },
            { title: "Correlation, Causation & Fallacies", description: "Avoid the most common statistical mistakes", content: "# Correlation, Causation & Fallacies\n\n## Correlation ≠ Causation\n\nIce cream sales and drowning deaths are correlated. Does ice cream cause drowning?\n\nNo — both increase in summer (confounding variable).\n\n## Common Fallacies\n\n### Survivorship Bias\nWe only see the successes. \"College dropouts like Gates and Zuckerberg are billionaires!\" — ignoring millions of unsuccessful dropouts.\n\n### Gambler's Fallacy\n\"Red has come up 5 times in a row, so black is due!\" Each spin is independent.\n\n### Cherry Picking\nSelecting data that supports your argument while ignoring contradicting data.\n\n### Simpson's Paradox\nA trend in subgroups can reverse when groups are combined.\n\n### p-hacking\nRunning many tests until you find a \"significant\" result by chance.\n\n## Sample Size Matters\n\n\"9 out of 10 dentists recommend...\" — but was it 10 dentists or 10,000?\n\nSmall samples produce extreme results. Larger samples are more reliable.\n\n## Challenge\n\n1. Find a real example of survivorship bias (not the Gates/Zuckerberg one)\n2. Explain Simpson's Paradox with a concrete example\n3. A study of 15 people found coffee improves memory by 40%. How skeptical should you be? Why?\n4. Design a simple experiment to test whether music helps studying. What controls would you need?", order: 2, type: "exercise", xpReward: 30 },
            { title: "Boss Battle: Data Detective", description: "Analyze real-world claims using statistical thinking", content: "# Boss Battle: Data Detective\n\nPut your statistical thinking to the test.\n\n## Task\n\nFind 3 real-world claims that use statistics (news articles, ads, social media posts, studies) and analyze each one.\n\n## For Each Claim, Address:\n\n1. **The Claim**: What is being stated? Quote the statistic.\n2. **Source Evaluation**: Who conducted the study? Sample size? Methodology?\n3. **Potential Biases**: Selection bias? Survivorship bias? Confounding variables?\n4. **Statistical Validity**: Is the conclusion supported by the data? \n5. **Missing Context**: What information is missing that would change interpretation?\n6. **Your Verdict**: On a scale of 1-10, how trustworthy is this claim? Why?\n\n## Bonus\n\nRewrite one of the claims to be more statistically accurate and honest.\n\nSubmit your complete analysis of all 3 claims.", order: 3, type: "boss-battle", xpReward: 50 },
          ],
        },
      },
    }),

    db.quest.upsert({
      where: { slug: "critical-thinking-logic" },
      update: {},
      create: {
        title: "Critical Thinking & Logic",
        slug: "critical-thinking-logic",
        description: "Sharpen your reasoning skills. Logical fallacies, argument structure, cognitive biases, decision-making frameworks, and mental models used by great thinkers.",
        category: "Science",
        difficulty: "beginner",
        duration: "1 week",
        xpReward: 150,
        published: true,
        creatorId: luna!.id,
        milestones: {
          create: [
            { title: "Logic & Arguments", description: "Understand valid reasoning and argument structure", content: "# Logic & Arguments\n\n## Structure of an Argument\n\n1. **Premises**: The evidence or reasons\n2. **Conclusion**: What follows from the premises\n\n### Deductive (100% certain if premises are true)\n```\nPremise 1: All mammals are warm-blooded\nPremise 2: Dogs are mammals\nConclusion: Dogs are warm-blooded ✓\n```\n\n### Inductive (probable, not certain)\n```\nObservation: Every swan I've seen is white\nConclusion: All swans are white ✗ (black swans exist!)\n```\n\n## Common Logical Fallacies\n\n| Fallacy | Example | Why It's Wrong |\n|---------|---------|----------------|\n| Ad Hominem | \"You're wrong because you're young\" | Attacks person, not argument |\n| Straw Man | Misrepresenting someone's argument to attack it | Argues against something they didn't say |\n| False Dilemma | \"You're either with us or against us\" | Ignores middle ground |\n| Appeal to Authority | \"Einstein believed in God, so God exists\" | Authority ≠ expertise in all areas |\n| Slippery Slope | \"If we allow X, then Y, then Z!\" | No evidence for chain reaction |\n| Circular Reasoning | \"The Bible is true because God wrote it, and God exists because the Bible says so\" | Conclusion is in the premise |\n\n## Challenge\n\n1. Identify the fallacy in each:\n   - \"Everyone is buying this product, so it must be good\"\n   - \"We shouldn't listen to climate scientists because they're funded by grants\"\n   - \"If we let students use calculators, they'll forget how to do any math\"\n2. Construct a valid deductive argument about any topic\n3. Find a real example of a logical fallacy in a news article or debate", order: 0, type: "lesson", xpReward: 25 },
            { title: "Cognitive Biases", description: "Understand the shortcuts your brain takes", content: "# Cognitive Biases\n\nYour brain uses shortcuts (heuristics) that sometimes lead to systematic errors.\n\n## The Big Ones\n\n### Confirmation Bias\nYou seek information that confirms what you already believe and ignore contradicting evidence.\n\n### Anchoring\nThe first number you hear influences your judgment. A $100 shirt marked down to $60 feels cheap. A $60 shirt feels normal.\n\n### Availability Heuristic\nYou judge probability by how easily examples come to mind. Plane crashes feel common (dramatic, memorable) but car accidents are 1000x more likely.\n\n### Dunning-Kruger Effect\nBeginners overestimate their ability. Experts underestimate theirs.\n\n### Sunk Cost Fallacy\n\"I've already spent $50 on this movie ticket, so I have to watch it\" — even though the money is gone either way.\n\n### Status Quo Bias\nPeople prefer the current state of things, even when change would benefit them.\n\n### Bandwagon Effect\n\"Everyone else is doing it\" — popularity ≠ correctness.\n\n## Challenge\n\n1. Describe a time you fell victim to confirmation bias\n2. Give a personal example of the sunk cost fallacy\n3. How does anchoring affect salary negotiations? Give a strategy to counter it\n4. Pick a belief you hold strongly. What evidence would change your mind? (If nothing would, that's a red flag)", order: 1, type: "exercise", xpReward: 30 },
            { title: "Boss Battle: Decision Framework", description: "Build a personal decision-making framework", content: "# Boss Battle: Decision Framework\n\nCreate a personal decision-making framework for a complex real-world decision.\n\n## Choose a Decision\n\nPick something meaningful:\n- Should I change careers?\n- Should I start a business or stay employed?\n- Should I move to a new city?\n- Should I pursue a degree or self-teach?\n\n## Requirements\n\n1. **Frame the Decision**: What exactly are you deciding? What are the options?\n2. **Identify Biases**: Which cognitive biases might affect your thinking? How will you counter them?\n3. **Gather Evidence**: List the key facts for each option (pros/cons, data, research)\n4. **Apply Mental Models**:\n   - **Inversion**: What would make this decision a disaster? Avoid that.\n   - **Second-order thinking**: What are the consequences of the consequences?\n   - **Regret minimization**: Which choice will you regret least at age 80?\n5. **Make the Decision**: Choose an option and explain your reasoning\n6. **Pre-mortem**: Imagine it failed. What went wrong? How would you mitigate?\n\nSubmit your complete decision analysis.", order: 2, type: "boss-battle", xpReward: 50 },
          ],
        },
      },
    }),

    // ========== LEADERSHIP (1 quest) ==========
    db.quest.upsert({
      where: { slug: "leadership-communication" },
      update: {},
      create: {
        title: "Leadership & Communication",
        slug: "leadership-communication",
        description: "Become a better leader and communicator. Giving feedback, running meetings, public speaking, conflict resolution, and building trust in teams.",
        category: "Leadership",
        difficulty: "intermediate",
        duration: "10 days",
        xpReward: 200,
        published: true,
        creatorId: maya!.id,
        milestones: {
          create: [
            { title: "The Art of Feedback", description: "Give and receive feedback that actually helps", content: "# The Art of Feedback\n\n## Why Feedback Fails\n\nMost feedback is vague (\"good job\"), late (annual reviews), or threatening (\"we need to talk\").\n\n## The SBI Framework\n\n**S**ituation → **B**ehavior → **I**mpact\n\n❌ \"You're not a team player\"\n✅ \"In yesterday's meeting (situation), when you interrupted Sarah twice (behavior), it made others hesitant to share ideas (impact)\"\n\n## Receiving Feedback\n\n1. **Listen** without defending\n2. **Ask clarifying questions**: \"Can you give me a specific example?\"\n3. **Thank them** (it's hard to give feedback too)\n4. **Reflect** before reacting\n5. **Act** on what's useful, discard what's not\n\n## Radical Candor\n\n```\n              Care Personally\n                   |\n  Ruinous     |  Radical\n  Empathy     |  Candor  ← Goal\n  ------------|----------\n  Manipulative|  Obnoxious\n  Insincerity |  Aggression\n                   |\n              Challenge Directly\n```\n\n## Challenge\n\n1. Write SBI feedback for: a colleague who always misses deadlines\n2. Write SBI feedback for: a direct report who did amazing work on a project\n3. Describe a time you received feedback poorly. How would you handle it now?\n4. Why is \"Ruinous Empathy\" (caring but not challenging) harmful?", order: 0, type: "lesson", xpReward: 25 },
            { title: "Running Effective Meetings", description: "Make meetings worth everyone's time", content: "# Running Effective Meetings\n\n## The Meeting Problem\n\nA 1-hour meeting with 8 people costs 8 person-hours. Most meetings could be emails.\n\n## Before the Meeting\n\n- **Do you even need a meeting?** If it's one-way information, send a doc.\n- **Clear agenda**: Specific topics with time allocations\n- **Pre-read material**: Send docs beforehand so people come prepared\n- **Right people only**: Fewer is better. 3-7 people max for decisions.\n\n## During the Meeting\n\n1. Start on time (respect people's schedules)\n2. State the goal upfront: \"By the end, we need to decide X\"\n3. Assign a note-taker\n4. Timebox discussions\n5. End with clear action items: Who does what by when?\n\n## Meeting Types\n\n| Type | Duration | Frequency | Purpose |\n|------|----------|-----------|--------|\n| Standup | 15 min | Daily | Sync blockers |\n| 1-on-1 | 30 min | Weekly | Coaching & support |\n| Sprint planning | 1 hr | Bi-weekly | Plan work |\n| Retrospective | 45 min | Bi-weekly | Improve process |\n| Decision meeting | 30 min | As needed | Make a call |\n\n## Challenge\n\n1. Write an agenda for a 30-minute product decision meeting\n2. You're in a meeting that's gone off-track. How do you redirect it without being rude?\n3. Describe 3 meetings from your experience that could have been emails\n4. Design a meeting cadence for a team of 6 working on a 3-month project", order: 1, type: "exercise", xpReward: 30 },
            { title: "Conflict Resolution", description: "Navigate disagreements productively", content: "# Conflict Resolution\n\n## Healthy vs Unhealthy Conflict\n\n**Healthy**: Debating ideas, challenging assumptions, respectful disagreement\n**Unhealthy**: Personal attacks, passive aggression, avoiding issues\n\n## The 5 Conflict Styles\n\n1. **Competing**: I win, you lose (use for urgent, critical decisions)\n2. **Accommodating**: You win, I lose (use for low-stakes, relationship preservation)\n3. **Avoiding**: Nobody wins (use for trivial issues or cooling off)\n4. **Compromising**: We both give up something (use for time pressure)\n5. **Collaborating**: We both win (use for important, complex issues)\n\n## Nonviolent Communication (NVC)\n\n1. **Observation**: \"When I see/hear [specific behavior]...\"\n2. **Feeling**: \"I feel [emotion]...\"\n3. **Need**: \"Because I need [underlying need]...\"\n4. **Request**: \"Would you be willing to [specific action]?\"\n\n❌ \"You never listen to me!\"\n✅ \"When you check your phone during our conversations (observation), I feel frustrated (feeling) because I need to feel heard (need). Could we put phones away during dinner? (request)\"\n\n## Challenge\n\n1. Rewrite these using NVC:\n   - \"You're always late and it's disrespectful\"\n   - \"This code review is way too nitpicky\"\n2. Describe a conflict you've experienced. Which style did you use? Which would have been better?\n3. When is \"avoiding\" the right strategy? Give an example.", order: 2, type: "exercise", xpReward: 30 },
            { title: "Boss Battle: Leadership Case Study", description: "Analyze a real leadership scenario", content: "# Boss Battle: Leadership Case Study\n\nAnalyze a complex leadership scenario and recommend a course of action.\n\n## Scenario\n\nYou're leading a team of 6 engineers. The situation:\n\n- **Alice** is your top performer but has been making dismissive comments about junior team members' code\n- **Bob** (junior) has lost confidence and stopped contributing in code reviews\n- **The team** is divided — some think Alice is \"just being honest,\" others feel the environment is toxic\n- **Your manager** wants the team to ship a major feature in 3 weeks\n- **Alice** has hinted she might leave if the team \"slows down\" for less experienced people\n\n## Requirements\n\n1. **Diagnosis**: What are the root causes? (Not just symptoms)\n2. **Stakeholder Analysis**: What does each person need?\n3. **Short-term Actions**: What do you do this week? (Be specific — actual conversations you'd have)\n4. **Long-term Plan**: How do you build a healthy team culture?\n5. **Difficult Conversations**: Script the key conversation with Alice using SBI and NVC\n6. **Trade-offs**: What are you risking with your approach? What's your backup plan?\n\nSubmit your complete leadership analysis.", order: 3, type: "boss-battle", xpReward: 55 },
          ],
        },
      },
    }),
  ]);

  console.log(`Created ${quests.length} additional quests:`);
  quests.forEach((q) => console.log(`  - ${q.title} [${q.category}]`));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
