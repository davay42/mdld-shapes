[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <tag:my@example.org,2026:disjoint/>

# Disjoint {=sh:disjoint .class:DisjointConstraint label} Demo

## Demo {=ex:demo ?cat:hasDemo}

### Label Test Shape {=ex:DisjointExampleShape .sh:NodeShape ?cat:hasShape label}

Validates all [member] {+member ?sh:targetObjectsOf} entities with **Preferred labels must be different from alternative labels** {+ex:#disjointRule ?sh:property}.

**Preferred labels must be different from alternative labels** {=ex:#disjointRule .sh:PropertyShape} requires [preferred labels] {+ex:prefLabel ?sh:path} to be [disjoint] {+ex:altLabel ?sh:disjoint} with [alternative labels].

---

### Test Data {=ex:data .Container}

#### Valid Case {=ex:USA ?member}
Preferred Label: [USA] {ex:prefLabel}
Alternative Label: [United States] {ex:altLabel}

#### Invalid Case {=ex:Germany ?member}
Preferred Label: [Germany] {ex:prefLabel}
Alternative Label: [Germany] {ex:altLabel}

---

[Demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Case** - passes (labels are different)
2. **Invalid Case** - fails (labels are the same)

### 🔍 Test Validation

```bash
ig-cli validate ./constraints/disjoint.demo.md
```

---
