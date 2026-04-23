[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <mdld:shacl/example/targeting/>


# Target Objects Of {=sh:targetObjectsOf .class:TargetingMechanism label}

> Targets all objects (values) that are pointed to by a specific property. Ideal for validating referenced entities, relationship targets, and entities that are the destination of relationships. {comment}

<http://www.w3.org/ns/shacl#targetObjectsOf> {?cat:fullIRI}

---

## 📋 Quick Start Pattern

The targetObjectsOf constraint targets all objects (nodes) that are referenced by a specific property. This example demonstrates team membership and product reference scenarios where we validate entities that are referenced by others.

~~~~~~md
[ex] <mdld:shacl/example/targeting/>

## Team Membership Demo

The **Team Member Validation Shape** {=ex:TeamMemberValidationShape .sh:NodeShape label} targets all [team members] {+ex:memberOf ?sh:targetObjectsOf} to validate team membership requirements: [workload] {+#workloadRule ?sh:property sh:name} and [status] {+#activeStatus ?sh:property sh:name}.

**Team members must not exceed 40 hours workload** {=#workloadRule .sh:PropertyShape sh:message} requires the [workload] {+ex:workload ?sh:path} property to be at most [40] {sh:maxInclusive ^^xsd:integer}.

**Team members must be active** {=#activeStatus .sh:PropertyShape sh:message} that requires the [status] {+ex:status ?sh:path} property to be exactly [active] {sh:hasValue}.

## Product Reference Demo

**Referenced Product Validation Shape** {=ex:ReferencedProductValidationShape .sh:NodeShape label} targets all [referenced products] {+ex:references ?sh:targetObjectsOf} to validate product reference requirements: [availability] {+#productAvailability ?sh:property sh:name} and [price] {+#productPrice ?sh:property sh:name}.

**Referenced products must be available** {=#productAvailability .sh:PropertyShape sh:message} requires the [available] {+ex:available ?sh:path} property to be exactly [true] {sh:hasValue}.

**Referenced products must cost $1000 or less** {=#productPrice .sh:PropertyShape sh:message} that requires the [price] {+ex:price ?sh:path} property to be at most [1000.00] {sh:maxInclusive ^^xsd:decimal}.

---

## Test Data {=ex:data .Container}

### EngineeringTeam {=ex:EngineeringTeam}
Workload: [45] {ex:workload ^^xsd:integer}
Status: [inactive] {ex:status}

### QATeam {=ex:QATeam}
Workload: [35] {ex:workload ^^xsd:integer}
Status: [active] {ex:status}

### Senior Developer {=ex:SeniorDeveloper}
Member Of: [Engineering team] {+ex:EngineeringTeam ?ex:memberOf}

### Junior Developer {=ex:JuniorDeveloper}
Member Of: [QATeam] {+ex:QATeam ?ex:memberOf}

### Expensive Product {=ex:ExpensiveProduct}
Price: [1500.00] {ex:price ^^xsd:decimal}
Available: [false] {ex:available}

### Affordable Product {=ex:AffordableProduct}
Price: [299.99] {ex:price ^^xsd:decimal}
Available: [true] {ex:available}

### Order123 {=ex:Order123}
References: [Expensive product] {+ex:ExpensiveProduct ?ex:references}

### Order456 {=ex:Order456}
References: [Affordable product] {+ex:AffordableProduct ?ex:references}
~~~~~~

**Expected Result:** 4 violations (EngineeringTeam fails twice: workload > 40 AND status inactive; ExpensiveProduct fails twice: price > 1000 AND unavailable; QATeam and AffordableProduct pass; developers and orders not validated as they're subjects, not objects)

---

## 📝 MDLD Syntax Patterns

Target objects of targets all objects that are pointed to by a specific property.

~~~~~~md
**[Shape] targets objects of [Property]** {=ex:ShapeName .sh:NodeShape label}

[Shape Name] {=ex:ShapeName .sh:NodeShape label} targets all objects of [Property] {+ex:property ?sh:targetObjectsOf} to validate requirements.
~~~~~~

**Key components:**
- **Shape declaration** - The shape being defined (`{=ex:ShapeName .sh:NodeShape label}`)
- **Target property** - The property to target objects of (`{+ex:property ?sh:targetObjectsOf}`)
- **Validation rules** - Property constraints within the shape
- **Object-based selection** - Validates entities that are referenced by others

**Important notes:**
- Target objects of validates entities that are referenced by others
- Ideal for team membership, product references, and destination validation
- Works in forward direction of the property
- Use for validating relationship destinations
- Combine with other targeting mechanisms for complex scenarios

---

## 🎯 Use Cases

- **Team membership validation** - Validate team members referenced by teams
- **Product reference validation** - Validate products referenced by orders
- **Destination validation** - Validate entities that are relationship targets
- **Referenced entity validation** - Validate entities referenced by others
- **Business rules** - Enforce rules on relationship destinations

---

## 🔧 Implementation Guidelines

**When to use target objects of:**
- **Team membership** - When validating team members
- **Product references** - When validating referenced products
- **Destination validation** - When validating relationship targets
- **Referenced entities** - When validating entities referenced by others
- **Business rules** - When enforcing rules on relationship destinations

**Best practices:**
- Use descriptive property names for clarity
- Combine with target subjects of for bidirectional validation
- Test with entities that do and don't have the property
- Document the relationship direction clearly
- Consider performance for large relationship graphs

**Common pitfalls:**
- ❌ Confusing target objects of with target subjects of
- ❌ Forgetting that it targets relationship destinations, not sources
- ❌ Not testing with entities that don't have the property
- ❌ Not considering the direction of the relationship
- ❌ Overusing when target class would be more appropriate
