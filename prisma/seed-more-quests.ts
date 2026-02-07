import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  // Get a creator (first seed user)
  const creator = await db.user.findFirst({ where: { email: "alex@learnos.dev" } });
  const creator2 = await db.user.findFirst({ where: { email: "jordan@learnos.dev" } });
  const creator3 = await db.user.findFirst({ where: { email: "maya@learnos.dev" } });
  const creator4 = await db.user.findFirst({ where: { email: "luna@learnos.dev" } });
  const creator5 = await db.user.findFirst({ where: { email: "sam@learnos.dev" } });

  if (!creator || !creator2 || !creator3 || !creator4 || !creator5) {
    console.error("Run the main seed first: npx prisma db seed");
    process.exit(1);
  }

  const quests = await Promise.all([
    db.quest.upsert({
      where: { slug: "git-version-control-mastery" },
      update: {},
      create: {
        title: "Git & Version Control Mastery",
        slug: "git-version-control-mastery",
        description: "Go from git init to advanced workflows. Learn branching strategies, rebasing, conflict resolution, and collaborative workflows used by professional teams.",
        category: "DevOps",
        difficulty: "beginner",
        duration: "1 week",
        xpReward: 175,
        published: true,
        creatorId: creator.id,
        milestones: {
          create: [
            {
              title: "Git Fundamentals",
              description: "Learn the core git commands and mental model",
              content: "# Git Fundamentals\n\nGit tracks changes to your code over time, letting you rewind, branch, and collaborate.\n\n## Core Commands\n\n```bash\ngit init              # Initialize a repository\ngit add <file>        # Stage changes\ngit commit -m \"msg\"   # Commit staged changes\ngit status            # Check working tree status\ngit log --oneline     # View commit history\ngit diff              # See unstaged changes\n```\n\n## The Three States\n\n1. **Working Directory** — your actual files\n2. **Staging Area** — changes ready to commit\n3. **Repository** — committed history\n\n## Challenge\n\n1. Create a new git repository\n2. Make 3 commits, each adding a new file\n3. Use `git log --oneline` to show your history\n4. Use `git diff` between two commits\n\nPaste your terminal output showing the commands and results.",
              order: 0,
              type: "lesson",
              xpReward: 25,
            },
            {
              title: "Branching & Merging",
              description: "Master branches, merges, and conflict resolution",
              content: "# Branching & Merging\n\n## Branches\n\n```bash\ngit branch feature    # Create branch\ngit checkout feature  # Switch to it\n# or: git checkout -b feature  (create + switch)\n\ngit branch -a         # List all branches\n```\n\n## Merging\n\n```bash\ngit checkout main\ngit merge feature     # Merge feature into main\n```\n\n## Handling Conflicts\n\nWhen git can't auto-merge:\n```\n<<<<<<< HEAD\nYour changes\n=======\nTheir changes\n>>>>>>> feature\n```\n\nEdit the file to resolve, then:\n```bash\ngit add <resolved-file>\ngit commit\n```\n\n## Challenge\n\n1. Create a branch called `experiment`\n2. Make changes on both `main` and `experiment` that conflict\n3. Merge and resolve the conflict\n4. Show your git log with `--graph --oneline --all`",
              order: 1,
              type: "exercise",
              xpReward: 30,
            },
            {
              title: "Collaborative Workflows",
              description: "Learn pull requests, rebasing, and team workflows",
              content: "# Collaborative Workflows\n\n## Git Flow vs Trunk-Based\n\n**Git Flow**: feature branches → develop → release → main\n**Trunk-Based**: short-lived feature branches → main (with feature flags)\n\n## Rebasing\n\n```bash\ngit checkout feature\ngit rebase main       # Replay feature commits on top of main\n```\n\n### Rebase vs Merge\n- **Merge**: preserves history, creates merge commit\n- **Rebase**: linear history, cleaner log\n\n## Pull Requests\n\n1. Push your branch: `git push -u origin feature`\n2. Open a PR on GitHub\n3. Request review\n4. Address feedback with new commits\n5. Squash and merge\n\n## Challenge\n\nDescribe a branching strategy you'd use for a team of 4 developers working on a web app. Include:\n- Branch naming conventions\n- When to use rebase vs merge\n- PR review process\n- How you'd handle hotfixes",
              order: 2,
              type: "exercise",
              xpReward: 30,
            },
            {
              title: "Boss Battle: Open Source Contribution",
              description: "Simulate a real open source contribution workflow",
              content: "# Boss Battle: Open Source Contribution\n\nSimulate the full open source contribution workflow.\n\n## Scenario\n\nYou've found a bug in an open source project. Walk through the entire process:\n\n## Requirements\n\n1. **Fork & Clone**: Describe how you'd fork a repo and set up your local environment\n2. **Issue**: Write a clear bug report (title, description, steps to reproduce, expected vs actual behavior)\n3. **Branch**: Name your branch following conventions\n4. **Fix**: Describe the fix you'd make (pseudocode is fine)\n5. **Commit**: Write a proper commit message following Conventional Commits\n6. **PR**: Write a complete pull request description including:\n   - What changed and why\n   - How to test\n   - Screenshots if applicable\n   - Related issues\n\nSubmit your complete walkthrough!",
              order: 3,
              type: "boss-battle",
              xpReward: 50,
            },
          ],
        },
      },
    }),

    db.quest.upsert({
      where: { slug: "typescript-deep-dive" },
      update: {},
      create: {
        title: "TypeScript Deep Dive: Beyond the Basics",
        slug: "typescript-deep-dive",
        description: "Go beyond basic types. Master generics, conditional types, mapped types, template literals, and build type-safe libraries.",
        category: "Programming",
        difficulty: "advanced",
        duration: "2 weeks",
        xpReward: 350,
        published: true,
        creatorId: creator2.id,
        milestones: {
          create: [
            {
              title: "Generics & Constraints",
              description: "Master generic types and type constraints",
              content: "# Generics & Constraints\n\n## Basic Generics\n\n```typescript\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nfunction getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\n```\n\n## Generic Constraints\n\n```typescript\ninterface HasLength {\n  length: number;\n}\n\nfunction logLength<T extends HasLength>(value: T): void {\n  console.log(value.length);\n}\n\nlogLength(\"hello\");    // OK\nlogLength([1, 2, 3]);  // OK\nlogLength(42);         // Error!\n```\n\n## Generic Classes\n\n```typescript\nclass Stack<T> {\n  private items: T[] = [];\n  push(item: T) { this.items.push(item); }\n  pop(): T | undefined { return this.items.pop(); }\n  peek(): T | undefined { return this.items[this.items.length - 1]; }\n}\n```\n\n## Challenge\n\nBuild a type-safe `EventEmitter<Events>` class where `Events` is a map of event names to their payload types. It should have `on`, `off`, and `emit` methods with full type safety.",
              order: 0,
              type: "lesson",
              xpReward: 35,
            },
            {
              title: "Conditional & Mapped Types",
              description: "Build powerful type-level computations",
              content: "# Conditional & Mapped Types\n\n## Conditional Types\n\n```typescript\ntype IsString<T> = T extends string ? true : false;\n\ntype A = IsString<\"hello\">; // true\ntype B = IsString<42>;      // false\n\n// Extract return type\ntype ReturnOf<T> = T extends (...args: any[]) => infer R ? R : never;\n```\n\n## Mapped Types\n\n```typescript\ntype Readonly<T> = { readonly [K in keyof T]: T[K] };\ntype Partial<T> = { [K in keyof T]?: T[K] };\ntype Nullable<T> = { [K in keyof T]: T[K] | null };\n\n// With key remapping\ntype Getters<T> = {\n  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];\n};\n```\n\n## Template Literal Types\n\n```typescript\ntype HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';\ntype Endpoint = `/api/${string}`;\ntype Route = `${HTTPMethod} ${Endpoint}`;\n```\n\n## Challenge\n\nCreate a `DeepPartial<T>` type that makes all properties optional recursively, including nested objects.",
              order: 1,
              type: "exercise",
              xpReward: 40,
            },
            {
              title: "Type-Safe API Patterns",
              description: "Build type-safe builders, validators, and API clients",
              content: "# Type-Safe API Patterns\n\n## Builder Pattern\n\n```typescript\nclass QueryBuilder<T extends Record<string, any>> {\n  private conditions: Partial<T> = {};\n\n  where<K extends keyof T>(key: K, value: T[K]): this {\n    this.conditions[key] = value;\n    return this;\n  }\n\n  build(): Partial<T> {\n    return { ...this.conditions };\n  }\n}\n```\n\n## Discriminated Unions\n\n```typescript\ntype Result<T, E = Error> =\n  | { success: true; data: T }\n  | { success: false; error: E };\n\nfunction handle<T>(result: Result<T>) {\n  if (result.success) {\n    console.log(result.data); // TypeScript knows data exists\n  } else {\n    console.error(result.error); // TypeScript knows error exists\n  }\n}\n```\n\n## Challenge\n\nBuild a type-safe form validator:\n1. Define a schema type that maps field names to validation rules\n2. The `validate` function should return typed errors per field\n3. Use generics so it works with any form shape",
              order: 2,
              type: "exercise",
              xpReward: 40,
            },
            {
              title: "Boss Battle: Type Challenges",
              description: "Solve advanced type-level programming challenges",
              content: "# Boss Battle: Type Challenges\n\nSolve these type-level challenges. No runtime code — types only!\n\n## Challenge 1: Deep Readonly\nCreate `DeepReadonly<T>` that recursively makes all properties readonly.\n\n## Challenge 2: Tuple to Union\nCreate `TupleToUnion<T>` that converts `[string, number, boolean]` to `string | number | boolean`.\n\n## Challenge 3: String to Union\nCreate `StringToUnion<S>` that converts `\"hello\"` to `\"h\" | \"e\" | \"l\" | \"o\"`.\n\n## Challenge 4: Type-Safe Router\nCreate a router type where:\n```typescript\nconst routes = {\n  '/users/:id': { id: string },\n  '/posts/:slug': { slug: string },\n  '/users/:id/posts/:postId': { id: string, postId: string },\n} as const;\n```\nThe params should be automatically inferred from the path pattern.\n\nSubmit your type definitions with test cases showing they work.",
              order: 3,
              type: "boss-battle",
              xpReward: 75,
            },
          ],
        },
      },
    }),

    db.quest.upsert({
      where: { slug: "intro-to-machine-learning" },
      update: {},
      create: {
        title: "Introduction to Machine Learning",
        slug: "intro-to-machine-learning",
        description: "Understand the core concepts of machine learning. From linear regression to neural networks, build intuition through visual explanations and hands-on projects.",
        category: "Data Science",
        difficulty: "intermediate",
        duration: "3 weeks",
        xpReward: 300,
        published: true,
        creatorId: creator2.id,
        milestones: {
          create: [
            {
              title: "What is Machine Learning?",
              description: "Understand the core paradigms of ML",
              content: "# What is Machine Learning?\n\nMachine learning is teaching computers to learn patterns from data instead of explicitly programming rules.\n\n## Three Paradigms\n\n### 1. Supervised Learning\nLearn from labeled examples.\n- **Regression**: Predict continuous values (house prices)\n- **Classification**: Predict categories (spam/not spam)\n\n### 2. Unsupervised Learning\nFind structure in unlabeled data.\n- **Clustering**: Group similar items (customer segments)\n- **Dimensionality Reduction**: Compress features (PCA)\n\n### 3. Reinforcement Learning\nLearn through trial and error with rewards.\n\n## The ML Pipeline\n\n1. Collect & clean data\n2. Explore & visualize\n3. Feature engineering\n4. Train model\n5. Evaluate performance\n6. Deploy & monitor\n\n## Challenge\n\nFor each paradigm, describe a real-world problem it could solve and explain why that paradigm fits best.",
              order: 0,
              type: "lesson",
              xpReward: 25,
            },
            {
              title: "Linear Regression from Scratch",
              description: "Implement linear regression using only NumPy",
              content: "# Linear Regression from Scratch\n\n## The Math\n\nLinear regression fits a line: `y = wx + b`\n\n**Cost Function** (Mean Squared Error):\n```\nMSE = (1/n) * Σ(y_pred - y_actual)²\n```\n\n**Gradient Descent**:\n```\nw = w - learning_rate * dMSE/dw\nb = b - learning_rate * dMSE/db\n```\n\n## Implementation\n\n```python\nimport numpy as np\n\nclass LinearRegression:\n    def __init__(self, lr=0.01, epochs=1000):\n        self.lr = lr\n        self.epochs = epochs\n    \n    def fit(self, X, y):\n        self.w = np.zeros(X.shape[1])\n        self.b = 0\n        \n        for _ in range(self.epochs):\n            y_pred = X @ self.w + self.b\n            error = y_pred - y\n            self.w -= self.lr * (2/len(y)) * (X.T @ error)\n            self.b -= self.lr * (2/len(y)) * error.sum()\n    \n    def predict(self, X):\n        return X @ self.w + self.b\n```\n\n## Challenge\n\n1. Implement the LinearRegression class above\n2. Generate sample data and train the model\n3. Plot the regression line against the data points\n4. Calculate and report the R² score",
              order: 1,
              type: "exercise",
              xpReward: 35,
            },
            {
              title: "Classification & Decision Boundaries",
              description: "Understand classification with logistic regression and decision trees",
              content: "# Classification & Decision Boundaries\n\n## Logistic Regression\n\nDespite its name, logistic regression is for **classification**.\n\n```python\ndef sigmoid(z):\n    return 1 / (1 + np.exp(-z))\n\n# Probability of class 1\np = sigmoid(w @ x + b)\n\n# Decision: class 1 if p >= 0.5, else class 0\n```\n\n## Decision Trees\n\nTrees split data by asking yes/no questions:\n\n```\nIs income > $50k?\n├── Yes: Is age > 30?\n│   ├── Yes: Approve loan\n│   └── No: Review\n└── No: Deny loan\n```\n\n## Evaluation Metrics\n\n| Metric | Formula | Use When |\n|--------|---------|----------|\n| Accuracy | correct / total | Balanced classes |\n| Precision | TP / (TP + FP) | Minimize false positives |\n| Recall | TP / (TP + FN) | Minimize false negatives |\n| F1 Score | 2 * P * R / (P + R) | Balance P and R |\n\n## Challenge\n\nExplain in your own words:\n1. When would you choose logistic regression over a decision tree?\n2. Why is accuracy misleading for imbalanced datasets?\n3. Give a real-world example where recall matters more than precision.",
              order: 2,
              type: "lesson",
              xpReward: 30,
            },
            {
              title: "Boss Battle: Build a Classifier",
              description: "Build and evaluate a complete ML classification pipeline",
              content: "# Boss Battle: Build a Classifier\n\nBuild a complete classification pipeline from scratch.\n\n## Task\n\nChoose one of these datasets (or describe your own):\n- Iris flower classification\n- Titanic survival prediction\n- Spam email detection\n\n## Requirements\n\n1. **Data Exploration**: Describe the dataset, its features, and target variable\n2. **Preprocessing**: Handle missing values, encode categories, scale features\n3. **Model Selection**: Choose 2 different algorithms and explain why\n4. **Training**: Describe your train/test split strategy\n5. **Evaluation**: Report accuracy, precision, recall, and F1 for both models\n6. **Analysis**: Which model performed better and why?\n7. **Improvement Ideas**: What would you try next?\n\nSubmit your analysis as a structured write-up. Code snippets encouraged but not required.",
              order: 3,
              type: "boss-battle",
              xpReward: 70,
            },
          ],
        },
      },
    }),

    db.quest.upsert({
      where: { slug: "ui-ux-design-fundamentals" },
      update: {},
      create: {
        title: "UI/UX Design Fundamentals",
        slug: "ui-ux-design-fundamentals",
        description: "Learn the principles of great interface design. Color theory, typography, layout, accessibility, and user psychology — everything you need to design beautiful, usable products.",
        category: "Design",
        difficulty: "beginner",
        duration: "10 days",
        xpReward: 200,
        published: true,
        creatorId: creator3.id,
        milestones: {
          create: [
            {
              title: "Visual Design Principles",
              description: "Learn contrast, hierarchy, alignment, and proximity",
              content: "# Visual Design Principles\n\n## The 4 Core Principles (C.R.A.P.)\n\n### 1. Contrast\nMake different things look different. Use size, color, weight, and spacing.\n\n### 2. Repetition\nReuse visual elements for consistency. Consistent buttons, colors, fonts.\n\n### 3. Alignment\nNothing should be placed arbitrarily. Every element should connect visually to something else.\n\n### 4. Proximity\nGroup related items together. White space between groups creates visual hierarchy.\n\n## Typography Basics\n\n- **Hierarchy**: Title → Heading → Subheading → Body → Caption\n- **Pairing**: Use at most 2 font families (1 serif + 1 sans-serif)\n- **Line height**: 1.5x for body text, 1.2x for headings\n- **Measure**: 45-75 characters per line for readability\n\n## Challenge\n\nFind 2 websites — one with great design and one with poor design. For each, analyze:\n1. How they use (or fail to use) the 4 principles\n2. Typography choices and hierarchy\n3. One specific improvement suggestion for the poor design",
              order: 0,
              type: "lesson",
              xpReward: 25,
            },
            {
              title: "Color Theory & Accessibility",
              description: "Build accessible color palettes that communicate effectively",
              content: "# Color Theory & Accessibility\n\n## Color Psychology\n\n| Color | Association | Use For |\n|-------|------------|--------|\n| Blue | Trust, calm | Finance, healthcare |\n| Red | Urgency, passion | Alerts, CTAs |\n| Green | Growth, success | Eco, confirmations |\n| Purple | Luxury, creativity | Premium brands |\n| Orange | Energy, warmth | Friendly CTAs |\n\n## Building a Palette\n\n1. **Primary**: Your brand color (1 color)\n2. **Secondary**: Complementary accent (1 color)\n3. **Neutrals**: Gray scale for text and backgrounds (5-7 shades)\n4. **Semantic**: Success (green), Warning (yellow), Error (red), Info (blue)\n\n## Accessibility (WCAG 2.1)\n\n- **AA standard**: 4.5:1 contrast for normal text, 3:1 for large text\n- **AAA standard**: 7:1 for normal text\n- Never convey information by color alone\n- Test with color blindness simulators\n\n## Challenge\n\n1. Create a 6-color palette for a productivity app\n2. Specify the hex values and their roles\n3. Check contrast ratios using WebAIM Contrast Checker\n4. Explain your color choices",
              order: 1,
              type: "exercise",
              xpReward: 30,
            },
            {
              title: "Layout & Responsive Design",
              description: "Master grid systems and responsive patterns",
              content: "# Layout & Responsive Design\n\n## Grid Systems\n\nMost modern designs use a **12-column grid**:\n- Content width: 1200px max\n- Gutters: 16-24px\n- Margins: 16px (mobile) → 64px (desktop)\n\n## Common Layouts\n\n1. **Single Column**: Best for mobile, reading-focused content\n2. **Sidebar + Content**: Dashboards, documentation\n3. **Card Grid**: Product listings, portfolios\n4. **Split Screen**: Landing pages, comparisons\n\n## Responsive Breakpoints\n\n```\nMobile:  < 640px  (1 column)\nTablet:  640-1024px (2 columns)\nDesktop: > 1024px (3-4 columns)\n```\n\n## Spacing System\n\nUse a consistent scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px\n\n## Challenge\n\nDesign a responsive layout for a learning dashboard that includes:\n- Navigation (top or side)\n- Progress overview cards\n- A list of active quests\n- A quick-access AI mentor chat\n\nDescribe how the layout adapts from mobile to desktop.",
              order: 2,
              type: "exercise",
              xpReward: 30,
            },
            {
              title: "Boss Battle: Redesign Challenge",
              description: "Redesign a poorly designed interface",
              content: "# Boss Battle: Redesign Challenge\n\nChoose a real app, website, or tool that you think has usability issues, and redesign it.\n\n## Requirements\n\n1. **Audit**: Identify 5 specific usability problems with the current design\n2. **User Goals**: Define the top 3 tasks users need to accomplish\n3. **Wireframe**: Create a low-fidelity wireframe of your redesign (describe it in detail or use ASCII art)\n4. **Design Decisions**: For each change, explain:\n   - What principle it applies (hierarchy, contrast, proximity, etc.)\n   - How it improves usability\n   - What trade-offs you considered\n5. **Accessibility**: How your design meets WCAG AA standards\n\nSubmit your complete redesign analysis.",
              order: 3,
              type: "boss-battle",
              xpReward: 55,
            },
          ],
        },
      },
    }),

    db.quest.upsert({
      where: { slug: "api-design-rest-graphql" },
      update: {},
      create: {
        title: "API Design: REST & GraphQL",
        slug: "api-design-rest-graphql",
        description: "Design clean, scalable APIs. Learn REST best practices, GraphQL fundamentals, authentication patterns, rate limiting, and API documentation.",
        category: "Programming",
        difficulty: "intermediate",
        duration: "2 weeks",
        xpReward: 275,
        published: true,
        creatorId: creator5.id,
        milestones: {
          create: [
            {
              title: "RESTful API Design",
              description: "Learn the principles of clean REST API design",
              content: "# RESTful API Design\n\n## REST Principles\n\n1. **Resources**: Everything is a resource identified by a URL\n2. **HTTP Methods**: GET (read), POST (create), PUT (replace), PATCH (update), DELETE (remove)\n3. **Stateless**: Each request contains all needed information\n4. **Consistent naming**: Use nouns, not verbs\n\n## URL Design\n\n```\nGET    /api/users          # List users\nGET    /api/users/123       # Get user 123\nPOST   /api/users           # Create user\nPATCH  /api/users/123       # Update user 123\nDELETE /api/users/123       # Delete user 123\n\n# Nested resources\nGET    /api/users/123/posts     # User's posts\nPOST   /api/users/123/posts     # Create post for user\n\n# Filtering & Pagination\nGET    /api/posts?status=published&page=2&limit=20\nGET    /api/posts?sort=-createdAt\n```\n\n## Status Codes\n\n| Code | Meaning | Use For |\n|------|---------|--------|\n| 200 | OK | Successful GET/PATCH |\n| 201 | Created | Successful POST |\n| 204 | No Content | Successful DELETE |\n| 400 | Bad Request | Validation errors |\n| 401 | Unauthorized | Not authenticated |\n| 403 | Forbidden | Not authorized |\n| 404 | Not Found | Resource missing |\n| 429 | Too Many Requests | Rate limited |\n\n## Challenge\n\nDesign a REST API for a task management app (like Todoist). Define:\n1. At least 5 endpoints with methods, URLs, and descriptions\n2. Request/response body examples for each\n3. Error response format",
              order: 0,
              type: "lesson",
              xpReward: 30,
            },
            {
              title: "GraphQL Fundamentals",
              description: "Learn queries, mutations, and schema design",
              content: "# GraphQL Fundamentals\n\n## Why GraphQL?\n\n- **No over-fetching**: Request exactly what you need\n- **No under-fetching**: Get related data in one request\n- **Strong typing**: Schema defines the API contract\n\n## Schema Definition\n\n```graphql\ntype User {\n  id: ID!\n  name: String!\n  email: String!\n  posts: [Post!]!\n}\n\ntype Post {\n  id: ID!\n  title: String!\n  content: String!\n  author: User!\n  createdAt: DateTime!\n}\n\ntype Query {\n  user(id: ID!): User\n  posts(limit: Int, offset: Int): [Post!]!\n}\n\ntype Mutation {\n  createPost(title: String!, content: String!): Post!\n  updatePost(id: ID!, title: String, content: String): Post!\n  deletePost(id: ID!): Boolean!\n}\n```\n\n## Queries\n\n```graphql\nquery {\n  user(id: \"123\") {\n    name\n    posts {\n      title\n      createdAt\n    }\n  }\n}\n```\n\n## Challenge\n\nDesign a GraphQL schema for LearnOS that includes:\n- Users with Learning DNA\n- Quests with milestones\n- Quest progress tracking\n\nWrite example queries for:\n1. Fetching a user's active quests with milestone progress\n2. Getting the leaderboard (top users by XP)",
              order: 1,
              type: "exercise",
              xpReward: 35,
            },
            {
              title: "Authentication & Security",
              description: "Implement secure API authentication patterns",
              content: "# Authentication & Security\n\n## Authentication Methods\n\n### 1. JWT (JSON Web Tokens)\n```\nHeader: { \"alg\": \"HS256\", \"typ\": \"JWT\" }\nPayload: { \"sub\": \"user123\", \"exp\": 1234567890 }\nSignature: HMACSHA256(header + payload, secret)\n```\n\n**Flow**: Login → Get token → Send in `Authorization: Bearer <token>`\n\n### 2. API Keys\nSimple but less secure. Good for server-to-server.\n```\nX-API-Key: abc123def456\n```\n\n### 3. OAuth 2.0\nDelegated authorization. \"Sign in with Google/GitHub.\"\n\n## Security Best Practices\n\n1. **Always use HTTPS**\n2. **Rate limiting**: Prevent abuse (429 Too Many Requests)\n3. **Input validation**: Never trust client data\n4. **CORS**: Restrict origins that can call your API\n5. **Don't expose internal errors**: Return generic messages\n6. **Pagination**: Prevent clients from fetching entire database\n\n## Challenge\n\nDesign an authentication system for a SaaS API:\n1. How would users authenticate? (JWT, API keys, or both?)\n2. How would you handle refresh tokens?\n3. How would you implement role-based access (admin vs user)?\n4. What rate limits would you set and why?",
              order: 2,
              type: "lesson",
              xpReward: 30,
            },
            {
              title: "Boss Battle: Design a Complete API",
              description: "Design a production-ready API specification",
              content: "# Boss Battle: Design a Complete API\n\nDesign a complete API for an e-commerce platform.\n\n## Requirements\n\nYour API must support:\n1. **Products**: CRUD, search, filtering, categories\n2. **Users**: Registration, authentication, profiles\n3. **Cart**: Add/remove items, update quantities\n4. **Orders**: Checkout, order history, order status\n5. **Reviews**: Create, read, aggregate ratings\n\n## Deliverables\n\n1. Choose REST or GraphQL (justify your choice)\n2. Define all endpoints/types with request/response formats\n3. Authentication strategy\n4. Error handling format\n5. Pagination strategy\n6. At least one example of a complex query (e.g., \"products in category X, sorted by rating, with reviews\")\n\nSubmit your complete API design document.",
              order: 3,
              type: "boss-battle",
              xpReward: 65,
            },
          ],
        },
      },
    }),
  ]);

  console.log(`Created ${quests.length} additional quests:`);
  quests.forEach((q) => console.log(`  - ${q.title}`));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
