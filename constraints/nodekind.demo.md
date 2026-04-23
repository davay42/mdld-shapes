[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[class] <cat:class/>
[ex] <tag:my@example.org,2026:nodekind/>

# Node Kind Demo {=ex:demo}

## Document Test Shape {=ex:DocumentTestShape .sh:NodeShape ?cat:hasShape label}

Validates [Valid Document] {+ex:ValidDocument ?sh:targetNode} and [Invalid Document] {+ex:InvalidDocument ?sh:targetNode} with literal **content** {+ex:#contentLiteral ?sh:property sh:name} and IRI for **reference** {+ex:#referenceIRI ?sh:property sh:name}.

**Content must be literal** {=ex:#contentLiteral .sh:PropertyShape sh:message} requires [content] {+ex:content ?sh:path} to be a [Literal] {+sh:Literal ?sh:nodeKind}.

**Reference must be IRI** {=ex:#referenceIRI .sh:PropertyShape sh:message} requires [reference] {+ex:reference ?sh:path} to be an [IRI] {+sh:IRI ?sh:nodeKind}.

---

## 📋 Test Data {=ex:data .Container}

### Valid Document {=ex:ValidDocument ?member}
Content: [text] {ex:content}
Reference: <https://example.org> {?ex:reference}

### Invalid Document {=ex:InvalidDocument ?member}
Content: <https://example.org> {?ex:content}
Reference: [text] {ex:reference}

---

[Demo] {=ex:demo} must produce exactly **2** {cat:expectsViolations ^^xsd:integer} violation.

## Expected Validation Results

1. **Valid Document** - passes (content is literal, reference is IRI)
2. **Invalid Document** - fails 2 times (content is IRI not literal, reference is text not IRI)

### 🔍 Test Validation

```bash
ig-cli validate ./constraints/nodekind.demo.md
```
