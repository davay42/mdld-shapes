[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>

# Class {=sh:class .class:Constraint label}

> Expects each value to be an instance of a specific class (RDF type) {comment}

<http://www.w3.org/ns/shacl#class> {?cat:fullIRI}

---

## 📋 Quick Start Pattern

~~~~~~md
[ex] <cat:example/class/>

### Shape Definition

**Employee manager must be a Person instance** {=ex:#managerClass .sh:PropertyShape message}
[manager] {+ex:manager ?sh:path} must be an instance of [Person] {+ex:Person ?sh:class}

---


### Test Data {=ex:data .Container}

#### Valid Employee {=ex:ValidEmployee ?member}
Manager: [john-manager] {+ex:john ?ex:manager .ex:Person}

#### Invalid Employee {=ex:InvalidEmployee ?member}
Manager: [robot-ai] {+ex:ai ?ex:manager ex:Role}

---

[Demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.
~~~~~~

---

## 📝 MDLD Syntax Patterns

The class constraint ensures that property values are instances of specific RDF classes.

~~~~~~md
# Class Constraint Pattern
**[Property] must be [Class Type] instance** {=ex:PropertyClassConstraint .sh:PropertyShape ?sh:message}

[Property Name] {+ex:propertyName ?sh:path} must be an instance of [Class Type] {+ex:ClassType ?sh:class}
~~~~~~

**Key components:**
- **Property definition** - The property to validate (`{+ex:propertyName ?sh:path}`)
- **Class reference** - The required class type (`{+ex:ClassType ?sh:class}`)
- **Validation message** - Human-readable error message (`{sh:message}`)
- **Type checking** - Ensures values have correct RDF type

**Important notes:**
- The class must be defined in the ontology or imported from another source
- Class constraint works with IRI values, not literals
- Multiple class constraints can be applied to the same property
- Empty values automatically pass class constraints (use minCount for required properties)

---

## 🎯 Use Cases

- **Employee management** - Ensure manager is a Person instance
- **Department validation** - Ensure department is a Department instance
- **Product categorization** - Ensure category is a valid Category instance

---

## 🔧 Implementation Guidelines

**When to use class:**
- **Type safety** - Ensure property values have correct RDF types
- **Referential integrity** - Validate relationships to proper entity types
- **Data quality** - Prevent incorrect type assignments
- **Schema validation** - Enforce proper RDF graph structure

**Best practices:**
- Define classes clearly in your ontology before using them
- Use descriptive class names that reflect their purpose
- Combine with minCount for required properties
- Consider using nodeKind constraint for IRI vs literal validation

**Common pitfalls:**
- ❌ Using class constraint on literal values (use nodeKind instead)
- ❌ Forgetting to define the class in the ontology
- ❌ Not combining with minCount for required properties
- ❌ Creating circular class dependencies
- ❌ Using `=` instead of `+` for property assignments
- ❌ Forgetting the `.` prefix on class names
- ❌ Using literals instead of IRIs for class instances
