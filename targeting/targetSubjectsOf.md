[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <mdld:shacl/example/targeting/>


# Target Subjects Of {=sh:targetSubjectsOf .class:TargetingMechanism label}

> Targets all subjects (nodes) that have a specific property pointing to any value. Useful for reverse relationship targeting, source validation, and validating entities that initiate relationships. {comment}

<http://www.w3.org/ns/shacl#targetSubjectsOf> {?cat:fullIRI}

---

## 📋 Quick Start Pattern

The targetSubjectsOf constraint targets all subjects (nodes) that have a specific property pointing to any value. This example demonstrates management and approval scenarios where we validate entities that initiate relationships.

~~~~~~md
[ex] <mdld:shacl/example/targeting/>

## Management Validation Demo

The **Manager Validation Shape** {=ex:ManagerValidationShape .sh:NodeShape label} targets all [managers] {+ex:manages ?sh:targetSubjectsOf} of the manages relationship to validate management requirements: [level] {+#managementLevel ?sh:property sh:name} and [teamSize] {+#teamSize ?sh:property sh:name}.

**Managers must have level 3 or higher** {=#managementLevel .sh:PropertyShape sh:message} requires the [level] {+ex:level ?sh:path} property to be at least [3] {sh:minInclusive ^^xsd:integer}.

**Managers can oversee at most 10 team members** {=#teamSize .sh:PropertyShape sh:message} that requires the [teamSize] {+ex:teamSize ?sh:path} property to be at most [10] {sh:maxInclusive ^^xsd:integer}.

## Approval Validation Demo

**Approver Validation Shape** {=ex:ApproverValidationShape .sh:NodeShape label} targets all [approvers] {+ex:approves ?sh:targetSubjectsOf} of the approves relationship to validate approval [authority] {+#approvalAuthority ?sh:property sh:name}.

**Approvers must have authority level 2 or higher** {=#approvalAuthority .sh:PropertyShape sh:message} requires the [authority] {+ex:authority ?sh:path} property to be at least [2] {sh:minInclusive ^^xsd:integer}.

---

## Test Data {=ex:data .Container}

### Engineering Manager {=ex:EngineeringManager}
Level: [2] {ex:level ^^xsd:integer}
Team Size: [15] {ex:teamSize ^^xsd:integer}
Manages: [EngineeringTeam] {ex:manages}

### Senior Manager {=ex:SeniorManager}
Level: [4] {ex:level ^^xsd:integer}
Team Size: [8] {ex:teamSize ^^xsd:integer}
Manages: [QATeam] {ex:manages}

### Junior Developer {=ex:JuniorDeveloper}
Level: [1] {ex:level ^^xsd:integer}
Team Size: [0] {ex:teamSize ^^xsd:integer}

### Finance Approver {=ex:FinanceApprover}
Authority: [1] {ex:authority ^^xsd:integer}
Approves: [ExpenseReport] {ex:approves}

### Executive Approver {=ex:ExecutiveApprover}
Authority: [3] {ex:authority ^^xsd:integer}
Approves: [BudgetRequest] {ex:approves}

### Regular Employee {=ex:RegularEmployee}
Authority: [0] {ex:authority ^^xsd:integer}
~~~~~~

**Expected Result:** 3 violations (EngineeringManager fails twice: level < 3 AND teamSize > 10; FinanceApprover fails: authority < 2; JuniorDeveloper and RegularEmployee not validated as they don't initiate the relationships)

---

## 📝 MDLD Syntax Patterns

Target subjects of targets all subjects that have a specific property pointing to any value.

~~~~~~md
**[Shape] targets subjects of [Property]** {=ex:ShapeName .sh:NodeShape label}

[Shape Name] {=ex:ShapeName .sh:NodeShape label} targets all subjects of [Property] {+ex:property ?sh:targetSubjectsOf} to validate requirements.
~~~~~~

**Key components:**
- **Shape declaration** - The shape being defined (`{=ex:ShapeName .sh:NodeShape label}`)
- **Target property** - The property to target subjects of (`{+ex:property ?sh:targetSubjectsOf}`)
- **Validation rules** - Property constraints within the shape
- **Subject-based selection** - Validates entities that initiate relationships

**Important notes:**
- Target subjects of validates entities that initiate relationships
- Ideal for management, approval, and source validation
- Works in reverse direction of the property
- Use for validating relationship sources
- Combine with other targeting mechanisms for complex scenarios

---

## 🎯 Use Cases

- **Management validation** - Validate managers who manage teams
- **Approval validation** - Validate approvers who approve requests
- **Source validation** - Validate entities that initiate relationships
- **Reverse relationship targeting** - Target based on outgoing relationships
- **Business rules** - Enforce rules on relationship initiators

---

## 🔧 Implementation Guidelines

**When to use target subjects of:**
- **Management validation** - When validating managers or supervisors
- **Approval validation** - When validating approvers or authorizers
- **Source validation** - When validating relationship sources
- **Reverse targeting** - When targeting based on outgoing relationships
- **Business rules** - When enforcing rules on relationship initiators

**Best practices:**
- Use descriptive property names for clarity
- Combine with target objects of for bidirectional validation
- Test with entities that do and don't have the property
- Document the relationship direction clearly
- Consider performance for large relationship graphs

**Common pitfalls:**
- ❌ Confusing target subjects of with target objects of
- ❌ Forgetting that it targets relationship sources, not destinations
- ❌ Not testing with entities that don't have the property
- ❌ Not considering the direction of the relationship
- ❌ Overusing when target class would be more appropriate
