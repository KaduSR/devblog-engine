import React, { useState } from "react"
import "./styles.css"

interface Post { id: number; title: string; excerpt: string; date: string; tags: string[]; content: string }

const POSTS: Post[] = [
  { id: 1, title: "Como arquitetar uma API REST do zero", date: "2026-06-15", tags: ["API", "Backend", "Arquitetura"], excerpt: "Principios de design, versionamento, paginacao e tratamento de erros.", content: "Conteudo completo sobre arquitetura de APIs REST..." },
  { id: 2, title: "TypeScript 5.6: O que mudou?", date: "2026-06-10", tags: ["TypeScript", "Frontend"], excerpt: "Novos recursos, melhorias de performance e breaking changes.", content: "..." },
  { id: 3, title: "Design System na pratica", date: "2026-06-05", tags: ["Design", "UX/UI"], excerpt: "Como criar e manter um Design System que escala.", content: "..." },
  { id: 4, title: "React Server Components vs Client", date: "2026-05-28", tags: ["React", "Frontend"], excerpt: "Entenda quando usar cada estrategia de renderizacao.", content: "..." },
  { id: 5, title: "Automatizando deploy com Docker", date: "2026-05-20", tags: ["DevOps", "Docker"], excerpt: "Pipeline de CI/CD completo com Docker e GitHub Actions.", content: "..." },
  { id: 6, title: "O que e SOLID na pratica", date: "2026-05-12", tags: ["Backend", "Arquitetura"], excerpt: "Cada principio explicado com exemplos reais de codigo.", content: "..." },
  { id: 7, title: "Performance Web: Core Web Vitals", date: "2026-05-05", tags: ["Frontend", "Performance"], excerpt: "Otimizacao de LCP, FID e CLS para melhorar o Lighthouse.", content: "..." },
  { id: 8, title: "Testes automatizados com Vitest", date: "2026-04-28", tags: ["Testing", "Frontend"], excerpt: "Guia pratico de TDD com Vitest e Testing Library.", content: "..." },
]

export default function App() {
  const [query, setQuery] = useState(""); const [tag, setTag] = useState("")
  const [selected, setSelected] = useState<Post | null>(null)

  const allTags = [...new Set(POSTS.flatMap(p => p.tags))]
  const filtered = POSTS.filter(p => (!query || p.title.toLowerCase().includes(query.toLowerCase()) || p.excerpt.toLowerCase().includes(query.toLowerCase())) && (!tag || p.tags.includes(tag)))

  if (selected) return React.createElement("div", { className: "app" },
    React.createElement("header", { className: "header" },
      React.createElement("div", { className: "container header-inner" },
        React.createElement("h1", null, "📝 DevBlog"),
        React.createElement("button", { className: "back-btn", onClick: () => setSelected(null) }, "< Voltar")
      )
    ),
    React.createElement("main", { className: "container post-full" },
      React.createElement("h2", null, selected.title),
      React.createElement("div", { className: "post-meta" },
        React.createElement("span", null, selected.date),
        selected.tags.map(t => React.createElement("span", { key: t, className: "tag-sm" }, t))
      ),
      React.createElement("p", { className: "post-body" }, selected.content, " ", selected.content, " Este e um post de demonstracao. Em producao, o conteudo viria de um CMS ou arquivo MDX.")
    )
  )

  return React.createElement("div", { className: "app" },
    React.createElement("header", { className: "header" },
      React.createElement("div", { className: "container header-inner" },
        React.createElement("h1", null, "📝 DevBlog"),
        React.createElement("div", { className: "search-box" },
          React.createElement("i", { className: "fa-solid fa-search" }),
          React.createElement("input", { placeholder: "Buscar artigos...", value: query, onChange: (e: any) => setQuery(e.target.value) })
        )
      )
    ),
    React.createElement("div", { className: "container tags-bar" },
      React.createElement("button", { className: `tag-btn ${!tag ? "active" : ""}`, onClick: () => setTag("") }, "Todas"),
      allTags.map(t => React.createElement("button", { key: t, className: `tag-btn ${tag === t ? "active" : ""}`, onClick: () => setTag(t) }, t))
    ),
    React.createElement("main", { className: "container" },
      React.createElement("div", { className: "blog-grid" },
        filtered.map(p => React.createElement("article", { key: p.id, className: "post-card", onClick: () => setSelected(p) },
          React.createElement("div", { className: "post-date" }, new Date(p.date).toLocaleDateString("pt-BR")),
          React.createElement("h3", null, p.title),
          React.createElement("p", null, p.excerpt),
          React.createElement("div", { className: "post-tags" }, p.tags.map(t => React.createElement("span", { key: t, className: "tag-sm" }, t)))
        ))
      ),
      filtered.length === 0 && React.createElement("p", { className: "no-results" }, "Nenhum artigo encontrado.")
    )
  )
}
