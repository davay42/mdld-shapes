[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>

# Pattern {=sh:pattern .class:PatternConstraint label}

> Validates string values against regular expression patterns {comment}

<http://www.w3.org/ns/shacl#pattern> {?cat:fullIRI}
<http://www.w3.org/ns/shacl#flags> {?cat:fullIRI}

---

## 📋 Quick Start Pattern

~~~~~~md
[ex] <tag:my@example.org,2026:pattern/>

**Email must end with example.com** {=ex:EmailPatternConstraint .sh:PropertyShape}
[email] {+ex:email ?sh:path} must match [example\.com$] {sh:pattern} with [i] {sh:flags}.

---

### Test Data {=ex:data .Container}

#### Valid Email {=ex:ValidEmail ?member}
Email: [user@example.com] {ex:email}

#### Invalid Email {=ex:InvalidEmail ?member}
Email: [user@example.org] {ex:email}
~~~~~~

---

## 📝 MDLD Syntax Patterns

~~~~~~md
[Property] {+ex:propertyName ?sh:path} must match [regex pattern] {sh:pattern} with [flags] {sh:flags}.
~~~~~~

**Use for:** Email validation, phone number formatting, identifier patterns, URL validation

**Important:**
- Works with literal string values only
- Supports standard regex syntax
- Common flags: i (case-insensitive), m (multiline), s (dotall)
- Empty values automatically pass

---

## 🔧 Implementation Guidelines

**When to use:** Values must match specific format

**Best practices:**
- Use well-tested regex patterns
- Keep patterns simple
- Test with valid and invalid examples

**Common pitfalls:**
- ❌ Using overly complex regex
- ❌ Forgetting pattern only works with strings
