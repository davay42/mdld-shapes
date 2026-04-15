[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>

# NOT Constraint {=sh:not .class:LogicalConstraint label}

> Requires value nodes to NOT conform to a given shape. Essential for negation patterns and exclusion rules. {comment}

<http://www.w3.org/ns/shacl#not> {?cat:fullIRI}

---

## 📋 Quick Start Pattern

~~~~~~md
[ex] <mdld:shacl/example/not/>

### Shape Definition

**User cannot have deleted status** {sh:message}

**User Status Shape** {=ex:UserStatusShape .sh:NodeShape ?cat:hasShape label} targets all [users] {+ex:User ?sh:targetClass}.

User status must not conform to the forbidden shape using [Forbidden Status Shape] {+ex:ForbiddenStatusShape ?sh:not}.

**Forbidden Status Shape** {=ex:ForbiddenStatusShape .sh:NodeShape} requires the [status] {+ex:status ?sh:path} property to be exactly [deleted] {sh:hasValue}.

---

### Test Data {=ex:data .Container}

#### Valid User - Active {=ex:ValidActiveUser .ex:User}
Name: [Alice] {ex:name}
Status: [active] {ex:status}

#### Invalid User - Deleted {=ex:InvalidDeletedUser .ex:User}
Name: [Charlie] {ex:name}
Status: [deleted] {ex:status}

---

[Demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.
~~~~~~

---

## �� MDLD Syntax Patterns

The NOT constraint requires a shape reference that defines the forbidden pattern.

~~~~~~md
# NOT Constraint Pattern
**[Shape Name] must not conform to forbidden pattern** {=ex:ForbiddenShape .sh:NodeShape ?sh:not}

**Forbidden Pattern Shape** {=ex:ForbiddenPattern .sh:NodeShape} defines the pattern to reject:
[Property] {+ex:property ?sh:path} must be [forbidden value] {sh:hasValue}
~~~~~~

**Key components:**
- **NOT reference** - Links to the forbidden shape (`{+ex:ForbiddenShape ?sh:not}`)
- **Forbidden shape** - Defines the pattern to reject (PropertyShape or NodeShape)
- **Shape definition** - Can be a simple property constraint or complex shape
- **Validation logic** - Any node conforming to the forbidden shape fails validation

**Important notes:**
- The forbidden shape must be defined before or alongside the NOT constraint
- NOT only validates nodes that would conform to the forbidden shape
- Nodes that don't match the forbidden shape pass validation automatically
- Can be used with both PropertyShape and NodeShape contexts

---

## 🎯 Use Cases

- **Forbidden values** - Prevent users from having deleted status
- **Exclusion patterns** - Prevent products from being in certain categories
- **Business rule negation** - Ensure orders don't have invalid states

---

## 🔧 Implementation Guidelines

**When to use NOT:**
- **Forbidden values** - When certain values must be explicitly prohibited
- **Exclusion patterns** - When nodes must not conform to a specific pattern
- **Business rule negation** - When business logic requires negation
- **Data integrity** - When certain states must be prevented

**Best practices:**
- Keep forbidden shapes simple and focused
- Use descriptive names for forbidden shapes
- Test the forbidden shape independently first
- Document why the pattern is forbidden

**Common pitfalls:**
- ❌ Creating circular dependencies between shapes
- ❌ Making forbidden shapes too complex to understand
- ❌ Forgetting that non-matching nodes automatically pass
- ❌ Using NOT when a positive constraint would be clearer
