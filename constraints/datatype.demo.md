[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[class] <cat:class/>
[ex] <tag:my@example.org,2026:datatype/>

# Data Type {=sh:datatype .class:Constraint label}

## Demo {=ex:demo ?cat:hasDemo}

### Product Test Shape {=ex:ProductTestShape .sh:NodeShape ?cat:hasShape label}

Validates [Valid Product] {+ex:ValidProduct ?sh:targetNode} and [Invalid Product] {+ex:InvalidProduct ?sh:targetNode} with **Price must be decimal** {+ex:#priceDecimal ?sh:property}.

**Price must be decimal** {=ex:#priceDecimal .sh:PropertyShape} requires the [price] {+ex:price ?sh:path} property to be a [decimal] {+xsd:decimal ?sh:datatype} value.

---

### 📋 Test Data {=ex:data .Container}

#### Valid Product {=ex:ValidProduct ?member}
Price: [29.99] {ex:price ^^xsd:decimal}

#### Invalid Product {=ex:InvalidProduct ?member}
Price: [29.99] {ex:price ^^xsd:string}

---

[Demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Product** - passes (price is decimal)
2. **Invalid Product** - fails (price is string, not decimal)

### 🔍 Test Validation

```bash
ig-cli validate ./constraints/datatype.demo.md
```

---
