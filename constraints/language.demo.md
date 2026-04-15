[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <tag:my@example.org,2026:language/>

# Language {=sh:languageIn .class:StringConstraint label} Demo

## Demo {=ex:demo ?cat:hasDemo}

### Multilingual Document Shape {=ex:MultilingualDocumentShape .sh:NodeShape ?cat:hasShape label}

Validates all [member] {+member ?sh:targetObjectsOf} entities with **Title language must be en or fr** {+ex:#titleLanguage ?sh:property}.

**Title language must be en or fr** {=ex:#titleLanguage .sh:PropertyShape} requires [title] {+ex:title ?sh:path} language tags to be in allowed list.

**Allowed Languages List** {=ex:lang-l1 ?sh:languageIn .rdf:List}: [en] {rdf:first}, then [rest] {=ex:lang-l2 ?rdf:rest} by [fr] {rdf:first} and [nil] {+rdf:nil ?rdf:rest}. {=}

---

### Test Data {=ex:data .Container}

#### English Document {=ex:EnglishDocument ?member}
Title: [Hello World] {ex:title @en}

#### Invalid Document {=ex:GermanDocument ?member}
Title: [Hallo Welt] {ex:title @de}

---

[Demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **English Document** - passes (title language is en)
2. **Invalid Document** - fails (title language is de, not allowed)

### 🔍 Test Validation

```bash
ig-cli validate ./constraints/language.demo.md
```
