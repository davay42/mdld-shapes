[mdld] <https://mdld.js.org/vocab/>
[cat] <https://mdld.js.org/shacl/catalog/>
[ex] <http://example.org/>
[xsd] <http://www.w3.org/2001/XMLSchema#>

# Deactivated Constraint {=sh:deactivated .class:DeactivatedConstraint label}

> Temporarily disables specific constraints during validation. Essential for phased validation, conditional rule enforcement, and managing constraint lifecycle in evolving schemas. {comment}

<http://www.w3.org/ns/shacl#deactivated> {?cat:fullIRI}

---

## 📋 Quick Start Pattern

~~~~~~md
[mdld] <https://mdld.js.org/vocab/>
[cat] <https://mdld.js.org/shacl/catalog/>
[ex] <http://example.org/>
[xsd] <http://www.w3.org/2001/XMLSchema#>

### Shape Definition

**Deactivated Example Shape** {=ex:DeactivatedExampleShape .sh:NodeShape ?cat:hasShape label} targets [Valid Node] {+ex:ValidNode ?sh:targetNode} and [Invalid Node] {+ex:InvalidNode ?sh:targetNode}.

**User status must be active** {=ex:ActiveProperty .sh:PropertyShape sh:message}
[status] {+ex:status ?sh:path} must be [active] {sh:hasValue}.

**Must have premium category** {=ex:DeactivatedProperty .sh:PropertyShape sh:message}
[category] {+ex:category ?sh:path} is always [premium] {sh:hasValue}. Was temporarily [deactivated] {sh:deactivated}.

---

### Test Data {=ex:data .Container}

#### Valid Account {=ex:ValidNode ?member}
Status: [active] {ex:status}
Category: [basic] {ex:category}

#### Invalid Account {=ex:InvalidNode ?member}
Status: [inactive] {ex:status}
Category: [basic] {ex:category}

---

[Demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.
~~~~~~

---

## 📝 MDLD Syntax Patterns

The deactivated constraint temporarily disables specific constraints during validation.

~~~~~~md
**[Constraint description]** {=ex:PropertyConstraint .sh:PropertyShape sh:message}

[Property Name] {+ex:propertyName ?sh:path} [constraint description]. Was temporarily [deactivated] {sh:deactivated}.
~~~~~~

**Key components:**
- **Validation message** - Human-readable error message (`{sh:message}`)
- **Deactivated flag** - Disables the constraint (`{sh:deactivated}`)
- **Constraint description** - The constraint being temporarily disabled
- **Lifecycle management** - Manage constraint lifecycle in evolving schemas
- **Phased validation** - Enable/disable constraints as needed

**Important notes:**
- Deactivated constraints are skipped during validation
- Useful for phased validation and conditional rule enforcement
- Helps manage constraint lifecycle in evolving schemas
- Can be reactivated by removing the deactivated flag
- Combine with message for documentation

---

## 🎯 Use Cases

- **Phased validation** - Enable constraints in phases during migration
- **Conditional rules** - Temporarily disable rules for specific scenarios
- **Schema evolution** - Manage constraints during schema changes
- **Testing** - Disable constraints for testing purposes
- **Lifecycle management** - Manage constraint lifecycle

---

## 🔧 Implementation Guidelines

**When to use deactivated:**
- **Phased validation** - When rolling out new constraints gradually
- **Schema migration** - During schema evolution and migration
- **Conditional rules** - When rules need to be temporarily disabled
- **Testing** - When testing without certain constraints
- **Lifecycle management** - Manage constraint lifecycle

**Best practices:**
- Document why a constraint is deactivated
- Plan for reactivation of deactivated constraints
- Use deactivated for temporary situations only
- Combine with message for documentation
- Review deactivated constraints regularly

**Common pitfalls:**
- ❌ Forgetting to reactivate deactivated constraints
- ❌ Using deactivated instead of removing obsolete constraints
- ❌ Not documenting why a constraint is deactivated
- ❌ Leaving constraints deactivated indefinitely
- ❌ Confusing deactivated with other constraint features
