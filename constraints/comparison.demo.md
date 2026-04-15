[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <tag:my@example.org,2026:comparison/>

# Comparison {=sh:lessThan .class:ComparisonConstraint label}

## Demo {=ex:demo ?cat:hasDemo}

### Order Test Shape {=ex:OrderTestShape .sh:NodeShape ?cat:hasShape label}

Validates all [member] {+member ?sh:targetObjectsOf} entities with **Order date must be before shipping date** {+ex:#orderDateRule ?sh:property}.

**Order date must be before shipping date** {=ex:#orderDateRule .sh:PropertyShape} requires [order date] {+ex:orderDate ?sh:path} to be before [shipping date] {+ex:shippingDate ?sh:lessThan}.

---

### Test Data {=ex:data .Container}

#### Valid Order {=ex:ValidOrder ?member}
Order Date: [2024-06-15] {ex:orderDate ^^xsd:date}
Shipping Date: [2024-06-20] {ex:shippingDate ^^xsd:date}

#### Invalid Order {=ex:InvalidOrder ?member}
Order Date: [2024-06-25] {ex:orderDate ^^xsd:date}
Shipping Date: [2024-06-20] {ex:shippingDate ^^xsd:date}

---

[Demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Order** - passes (order date is before shipping date)
2. **Invalid Order** - fails (order date is after shipping date)

### 🔍 Test Validation

```bash
ig-cli validate ./constraints/comparison.demo.md
```

---
