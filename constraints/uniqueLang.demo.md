[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <tag:my@example.org,2026:uniqueLang/>

# Unique Languages {=sh:uniqueLang .class:UniqueLanguageConstraint label} Demo

## Demo {=ex:demo ?cat:hasDemo}

### Unique Language Example Shape {=ex:UniqueLangExampleShape .sh:NodeShape ?cat:hasShape label}

Validates all [member] {+member ?sh:targetObjectsOf} entities with **Each language tag must appear only once** {+ex:TitleProperty ?sh:property}.

**Each language tag must appear only once** {=ex:TitleProperty .sh:PropertyShape} requires [title] {+ex:title ?sh:path} values to have [true] {sh:uniqueLang ^^xsd:boolean}.

---

### Test Data {=ex:data .Container}

#### Valid Document {=ex:ValidNode ?member}
Title: [Hello World] {ex:title @en}
Title: [Bonjour Monde] {ex:title @fr}

#### Invalid Document {=ex:InvalidNode ?member}
Title: [Hello World] {ex:title @en}
Title: [Hola Mundo] {ex:title @en}

---

[Demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Document** - passes (unique language tags)
2. **Invalid Document** - fails (duplicate en language tag)

### 🔍 Test Validation

```bash
ig-cli validate ./constraints/uniqueLang.demo.md
```

***
