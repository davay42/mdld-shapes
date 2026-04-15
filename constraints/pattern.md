[mdld] <https://mdld.js.org/vocab/>
[cat] <https://mdld.js.org/shacl/catalog/>
[ex] <http://example.org/>
[xsd] <http://www.w3.org/2001/XMLSchema#>

# Pattern Constraint {=sh:pattern .class:PatternConstraint label}

> Validates string values against regular expression patterns. Essential for email validation, phone number formatting, identifier patterns, and any text-based data format requirements. {comment}

<http://www.w3.org/ns/shacl#pattern> {?cat:fullIRI}
<http://www.w3.org/ns/shacl#flags> {?cat:fullIRI}

---

## 📋 Quick Start Pattern

~~~~~~md
[mdld] <https://mdld.js.org/vocab/>
[cat] <https://mdld.js.org/shacl/catalog/>
[ex] <http://example.org/>
[xsd] <http://www.w3.org/2001/XMLSchema#>

### Shape Definition

**Email must follow standard format** {=ex:EmailPatternConstraint .sh:PropertyShape sh:message}
[email] {+ex:email ?sh:path} must match [example\.com$] {sh:pattern} with [i] {sh:flags}.

---

### Test Data {=ex:data .Container}

#### Valid Email {=ex:ValidEmail ?member}
Email: [user@example.com] {ex:email ^^xsd:string}

#### Invalid Email {=ex:InvalidEmail ?member}
Email: [user@example.org] {ex:email ^^xsd:string}

---

[Demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.
~~~~~~

---

## 📝 MDLD Syntax Patterns

The pattern constraint validates string values against regular expression patterns.

~~~~~~md
**[Property] must match [Pattern]** {=ex:PropertyPatternConstraint .sh:PropertyShape sh:message}

[Property Name] {+ex:propertyName ?sh:path} must match [regex pattern] {sh:pattern} with [flags] {sh:flags}.
~~~~~~

**Key components:**
- **Property path** - The property to validate (`{+ex:propertyName ?sh:path}`)
- **Regex pattern** - Regular expression pattern (`{sh:pattern}`)
- **Pattern flags** - Optional regex flags (`{sh:flags}`)
- **Validation message** - Human-readable error message (`{sh:message}`)
- **String matching** - Validates literal string values

**Important notes:**
- Only works with literal string values
- Supports standard regex syntax
- Common flags: `i` (case-insensitive), `m` (multiline), `s` (dotall)
- Combine with datatype constraint for string validation
- Empty values automatically pass pattern validation

---

## 🎯 Use Cases

- **Email validation** - Ensure email addresses follow standard format
- **Phone number formatting** - Validate phone number patterns
- **Identifier patterns** - Ensure IDs follow required format
- **URL validation** - Validate URL patterns
- **Code validation** - Validate code formats (ISBN, SKU, etc.)

---

## 🔧 Implementation Guidelines

**When to use pattern:**
- **Format validation** - When values must match specific format
- **Email validation** - Ensure email addresses are valid
- **Phone validation** - Validate phone number formats
- **Identifier validation** - Ensure IDs follow required pattern
- **Data quality** - Enforce text-based data format requirements

**Best practices:**
- Use well-tested regex patterns for common formats
- Keep patterns simple and maintainable
- Test patterns with both valid and invalid examples
- Document what the pattern validates
- Combine with datatype constraint for string validation

**Common pitfalls:**
- ❌ Using overly complex regex patterns
- ❌ Forgetting that pattern only works with literal strings
- ❌ Not testing edge cases in regex patterns
- ❌ Not combining with datatype constraint
- ❌ Using pattern when other constraints would be more appropriate
