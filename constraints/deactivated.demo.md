[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <tag:my@example.org,2026:deactivated/>

# Deactivated {=sh:deactivated .class:DeactivatedConstraint label} Demo

## Demo {=ex:demo ?cat:hasDemo}

### Deactivated Example Shape {=ex:DeactivatedExampleShape .sh:NodeShape ?cat:hasShape label}

Validates all [member] {+member ?sh:targetObjectsOf} entities with **User status must be active** {+ex:ActiveProperty ?sh:property}.

**User status must be active** {=ex:ActiveProperty .sh:PropertyShape} requires [status] {+ex:status ?sh:path} to be [active] {sh:hasValue}.

**Category rule** {=ex:DeactivatedProperty .sh:PropertyShape} is [deactivated] {sh:deactivated}.

---

### Test Data {=ex:data .Container}

#### Valid Account {=ex:ValidNode ?member}
Status: [active] {ex:status}

#### Invalid Account {=ex:InvalidNode ?member}
Status: [inactive] {ex:status}

---

[Demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Account** - passes (status is active)
2. **Invalid Account** - fails (status is inactive)

### 🔍 Test Validation

```bash
ig-cli validate ./constraints/deactivated.demo.md
```

---
