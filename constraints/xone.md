[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>

# XONE Constraint {=sh:xone .class:LogicalConstraint label}

> Requires exactly one constraint in the list to be satisfied (exclusive OR) {comment}

<http://www.w3.org/ns/shacl#xone> {?cat:fullIRI}

---

## 📋 Quick Start Pattern

The XONE constraint requires exactly one of the specified constraints to be satisfied. This example validates that a role must be exactly one type (admin or user), not both and not neither.

~~~~~~md
[ex] <tag:my@example.org,2026:xone/>

## Role Validation Shape {=ex:RoleValidationShape .sh:NodeShape label}

Validates all [member] {+member ?sh:targetObjectsOf} entities with **Role must be exactly one type** {sh:message}.

**Options List** {=ex:xone-l1 ?sh:xone .rdf:List}: [Admin Role] {+ex:adminRole ?rdf:first}, then [followed] {=ex:xone-l2 ?rdf:rest} by [User Role] {+ex:userRole ?rdf:first} and [nil] {+rdf:nil ?rdf:rest}. {=}

**Admin Role** {=ex:adminRole .sh:PropertyShape} ensures [role] {+ex:role ?sh:path} is exactly [admin] {sh:hasValue}.

**User Role** {=ex:userRole .sh:PropertyShape} ensures [role] {+ex:role ?sh:path} is exactly [user] {sh:hasValue}.

---

## Test Data {=ex:data .Container}

### Valid Admin {=ex:ValidAdmin ?member}
Role: [admin] {ex:role}

### Valid User {=ex:ValidUser ?member}
Role: [user] {ex:role}

### Invalid - No Role {=ex:NoRole ?member}
Role: [guest] {ex:role}
~~~~~~

**Expected Result:** 1 violation (NoRole fails because it matches neither admin nor user)

---

## 📝 MDLD Syntax Patterns

~~~~~~md
[Options List] {=ex:xone-l1 ?sh:xone .rdf:List}: [First] {+ex:first ?rdf:first}, then [rest] {=ex:xone-l2 ?rdf:rest} by [Second] {+ex:second ?rdf:first} and [nil] {+rdf:nil ?rdf:rest}. {=}
~~~~~~

**Use for:** Mutually exclusive options, single-choice validation, exclusive categories

**Important:**
- Uses RDF list syntax (rdf:first, rdf:rest, rdf:nil)
- Exactly one constraint in list must be satisfied
- Use unique list identifiers (xone-l1, xone-l2)
- Always reset subject with {=} after list definition

---

## 🔧 Implementation Guidelines

**When to use:** Mutually exclusive alternatives where exactly one must match

**Best practices:**
- Ensure alternatives are truly mutually exclusive
- Test each alternative individually first
- Consider edge cases (no match, multiple matches)

**Common pitfalls:**
- ❌ Forgetting subject reset {=} after list
- ❌ Reusing list identifiers causing collisions
- ❌ Overlapping alternatives causing ambiguous results
