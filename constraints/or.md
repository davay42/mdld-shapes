[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>

# OR Constraint {=sh:or .class:LogicalConstraint label}

> Requires at least one constraint in the list to be satisfied {comment}

<http://www.w3.org/ns/shacl#or> {?cat:fullIRI}

---

## 📋 Quick Start Pattern

The OR constraint requires at least one of the specified constraints to be satisfied. This example validates that a contact must be either an email (contains @) or a phone number (contains -).

~~~~~~md
[ex] <tag:my@example.org,2026:or/>

## Contact Validation Shape {=ex:ContactValidationShape .sh:NodeShape label}

Validates all [member] {+member ?sh:targetObjectsOf} entities with **Contact must be email or phone** {sh:message}.

**Options List** {=ex:or-l1 ?sh:or .rdf:List}: [Email Contact] {+ex:emailContact ?rdf:first}, then [followed] {=ex:or-l2 ?rdf:rest} by [Phone Contact] {+ex:phoneContact ?rdf:first} and [nil] {+rdf:nil ?rdf:rest}. {=}

**Email Contact** {=ex:emailContact .sh:PropertyShape} ensures [contact] {+ex:contact ?sh:path} contains [@] {sh:pattern}.

**Phone Contact** {=ex:phoneContact .sh:PropertyShape} ensures [contact] {+ex:contact ?sh:path} contains [-] {sh:pattern}.

---

## Test Data {=ex:data .Container}

### Valid Email Contact {=ex:ValidEmail ?member}
Contact: [user@example.com] {ex:contact}

### Valid Phone Contact {=ex:ValidPhone ?member}
Contact: [555-123-4567] {ex:contact}

### Invalid Contact {=ex:InvalidContact ?member}
Contact: [invalid] {ex:contact}
~~~~~~

**Expected Result:** 1 violation (InvalidContact fails because it matches neither email nor phone pattern)

---

## 📝 MDLD Syntax Patterns

~~~~~~md
[Options List] {=ex:or-l1 ?sh:or .rdf:List}: [First] {+ex:first ?rdf:first}, then [rest] {=ex:or-l2 ?rdf:rest} by [Second] {+ex:second ?rdf:first} and [nil] {+rdf:nil ?rdf:rest}. {=}
~~~~~~

**Use for:** Alternative value formats, optional properties, multiple valid patterns

**Important:**
- Uses RDF list syntax (rdf:first, rdf:rest, rdf:nil)
- At least one constraint in list must be satisfied
- Use unique list identifiers (or-l1, or-l2)
- Always reset subject with {=} after list definition

---

## 🔧 Implementation Guidelines

**When to use:** Multiple valid alternatives exist

**Best practices:**
- Keep list short (2-3 alternatives)
- Test each alternative individually first
- Ensure alternatives are mutually exclusive when appropriate

**Common pitfalls:**
- ❌ Forgetting subject reset {=} after list
- ❌ Reusing list identifiers causing collisions
- ❌ Overlapping alternatives causing ambiguity
