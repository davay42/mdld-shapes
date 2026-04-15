[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <tag:my@example.org,2026:node/>

# Node {=sh:node .class:NodeConstraint label} Demo

## Demo {=ex:demo ?cat:hasDemo}

### Employee Validation Shape {=ex:EmployeeValidationShape .sh:NodeShape ?cat:hasShape label}

Validates all [member] {+member ?sh:targetObjectsOf} entities with **Employee must have valid address** {+ex:#addressRule ?sh:property}.

**Employee must have valid address** {=ex:#addressRule .sh:PropertyShape} requires [address] {+ex:address ?sh:path} to conform to [Address Shape] {+ex:AddressShape ?sh:node}.

**Address Shape** {=ex:AddressShape .sh:NodeShape} requires [street] {+ex:street ?sh:path} to have at least [5] {sh:minLength ^^xsd:integer} characters.

---

### Test Data {=ex:data .Container}

#### Valid Employee {=ex:ValidEmployee ?member}
Address: [Valid Address] {=ex:ValidAddress .ex:Address ?ex:address}
Street: [Main Street] {ex:street}

#### Invalid Employee {=ex:InvalidEmployee ?member}
Address: [Short Address] {=ex:ShortAddress .ex:Address ?ex:address}
Street: [St] {ex:street}

---

[Demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Employee** - passes (address conforms to AddressShape)
2. **Invalid Employee** - fails (address doesn't conform to AddressShape)

### 🔍 Test Validation

```bash
ig-cli validate ./constraints/node.demo.md
```

---
