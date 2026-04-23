[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <mdld:shacl/example/targeting/>


# Target Objects Of {=sh:targetObjectsOf .class:TargetingMechanism label}

> Targets all objects (values) that are pointed to by a specific property. Ideal for validating referenced entities, relationship targets, and entities that are the destination of relationships. {comment}

<http://www.w3.org/ns/shacl#targetObjectsOf> {?cat:fullIRI}

---

## 📋 Quick Start Pattern

~~~~~~md
[ex] <tag:my@example.org,2026:targeting/>

### Shape Definition

**Team Member Validation Shape** {=ex:TeamMemberValidationShape .sh:NodeShape label} targets all [team members] {+ex:memberOf ?sh:targetObjectsOf} to validate team membership requirements.

**Workload Rule** {=#workloadRule .sh:PropertyShape ?sh:property} requires the [workload] {+ex:workload ?sh:path} property to be at most [40] {sh:maxInclusive ^^xsd:integer}: **Team members must not exceed 40 hours workload** {sh:message}

**Active Status Rule** {=#activeStatus .sh:PropertyShape ?sh:property} requires the [status] {+ex:status ?sh:path} property to be exactly [active] {sh:hasValue}: **Team members must be active** {sh:message}

---

### Test Data {=ex:data .Container}

#### Senior Developer {=ex:SeniorDeveloper ?member}
Workload: [45] {ex:workload ^^xsd:integer}
Status: [inactive] {ex:status}
Member Of: [EngineeringTeam] {ex:memberOf}

#### Junior Developer {=ex:JuniorDeveloper ?member}
Workload: [35] {ex:workload ^^xsd:integer}
Status: [active] {ex:status}
Member Of: [EngineeringTeam] {ex:memberOf}

#### Manager {=ex:Manager ?member}
Workload: [50] {ex:workload ^^xsd:integer}
Status: [active] {ex:status}

---

[Demo] {=ex:demo} must produce exactly **2** violations.
~~~~~~

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
