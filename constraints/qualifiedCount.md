[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <mdld:shacl/example/qualified/>


# Qualified Count Constraints {=sh:qualifiedMinCount .class:QualifiedConstraint label}

> Applies count constraints only to values that meet additional shape criteria. Essential for conditional validation where only certain values should be counted. {comment}

<http://www.w3.org/ns/shacl#qualifiedMinCount> {?cat:fullIRI}
<http://www.w3.org/ns/shacl#qualifiedMaxCount> {?cat:fullIRI}

---

## 📋 Quick Start Pattern

~~~~~~md
[ex] <tag:my@example.org,2026:qualified/>

### Shape Definition

**Employee must have exactly one work email** {=ex:#workEmailRule .sh:PropertyShape ?sh:property sh:message}
[email] {+ex:email ?sh:path} must have exactly [1] {sh:qualifiedMinCount sh:qualifiedMaxCount ^^xsd:integer} work email that matches **Work Email Shape** {=ex:WorkEmailShape .sh:NodeShape ?sh:qualifiedValueShape}.

#### Work Email Shape {=ex:WorkEmailShape .sh:NodeShape label}
Must be a [literal] {+sh:Literal ?sh:nodeKind} with [string] {+xsd:string ?sh:datatype} type and pattern [company.org] {sh:pattern}.

---

### Test Data {=ex:data .Container}

#### Valid Employee {=ex:ValidEmployee .ex:Employee ?member}
Name: [John Doe] {ex:name}
Email: [john@company.org] {ex:email}

#### Invalid Employee - Multiple Work Emails {=ex:MultipleWorkEmployee .ex:Employee ?member}
Name: [Jane Smith] {ex:name}
Email: [jane@company.org] {ex:email}
Email: [jane.smith@company.org] {ex:email}

#### Invalid Employee - No Work Email {=ex:NoWorkEmployee .ex:Employee ?member}
Name: [Bob Wilson] {ex:name}
Email: [bob@gmail.com] {ex:email}

#### Valid Employee - Mixed Emails {=ex:MixedEmailEmployee .ex:Employee ?member}
Name: [Alice Brown] {ex:name}
Email: [alice@company.org] {ex:email}
Email: [alice.personal@gmail.com] {ex:email}

---

[Demo] {=ex:demo} must produce exactly **2** violations.
~~~~~~

---

## 📝 MDLD Syntax Patterns

Qualified count constraints apply count constraints only to values that meet additional shape criteria.

~~~~~~md
**[Property] must have [Count] values matching [Shape]** {=ex:PropertyQualifiedCountConstraint .sh:PropertyShape ?sh:property sh:message}

[Property Name] {+ex:propertyName ?sh:path} must have exactly [count] {sh:qualifiedMinCount sh:qualifiedMaxCount ^^xsd:integer} values that conform to [Shape] {=ex:ShapeName ?sh:qualifiedValueShape}.
~~~~~~

**Key components:**
- **Property path** - The property to validate (`{+ex:propertyName ?sh:path}`)
- **Qualified min count** - Minimum count of matching values (`{sh:qualifiedMinCount ^^xsd:integer}`)
- **Qualified max count** - Maximum count of matching values (`{sh:qualifiedMaxCount ^^xsd:integer}`)
- **Qualified shape** - Shape that values must conform to (`{=ex:ShapeName ?sh:qualifiedValueShape}`)
- **Validation message** - Human-readable error message (`{sh:message}`)
- **Conditional counting** - Only counts values matching the shape

**Important notes:**
- Only counts values that conform to the qualified shape
- Other values are ignored for the count
- Use for conditional validation scenarios
- The qualified shape must be defined separately
- Combine with other constraints for complete validation

---

## 🎯 Use Cases

- **Work email validation** - Ensure exactly one work email (ignore personal emails)
- **Primary contact validation** - Ensure exactly one primary contact
- **Conditional counting** - Count only values meeting specific criteria
- **Business rules** - Enforce conditional count requirements
- **Data quality** - Ensure specific value counts

---

## 🔧 Implementation Guidelines

**When to use qualified count:**
- **Conditional validation** - When only certain values should be counted
- **Business rules** - Enforce conditional count requirements
- **Mixed data** - When property has mixed value types
- **Specific validation** - Count only values meeting criteria
- **Data quality** - Ensure specific value counts

**Best practices:**
- Define the qualified shape clearly
- Test with mixed value scenarios
- Combine with other constraints for complete validation
- Document what values are counted
- Use descriptive shape names for clarity

**Common pitfalls:**
- ❌ Forgetting to define the qualified shape
- ❌ Confusing qualified count with regular count
- ❌ Not testing with mixed value scenarios
- ❌ Not combining with other constraints
- ❌ Making the qualified shape too complex
