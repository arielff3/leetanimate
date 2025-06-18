# 🤝 Contributing Guide

Thank you for considering contributing to **Animated LeetCode Algorithms**! 🎉

This document provides guidelines and information on how to contribute effectively to the project.

## 📋 Table of Contents

- [How to Contribute](#-how-to-contribute)
- [Environment Setup](#-environment-setup)
- [Development Process](#-development-process)
- [Code Standards](#-code-standards)
- [Commit Structure](#-commit-structure)
- [Pull Requests](#-pull-requests)
- [Reporting Bugs](#-reporting-bugs)
- [Suggesting Features](#-suggesting-features)
- [Adding Algorithms](#-adding-algorithms)
- [Translation](#-translation)

## 🚀 How to Contribute

### Ways to Contribute

1. **🐛 Report Bugs** - Found an issue? Help us fix it!
2. **💡 Suggest Features** - Have an idea to improve the project?
3. **📝 Improve Documentation** - Clear documentation is essential
4. **🎯 Implement Algorithms** - Add new LeetCode algorithms
5. **🌐 Translate Content** - Help make the project globally accessible
6. **🎨 Improve UI/UX** - Contribute with visual improvements
7. **🧪 Write Tests** - Help maintain code quality

## 🛠️ Environment Setup

### Prerequisites

- Node.js 18+
- npm, yarn or pnpm
- Git

### Local Setup

1. **Fork the repository**
```bash
# Click "Fork" on GitHub
```

2. **Clone your fork**
```bash
git clone https://github.com/YOUR-USERNAME/leetanimate.git
cd leetanimate
```

3. **Add upstream**
```bash
git remote add upstream https://github.com/ariel-ff3/leetanimate.git
```

4. **Install dependencies**
```bash
npm install
```

5. **Run the project**
```bash
npm run dev
```

6. **Verify it's working**
```bash
# Open http://localhost:3000
```

## 🔄 Development Process

### 1. Sync with upstream

```bash
git checkout main
git fetch upstream
git merge upstream/main
```

### 2. Create a branch

```bash
git checkout -b feature/feature-name
# or
git checkout -b fix/bug-name
# or
git checkout -b docs/documentation-name
```

### 3. Make your changes

- Follow code standards
- Test your changes
- Update documentation if necessary

### 4. Commit your changes

```bash
git add .
git commit -m "feat: add binary search algorithm"
```

### 5. Push to your fork

```bash
git push origin feature/feature-name
```

### 6. Open a Pull Request

- Go to GitHub
- Click "New Pull Request"
- Fill out the template

## 📝 Code Standards

### JavaScript/React

- Use **arrow functions** for all components
- Prefer **const** over let/var
- Use **destructuring** when appropriate
- Keep components **small and focused**

```jsx
// ✅ Good
const MyComponent = ({ data, onAction }) => {
  const [state, setState] = useState(false);
  
  const handleClick = () => {
    onAction(data.id);
  };

  return (
    <div onClick={handleClick}>
      {data.name}
    </div>
  );
};

// ❌ Avoid
function MyComponent(props) {
  var isActive = false;
  
  function handleClick() {
    props.onAction(props.data.id);
  }
  
  return <div onClick={handleClick}>{props.data.name}</div>;
}
```

### CSS/Tailwind

- Use **utility classes** from Tailwind
- Keep **responsiveness** in mind
- Use **CSS variables** for themes

```jsx
// ✅ Good
<div className="flex items-center gap-4 p-6 bg-background rounded-lg shadow-sm">

// ❌ Avoid
<div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
```

### File Structure

```
src/app/[locale]/algorithms/algorithm-name/
├── components/
│   ├── AlgorithmDescription/
│   │   └── index.jsx
│   ├── AlgorithmCode/
│   │   ├── index.jsx
│   │   └── constants.js
│   ├── AlgorithmSolution/
│   │   ├── index.jsx
│   │   ├── constants.js
│   │   └── utils/
│   │       └── validations.js
│   └── AlgorithmPreview/
│       └── index.jsx
├── contexts/
│   └── AlgorithmContext/
│       └── index.jsx
└── page.js
```

## 💬 Commit Structure

Use the [Conventional Commits](https://www.conventionalcommits.org/) standard:

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting (doesn't affect code)
- `refactor`: Refactoring
- `test`: Tests
- `chore`: Build/CI tasks

### Examples

```bash
feat: add merge sort algorithm
fix: fix two pointers animation
docs: update README with new algorithms
style: format code with prettier
refactor: move validations to utils
test: add tests for binary search
chore: update dependencies
```

### Scope (optional)

```bash
feat(algorithms): add quick sort
fix(ui): fix dark mode theme
docs(contributing): add testing section
```

## 🔍 Pull Requests

### Template

When opening a PR, use this template:

```markdown
## 📝 Description

Brief description of the changes.

## 🎯 Type of Change

- [ ] 🐛 Bug fix
- [ ] ✨ New feature
- [ ] 📝 Documentation
- [ ] 🎨 UI/UX improvement
- [ ] ♻️ Refactoring
- [ ] 🧪 Tests

## 🧪 How to Test

1. Go to...
2. Click on...
3. Verify that...

## 📋 Checklist

- [ ] Code follows project standards
- [ ] I tested the changes locally
- [ ] I updated documentation (if necessary)
- [ ] I added translations (if necessary)
- [ ] PR has descriptive title
```

### Review

- PRs need at least **1 approval**
- All **checks must pass**
- **Conflicts** must be resolved
- **Feedback** must be addressed

## 🐛 Reporting Bugs

### Before Reporting

1. Check if an [issue](https://github.com/arielff3/leetanimate/issues) already exists
2. Test on the latest version
3. Reproduce the bug consistently

### Bug Report Template

```markdown
## 🐛 Bug Description

Clear description of what's happening.

## 🔄 Steps to Reproduce

1. Go to '...'
2. Click on '...'
3. See error

## ✅ Expected Behavior

What should happen.

## 📱 Environment

- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 91]
- Version: [e.g. 1.0.0]

## 📸 Screenshots

If applicable, add screenshots.
```

## 💡 Suggesting Features

### Feature Request Template

```markdown
## 🚀 Feature Description

Clear description of the proposed feature.

## 🎯 Problem it Solves

What problem does this feature solve?

## 💭 Proposed Solution

How do you imagine this would work?

## 🔄 Alternatives Considered

Other solutions you considered?

## 📋 Checklist

- [ ] Feature aligns with project goals
- [ ] No similar feature exists
- [ ] Benefits the community
```

## 🎯 Adding Algorithms

### Required Structure

1. **Description Component**
   - Problem statement
   - Examples
   - Constraints

2. **Code Component**
   - Implementations (JavaScript/Python)
   - Complexity explanations
   - Syntax highlighting

3. **Solution Component**
   - Animated visualization
   - Interactive controls
   - Performance metrics

4. **Preview Component**
   - Simplified animation
   - Quick demonstration

### Implementation Example

```jsx
// src/app/[locale]/algorithms/binary-search/components/BinarySearchSolution/index.jsx

const BinarySearchSolution = () => {
  const t = useTranslations("binarySearch.solution");
  // ... implementation
};

export default BinarySearchSolution;
```

### Translation

Add translations in `messages/pt.json` and `messages/en.json`:

```json
{
  "binarySearch": {
    "title": "Binary Search",
    "description": "...",
    "solution": {
      "title": "Algorithm Visualization"
    }
  }
}
```

## 🌐 Translation

### Adding New Language

1. **Create translation file**
```bash
# messages/es.json (Spanish)
```

2. **Copy structure from pt.json**
```json
{
  "common": {
    "settings": "Configuración",
    // ...
  }
}
```

3. **Update configuration**
```js
// src/i18n/request.js
export const locales = ['pt', 'en', 'es'];
```

4. **Update middleware**
```js
// src/middleware.js
matcher: ['/', '/(pt|en|es)/:path*']
```

### Improving Translations

- Maintain **consistency** of terms
- Use appropriate **context**
- Test on **different devices**
- Consider **cultural differences**

## ❓ Questions?

- 💬 Open a [Discussion](https://github.com/arielff3/leetanimate/discussions)
- 🐛 Report a [Bug](https://github.com/arielff3/leetanimate/issues/new?template=bug_report.md)
- 💡 Suggest a [Feature](https://github.com/arielff3/leetanimate/issues/new?template=feature_request.md)

## 🙏 Thank You!

Your contribution makes a difference! 🌟

---

**Happy Coding!** 🚀 