[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>

# Value Enumeration {=sh:in .class:PresenceConstraint label}

> Constrains property values to be within a specified list of allowed values {comment}

<http://www.w3.org/ns/shacl#in> {?cat:fullIRI}

---

## 📋 Quick Start Pattern

~~~~~~md
[ex] <tag:my@example.org,2026:in/>

**Status must be Active or Inactive** {=ex:#allowedStatus .sh:PropertyShape}
[status] {+ex:status ?sh:path} must be in allowed list.

**Allowed Values List** {=ex:in-l1 ?sh:in .rdf:List}: [Active] {+ex:Active ?rdf:first}, then [rest] {=ex:in-l2 ?rdf:rest} by [Inactive] {+ex:Inactive ?rdf:first} and [nil] {+rdf:nil ?rdf:rest}. {=}

---

### Test Data {=ex:data .Container}

#### Valid Employee {=ex:ValidEmployee ?member}
Status: [Active] {ex:status}

#### Invalid Employee {=ex:InvalidStatusEmployee ?member}
Status: [Pending] {ex:status}
~~~~~~

---

## 📝 MDLD Syntax Patterns

~~~~~~md
[Property] {+ex:propertyName ?sh:path} must be in allowed list.

**Allowed List** {=ex:in-l1 ?sh:in .rdf:List}: [First] {+ex:first ?rdf:first}, then [rest] {=ex:in-l2 ?rdf:rest} by [Second] {+ex:second ?rdf:first} and [nil] {+rdf:nil ?rdf:rest}. {=}
~~~~~~

**Use for:** Controlled vocabularies, status codes, enumeration validation, category validation

**Important:**
- Uses RDF list syntax (rdf:first, rdf:rest, rdf:nil)
- Only validates values if property exists
- Use minCount to check for required properties
- Always reset subject with {=} after list definition

---

## 🔧 Implementation Guidelines

**When to use:** Values must be from a predefined set

**Best practices:**
- Keep list short for maintainability
- Combine with minCount for required properties

**Common pitfalls:**
- ❌ Forgetting subject reset {=} after list
- ❌ Reusing list identifiers causing collisions
- ❌ Not combining with minCount for required properties
