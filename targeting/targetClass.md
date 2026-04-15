[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <mdld:shacl/example/targeting/>


# Target Class {=sh:targetClass .class:TargetingMechanism label}

> Targets all nodes that are instances of a specific RDF class (rdf:type) for shape validation. Essential for class-based validation scenarios across entire domains. {comment}

<http://www.w3.org/ns/shacl#targetClass> {?cat:fullIRI}

---

## 📋 Quick Start Pattern

~~~~~~md
[ex] <tag:my@example.org,2026:targeting/>

### Shape Definition

**Product Validation Shape** {=ex:ProductValidationShape .sh:NodeShape label} targets all [Product] {+ex:Product ?sh:targetClass} instances to validate core product requirements.

**Product Name Rule** {=ex:#productName .sh:PropertyShape ?sh:property} requires the [name] {+ex:name ?sh:path} property to have exactly [1] {sh:minCount sh:maxCount ^^xsd:integer} value: **Product must have exactly one name** {sh:message}

**Product Price Rule** {=ex:#productPrice .sh:PropertyShape ?sh:property} requires the [price] {+ex:price ?sh:path} property to be at least [0.01] {sh:minInclusive ^^xsd:decimal}: **Product price must be positive** {sh:message}

---

### Test Data {=ex:data .Container}

#### Valid Product {=ex:Laptop .ex:Product ?member}
Name: [MacBook Pro] {ex:name}
Price: [1299.99] {ex:price ^^xsd:decimal}

#### Invalid Product {=ex:InvalidProduct .ex:Product ?member}
Price: [-50.00] {ex:price ^^xsd:decimal}

#### Service {=ex:Service .ex:Service ?member}
Name: [Consulting] {ex:name}
Price: [200.00] {ex:price ^^xsd:decimal}

---

[Demo] {=ex:demo} must produce exactly **2** violations.
~~~~~~

---

## 📝 MDLD Syntax Patterns

Target class targets all nodes that are instances of a specific RDF class for shape validation.

~~~~~~md
**[Shape] targets [Class] instances** {=ex:ShapeName .sh:NodeShape label}

[Shape Name] {=ex:ShapeName .sh:NodeShape label} targets all [Class] {+ex:Class ?sh:targetClass} instances to validate requirements.
~~~~~~

**Key components:**
- **Shape declaration** - The shape being defined (`{=ex:ShapeName .sh:NodeShape label}`)
- **Target class** - The class to target (`{+ex:Class ?sh:targetClass}`)
- **Validation rules** - Property constraints within the shape
- **Class-based selection** - Validates all instances of the specified class

**Important notes:**
- Target class validates all instances of the specified class
- Ideal for domain-wide validation rules
- Works with rdf:type relationships
- Combine with targeting mechanisms for complex scenarios
- Use for consistent validation across class instances

---

## 🎯 Use Cases

- **Domain validation** - Validate all instances of a domain class
- **Business rules** - Enforce class-specific business requirements
- **Data quality** - Ensure data consistency across class instances
- **Schema enforcement** - Apply validation rules to entire class hierarchies
- **Compliance** - Validate regulatory requirements for specific entity types

---

## 🔧 Implementation Guidelines

**When to use target class:**
- **Domain-wide validation** - When validating entire classes of entities
- **Business rules** - Enforce class-specific business requirements
- **Data quality** - Ensure consistency across class instances
- **Schema enforcement** - Apply validation to class hierarchies
- **Compliance** - Validate regulatory requirements

**Best practices:**
- Use descriptive shape names that reflect the target class
- Combine with other targeting mechanisms for complex scenarios
- Test with valid and invalid instances
- Document the validation scope clearly
- Consider performance for large class instances

**Common pitfalls:**
- ❌ Forgetting that target class validates all instances
- ❌ Not testing with instances outside the target class
- ❌ Confusing target class with target node
- ❌ Not considering performance for large datasets
- ❌ Overusing target class when target node would be more appropriate
