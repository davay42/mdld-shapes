[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <tag:my@example.org,2026:pattern/>

# Pattern {=sh:pattern .class:PatternConstraint label} Demo

## Demo {=ex:demo ?cat:hasDemo}

### Email Validation Shape {=ex:PatternExampleShape .sh:NodeShape ?cat:hasShape label}

Validates all [member] {+member ?sh:targetObjectsOf} entities with **Email must end with example.com** {+ex:EmailPatternConstraint ?sh:property}.

**Email must end with example.com** {=ex:EmailPatternConstraint .sh:PropertyShape} requires [email] {+ex:email ?sh:path} to match [example\.com$] {sh:pattern} with [i] {sh:flags}.

---

### Test Data {=ex:data .Container}

#### Valid Email {=ex:ValidEmail ?member}
Email: [user@example.com] {ex:email}

#### Invalid Email {=ex:InvalidEmail ?member}
Email: [user@example.org] {ex:email}

---

[Demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Email** - passes (matches pattern)
2. **Invalid Email** - fails (doesn't match pattern)

### 🔍 Test Validation

```bash
ig-cli validate ./constraints/pattern.demo.md
```

---
