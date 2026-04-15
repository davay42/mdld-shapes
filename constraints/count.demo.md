[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[class] <cat:class/>
[ex] <tag:my@example.org,2026:count/>

# Count {=sh:minCount .class:Constraint label}

## Demo {=ex:demo ?cat:hasDemo}

### Person Test Shape {=ex:PersonTestShape .sh:NodeShape ?cat:hasShape label}

Validates all [member] {+member ?sh:targetObjectsOf} entities with **Email must be exactly one** {+ex:#emailExact ?sh:property}.

**Email must be exactly one** {=ex:#emailExact .sh:PropertyShape} requires [email] {+ex:email ?sh:path} to have exactly [1] {sh:minCount sh:maxCount ^^xsd:integer} value.

---

### Test Data {=ex:data .Container}

#### Valid Person {=ex:ValidPerson ?member}
Email: [work@example.com] {ex:email}

#### Invalid Person {=ex:InvalidPerson ?member}
Email: [work@example.com] {ex:email}
Email: [personal@example.com] {ex:email}

---

[Demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Person** - passes (exactly one email)
2. **Invalid Person** - fails (two emails instead of one)

### 🔍 Test Validation

```bash
ig-cli validate ./constraints/count.demo.md
```
