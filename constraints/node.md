[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <mdld:shacl/example/node/>
[xsd] <http://www.w3.org/2001/XMLSchema#>

# Node Constraint {=sh:node .class:NodeConstraint label}

> Requires property values to conform to a specific node shape. Essential for validating complex nested objects and ensuring structural integrity of related entities. {comment}

<http://www.w3.org/ns/shacl#node> {?cat:fullIRI}

---

## 📋 Quick Start Pattern

~~~~~~md
[ex] <mdld:shacl/example/node/>

### Shape Definition

**Employee must have valid address** {=ex:#addressRule .sh:PropertyShape ?sh:property sh:message}
Each [address] {+ex:address ?sh:path} must conform to [Address Shape] {+ex:AddressShape ?sh:node}.

#### Address Shape {=ex:AddressShape .sh:NodeShape label}
**Street Rule** {=ex:#streetProperty .sh:PropertyShape} validates [street] {+ex:street ?sh:path} with at least [5] {sh:minLength ^^xsd:integer} characters.
**City Rule** {=ex:#cityProperty .sh:PropertyShape} validates [city] {+ex:city ?sh:path} with at least [2] {sh:minLength ^^xsd:integer} characters.

---

### Test Data {=ex:data .Container}

#### Valid Employee {=ex:ValidEmployee .ex:Employee ?member}
Name: [John Doe] {ex:name}
Address: [Valid Address] {=ex:ValidAddress .ex:Address ?ex:address}
Street: [Main Street] {ex:street}
City: [New York] {ex:city}

#### Invalid Employee {=ex:InvalidEmployee .ex:Employee ?member}
Name: [Jane Smith] {ex:name}
Address: [Short Address] {=ex:ShortAddress .ex:Address ?ex:address}
Street: [St] {ex:street}
City: [NY] {ex:city}

---

[Demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.
~~~~~~

---

## 📝 MDLD Syntax Patterns

The node constraint requires property values to conform to a specific node shape.

~~~~~~md
**[Property] must conform to [Shape]** {=ex:PropertyNodeConstraint .sh:PropertyShape ?sh:property sh:message}

[Property Name] {+ex:propertyName ?sh:path} must conform to [Shape Name] {+ex:ShapeName ?sh:node}.
~~~~~~

**Key components:**
- **Property path** - The property to validate (`{+ex:propertyName ?sh:path}`)
- **Node shape reference** - The shape to conform to (`{+ex:ShapeName ?sh:node}`)
- **Shape definition** - Define the referenced shape with its constraints
- **Validation message** - Human-readable error message (`{sh:message}`)
- **Structural validation** - Validates nested object structure

**Important notes:**
- Only applies to node values (IRIs/blank nodes), not literal values
- The referenced shape must be defined in the ontology
- Enables validation of complex nested objects
- Use for structural integrity of related entities
- Combine with other constraints for complete validation

---

## 🎯 Use Cases

- **Nested object validation** - Validate address, contact info structures
- **Complex data models** - Ensure nested entities conform to shapes
- **Structural integrity** - Validate related entity structures
- **Composite objects** - Validate multi-part data structures
- **Relationship validation** - Ensure related nodes conform to shapes

---

## 🔧 Implementation Guidelines

**When to use node:**
- **Nested validation** - When property values are complex objects
- **Structural integrity** - Ensure related entities have correct structure
- **Complex data models** - Validate nested object hierarchies
- **Composite objects** - Validate multi-part data structures
- **Relationship validation** - Ensure related nodes conform to shapes

**Best practices:**
- Define referenced shapes clearly with their constraints
- Use descriptive shape names for clarity
- Combine with other constraints for complete validation
- Test with both valid and invalid nested structures
- Document the structure being validated

**Common pitfalls:**
- ❌ Forgetting that node constraint only applies to nodes, not literals
- ❌ Not defining the referenced shape
- ❌ Creating circular dependencies between shapes
- ❌ Not combining with other constraints for complete validation
- ❌ Confusing node constraint with class constraint (node for structure, class for type)
