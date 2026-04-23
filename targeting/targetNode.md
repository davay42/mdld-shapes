[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <mdld:shacl/example/targeting/>


# Target Node {=sh:targetNode .class:TargetingMechanism label}

> Targets specific individual nodes identified by their IRI for precise, node-by-node validation. Perfect for critical infrastructure, testing scenarios, and executive-level validation. {comment}

<http://www.w3.org/ns/shacl#targetNode> {?cat:fullIRI}

---

## 📋 Quick Start Pattern

The targetNode constraint targets specific individual nodes for validation. This example demonstrates critical infrastructure and executive validation scenarios.

~~~~~~md
[ex] <mdld:shacl/example/targeting/>

## Critical Infrastructure Demo

The **Database Validation Shape** {=ex:DatabaseValidationShape .sh:NodeShape ?cat:hasShape label} targets the [Main Database] {+ex:MainDatabase ?sh:targetNode} for critical infrastructure validation: [status] {+#databaseStatus ?sh:property sh:name} and [uptime] {+#databaseUptime ?sh:property sh:name}.

**Main database must be online** {=#databaseStatus .sh:PropertyShape sh:message} requires the [status] {+ex:status ?sh:path} property to be exactly [online] {sh:hasValue}.

**Database uptime must be at least 99.9%** {=#databaseUptime .sh:PropertyShape sh:message} that requires the [uptime] {+ex:uptime ?sh:path} property to be at least [99.9] {sh:minInclusive ^^xsd:decimal}.

## Executive Validation Demo

**CEO Validation Shape** {=ex:CEOValidationShape .sh:NodeShape ?cat:hasShape label} targets the [CEO] {+ex:CEO ?sh:targetNode} for [executive] {+#executiveClearance ?sh:property sh:name} level clearance.

**CEO must have top-secret security clearance** {=#executiveClearance .sh:PropertyShape sh:message} requires the [securityClearance] {+ex:securityClearance ?sh:path} property to be exactly [top-secret] {sh:hasValue}.

---

## Test Data {=ex:data .Container}

### Main Database {=ex:MainDatabase}
Status: [offline] {ex:status}
Uptime: [95.5] {ex:uptime ^^xsd:decimal}

### Backup Database {=ex:BackupDatabase}
Status: [online] {ex:status}
Uptime: [99.8] {ex:uptime ^^xsd:decimal}

### CEO {=ex:CEO}
Security Clearance: [secret] {ex:securityClearance}

### CFO {=ex:CFO}
Security Clearance: [secret] {ex:securityClearance}
~~~~~~

**Expected Result:** 3 violations (MainDatabase fails twice: status offline AND uptime < 99.9%; CEO fails: clearance is secret not top-secret; BackupDatabase and CFO not validated as they're not targeted)

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
