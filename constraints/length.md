[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>

# Min Length {=sh:minLength .class:Constraint label}

> Specifies the minimum length of string values {comment}

<http://www.w3.org/ns/shacl#minLength> {?cat:fullIRI}

# Max Length {=sh:maxLength .class:Constraint label}

> Specifies the maximum length of string values {comment}

<http://www.w3.org/ns/shacl#maxLength> {?cat:fullIRI}

---

## 📋 Quick Start Pattern

~~~~~~md
[ex] <tag:my@example.org,2026:length/>

**Username must be 3-20 characters** {=ex:#usernameLength .sh:PropertyShape}
[username] {+ex:username ?sh:path} must have at least [3] {sh:minLength ^^xsd:integer} and at most [20] {sh:maxLength ^^xsd:integer} characters.

---

### Test Data {=ex:data .Container}

#### Valid User {=ex:ValidUser ?member}
Username: [john_doe] {ex:username}

#### Invalid User {=ex:InvalidUser ?member}
Username: [jd] {ex:username}
~~~~~~

---

## 📝 MDLD Syntax Patterns

~~~~~~md
[Property] {+ex:propertyName ?sh:path} must have at least [min] {sh:minLength ^^xsd:integer} and at most [max] {sh:maxLength ^^xsd:integer} characters.
~~~~~~

**Use for:** Username validation, password policies, content limits, form validation

**Important:**
- Works with literal string values only
- Length measured in characters, not bytes
- Empty strings have length 0

---

## 🔧 Implementation Guidelines

**When to use:** String length must be controlled

**Best practices:**
- Use reasonable length limits
- Test with boundary values

**Common pitfalls:**
- ❌ Forgetting datatype ^^xsd:integer
- ❌ Using negative values for lengths
