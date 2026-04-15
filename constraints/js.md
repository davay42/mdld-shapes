[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>

# JavaScript Function {=sh:js .class:Constraint label}

> Allows custom JavaScript validation functions for complex constraint logic {comment}

<http://www.w3.org/ns/shacl#js> {?cat:fullIRI}

---

## 📋 Quick Start Pattern

~~~~~~md
[ex] <tag:my@example.org,2026:js/>

**Event date must be valid** {=ex:DatePropertyShape .sh:PropertyShape}
[eventDate] {+ex:eventDate ?sh:path} must be a valid JS date.

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
~~~~~~

---

## 📝 MDLD Syntax Patterns

~~~~~~md
[Property] {+ex:propertyName ?sh:path} must pass custom validation.

~~~~~~js {=ex:JSConstraintName ?sh:JSConstraint sh:js}
// Custom validation logic
const result = validate(value);
return result;
~~~~~~
~~~~~~

**Use for:** Custom validation, complex logic, cross-property validation

**Important:**
- JavaScript code is executed during validation
- Function receives `value` parameter
- Return `true` for valid, `false` for invalid
- Use for complex validation not possible with standard constraints

---

## 🔧 Implementation Guidelines

**When to use:** Standard constraints are insufficient

**Best practices:**
- Keep JavaScript functions simple
- Test JavaScript functions thoroughly

**Common pitfalls:**
- ❌ Writing overly complex JavaScript functions
- ❌ Not testing JavaScript functions thoroughly
