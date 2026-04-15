[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[class] <cat:class/>
[ex] <cat:example/datatype/>
[xsd] <http://www.w3.org/2001/XMLSchema#>

# Data Type {=sh:datatype .class:Constraint label}

> Expects a literal value to have certain datatype {comment}

<http://www.w3.org/ns/shacl#datatype> {?cat:fullIRI}

---

## 📋 Quick Start Pattern

~~~~~~md
[ex] <cat:example/datatype/>

### Shape Definition

**Product price must be a decimal number** {=ex:#priceDecimal .sh:PropertyShape sh:message}
[price] {+ex:price ?sh:path} must be a [decimal] {+xsd:decimal ?sh:datatype} value.

**Product quantity must be an integer** {=ex:#quantityInteger .sh:PropertyShape sh:message}
[quantity] {+ex:quantity ?sh:path} must be an [integer] {+xsd:integer ?sh:datatype} value.

---

### Test Data {=ex:data .Container}

#### Valid Product {=ex:ValidProduct ?member}
Price: [29.99] {ex:price ^^xsd:decimal}
Quantity: [5] {ex:quantity ^^xsd:integer}

#### Invalid Product {=ex:InvalidProduct ?member}
Price: [29.99] {ex:price ^^xsd:string}
Quantity: [five] {ex:quantity ^^xsd:string}

---

[Demo] {=ex:demo} must produce exactly **2** {cat:expectsViolations ^^xsd:integer} violations.
~~~~~~

---

## 📝 MDLD Syntax Patterns

The datatype constraint validates that literal values have the correct RDF datatype.

~~~~~~md
**[Property] must be [Datatype]** {=ex:PropertyDatatypeConstraint .sh:PropertyShape sh:message}

[Property Name] {+ex:propertyName ?sh:path} must be a [Datatype] {+xsd:datatype ?sh:datatype} value.
~~~~~~

**Key components:**
- **Property path** - The property to validate (`{+ex:propertyName ?sh:path}`)
- **Datatype reference** - The required datatype (`{+xsd:datatype ?sh:datatype}`)
- **Validation message** - Human-readable error message (`{sh:message}`)
- **Type checking** - Ensures literal values have correct datatype

**Important notes:**
- Datatype constraint only works with literal values, not IRIs
- Common datatypes: `xsd:string`, `xsd:integer`, `xsd:decimal`, `xsd:boolean`, `xsd:date`
- Use `nodeKind` constraint for IRI vs literal validation
- Empty values automatically pass datatype constraints (use minCount for required properties)

---

## 🎯 Use Cases

- **Price validation** - Ensure price is decimal for calculations
- **Quantity validation** - Ensure quantity is integer
- **Date validation** - Ensure dates are proper date datatype
- **Boolean validation** - Ensure boolean properties have correct type

---

## 🔧 Implementation Guidelines

**When to use datatype:**
- **Type safety** - Ensure literal values have correct datatypes
- **Data quality** - Prevent incorrect datatype assignments
- **Calculations** - Ensure numeric values can be used in computations
- **Interoperability** - Ensure data conforms to expected types

**Best practices:**
- Use appropriate datatypes for the data (decimal for money, integer for counts)
- Combine with minCount/maxCount for required properties
- Use nodeKind constraint for IRI vs literal validation
- Test with both valid and invalid datatype examples

**Common pitfalls:**
- ❌ Using datatype constraint on IRI values (use nodeKind instead)
- ❌ Forgetting to specify the datatype prefix
- ❌ Not combining with minCount for required properties
- ❌ Using wrong datatype for the data (e.g., integer for decimal values)
- ❌ Confusing datatype with class constraint (datatype for literals, class for IRIs)
