[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <tag:my@example.org,2026:in/>

# Value Enumeration {=sh:in .class:PresenceConstraint label} Demo

## Demo {=ex:demo ?cat:hasDemo}

### Status Validation Shape {=ex:StatusValidationShape .sh:NodeShape ?cat:hasShape label}

Validates all [member] {+member ?sh:targetObjectsOf} entities with **Status must be Active or Inactive** {+ex:#allowedStatus ?sh:property}.

**Status must be Active or Inactive** {=ex:#allowedStatus .sh:PropertyShape} requires [status] {+ex:status ?sh:path} to be in allowed list.

**Allowed Values List** {=ex:in-l1 ?sh:in .rdf:List}: [Active] {+ex:Active ?rdf:first}, then [rest] {=ex:in-l2 ?rdf:rest} by [Inactive] {+ex:Inactive ?rdf:first} and [nil] {+rdf:nil ?rdf:rest}. {=}

---

### Test Data {=ex:data .Container}

#### Valid Employee {=ex:ValidEmployee ?member}
Status: [Active] {+ex:Active ?ex:status}

#### Invalid Employee {=ex:InvalidStatusEmployee ?member}
Status: [Pending] {+ex:Pending ?ex:status}

---

[Demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Employee** - passes (status is Active)
2. **Invalid Employee** - fails (status is Pending, not allowed)

### 🔍 Test Validation

```bash
ig-cli validate ./constraints/in.demo.md
```

---
