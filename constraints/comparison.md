[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <mdld:shacl/example/comparison/>
[xsd] <http://www.w3.org/2001/XMLSchema#>

# Comparison Constraints {=sh:lessThan .class:ComparisonConstraint label}

> Validates property values against reference nodes using comparison operators. Essential for ordering, version control, date validation, and business rule enforcement where values must be smaller than or equal to specific reference points. {comment}

<http://www.w3.org/ns/shacl#lessThan> {?cat:fullIRI}
<http://www.w3.org/ns/shacl#lessThanOrEquals> {?cat:fullIRI}
<http://www.w3.org/ns/shacl#equals> {?cat:fullIRI}

---

## 📋 Quick Start Pattern

~~~~~~md
[ex] <mdld:shacl/example/comparison/>

### Shape Definition

**Event must follow business planning rules** {=ex:EventPlanningShape .sh:NodeShape ?cat:hasShape label}

**Order Date Rule** {=ex:#orderDateRule .sh:PropertyShape ?sh:property}
[order date] {+ex:orderDate ?sh:path} must be before [shipping date] {+ex:shippingDate ?sh:lessThan}: **Order must be placed before shipping** {sh:message}.

**Version Rule** {=ex:#versionRule .sh:PropertyShape ?sh:property}
[current version] {+ex:currentVersion ?sh:path} must be ≤ [latest version] {+ex:latestVersion ?sh:lessThanOrEquals}: **Current version must be ≤ latest version** {sh:message}.

---

### Test Data {=ex:data .Container}

#### Valid Event {=ex:ValidEvent .ex:Event ?member}
Order Date: [2024-06-15] {ex:orderDate ^^xsd:date}
Shipping Date: [2024-06-20] {ex:shippingDate ^^xsd:date}
Current Version: [2.1] {ex:currentVersion ^^xsd:string}
Latest Version: [3.0] {ex:latestVersion ^^xsd:string}

#### Invalid Event - Late Order {=ex:LateOrderEvent .ex:Event ?member}
Order Date: [2024-06-25] {ex:orderDate ^^xsd:date}
Shipping Date: [2024-06-20] {ex:shippingDate ^^xsd:date}
Current Version: [2.1] {ex:currentVersion ^^xsd:string}
Latest Version: [3.0] {ex:latestVersion ^^xsd:string}

---

[Demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.
~~~~~~

---

## 📝 MDLD Syntax Patterns

Comparison constraints validate property values against reference nodes using comparison operators.

~~~~~~md
**[Property] must be [Operator] [Reference]** {=ex:PropertyComparisonConstraint .sh:PropertyShape ?sh:property sh:message}

[Property Name] {+ex:propertyName ?sh:path} must be [operator] {sh:lessThan} [Reference Property] {+ex:referenceProperty ?sh:lessThan}.
~~~~~~

**Key components:**
- **Property path** - The property to validate (`{+ex:propertyName ?sh:path}`)
- **Comparison operator** - The comparison constraint (`{sh:lessThan}`, `{sh:lessThanOrEquals}`, `{sh:equals}`)
- **Reference property** - The property to compare against (`{+ex:referenceProperty ?sh:lessThan}`)
- **Validation message** - Human-readable error message (`{sh:message}`)
- **Comparison logic** - Validates ordering and equality relationships

**Important notes:**
- Works with comparable values (dates, numbers, strings)
- Compares values within the same node
- Use `lessThan` for strict ordering
- Use `lessThanOrEquals` for inclusive ordering
- Use `equals` for exact value matching
- Both properties must be present for comparison

---

## 🎯 Use Cases

- **Date validation** - Ensure start date is before end date
- **Version control** - Ensure current version ≤ latest version
- **Pricing validation** - Ensure price matches standard price
- **Business rules** - Enforce ordering constraints
- **Range validation** - Ensure values are within expected ranges

---

## 🔧 Implementation Guidelines

**When to use comparison:**
- **Temporal validation** - When dates must follow chronological order
- **Version control** - Ensure version numbers are valid
- **Pricing rules** - Enforce pricing policies
- **Business logic** - Implement ordering constraints
- **Range validation** - Ensure values are within bounds

**Best practices:**
- Use appropriate comparison operator for the use case
- Ensure both properties have compatible datatypes
- Test with boundary values
- Combine with other constraints for complete validation
- Document the business rule being enforced

**Common pitfalls:**
- ❌ Comparing incompatible datatypes (e.g., string vs number)
- ❌ Forgetting that both properties must be present
- ❌ Using wrong comparison operator for the use case
- ❌ Not testing boundary values
- ❌ Confusing comparison with other constraints
