# 🎯 Algoritmos LeetCode Animados

Uma aplicação web interativa e educativa para visualizar algoritmos do LeetCode através de animações dinâmicas. Perfeita para estudantes e desenvolvedores que querem entender algoritmos de forma visual e intuitiva.

## ✨ Funcionalidades

### 🎨 Interface Moderna
- **Dark/Light Mode**: Botão flutuante para alternar entre temas
- **Design Responsivo**: Interface adaptável para diferentes dispositivos
- **Animações Suaves**: Transições fluidas com Framer Motion
- **Syntax Highlighting**: Código destacado com Prism.js

### 🧮 Algoritmo Two Sum
- **Dois Métodos de Solução**:
  - **Hash Map**: O(n) tempo, O(n) espaço
  - **Two Pointers**: O(n log n) tempo, O(1) espaço
- **Visualização Interativa**: Animações passo a passo
- **Controles Completos**: Play/Pause, Step-by-step, Reset
- **Velocidade Configurável**: Lenta, Normal, Rápida
- **Exemplos Personalizáveis**: Entrada customizada e exemplos pré-definidos

### 📚 Conteúdo Educativo
- **Descrição Detalhada**: Enunciado completo com exemplos
- **Código Fonte**: Implementações em JavaScript e Python
- **Explicações Técnicas**: Análise de complexidade e passos do algoritmo
- **Comparação de Métodos**: Trade-offs entre diferentes abordagens

## 🚀 Tecnologias

- **[Next.js 15](https://nextjs.org/)** - Framework React com App Router
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling utilitário
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes UI modernos
- **[Framer Motion](https://www.framer.com/motion/)** - Animações fluidas
- **[React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)** - Destacar código
- **[Lucide React](https://lucide.dev/)** - Ícones elegantes

## 📦 Instalação

1. **Clone o repositório**:
```bash
git clone https://github.com/seu-usuario/algorithms-animations.git
cd algorithms-animations
```

2. **Instale as dependências**:
```bash
npm install
```

3. **Execute o servidor de desenvolvimento**:
```bash
npm run dev
```

4. **Abra no navegador**:
```
http://localhost:3000
```

## 🎯 Como Usar

### 1. Navegação
- Acesse a página inicial para ver a lista de algoritmos disponíveis
- Clique em "Two Sum" para explorar o algoritmo

### 2. Seleção de Método
- Use o seletor no canto superior direito para escolher entre:
  - **Hash Map**: Solução mais eficiente em tempo
  - **Two Pointers**: Solução mais eficiente em espaço

### 3. Abas de Conteúdo
- **Description**: Enunciado do problema com exemplos
- **Code**: Implementações com syntax highlighting
- **Solution**: Visualização animada interativa

### 4. Controles de Animação
- **▶️ Executar**: Inicia a animação automática
- **⏸️ Pausar**: Pausa a animação atual
- **⏭️ Próximo Passo**: Avança um passo manualmente
- **🔄 Resetar**: Reinicia a animação
- **⚙️ Velocidade**: Configura velocidade da animação
- **✏️ Personalizar**: Define exemplos customizados

### 5. Dark Mode
- Clique no botão flutuante no canto inferior direito para alternar o tema

## 🏗️ Estrutura do Projeto

```
src/
├── app/
│   ├── algorithms/
│   │   └── two-sum/
│   │       └── page.js          # Página do algoritmo Two Sum
│   ├── globals.css              # Estilos globais
│   ├── layout.js               # Layout principal
│   └── page.js                 # Página inicial
├── components/
│   ├── algorithms/
│   │   └── two-sum/
│   │       ├── TwoSumCode.jsx       # Componente de código
│   │       ├── TwoSumDescription.jsx # Descrição do problema
│   │       ├── TwoSumPreview.jsx    # Prévia da animação
│   │       └── TwoSumSolution.jsx   # Visualização completa
│   └── ui/                     # Componentes shadcn/ui
├── contexts/
│   └── AlgorithmContext.jsx    # Contexto para método selecionado
└── lib/
    └── utils.js               # Utilitários
```

## 🎨 Personalização

### Adicionando Novos Algoritmos

1. **Crie a estrutura de diretórios**:
```bash
mkdir -p src/app/algorithms/nome-algoritmo
mkdir -p src/components/algorithms/nome-algoritmo
```

2. **Implemente os componentes**:
- `page.js` - Página principal do algoritmo
- `Description.jsx` - Descrição do problema
- `Code.jsx` - Implementações de código
- `Solution.jsx` - Visualização animada

3. **Atualize a página inicial** para incluir o novo algoritmo

### Modificando Temas

Edite as variáveis CSS em `src/app/globals.css`:
- `:root` - Tema claro
- `.dark` - Tema escuro

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. **Fork** o projeto
2. **Crie** uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. **Commit** suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. **Push** para a branch (`git push origin feature/nova-feature`)
5. **Abra** um Pull Request

### Diretrizes de Contribuição

- Mantenha o código limpo e bem documentado
- Siga os padrões de estilo existentes
- Teste suas mudanças antes de submeter
- Atualize a documentação quando necessário

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🎯 Roadmap

- [ ] **Algoritmo Three Sum**
- [ ] **Algoritmo Binary Search**
- [ ] **Algoritmo Merge Sort**
- [ ] **Algoritmo Quick Sort**
- [ ] **Estruturas de Dados**: Linked Lists, Trees, Graphs
- [ ] **Testes Automatizados**
- [ ] **Deploy Automático**
- [ ] **Modo Offline**

## 🙏 Agradecimentos

- [LeetCode](https://leetcode.com/) - Pela inspiração dos problemas
- [Vercel](https://vercel.com/) - Plataforma de deploy
- [shadcn/ui](https://ui.shadcn.com/) - Componentes UI
- Comunidade open source por todas as ferramentas incríveis

---

⭐ **Se este projeto te ajudou, considere dar uma estrela!**

📧 **Dúvidas?** Abra uma [issue](https://github.com/seu-usuario/algorithms-animations/issues) ou entre em contato!
