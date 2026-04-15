[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>

# Choosing the Right Constraint

> A decision guide for selecting appropriate SHACL constraints for your validation needs {comment}

## Quick Decision Tree

**What do you need to validate?**

### Property Existence
- **Property must be present** → Use `sh:minCount` with value `1`
- **Property must have exactly one value** → Use both `sh:minCount` and `sh:maxCount` with value `1`
- **Property can have multiple values** → Use `sh:maxCount` to set upper limit

### Property Values
- **Value must be a specific constant** → Use `sh:hasValue`
- **Value must be from a predefined list** → Use `sh:in` (enumeration)
- **Value must be a specific type (IRI)** → Use `sh:class`
- **Value must be a specific type (literal)** → Use `sh:datatype`
- **Value must be IRI or literal** → Use `sh:nodeKind`

### Numeric Values
- **Value must be within a range** → Use `sh:minInclusive`/`sh:maxInclusive` or `sh:minExclusive`/`sh:maxExclusive`
- **Value must be positive** → Use `sh:minInclusive` with `0` or `0.01`
- **Value must be less than another property** → Use `sh:lessThan`

### String Values
- **String must have minimum/maximum length** → Use `sh:minLength`/`sh:maxLength`
- **String must match a pattern** → Use `sh:pattern`
- **String must have specific language tag** → Use `sh:languageIn`

### Complex Objects
- **Property value must conform to a shape** → Use `sh:node` (nested validation)
- **Property values must be unique in some way** → Use `sh:qualifiedMinCount`/`sh:qualifiedMaxCount`

### Relationships Between Properties
- **Properties must have disjoint values** → Use `sh:disjoint`
- **Properties must be equal** → Use `sh:equals`
- **One property must be before another** → Use `sh:lessThan`

### Logical Combinations
- **All conditions must pass** → Use `sh:and`
- **Condition must not pass** → Use `sh:not`

### Metadata
- **Add custom error message** → Use `sh:message`
- **Set violation severity** → Use `sh:severity`
- **Temporarily disable constraint** → Use `sh:deactivated`

## Common Validation Scenarios

### Required Field
```md
[Property] {+ex:propertyName ?sh:path} must have exactly [1] {sh:minCount sh:maxCount ^^xsd:integer} value.
```

### Email Validation
```md
[Property] {+ex:propertyName ?sh:path} must match [pattern] {sh:pattern}.
```

### Positive Number
```md
[Property] {+ex:propertyName ?sh:path} must be at least [0] {sh:minInclusive ^^xsd:decimal}.
```

### Enumerated Values
```md
[Property] {+ex:propertyName ?sh:path} must be in allowed list.
**Allowed List** {=ex:list ?sh:in .rdf:List}: [value1] {rdf:first}, then [rest] {=ex:rest ?rdf:rest} by [value2] {rdf:first} and [nil] {+rdf:nil ?rdf:rest}. {=}
```

### Date Range
```md
[Property] {+ex:propertyName ?sh:path} must be at least [min-date] {sh:minInclusive ^^xsd:date} and at most [max-date] {sh:maxInclusive ^^xsd:date}.
```

## Constraint Groups Reference

- **Value Type**: class, datatype, nodeKind
- **Cardinality**: minCount, maxCount
- **Value Range**: minInclusive, maxInclusive, minExclusive, maxExclusive
- **String**: minLength, maxLength, pattern, languageIn
- **Property Pair**: equals, disjoint, lessThan
- **Logical**: and, not
- **Shape-based**: node
- **Other**: hasValue, in, qualifiedMinCount, qualifiedMaxCount

See [Constraints](../constraints/index.md) for detailed documentation on each constraint.
