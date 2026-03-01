# Arquitetura: {{projectName}}

**Data:** {{date}}
**Autor:** @architect
**Stack:** {{backend}} + {{frontend}} + {{database}}

---

## 1. Visão Geral

> *Descrição de alto nível do sistema — o que ele faz e como está estruturado*

[Descreva o sistema]

### Diagrama de Componentes

```
┌─────────────────────────────────────────────────────┐
│                    Usuário                          │
└──────────────────────┬──────────────────────────────┘
                       │ HTTP/HTTPS
┌──────────────────────▼──────────────────────────────┐
│                  Frontend                           │
│            [{{frontend}}]                           │
└──────────────────────┬──────────────────────────────┘
                       │ REST API / GraphQL
┌──────────────────────▼──────────────────────────────┐
│                   Backend                           │
│             [{{backend}}]                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐   │
│  │  Auth    │  │  API     │  │  Business Logic  │   │
│  └──────────┘  └──────────┘  └──────────────────┘   │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│                  Database                           │
│              [{{database}}]                         │
└─────────────────────────────────────────────────────┘
```

---

## 2. Stack Tecnológico

| Camada | Tecnologia | Versão | Justificativa |
|--------|-----------|--------|---------------|
| Frontend | {{frontend}} | [versão] | [motivo] |
| Backend | {{backend}} | [versão] | [motivo] |
| Banco de Dados | {{database}} | [versão] | [motivo] |
| Autenticação | [JWT / OAuth / Session] | — | [motivo] |
| Deploy | [ex: Docker, Kubernetes, Railway] | — | [motivo] |

---

## 3. Padrões e Convenções

### API
- **Estilo:** [REST / GraphQL / gRPC]
- **Versionamento:** [ex: /api/v1/]
- **Autenticação:** [ex: Bearer JWT no header Authorization]
- **Formato de resposta:** [ex: JSON com envelope {data, error, meta}]

### Código
- **Idioma:** [Português / Inglês] para nomes de variáveis e comentários
- **Estrutura de pacotes/módulos:** [descreva a convenção]
- **Testes:** [unitário / integração / e2e — ferramentas]

### Tratamento de Erros
```
{
  "error": {
    "code": "RECURSO_NAO_ENCONTRADO",
    "message": "O recurso solicitado não existe",
    "details": {}
  }
}
```

---

## 4. Decisões Técnicas

> Referências para os ADRs em `docs/decisions/`

| ADR | Decisão |
|-----|---------|
| [ADR-01](decisions/ADR-01-titulo.md) | [título da decisão] |

---

## 5. Segurança

- **Autenticação:** [mecanismo]
- **Autorização:** [modelo — RBAC, ABAC, etc.]
- **Dados sensíveis:** [como são tratados — hashing, criptografia]
- **CORS:** [configuração]
- **Rate limiting:** [se aplicável]

---

## 6. Deploy e Infraestrutura

### Ambientes
| Ambiente | URL | Deploy |
|----------|-----|--------|
| Development | localhost | manual |
| Staging | [URL] | [CI/CD] |
| Production | [URL] | [CI/CD] |

### CI/CD
[Descreva o pipeline — GitHub Actions, etc.]

---

## 7. Histórico de Mudanças

| Data | Mudança | Autor |
|------|---------|-------|
| {{date}} | Versão inicial | @architect |

---

*Gerado pelo AIOS Lite v{{version}}*
