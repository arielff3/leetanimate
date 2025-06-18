# 🚧 In development

# 🎯 Animated LeetCode Algorithms

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-pink?style=for-the-badge&logo=framer)

**Visualize and learn LeetCode algorithms through interactive educational animations**

[🌐 Live](https://leetanimate.com) • [📖 Documentation](./docs) • [🐛 Report Bug](https://github.com/arielff3/leetanimate/issues) • [💡 Request Feature](https://github.com/arielff3/leetanimate/issues)

</div>

## ✨ Features

- 🎬 **Interactive Animations**: Visualize algorithms step by step with smooth animations
- 🌐 **Multilingual**: Complete support for Portuguese and English
- 🎨 **Modern Interface**: Responsive design with light/dark theme
- 📱 **Mobile-First**: Optimized for all devices
- ⚡ **Performance**: Built with Next.js 15 and React 19
- 🎯 **Educational**: Detailed explanations of complexity and implementation
- 🔧 **Customizable**: Personalize your learning experience with custom inputs

## 🚀 Available Algorithms

### Arrays
- ✅ **Two Sum** - Hash Map and Two Pointers
- 🔄 **Three Sum** _(in development)_
- 🔄 **Container With Most Water** _(planned)_

### Trees
- 🔄 **Binary Tree Traversal** _(planned)_
- 🔄 **Maximum Depth** _(planned)_

### Graphs
- 🔄 **DFS/BFS** _(planned)_
- 🔄 **Shortest Path** _(planned)_

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn or pnpm

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone https://github.com/arielff3/leetanimate.git
cd leetanimate
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the project**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open in browser**
```
http://localhost:3000
```

## 🏗️ Project Structure

```
leetanimate/
├── src/
│   ├── app/                    # App Router (Next.js 14)
│   │   ├── [locale]/          # Internationalized routes
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable components
│   │   └── ui/               # Base components (shadcn/ui)
│   ├── contexts/             # Context providers
│   ├── lib/                  # Utilities and validations
│   └── i18n/                 # Internationalization config
├── messages/                 # Translation files
│   ├── en.json              # English
│   └── pt.json              # Portuguese
├── public/                  # Static assets
└── docs/                    # Documentation
```

## 🎨 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Frontend**: React 19
- **Styling**: Tailwind CSS, shadcn/ui
- **Animations**: Framer Motion
- **Internationalization**: next-intl
- **Validation**: Zod
- **Syntax Highlighting**: Prism.js
- **Icons**: Lucide React

## 🌐 Internationalization

The project supports multiple languages through `next-intl`:

- 🇧🇷 Portuguese (default)
- 🇺🇸 English

### Adding a new language

1. Create a translation file in `messages/[locale].json`
2. Add the locale in `src/i18n/request.js`
3. Update the middleware in `src/middleware.js`

## 🤝 Contributing

Contributions are very welcome! See our [Contributing Guide](CONTRIBUTING.md) to get started.

### Ways to Contribute

- 🐛 Report bugs
- 💡 Suggest new features
- 📝 Improve documentation
- 🎯 Implement new algorithms
- 🌐 Add translations
- 🎨 Improve UI/UX

### Local Development

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Ariel Franco** - *Lead Developer* - [@arielff3](https://github.com/arielff3)

See also the list of [contributors](https://github.com/arielff3/leetanimate/contributors) who participated in this project.

## 🙏 Acknowledgments

- [LeetCode](https://leetcode.com/) for the problem inspiration
- [shadcn/ui](https://ui.shadcn.com/) for the base components
- [Framer Motion](https://www.framer.com/motion/) for the animations
- [Lucide](https://lucide.dev/) for the icons
- Open source community for the support

## 📊 Project Status

![GitHub issues](https://img.shields.io/github/issues/arielff3/leetanimate)
![GitHub pull requests](https://img.shields.io/github/issues-pr/arielff3/leetanimate)
![GitHub stars](https://img.shields.io/github/stars/arielff3/leetanimate)
![GitHub forks](https://img.shields.io/github/forks/arielff3/leetanimate)

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [shadcn/ui](https://ui.shadcn.com/)

---

<div align="center">

**⭐ If this project helped you, consider giving it a star!**

Made with ❤️ and ☕ by [Ariel Franco](https://github.com/arielff3)

</div>
