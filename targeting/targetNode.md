[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <mdld:shacl/example/targeting/>


# Target Node {=sh:targetNode .class:TargetingMechanism label}

> Targets specific individual nodes identified by their IRI for precise, node-by-node validation. Perfect for critical infrastructure, testing scenarios, and executive-level validation. {comment}

<http://www.w3.org/ns/shacl#targetNode> {?cat:fullIRI}

---

## 📋 Quick Start Pattern

~~~~~~md
[ex] <tag:my@example.org,2026:targeting/>

### Shape Definition

**Database Validation Shape** {=ex:DatabaseValidationShape .sh:NodeShape label} targets the [Main Database] {+ex:MainDatabase ?sh:targetNode} for critical infrastructure validation.

**Database Status Rule** {=ex:#databaseStatus .sh:PropertyShape ?sh:property} requires the [status] {+ex:status ?sh:path} property to be exactly [online] {sh:hasValue}: **Main database must be online** {sh:message}

**Database Uptime Rule** {=ex:#databaseUptime .sh:PropertyShape ?sh:property} requires the [uptime] {+ex:uptime ?sh:path} property to be at least [99.9] {sh:minInclusive ^^xsd:decimal}: **Database uptime must be at least 99.9%** {sh:message}

---

### Test Data {=ex:data .Container}

#### Main Database {=ex:MainDatabase ?member}
Status: [offline] {ex:status}
Uptime: [95.5] {ex:uptime ^^xsd:decimal}

#### Backup Database {=ex:BackupDatabase ?member}
Status: [online] {ex:status}
Uptime: [99.8] {ex:uptime ^^xsd:decimal}

---

[Demo] {=ex:demo} must produce exactly **2** violations.
~~~~~~

---

## 📝 MDLD Syntax Patterns

Target node targets specific individual nodes identified by their IRI for precise validation.

~~~~~~md
**[Shape] targets [Node]** {=ex:ShapeName .sh:NodeShape label}

[Shape Name] {=ex:ShapeName .sh:NodeShape label} targets the [Node] {+ex:Node ?sh:targetNode} for validation.
~~~~~~

**Key components:**
- **Shape declaration** - The shape being defined (`{=ex:ShapeName .sh:NodeShape label}`)
- **Target node** - The specific node to target (`{+ex:Node ?sh:targetNode}`)
- **Validation rules** - Property constraints within the shape
- **Node-specific selection** - Validates only the specified node

**Important notes:**
- Target node validates only the specified individual node
- Ideal for critical infrastructure and executive validation
- Provides precise control over validation scope
- Use for testing specific scenarios
- Combine with other targeting mechanisms for complex scenarios

---

## 🎯 Use Cases

- **Critical infrastructure** - Validate critical systems and infrastructure
- **Executive validation** - Validate executive-level entities
- **Testing scenarios** - Test specific nodes in isolation
- **Compliance** - Validate specific regulatory entities
- **Quality assurance** - Validate specific production nodes

---

## 🔧 Implementation Guidelines

**When to use target node:**
- **Critical infrastructure** - When validating specific critical systems
- **Executive validation** - When validating executive-level entities
- **Testing** - When testing specific nodes in isolation
- **Compliance** - When validating specific regulatory entities
- **Quality assurance** - When validating specific production nodes

**Best practices:**
- Use descriptive node identifiers for clarity
- Combine with target class for comprehensive validation
- Test with valid and invalid node states
- Document why specific nodes are targeted
- Consider using target class for broader validation

**Common pitfalls:**
- ❌ Forgetting that target node validates only one specific node
- ❌ Overusing target node when target class would be more appropriate
- ❌ Not testing with nodes outside the target
- ❌ Confusing target node with target class
- ❌ Not documenting why specific nodes are targeted
