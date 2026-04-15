[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <mdld:shacl/example/length/>


# Min Length {=sh:minLength .class:Constraint label}

> Specifies the minimum length of string values - useful for password requirements, username validation, or content length limits. {comment}

<http://www.w3.org/ns/shacl#minLength> {?cat:fullIRI}

# Max Length {=sh:maxLength .class:Constraint label}

> Specifies the maximum length of string values - useful for field size limits, message length restrictions, or data entry constraints. {comment}

<http://www.w3.org/ns/shacl#maxLength> {?cat:fullIRI}

---

## 📋 Quick Start Pattern

~~~~~~md
[ex] <tag:my@example.org,2026:length/>

### Shape Definition

**Username must be 3-20 characters long** {=ex:#usernameLength .sh:PropertyShape sh:message}
[username] {+ex:username ?sh:path} must have at least [3] {sh:minLength ^^xsd:integer} and at most [20] {sh:maxLength ^^xsd:integer} characters.

**Password must be at least 8 characters long** {=ex:#passwordLength .sh:PropertyShape sh:message}
[password] {+ex:password ?sh:path} must have at least [8] {sh:minLength ^^xsd:integer} characters.

---

### Test Data {=ex:data .Container}

#### Valid User {=ex:ValidUser ?member}
Username: [john_doe] {ex:username}
Password: [securepass123] {ex:password}

#### Invalid User - Short Username {=ex:InvalidUserShort ?member}
Username: [jd] {ex:username}
Password: [securepass123] {ex:password}

#### Invalid User - Short Password {=ex:InvalidUserPassword ?member}
Username: [john_doe] {ex:username}
Password: [short] {ex:password}

---

[Demo] {=ex:demo} must produce exactly **2** violations.
~~~~~~

---

## 📝 MDLD Syntax Patterns

Length constraints control the length of string values.

~~~~~~md
**[Property] must be [Min]-[Max] characters** {=ex:PropertyLengthConstraint .sh:PropertyShape sh:message}

[Property Name] {+ex:propertyName ?sh:path} must have at least [min] {sh:minLength ^^xsd:integer} and at most [max] {sh:maxLength ^^xsd:integer} characters.
~~~~~~

**Key components:**
- **Property path** - The property to validate (`{+ex:propertyName ?sh:path}`)
- **Minimum length** - Minimum string length (`{sh:minLength ^^xsd:integer}`)
- **Maximum length** - Maximum string length (`{sh:maxLength ^^xsd:integer}`)
- **Validation message** - Human-readable error message (`{sh:message}`)
- **Character counting** - Counts characters in string values

**Important notes:**
- Only works with literal string values
- Length is measured in characters, not bytes
- Use minLength alone for minimum length requirements
- Use maxLength alone for maximum length requirements
- Use both together for exact length range
- Empty strings have length 0

---

## 🎯 Use Cases

- **Username validation** - Enforce reasonable username lengths
- **Password policies** - Ensure minimum password complexity
- **Content limits** - Restrict post/comment/message sizes
- **Form validation** - Enforce field size requirements
- **Database constraints** - Match column length limits
- **API validation** - Ensure request payload sizes

---

## 🔧 Implementation Guidelines

**When to use length:**
- **Input validation** - When string length must be controlled
- **Password policies** - Ensure minimum password length
- **Content limits** - Restrict message/comment sizes
- **Form validation** - Enforce field size requirements
- **Data quality** - Maintain consistent string lengths

**Best practices:**
- Use reasonable length limits based on use case
- Combine with other string constraints (pattern, datatype)
- Test with edge cases (empty strings, boundary values)
- Consider internationalization (character vs byte length)
- Document why length limits are needed

**Common pitfalls:**
- ❌ Forgetting to specify the datatype ^^xsd:integer
- ❌ Using negative values for lengths
- ❌ Not considering international character lengths
- ❌ Not testing boundary values
- ❌ Confusing length with count constraints (length for string size, count for number of values)
