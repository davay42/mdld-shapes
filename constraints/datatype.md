[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[class] <cat:class/>

# Data Type {=sh:datatype .class:Constraint label}

> Expects a literal value to have certain datatype {comment}

<http://www.w3.org/ns/shacl#datatype> {?cat:fullIRI}

---

## 📋 Quick Start Pattern

~~~~~~md
[ex] <tag:my@example.org,2026:datatype/>

**Price must be decimal** {=ex:#priceDecimal .sh:PropertyShape}
[price] {+ex:price ?sh:path} must be a [decimal] {+xsd:decimal ?sh:datatype} value.

---

### Test Data {=ex:data .Container}

#### Valid Product {=ex:ValidProduct ?member}
Price: [29.99] {ex:price ^^xsd:decimal}

#### Invalid Product {=ex:InvalidProduct ?member}
Price: [29.99] {ex:price ^^xsd:string}
~~~~~~

---

## 📝 MDLD Syntax Patterns

~~~~~~md
[Property] {+ex:propertyName ?sh:path} must be a [Datatype] {+xsd:datatype ?sh:datatype} value.
~~~~~~

**Use for:** Type safety, data quality, calculations

**Important:**
- Works with literal values only (use nodeKind for IRIs)
- Common datatypes: xsd:string, xsd:integer, xsd:decimal, xsd:boolean, xsd:date
- Combine with minCount for required properties

---

## 🔧 Implementation Guidelines

**When to use:** Ensure literal values have correct datatypes

**Best practices:**
- Use appropriate datatypes (decimal for money, integer for counts)
- Combine with minCount for required properties

**Common pitfalls:**
- ❌ Using on IRI values (use nodeKind instead)
- ❌ Forgetting to specify the datatype prefix
- ❌ Not combining with minCount for required properties
