[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>

# Disjoint {=sh:disjoint .class:DisjointConstraint label}

> Ensures that values of a property are disjoint with values of another property {comment}

<http://www.w3.org/ns/shacl#disjoint> {?cat:fullIRI}

---

## 📋 Quick Start Pattern

~~~~~~md
[ex] <tag:my@example.org,2026:disjoint/>

**Preferred labels must be different from alternative labels** {=ex:DisjointExampleShape .sh:NodeShape}
[preferred labels] {+ex:prefLabel ?sh:path} must be [disjoint] {+ex:altLabel ?sh:disjoint} with [alternative labels].

---

### Test Data {=ex:data .Container}

#### Valid Case {=ex:USA ?member}
Preferred Label: [USA] {ex:prefLabel}
Alternative Label: [United States] {ex:altLabel}

#### Invalid Case {=ex:Germany ?member}
Preferred Label: [Germany] {ex:prefLabel}
Alternative Label: [Germany] {ex:altLabel}
~~~~~~

---

## 📝 MDLD Syntax Patterns

~~~~~~md
[Property] {+ex:propertyName ?sh:path} must be [disjoint] {+ex:otherProperty ?sh:disjoint} with [Other Property].
~~~~~~

**Use for:** Label validation, category separation, mutually exclusive attributes

**Important:**
- Prevents any value from appearing in both properties
- Works with both literal values and IRIs
- Both properties must be present

---

## 🔧 Implementation Guidelines

**When to use:** Properties must not share values

**Best practices:**
- Use for mutually exclusive properties
- Test with overlapping and non-overlapping values

**Common pitfalls:**
- ❌ Using disjoint when properties should be related
- ❌ Forgetting both properties must be present
