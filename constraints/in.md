[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <mdld:shacl/example/in/>


# Value Enumeration {=sh:in .class:PresenceConstraint label}

> Constrains property values to be within a specified list of allowed values using RDF lists. Essential for controlled vocabularies, status codes, and enumeration validation. {comment}

<http://www.w3.org/ns/shacl#in> {?cat:fullIRI}

---

## 📋 Quick Start Pattern

~~~~~~md
[ex] <tag:my@example.org,2026:in/>

### Shape Definition

**Status must be in allowed list** {=ex:#allowedStatus .sh:PropertyShape ?sh:property sh:message}
[Status] {+ex:status ?sh:path} must be either Active or Inactive.

**Allowed Status List** {=ex:in-l1 ?sh:in .rdf:List}: [Active] {+ex:Active ?rdf:first}, 
then [followed] {=ex:in-l2 ?rdf:rest} by [Inactive] {+ex:Inactive ?rdf:first} 
and [nil] {+rdf:nil ?rdf:rest}. Reset subject: {=}

---

### Test Data {=ex:data .Container}

#### Valid Employee {=ex:ValidEmployee .ex:Employee ?member}
Status: [Active] {ex:status}

#### Invalid Status Employee {=ex:InvalidStatusEmployee .ex:Employee ?member}
Status: [Pending] {ex:status}

---

[Demo] {=ex:demo} must produce exactly **1** violation.
~~~~~~

---

## 📝 MDLD Syntax Patterns

The in constraint constrains property values to be within a specified list of allowed values using RDF lists.

~~~~~~md
**[Property] must be in [List]** {=ex:PropertyInConstraint .sh:PropertyShape ?sh:property sh:message}

[Property Name] {+ex:propertyName ?sh:path} must be in the allowed list.

**Allowed List** {=ex:in-l1 ?sh:in .rdf:List}: [First Value] {+ex:firstValue ?rdf:first}, 
then [followed] {=ex:in-l2 ?rdf:rest} by [Second Value] {+ex:secondValue ?rdf:first} 
and [nil] {+rdf:nil ?rdf:rest}. Reset subject: {=}
~~~~~~

**Key components:**
- **Property path** - The property to validate (`{+ex:propertyName ?sh:path}`)
- **List node** - RDF list container (`{=ex:in-l1 ?sh:in .rdf:List}`)
- **List elements** - Allowed values in the list (`{+ex:value ?rdf:first}`)
- **List structure** - Linked list with `rdf:first`, `rdf:rest`, `rdf:nil`
- **Subject reset** - `{=}` prevents unintended subject continuation

**Important notes:**
- Uses verbose RDF list syntax (similar to AND constraint)
- Only validates values if the property exists
- Use `minCount` to check for required properties
- Each list element must be a valid value
- Always reset subject with `{=}` after list definition

---

## 🎯 Use Cases

- **Controlled vocabularies** - Restrict values to predefined terms
- **Status codes** - Ensure status is one of allowed values
- **Enumeration validation** - Validate against allowed value sets
- **Category validation** - Restrict categories to predefined list
- **Configuration options** - Validate configuration settings

---

## 🔧 Implementation Guidelines

**When to use in:**
- **Controlled vocabularies** - When values must be from a predefined set
- **Status validation** - Ensure status codes are valid
- **Enumeration** - Validate against allowed value sets
- **Data integrity** - Prevent invalid value assignments
- **Business rules** - Enforce allowed value constraints

**Best practices:**
- Use descriptive value names for clarity
- Keep the list short for maintainability
- Combine with `minCount` for required properties
- Test with both valid and invalid values
- Use unique list identifiers to avoid collisions

**Common pitfalls:**
- ❌ Forgetting the subject reset `{=}` after list definition
- ❌ Reusing list identifiers causing collisions
- ❌ Not combining with `minCount` for required properties
- ❌ Making the list too complex to maintain
- ❌ Confusing in constraint with hasValue (in for multiple values, hasValue for single)
