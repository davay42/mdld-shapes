[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>

# Getting Started with MDLD SHACL

> Learn the fundamentals of SHACL validation in MDLD (Markdown Linked Data) {comment}

## What is SHACL?

SHACL (Shapes Constraint Language) is a W3C standard for validating RDF graphs. In MDLD, SHACL constraints are written directly in Markdown, making validation rules human-readable and machine-processable.

## Core Concepts

**Shapes** define validation rules for your data. Think of a shape as a template that your data must conform to.

**Targets** determine which nodes in your data get validated. You can target by class, specific node, or relationship.

**Constraints** define the actual validation rules (e.g., required properties, value ranges, string patterns).

## Your First Shape

Let's create a simple shape for validating user accounts:

~~~~~~md
[ex] <tag:my@example.org,2026:users/>

**User Validation Shape** {=ex:UserShape .sh:NodeShape ?cat:hasShape label}
Validates all [User] {+ex:User ?sh:targetClass} instances.

**Username is required** {=ex:UsernameRule .sh:PropertyShape ?sh:property}
[username] {+ex:username ?sh:path} must have exactly [1] {sh:minCount sh:maxCount ^^xsd:integer} value.

**Email is required** {=ex:EmailRule .sh:PropertyShape ?sh:property}
[email] {+ex:email ?sh:path} must have at least [1] {sh:minCount ^^xsd:integer} value.
~~~~~~

## Key MDLD Syntax Patterns

| Pattern | Meaning | Example |
|---------|---------|---------|
| `{=}` | Subject declaration (persists) | `{=ex:shape .sh:NodeShape}` |
| `{+}` | Object introduction (temporary) | `{+ex:target ?sh:targetClass}` |
| `?` | Object predicate (Subject → Object) | `?sh:targetClass`, `?sh:path` |
| `.` | Class type declaration | `.sh:NodeShape` |
| `^^` | Literal datatype | `^^xsd:integer` |

## Basic Workflow

1. **Define your shape** - Create a NodeShape with a descriptive name
2. **Set your target** - Choose how to select data (targetClass, targetNode, etc.)
3. **Add property rules** - Define PropertyShapes for each property to validate
4. **Add constraints** - Apply constraint rules (minCount, datatype, pattern, etc.)
5. **Test with data** - Create test data with valid and invalid examples

## Next Steps

- Learn about [Targeting Mechanisms](../targeting/index.md) to select your data
- Explore [Constraints](../constraints/index.md) to define validation rules
- See practical examples in the constraint documentation
