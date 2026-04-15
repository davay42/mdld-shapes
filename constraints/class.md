[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>

# Class {=sh:class .class:Constraint label}

> Expects each value to be an instance of a specific class (RDF type) {comment}

<http://www.w3.org/ns/shacl#class> {?cat:fullIRI}

---

## 📋 Quick Start Pattern

~~~~~~md
[ex] <tag:my@example.org,2026:class/>

**Manager must be a Person instance** {=ex:#managerClass .sh:PropertyShape}
[manager] {+ex:manager ?sh:path} must be an instance of [Person] {+ex:Person ?sh:class}

---

### Test Data {=ex:data .Container}

#### Valid Employee {=ex:ValidEmployee ?member}
Manager: [john] {+ex:john ?ex:manager .ex:Person}

#### Invalid Employee {=ex:InvalidEmployee ?member}
Manager: [robot] {+ex:robot ?ex:manager ex:Role}
~~~~~~

---

## 📝 MDLD Syntax Patterns

~~~~~~md
[Property] {+ex:propertyName ?sh:path} must be an instance of [Class] {+ex:Class ?sh:class}
~~~~~~

**Use for:** Type safety, referential integrity, data quality

**Important:**
- Works with IRI values only (use nodeKind for literals)
- Class must be defined in ontology
- Combine with minCount for required properties

---

## 🔧 Implementation Guidelines

**When to use:** Ensure property values have correct RDF types

**Best practices:**
- Define classes in ontology first
- Use descriptive class names
- Combine with minCount for required properties

**Common pitfalls:**
- ❌ Using on literal values (use nodeKind instead)
- ❌ Forgetting to define the class
- ❌ Not combining with minCount for required properties
