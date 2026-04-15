[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <tag:my@example.org,2026:js/>

# JavaScript Function {=sh:js .class:Constraint label} Demo

## Demo {=ex:demo ?cat:hasDemo}

### Date Validation Shape {=ex:DateValidationShape .sh:NodeShape ?cat:hasShape label}

Validates all [member] {+member ?sh:targetObjectsOf} entities with **Event date must be valid** {+ex:DatePropertyShape ?sh:property}.

**Event date must be valid** {=ex:DatePropertyShape .sh:PropertyShape} requires [eventDate] {+ex:eventDate ?sh:path} to be a valid JS date.

~~~~~~js {=ex:DateJSConstraint ?sh:JSConstraint sh:js}
const date = new Date(value);
return !isNaN(date.getTime());
~~~~~~

---

### Test Data {=ex:data .Container}

#### Valid Event {=ex:ValidEvent ?member}
Event Date: [2024-12-25] {ex:eventDate ^^xsd:date}

#### Invalid Event {=ex:InvalidEvent ?member}
Event Date: [not-a-date] {ex:eventDate}

---

[Demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Event** - passes (valid date string)
2. **Invalid Event** - fails (not a valid date)

### 🔍 Test Validation

```bash
ig-cli validate ./constraints/js.demo.md
```

---
