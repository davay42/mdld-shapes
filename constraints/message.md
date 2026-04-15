[mdld] <https://mdld.js.org/vocab/>
[cat] <https://mdld.js.org/shacl/catalog/>
[ex] <http://example.org/>
[xsd] <http://www.w3.org/2001/XMLSchema#>

# Violation Message {=sh:message .class:MessageConstraint label}

> Provides human-readable error messages for constraint violations. Essential for user-friendly validation feedback, debugging, and actionable error reporting. {comment}

<http://www.w3.org/ns/shacl#message> {?cat:fullIRI}

---

## 📋 Quick Start Pattern

~~~~~~md
[mdld] <https://mdld.js.org/vocab/>
[cat] <https://mdld.js.org/shacl/catalog/>
[ex] <http://example.org/>
[xsd] <http://www.w3.org/2001/XMLSchema#>

### Shape Definition

**Contract value must be positive for financial compliance** {=ex:#valueRule .sh:PropertyShape sh:message}
[contract value] {+ex:contractValue ?sh:path} must be greater than [0] {sh:minInclusive ^^xsd:decimal}.

**Contract must be approved before start date** {=ex:#dateRule .sh:PropertyShape sh:message}
[approval date] {+ex:approvalDate ?sh:path} must be before [start date] {+ex:startDate ?sh:lessThan}.

---

### Test Data {=ex:data .Container}

#### Valid Contract {=ex:ValidContract .ex:Contract ?member}
Value: [50000.00] {ex:contractValue ^^xsd:decimal}
Approval Date: [2024-01-15] {ex:approvalDate ^^xsd:date}
Start Date: [2024-02-01] {ex:startDate ^^xsd:date}

#### Invalid Contract {=ex:InvalidContract .ex:Contract ?member}
Value: [-1000.00] {ex:contractValue ^^xsd:decimal}
Approval Date: [2024-03-01] {ex:approvalDate ^^xsd:date}
Start Date: [2024-02-01] {ex:startDate ^^xsd:date}

---

[Demo] {=ex:demo} must produce exactly **2** {cat:expectsViolations ^^xsd:integer} violations.
~~~~~~

---

## 📝 MDLD Syntax Patterns

The message constraint provides human-readable error messages for constraint violations.

~~~~~~md
**[Business rule description]** {=ex:PropertyConstraint .sh:PropertyShape sh:message}

[Property Name] {+ex:propertyName ?sh:path} [constraint description].
~~~~~~

**Key components:**
- **Validation message** - Human-readable error message (`{sh:message}`)
- **Business context** - Explain what business rule is violated
- **Impact description** - Describe why this matters
- **Actionable guidance** - Suggest how to fix the issue
- **Domain terminology** - Use appropriate business language

**Important notes:**
- Messages should be specific and actionable
- Use business terminology, not just technical
- Keep messages concise but informative
- Consider the target audience (technical vs business)
- Messages help with debugging and user feedback

---

## 🎯 Use Cases

- **User-friendly feedback** - Provide clear error messages to users
- **Debugging** - Help developers identify constraint violations
- **Actionable reporting** - Guide users on how to fix issues
- **Business context** - Explain violations in business terms
- **Compliance reporting** - Regulatory and audit-focused language

---

## 🔧 Implementation Guidelines

**When to use message:**
- **All constraints** - Always provide messages for user-friendly feedback
- **Business rules** - Explain violations in business terms
- **Complex validation** - Help users understand what went wrong
- **Compliance** - Provide regulatory and audit context
- **Debugging** - Aid in identifying constraint violations

**Best practices:**
- Use semantic, business-focused language
- Keep messages concise but informative
- Provide actionable guidance
- Use consistent terminology across constraints
- Consider internationalization (clear, translatable messages)

**Common pitfalls:**
- ❌ Using technical jargon instead of business language
- ❌ Writing vague or unclear messages
- ❌ Not providing actionable guidance
- ❌ Making messages too long or verbose
- ❌ Forgetting to include messages on constraints
