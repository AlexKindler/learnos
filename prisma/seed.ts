import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create mock users
  const users = await Promise.all([
    db.user.upsert({
      where: { email: "alex@learnos.dev" },
      update: {},
      create: {
        name: "Alex Chen",
        email: "alex@learnos.dev",
        username: "alexchen",
        bio: "Full-stack developer passionate about adaptive learning",
        onboarded: true,
        xp: 2450,
        streak: 12,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      },
    }),
    db.user.upsert({
      where: { email: "maya@learnos.dev" },
      update: {},
      create: {
        name: "Maya Rodriguez",
        email: "maya@learnos.dev",
        username: "mayar",
        bio: "UX designer and creative technologist",
        onboarded: true,
        xp: 1820,
        streak: 7,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=maya",
      },
    }),
    db.user.upsert({
      where: { email: "jordan@learnos.dev" },
      update: {},
      create: {
        name: "Jordan Park",
        email: "jordan@learnos.dev",
        username: "jpark",
        bio: "Data scientist exploring ML and AI",
        onboarded: true,
        xp: 3100,
        streak: 21,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=jordan",
      },
    }),
    db.user.upsert({
      where: { email: "sam@learnos.dev" },
      update: {},
      create: {
        name: "Sam Okafor",
        email: "sam@learnos.dev",
        username: "samokafor",
        bio: "CS student and open source contributor",
        onboarded: true,
        xp: 980,
        streak: 3,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=sam",
      },
    }),
    db.user.upsert({
      where: { email: "luna@learnos.dev" },
      update: {},
      create: {
        name: "Luna Wei",
        email: "luna@learnos.dev",
        username: "lunawei",
        bio: "Technical writer and educator",
        onboarded: true,
        xp: 1550,
        streak: 9,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna",
      },
    }),
  ]);

  // Create DNA profiles
  const dnaProfiles = [
    { userId: users[0].id, analytical: 85, creative: 60, practical: 90, social: 55, structural: 80, explorative: 70 },
    { userId: users[1].id, analytical: 50, creative: 95, practical: 70, social: 80, structural: 60, explorative: 85 },
    { userId: users[2].id, analytical: 95, creative: 45, practical: 75, social: 50, structural: 90, explorative: 80 },
    { userId: users[3].id, analytical: 70, creative: 65, practical: 85, social: 75, structural: 60, explorative: 90 },
    { userId: users[4].id, analytical: 65, creative: 80, practical: 55, social: 90, structural: 70, explorative: 75 },
  ];

  for (const dna of dnaProfiles) {
    await db.learningDna.upsert({
      where: { userId: dna.userId },
      update: dna,
      create: { ...dna, pacePreference: "moderate", depthPreference: "balanced", stylePreference: "mixed" },
    });
  }

  // Create quests
  const quests = await Promise.all([
    db.quest.upsert({
      where: { slug: "python-fundamentals" },
      update: {},
      create: {
        title: "Python Fundamentals: From Zero to Hero",
        slug: "python-fundamentals",
        description: "Master Python programming from the ground up. Learn variables, functions, data structures, OOP, and build a real project by the end.",
        category: "Programming",
        difficulty: "beginner",
        duration: "2 weeks",
        xpReward: 200,
        published: true,
        creatorId: users[0].id,
        milestones: {
          create: [
            { title: "Hello Python", description: "Set up Python and write your first program", content: "# Hello Python\n\nWelcome to your Python journey! In this milestone, you'll set up your development environment and write your very first Python program.\n\n## Setting Up\n\n1. Install Python 3.12+ from [python.org](https://python.org)\n2. Open your terminal and verify: `python --version`\n3. Create a new file called `hello.py`\n\n## Your First Program\n\n```python\nprint(\"Hello, LearnOS!\")\nname = input(\"What's your name? \")\nprint(f\"Welcome to Python, {name}!\")\n```\n\n## Challenge\n\nModify the program to also ask for the user's favorite programming language and print a personalized greeting.", order: 0, type: "lesson", xpReward: 25 },
            { title: "Variables & Data Types", description: "Learn about Python's type system", content: "# Variables & Data Types\n\nPython is dynamically typed, but understanding types is crucial.\n\n## Core Types\n\n```python\n# Strings\nname = \"LearnOS\"\ngreeting = f\"Hello, {name}!\"\n\n# Numbers\nage = 25\npi = 3.14159\n\n# Booleans\nis_learning = True\n\n# Lists\nskills = [\"Python\", \"JavaScript\", \"Rust\"]\n\n# Dictionaries\nprofile = {\"name\": \"Alex\", \"xp\": 100}\n```\n\n## Type Checking\n\n```python\nprint(type(name))    # <class 'str'>\nprint(type(age))     # <class 'int'>\nprint(type(skills))  # <class 'list'>\n```\n\n## Challenge\n\nCreate a dictionary representing a LearnOS user with name, XP, streak, and a list of completed quests.", order: 1, type: "lesson", xpReward: 25 },
            { title: "Functions & Control Flow", description: "Master functions, loops, and conditionals", content: "# Functions & Control Flow\n\n## Functions\n\n```python\ndef calculate_xp(milestones_completed: int, bonus: float = 1.0) -> int:\n    base_xp = milestones_completed * 25\n    return int(base_xp * bonus)\n\nxp = calculate_xp(5, bonus=1.5)\nprint(f\"You earned {xp} XP!\")\n```\n\n## Conditionals\n\n```python\ndef get_rank(xp: int) -> str:\n    if xp >= 5000:\n        return \"Master\"\n    elif xp >= 1000:\n        return \"Expert\"\n    elif xp >= 100:\n        return \"Apprentice\"\n    return \"Novice\"\n```\n\n## Loops\n\n```python\nfor quest in [\"Python\", \"React\", \"DSA\"]:\n    print(f\"Starting quest: {quest}\")\n```\n\n## Challenge\n\nWrite a function that takes a list of quiz scores and returns the letter grade (A/B/C/D/F) based on the average.", order: 2, type: "exercise", xpReward: 30 },
            { title: "Boss Battle: Build a CLI Quiz App", description: "Build a complete command-line quiz application", content: "# Boss Battle: CLI Quiz App\n\nTime to put everything together! Build a command-line quiz application.\n\n## Requirements\n\n1. Store at least 5 questions with multiple choice answers\n2. Present questions one at a time\n3. Track the user's score\n4. Calculate which \"DNA dimension\" the user scores highest in\n5. Display a summary with:\n   - Total score\n   - Percentage correct\n   - Top DNA dimension\n   - A personalized message based on performance\n\n## Bonus\n\n- Add a difficulty system (easy/medium/hard questions)\n- Save results to a JSON file\n- Add a timer for each question\n\n## Hints\n\n```python\nimport json\nimport time\n\nquestions = [\n    {\n        \"question\": \"What is a list comprehension?\",\n        \"options\": [\"A way to create lists\", \"A sorting algorithm\", \"A data type\"],\n        \"answer\": 0,\n        \"dimension\": \"analytical\"\n    },\n    # ... more questions\n]\n```\n\nGood luck, adventurer!", order: 3, type: "boss-battle", xpReward: 50 },
          ],
        },
      },
    }),
    db.quest.upsert({
      where: { slug: "design-thinking-101" },
      update: {},
      create: {
        title: "Design Thinking 101: Human-Centered Innovation",
        slug: "design-thinking-101",
        description: "Learn the design thinking framework used by top companies. Empathize, Define, Ideate, Prototype, and Test your way to creative solutions.",
        category: "Design",
        difficulty: "beginner",
        duration: "1 week",
        xpReward: 150,
        published: true,
        creatorId: users[1].id,
        milestones: {
          create: [
            { title: "Empathize", description: "Learn to understand user needs deeply", content: "# Empathize: Understanding Your Users\n\nThe first step in design thinking is building empathy with the people you're designing for.\n\n## Key Methods\n\n1. **User Interviews**: Ask open-ended questions\n2. **Observation**: Watch users in their natural environment\n3. **Empathy Maps**: Document what users Say, Think, Do, and Feel\n\n## Exercise\n\nChoose a daily frustration (commuting, cooking, studying) and interview 2 people about their experience. Document your findings in an empathy map.", order: 0, type: "lesson", xpReward: 25 },
            { title: "Define & Ideate", description: "Frame problems and generate solutions", content: "# Define & Ideate\n\n## Define: The Problem Statement\n\nSynthesize your research into a clear problem statement:\n\n> **[User]** needs **[need]** because **[insight]**\n\n## Ideate: Generate Solutions\n\n- **Brainstorming**: Quantity over quality\n- **SCAMPER**: Substitute, Combine, Adapt, Modify, Put to other use, Eliminate, Reverse\n- **How Might We**: Reframe problems as opportunities\n\n## Challenge\n\nGenerate at least 15 ideas for solving the problem you defined. Then select the top 3 most promising ideas.", order: 1, type: "exercise", xpReward: 30 },
            { title: "Boss Battle: Prototype & Test", description: "Build and validate a low-fidelity prototype", content: "# Boss Battle: Prototype & Test\n\nCreate a low-fidelity prototype of your best solution and test it with real users.\n\n## Requirements\n\n1. Create a paper prototype OR digital wireframe\n2. Test with at least 2 potential users\n3. Document:\n   - What worked well\n   - What confused users\n   - Key insights for iteration\n4. Create a one-page summary of your design thinking journey\n\nSubmit your prototype images and testing summary.", order: 2, type: "boss-battle", xpReward: 50 },
          ],
        },
      },
    }),
    db.quest.upsert({
      where: { slug: "data-structures-algorithms" },
      update: {},
      create: {
        title: "Data Structures & Algorithms: The Foundation",
        slug: "data-structures-algorithms",
        description: "Build a rock-solid foundation in DSA. Arrays, linked lists, trees, graphs, sorting, searching — with visual explanations and coding challenges.",
        category: "Programming",
        difficulty: "intermediate",
        duration: "3 weeks",
        xpReward: 300,
        published: true,
        creatorId: users[2].id,
        milestones: {
          create: [
            { title: "Arrays & Big-O", description: "Understand arrays and time complexity", content: "# Arrays & Big-O Notation\n\n## Big-O Crash Course\n\n| Complexity | Name | Example |\n|-----------|------|---------|\n| O(1) | Constant | Array access |\n| O(log n) | Logarithmic | Binary search |\n| O(n) | Linear | Linear search |\n| O(n log n) | Linearithmic | Merge sort |\n| O(n²) | Quadratic | Bubble sort |\n\n## Arrays\n\nArrays are contiguous blocks of memory. Key operations:\n\n```python\narr = [1, 2, 3, 4, 5]\narr[0]        # O(1) access\narr.append(6) # O(1) amortized\narr.insert(0, 0) # O(n)\n```\n\n## Challenge\n\nImplement a function that finds two numbers in an array that sum to a target value. Aim for O(n) time complexity.", order: 0, type: "lesson", xpReward: 30 },
            { title: "Linked Lists & Stacks", description: "Build linked lists and stack data structures", content: "# Linked Lists & Stacks\n\n## Linked List\n\n```python\nclass Node:\n    def __init__(self, val, next=None):\n        self.val = val\n        self.next = next\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n    \n    def prepend(self, val):\n        self.head = Node(val, self.head)\n    \n    def find(self, val):\n        curr = self.head\n        while curr:\n            if curr.val == val:\n                return curr\n            curr = curr.next\n        return None\n```\n\n## Challenge\n\n1. Implement `append`, `delete`, and `reverse` methods\n2. Implement a Stack using a linked list\n3. Solve: Detect if a linked list has a cycle", order: 1, type: "exercise", xpReward: 35 },
            { title: "Trees & Graphs", description: "Traverse trees and explore graph algorithms", content: "# Trees & Graphs\n\n## Binary Search Tree\n\n```python\nclass TreeNode:\n    def __init__(self, val):\n        self.val = val\n        self.left = None\n        self.right = None\n\ndef inorder(node):\n    if not node:\n        return []\n    return inorder(node.left) + [node.val] + inorder(node.right)\n```\n\n## Graph Representation\n\n```python\ngraph = {\n    'A': ['B', 'C'],\n    'B': ['D'],\n    'C': ['D', 'E'],\n    'D': [],\n    'E': []\n}\n\ndef bfs(graph, start):\n    visited = set()\n    queue = [start]\n    while queue:\n        node = queue.pop(0)\n        if node not in visited:\n            visited.add(node)\n            queue.extend(graph[node])\n    return visited\n```\n\n## Challenge\n\nImplement BFS and DFS for both trees and graphs.", order: 2, type: "lesson", xpReward: 35 },
            { title: "Boss Battle: Algorithm Arena", description: "Solve 3 algorithm challenges under time pressure", content: "# Boss Battle: Algorithm Arena\n\nSolve these 3 challenges. Submit your solutions with explanations of time/space complexity.\n\n## Challenge 1: Merge Intervals\nGiven a list of intervals, merge overlapping ones.\n\n```\nInput: [[1,3],[2,6],[8,10],[15,18]]\nOutput: [[1,6],[8,10],[15,18]]\n```\n\n## Challenge 2: Level Order Traversal\nReturn a binary tree's level order traversal as a list of lists.\n\n## Challenge 3: Shortest Path\nFind the shortest path between two nodes in an unweighted graph.\n\nGood luck!", order: 3, type: "boss-battle", xpReward: 75 },
          ],
        },
      },
    }),
    db.quest.upsert({
      where: { slug: "react-modern-patterns" },
      update: {},
      create: {
        title: "React: Modern Patterns & Best Practices",
        slug: "react-modern-patterns",
        description: "Level up your React skills with hooks, server components, state management patterns, and performance optimization techniques.",
        category: "Programming",
        difficulty: "intermediate",
        duration: "2 weeks",
        xpReward: 250,
        published: true,
        creatorId: users[0].id,
        milestones: {
          create: [
            { title: "Advanced Hooks", description: "Master useReducer, useCallback, useMemo, and custom hooks", content: "# Advanced Hooks\n\n## useReducer for Complex State\n\n```tsx\nconst reducer = (state, action) => {\n  switch (action.type) {\n    case 'ADD_ITEM': return { ...state, items: [...state.items, action.payload] };\n    case 'REMOVE_ITEM': return { ...state, items: state.items.filter(i => i.id !== action.payload) };\n    default: return state;\n  }\n};\n\nconst [state, dispatch] = useReducer(reducer, { items: [] });\n```\n\n## Custom Hooks\n\n```tsx\nfunction useLocalStorage<T>(key: string, initial: T) {\n  const [value, setValue] = useState<T>(() => {\n    const stored = localStorage.getItem(key);\n    return stored ? JSON.parse(stored) : initial;\n  });\n\n  useEffect(() => {\n    localStorage.setItem(key, JSON.stringify(value));\n  }, [key, value]);\n\n  return [value, setValue] as const;\n}\n```\n\n## Challenge\n\nBuild a custom `useFetch` hook with loading, error, and data states.", order: 0, type: "lesson", xpReward: 30 },
            { title: "Server Components & Streaming", description: "Understand React Server Components in Next.js", content: "# Server Components & Streaming\n\n## Server vs Client Components\n\n```tsx\n// Server Component (default in Next.js App Router)\nasync function UserProfile({ id }: { id: string }) {\n  const user = await db.user.findUnique({ where: { id } });\n  return <div>{user.name}</div>;\n}\n\n// Client Component\n'use client';\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;\n}\n```\n\n## Streaming with Suspense\n\n```tsx\n<Suspense fallback={<Skeleton />}>\n  <SlowComponent />\n</Suspense>\n```\n\n## Challenge\n\nConvert a client-heavy page to use server components with Suspense boundaries.", order: 1, type: "exercise", xpReward: 35 },
            { title: "Boss Battle: Build a Dashboard", description: "Build a real-time dashboard with all patterns", content: "# Boss Battle: Real-Time Dashboard\n\nBuild a dashboard that demonstrates mastery of modern React patterns.\n\n## Requirements\n\n1. Use server components for initial data loading\n2. Client components for interactivity\n3. Custom hooks for shared logic\n4. Proper error boundaries and loading states\n5. Performance: memoize expensive computations\n\nSubmit your code and a brief write-up of your architectural decisions.", order: 2, type: "boss-battle", xpReward: 60 },
          ],
        },
      },
    }),
    db.quest.upsert({
      where: { slug: "creative-writing-workshop" },
      update: {},
      create: {
        title: "Creative Writing Workshop: Find Your Voice",
        slug: "creative-writing-workshop",
        description: "Develop your writing skills through structured exercises. Learn storytelling, world-building, character development, and editing techniques.",
        category: "Writing",
        difficulty: "beginner",
        duration: "1 week",
        xpReward: 150,
        published: true,
        creatorId: users[4].id,
        milestones: {
          create: [
            { title: "The Art of Observation", description: "Train your eye for detail and description", content: "# The Art of Observation\n\nGreat writing starts with great observation.\n\n## Exercise 1: Sensory Snapshot\nGo to a public place and write for 10 minutes. Focus on:\n- 3 things you see in vivid detail\n- 2 sounds you hear\n- 1 smell or texture\n\n## Exercise 2: Character Sketch\nObserve a stranger (respectfully) and write a 200-word character sketch. Give them a name, occupation, and a secret.\n\n## Challenge\n\nWrite a 500-word scene set in a place you know well. Make the reader feel like they're there.", order: 0, type: "lesson", xpReward: 25 },
            { title: "Story Structure", description: "Learn the fundamentals of narrative arc", content: "# Story Structure\n\n## The Three-Act Structure\n\n1. **Setup** (25%): Introduce character, world, and the inciting incident\n2. **Confrontation** (50%): Rising action, obstacles, midpoint twist\n3. **Resolution** (25%): Climax, falling action, denouement\n\n## Challenge\n\nOutline a short story using the three-act structure. Then write the first 500 words (Act 1).", order: 1, type: "exercise", xpReward: 30 },
            { title: "Boss Battle: Flash Fiction", description: "Write a complete story in under 1000 words", content: "# Boss Battle: Flash Fiction\n\nWrite a complete short story in under 1000 words.\n\n## Constraints\n- Must have a clear beginning, middle, and end\n- At least one well-developed character\n- A twist or surprise element\n- Show, don't tell — use sensory details\n\n## Bonus Prompts (pick one or create your own)\n- \"The last message was sent at 3:47 AM\"\n- \"They found it buried under the old oak tree\"\n- \"The machine worked exactly as designed. That was the problem.\"\n\nSubmit your story!", order: 2, type: "boss-battle", xpReward: 50 },
          ],
        },
      },
    }),
  ]);

  // Create constellations
  const constellation1 = await db.constellation.upsert({
    where: { id: "seed-constellation-1" },
    update: {},
    create: {
      id: "seed-constellation-1",
      name: "Full-Stack Builders",
      description: "A group of developers building full-stack projects together",
      maxMembers: 5,
      members: {
        create: [
          { userId: users[0].id, role: "creator" },
          { userId: users[2].id, role: "member" },
          { userId: users[3].id, role: "member" },
        ],
      },
    },
  });

  const constellation2 = await db.constellation.upsert({
    where: { id: "seed-constellation-2" },
    update: {},
    create: {
      id: "seed-constellation-2",
      name: "Creative Technologists",
      description: "Where design meets code — exploring the intersection of creativity and technology",
      maxMembers: 5,
      members: {
        create: [
          { userId: users[1].id, role: "creator" },
          { userId: users[4].id, role: "member" },
        ],
      },
    },
  });

  // Create some quest progress
  await db.questProgress.upsert({
    where: { userId_questId: { userId: users[0].id, questId: quests[0].id } },
    update: {},
    create: {
      userId: users[0].id,
      questId: quests[0].id,
      status: "completed",
      completedAt: new Date(),
    },
  });

  // Create credential nodes for completed quests
  await db.credentialNode.upsert({
    where: { userId_questId: { userId: users[0].id, questId: quests[0].id } },
    update: {},
    create: {
      userId: users[0].id,
      questId: quests[0].id,
      score: 92,
    },
  });

  await db.credentialNode.upsert({
    where: { userId_questId: { userId: users[2].id, questId: quests[2].id } },
    update: {},
    create: {
      userId: users[2].id,
      questId: quests[2].id,
      score: 98,
    },
  });

  console.log("Seed complete!");
  console.log(`Created ${users.length} users`);
  console.log(`Created ${quests.length} quests`);
  console.log(`Created 2 constellations`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
