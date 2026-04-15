[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[class] <cat:class/>
[ex] <cat:example/js/>
[xsd] <http://www.w3.org/2001/XMLSchema#>

# JavaScript Function {=sh:js .class:Constraint label}

> Allows custom JavaScript validation functions for complex constraint logic {comment}

<http://www.w3.org/ns/shacl#js> {?cat:fullIRI}

---

## 📋 Quick Start Pattern

~~~~~~md
[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[class] <cat:class/>
[ex] <cat:example/js/>
[xsd] <http://www.w3.org/2001/XMLSchema#>

### Shape Definition

**Date Validation Shape** {=ex:DateValidationShape .sh:NodeShape ?cat:hasShape label} targets all [Events] {+ex:Event ?sh:targetClass}.

#### Event date must be a valid date string {=ex:DatePropertyShape .sh:PropertyShape ?sh:property sh:message}
Must have an [eventDate] {+ex:eventDate ?sh:path} that is a valid JS date.

~~~~~~js {=ex:DateJSConstraint ?sh:JSConstraint sh:js}
// Check if value is a valid date string
const date = new Date(value);
return !isNaN(date.getTime());
~~~~~~

---

### Test Data {=ex:data .Container}

#### Valid Event {=ex:ValidEvent .ex:Event ?member}
Event Date: [2024-12-25] {ex:eventDate ^^xsd:date}

#### Invalid Event {=ex:InvalidEvent1 .ex:Event ?member}
Event Date: [not-a-date] {ex:eventDate}

---

[Demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.
~~~~~~

---

## 📝 MDLD Syntax Patterns

The JavaScript constraint allows custom JavaScript validation functions for complex constraint logic.

~~~~~~md
**[Property] must pass [JavaScript validation]** {=ex:PropertyJSConstraint .sh:PropertyShape ?sh:property sh:message}

[Property Name] {+ex:propertyName ?sh:path} must pass custom validation.

~~~~~~js {=ex:JSConstraintName ?sh:JSConstraint sh:js}
// Custom validation logic
const result = validate(value);
return result;
~~~~~~
~~~~~~

**Key components:**
- **Property path** - The property to validate (`{+ex:propertyName ?sh:path}`)
- **JavaScript constraint** - Reference to JS constraint (`{=ex:JSConstraintName ?sh:JSConstraint sh:js}`)
- **JS function** - Custom validation function in fenced code block
- **Validation message** - Human-readable error message (`{sh:message}`)
- **Custom logic** - Implement complex validation rules

**Important notes:**
- JavaScript code is executed during validation
- Function receives `value` parameter
- Return `true` for valid, `false` for invalid
- Use for complex validation not possible with standard constraints
- Ensure JavaScript code is safe and well-tested

---

## 🎯 Use Cases

- **Custom validation** - Implement business-specific validation rules
- **Complex logic** - Validate patterns not supported by standard constraints
- **Cross-property validation** - Validate relationships between properties
- **External API validation** - Check values against external services
- **Data transformation** - Transform and validate data

---

## 🔧 Implementation Guidelines

**When to use JavaScript:**
- **Complex validation** - When standard constraints are insufficient
- **Business rules** - Implement custom business logic
- **Cross-property validation** - Validate relationships between properties
- **External validation** - Check against external services
- **Data transformation** - Transform and validate data

**Best practices:**
- Keep JavaScript functions simple and focused
- Test JavaScript functions thoroughly
- Document the validation logic clearly
- Use descriptive function names
- Consider performance implications

**Common pitfalls:**
- ❌ Writing overly complex JavaScript functions
- ❌ Not testing JavaScript functions thoroughly
- ❌ Using JavaScript when standard constraints would suffice
- ❌ Not handling edge cases in JavaScript logic
- ❌ Forgetting that JavaScript code is executed during validation
