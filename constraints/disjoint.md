[mdld] <https://mdld.js.org/vocab/>
[cat] <https://mdld.js.org/shacl/catalog/>
[ex] <http://example.org/>


# Disjoint Constraint {=sh:disjoint .class:DisjointConstraint label}

> Ensures that values of a property are disjoint with values of another property. Essential for preventing value overlap between related properties like labels, categories, or mutually exclusive attributes. {comment}

<http://www.w3.org/ns/shacl#disjoint> {?cat:fullIRI}

---

## 📋 Quick Start Pattern

~~~~~~md
[ex] <tag:my@example.org,2026:disjoint/>

### Shape Definition

**Preferred labels must be different from alternative labels** {=ex:DisjointExampleShape .sh:NodeShape label sh:message}
[preferred labels] {+ex:prefLabel ?sh:path} must be [disjoint] {+ex:altLabel ?sh:disjoint} with [alternative labels].

---

### Test Data {=ex:data .Container}

#### Valid Case - USA {=ex:USA ?member}
Preferred Label: [USA] {ex:prefLabel}
Alternative Label: [United States] {ex:altLabel}

#### Invalid Case - Germany {=ex:Germany ?member}
Preferred Label: [Germany] {ex:prefLabel}
Alternative Label: [Germany] {ex:altLabel}

---

[Demo] {=ex:demo} must produce exactly **1** violation.
~~~~~~

---

## 📝 MDLD Syntax Patterns

The disjoint constraint ensures that values of a property are disjoint with values of another property.

~~~~~~md
**[Property] must be disjoint with [Other Property]** {=ex:PropertyDisjointConstraint .sh:PropertyShape sh:message}

[Property Name] {+ex:propertyName ?sh:path} must be [disjoint] {+ex:otherProperty ?sh:disjoint} with [Other Property Name].
~~~~~~

**Key components:**
- **Property path** - The property to validate (`{+ex:propertyName ?sh:path}`)
- **Disjoint reference** - The property to be disjoint with (`{+ex:otherProperty ?sh:disjoint}`)
- **Validation message** - Human-readable error message (`{sh:message}`)
- **Value separation** - Ensures no value overlap between properties

**Important notes:**
- Prevents any value from appearing in both properties
- Works with both literal values and IRIs
- Both properties must be present for validation
- Useful for mutually exclusive attributes
- Ensures data integrity and prevents redundancy

---

## 🎯 Use Cases

- **Label validation** - Ensure preferred and alternative labels are different
- **Category separation** - Prevent category overlap
- **Mutually exclusive attributes** - Ensure properties don't share values
- **Data integrity** - Prevent value duplication
- **Business rules** - Enforce separation constraints

---

## 🔧 Implementation Guidelines

**When to use disjoint:**
- **Mutually exclusive values** - When properties must not share values
- **Label management** - Ensure distinct labels
- **Category validation** - Prevent category overlap
- **Data integrity** - Prevent value duplication
- **Business rules** - Enforce separation constraints

**Best practices:**
- Use for properties that should never share values
- Combine with other constraints for complete validation
- Test with overlapping and non-overlapping values
- Document why properties must be disjoint
- Consider cardinality constraints alongside disjoint

**Common pitfalls:**
- ❌ Using disjoint when properties should be related
- ❌ Not testing with overlapping values
- ❌ Forgetting that both properties must be present
- ❌ Not combining with other constraints
- ❌ Confusing disjoint with other property pair constraints
