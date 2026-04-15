[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <tag:my@example.org,2026:hasvalue/>

# Has Value {=sh:hasValue .class:Constraint label} Demo

## Demo {=ex:demo ?cat:hasDemo}

### System Status Test Shape {=ex:SystemStatusTestShape .sh:NodeShape ?cat:hasShape label}

Validates all [member] {+member ?sh:targetObjectsOf} entities with **Status must be active** {+ex:#statusRequired ?sh:property}.

**Status must be active** {=ex:#statusRequired .sh:PropertyShape} requires [status] {+ex:status ?sh:path} to be exactly [active] {sh:hasValue}.

---

### Test Data {=ex:data .Container}

#### Valid Server {=ex:MainServer ?member}
Status: [active] {ex:status}

#### Invalid Server {=ex:BackupServer ?member}
Status: [standby] {ex:status}

---

[Demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Server** - passes (status is active)
2. **Invalid Server** - fails (status is standby, not active)

### 🔍 Test Validation

```bash
ig-cli validate ./constraints/hasvalue.demo.md
```

---
