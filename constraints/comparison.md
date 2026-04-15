[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>

# Comparison Constraints {=sh:lessThan .class:ComparisonConstraint label}

> Validates property values against reference nodes using comparison operators {comment}

<http://www.w3.org/ns/shacl#lessThan> {?cat:fullIRI}
<http://www.w3.org/ns/shacl#lessThanOrEquals> {?cat:fullIRI}
<http://www.w3.org/ns/shacl#equals> {?cat:fullIRI}

---

## 📋 Quick Start Pattern

~~~~~~md
[ex] <tag:my@example.org,2026:comparison/>

**Order date must be before shipping date** {=ex:#orderDateRule .sh:PropertyShape}
[order date] {+ex:orderDate ?sh:path} must be before [shipping date] {+ex:shippingDate ?sh:lessThan}.

---

### Test Data {=ex:data .Container}

#### Valid Order {=ex:ValidOrder ?member}
Order Date: [2024-06-15] {ex:orderDate ^^xsd:date}
Shipping Date: [2024-06-20] {ex:shippingDate ^^xsd:date}

#### Invalid Order {=ex:InvalidOrder ?member}
Order Date: [2024-06-25] {ex:orderDate ^^xsd:date}
Shipping Date: [2024-06-20] {ex:shippingDate ^^xsd:date}
~~~~~~

---

## 📝 MDLD Syntax Patterns

~~~~~~md
[Property] {+ex:propertyName ?sh:path} must be [operator] {sh:lessThan} [Reference] {+ex:reference ?sh:lessThan}.
~~~~~~

**Use for:** Date validation, version control, business rules, ordering constraints

**Important:**
- Works with comparable values (dates, numbers, strings)
- Compares values within the same node
- Use lessThan for strict ordering, lessThanOrEquals for inclusive, equals for exact matching
- Both properties must be present

---

## 🔧 Implementation Guidelines

**When to use:** Enforce ordering constraints between properties

**Best practices:**
- Ensure compatible datatypes
- Test with boundary values

**Common pitfalls:**
- ❌ Comparing incompatible datatypes
- ❌ Forgetting both properties must be present
- ❌ Using wrong comparison operator
