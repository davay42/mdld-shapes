[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[class] <cat:class/>
[ex] <cat:example/count/>
[xsd] <http://www.w3.org/2001/XMLSchema#>

# Min Count {=sh:minCount .class:Constraint label}

> Specifies the minimum number of values a property must have {comment}

<http://www.w3.org/ns/shacl#minCount> {?cat:fullIRI}

# Max Count {=sh:maxCount .class:Constraint label}

> Specifies the maximum number of values a property can have {comment}

<http://www.w3.org/ns/shacl#maxCount> {?cat:fullIRI}

---

## 📋 Quick Start Pattern

~~~~~~md
[ex] <cat:example/count/>

### Shape Definition

**Person must have exactly one email address** {=ex:#emailExact .sh:PropertyShape sh:message}
[email] {+ex:email ?sh:path} must have exactly [1] {sh:minCount sh:maxCount ^^xsd:integer} value.

**Person can have at most two phone numbers** {=ex:#phoneOptional .sh:PropertyShape sh:message}
[phone] {+ex:phone ?sh:path} can have at most [2] {sh:maxCount ^^xsd:integer} values.

---

### Test Data {=ex:data .Container}

#### Valid Person {=ex:ValidPerson ?member}
Email: [work@example.com] {ex:email}
Phone: [555-1234] {ex:phone}
Phone: [555-5678] {ex:phone}

#### Invalid Person - Too Few {=ex:InvalidPersonFew ?member}
Phone: [555-1234] {ex:phone}

#### Invalid Person - Too Many {=ex:InvalidPersonMany ?member}
Email: [work@example.com] {ex:email}
Email: [personal@example.com] {ex:email}
Phone: [555-1234] {ex:phone}
Phone: [555-5678] {ex:phone}
Phone: [555-9999] {ex:phone}

---

[Demo] {=ex:demo} must produce exactly **3** {cat:expectsViolations ^^xsd:integer} violations.
~~~~~~

---

## 📝 MDLD Syntax Patterns

Count constraints control the number of values a property can have.

~~~~~~md
**[Property] must have [Count] values** {=ex:PropertyCountConstraint .sh:PropertyShape sh:message}

[Property Name] {+ex:propertyName ?sh:path} must have at least [min] {sh:minCount ^^xsd:integer} and at most [max] {sh:maxCount ^^xsd:integer} values.
~~~~~~

**Key components:**
- **Property path** - The property to validate (`{+ex:propertyName ?sh:path}`)
- **Minimum count** - Minimum number of values (`{sh:minCount ^^xsd:integer}`)
- **Maximum count** - Maximum number of values (`{sh:maxCount ^^xsd:integer}`)
- **Exact count** - Both minCount and maxCount with same value
- **Validation message** - Human-readable error message (`{sh:message}`)

**Important notes:**
- Use `minCount` alone for "at least X values"
- Use `maxCount` alone for "at most X values"
- Use both with same value for "exactly X values"
- Combine with other constraints for complete validation
- Empty properties fail minCount validation

---

## 🎯 Use Cases

- **Required properties** - Ensure property has at least 1 value (minCount: 1)
- **Single-valued properties** - Ensure property has exactly 1 value (minCount: 1, maxCount: 1)
- **Multi-valued limits** - Limit number of values for optional properties (maxCount: N)
- **Exact cardinality** - Enforce specific number of values

---

## � Implementation Guidelines

**When to use count constraints:**
- **Required properties** - Ensure data completeness
- **Data modeling** - Enforce cardinality constraints
- **Validation rules** - Ensure proper number of values
- **Data quality** - Prevent missing or excessive values

**Best practices:**
- Use minCount: 1 for required properties
- Use both minCount and maxCount: 1 for single-valued properties
- Combine with datatype/class constraints for complete validation
- Provide clear validation messages specifying exact requirements

**Common pitfalls:**
- ❌ Forgetting to specify the datatype ^^xsd:integer
- ❌ Using negative values for counts
- ❌ Confusing minCount with maxCount
- ❌ Not combining with other constraints for complete validation
- ❌ Using count constraints when other constraints would be more appropriate
