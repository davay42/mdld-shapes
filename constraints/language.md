[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>

# Language In {=sh:languageIn .class:StringConstraint label}

> Constrains string literals to have language tags from a specified list {comment}

<http://www.w3.org/ns/shacl#languageIn> {?cat:fullIRI}

---

## 📋 Quick Start Pattern

~~~~~~md
[ex] <tag:my@example.org,2026:language/>

**Title language must be en or fr** {=ex:#titleLanguage .sh:PropertyShape}
[title] {+ex:title ?sh:path} language tags must be in allowed list.

**Allowed Languages List** {=ex:lang-l1 ?sh:languageIn .rdf:List}: [en] {rdf:first}, then [rest] {=ex:lang-l2 ?rdf:rest} by [fr] {rdf:first} and [nil] {+rdf:nil ?rdf:rest}. {=}

---

### Test Data {=ex:data .Container}

#### English Document {=ex:EnglishDocument ?member}
Title: [Hello World] {ex:title @en}

#### Invalid Document {=ex:GermanDocument ?member}
Title: [Hallo Welt] {ex:title @de}
~~~~~~

---

## 📝 MDLD Syntax Patterns

~~~~~~md
[Property] {+ex:propertyName ?sh:path} language tags must be in allowed list.

**Allowed Languages List** {=ex:lang-l1 ?sh:languageIn .rdf:List}: [en] {rdf:first}, then [rest] {=ex:lang-l2 ?rdf:rest} by [fr] {rdf:first} and [nil] {+rdf:nil ?rdf:rest}. {=}
~~~~~~

**Use for:** Multilingual content, regional compliance, content localization

**Important:**
- Uses RDF list syntax (rdf:first, rdf:rest, rdf:nil)
- Only validates language tags if they exist
- Use @lang syntax for language-tagged literals
- Use valid BCP 47 language codes (en, fr, de, etc.)

---

## 🔧 Implementation Guidelines

**When to use:** Content must be in specific languages

**Best practices:**
- Use valid BCP 47 language codes
- Keep language list short

**Common pitfalls:**
- ❌ Forgetting subject reset {=} after list
- ❌ Reusing list identifiers causing collisions
