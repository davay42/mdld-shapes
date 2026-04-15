[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>

# Deactivated {=sh:deactivated .class:DeactivatedConstraint label}

> Temporarily disables specific constraints during validation {comment}

<http://www.w3.org/ns/shacl#deactivated> {?cat:fullIRI}

---

## 📋 Quick Start Pattern

~~~~~~md
[ex] <tag:my@example.org,2026:deactivated/>

**User status must be active** {=ex:ActiveProperty .sh:PropertyShape}
[status] {+ex:status ?sh:path} must be [active] {sh:hasValue}.

**Category rule** {=ex:DeactivatedProperty .sh:PropertyShape} is [deactivated] {sh:deactivated}.

---

### Test Data {=ex:data .Container}

#### Valid Account {=ex:ValidNode ?member}
Status: [active] {ex:status}

#### Invalid Account {=ex:InvalidNode ?member}
Status: [inactive] {ex:status}
~~~~~~

---

## 📝 MDLD Syntax Patterns

~~~~~~md
[Constraint] {=ex:PropertyConstraint .sh:PropertyShape} is [deactivated] {sh:deactivated}.
~~~~~~

**Use for:** Phased validation, conditional rules, schema evolution, testing

**Important:**
- Deactivated constraints are skipped during validation
- Useful for temporary constraint disabling
- Can be reactivated by removing the flag

---

## 🔧 Implementation Guidelines

**When to use:** Temporarily disable constraints

**Best practices:**
- Document why constraint is deactivated
- Plan for reactivation

**Common pitfalls:**
- ❌ Forgetting to reactivate deactivated constraints
- ❌ Using deactivated instead of removing obsolete constraints
