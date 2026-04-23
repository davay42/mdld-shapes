[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>

# Advanced Shape Composition Techniques

> Learn advanced SHACL techniques for complex validation scenarios in MDLD {comment}

## Overview

Advanced SHACL techniques enable you to model complex business rules and validation requirements that go beyond simple property constraints. This guide covers shape composition, logical constraints, qualified counting, and proper test data structure.

## Key Advanced Techniques

### 1. Shape Composition with sh:node

Shape composition allows you to reuse validation logic across multiple shapes by referencing one shape within another.

~~~~~~md
**Property must conform to shape** {=ex:PropertyRule .sh:PropertyShape ?sh:property}
[propertyName] {+ex:propertyName ?sh:path} must conform to [Target Shape] {+ex:TargetShape ?sh:node}.
~~~~~~

**Use cases:**
- Reusing common validation patterns
- Nested object validation
- Complex type checking

**Important notes:**
- The referenced shape is validated independently
- All constraints in the referenced shape apply
- Can chain multiple shapes together

### 2. NOT Constraint (sh:not)

The NOT constraint prevents data from conforming to a specific shape pattern.

~~~~~~md
**Property must not conform to forbidden shape** {=ex:PropertyRule .sh:PropertyShape ?sh:property}
[propertyName] {+ex:propertyName ?sh:path} must not conform to [Forbidden Shape] {+ex:ForbiddenShape ?sh:not}.
~~~~~~

**Use cases:**
- Forbidden status values
- Preventing certain data patterns
- Business rule enforcement

**Example:**
```md
**Employee status cannot be terminated** {=ex:StatusRule .sh:PropertyShape ?sh:property}
Employee status must not conform to [Terminated Status Shape] {+ex:TerminatedStatusShape ?sh:not}.
```

### 3. Qualified Count Constraints

Qualified count constraints allow you to count only values that conform to a specific shape, enabling conditional counting.

~~~~~~md
**Property must have N values conforming to shape** {=ex:PropertyRule .sh:PropertyShape ?sh:property}
[propertyName] {+ex:propertyName ?sh:path} must have at least [N] {sh:qualifiedMinCount ^^xsd:integer} values that conform to [Qualified Shape] {=ex:QualifiedShape .sh:NodeShape ?sh:qualifiedValueShape}.
~~~~~~

**Use cases:**
- Counting only active items
- Conditional validation based on subset
- Business rules with exceptions

**Example:**
```md
**Employee must have at least 2 completed projects** {=ex:ProjectsRule .sh:PropertyShape ?sh:property}
[projects] {+ex:projects ?sh:path} must have at least [2] {sh:qualifiedMinCount ^^xsd:integer} values that conform to [Completed Project Shape] {=ex:CompletedProjectShape .sh:NodeShape ?sh:qualifiedValueShape}.
```

### 4. Multiple Constraints on Same Property

You can apply multiple constraints to the same property by combining them in a single rule.

~~~~~~md
**Property with multiple constraints** {=ex:PropertyRule .sh:PropertyShape ?sh:property}
[propertyName] {+ex:propertyName ?sh:path} must have exactly [1] {sh:minCount sh:maxCount ^^xsd:integer} value and be at least [0.01] {sh:minInclusive ^^xsd:decimal}.
~~~~~~

**Use cases:**
- Combining cardinality with value constraints
- Multi-factor validation rules
- Complex business requirements

### 5. Proper Test Data Structure

When testing advanced shapes with nested objects, use subject chaining to create proper test data.

~~~~~~md
#### Parent Entity {=ex:Parent1 .ex:Parent ?member}
Property: [value1] {+ex:Child1 ?ex:property} and [value2] {+ex:Child2 ?ex:property}

##### Child 1 {=ex:Child1 .ex:Child}
Status: [active] {ex:status}

##### Child 2 {=ex:Child2 .ex:Child}
Status: [active] {ex:status}
~~~~~~

**Key pattern:**
```
- Use `[literal] {+ex:Identifier ?property}` to link to nested objects
- Use `#####` headings to define nested objects with `{=ex:Identifier .ex:Class}`
- Use `and` to chain multiple values
```

## Complete Example

The following example demonstrates multiple advanced techniques in a single validation scenario:

~~~~~~md
[ex] <tag:my@example.org,2026:advanced/>

## Employee Validation Shape {=ex:EmployeeValidationShape .sh:NodeShape label}

Validates all [Employee] {+ex:Employee ?sh:targetClass} instances with comprehensive business rules: [department] {+ex:DepartmentRule ?sh:property sh:name}, [status] {+ex:StatusRule ?sh:property sh:name}, [projects] {+ex:ProjectsRule ?sh:property sh:name}, [salary] {+ex:SalaryRule ?sh:property sh:name}.

### Property Rules

**Employee must have valid department** {=ex:DepartmentRule .sh:PropertyShape} requires [department] {+ex:department ?sh:path} must have exactly [1] {sh:minCount sh:maxCount ^^xsd:integer} value and must be in **Allowed Departments List** {=ex:dept-l1 ?sh:in .rdf:List}: [Engineering] {rdf:first}, then [rest] {=ex:dept-l2 ?rdf:rest} by [Sales] {rdf:first} and [nil] {+rdf:nil ?rdf:rest}. {=}

**Employee status cannot be terminated** {=ex:StatusRule .sh:PropertyShape sh:message}: Employee status must not conform to [Terminated Status Shape] {+ex:TerminatedStatusShape ?sh:not}.

**Employee must have at least 2 completed projects** {=ex:ProjectsRule .sh:PropertyShape sh:message}: [projects] {+ex:projects ?sh:path} must have at least [2] {sh:qualifiedMinCount ^^xsd:integer} values that conform to [Completed Project Shape] {=ex:CompletedProjectShape .sh:NodeShape ?sh:qualifiedValueShape}.

**Salary must be positive** {=ex:SalaryRule .sh:PropertyShape sh:message}: [salary] {+ex:salary ?sh:path} must be at least [0.01] {sh:minInclusive ^^xsd:decimal}.

---

## Terminated Status Shape {=ex:TerminatedStatusShape .sh:NodeShape  label}
Defines the forbidden terminated [status] {+ex:TerminatedStatusRule ?sh:property sh:name} pattern.

**Status must be terminated** {=ex:TerminatedStatusRule .sh:PropertyShape sh:message}: [status] {+ex:status ?sh:path} must be exactly [terminated] {sh:hasValue}.

---

## Completed Project Shape {=ex:CompletedProjectShape .sh:NodeShape  label}

Validates completed projects to have completed [status] {+ex:ProjectStatusRule ?sh:property sh:name} and positive [budget] {+ex:ProjectBudgetRule ?sh:property sh:name}.

**Project must be completed** {=ex:ProjectStatusRule .sh:PropertyShape sh:message}: [status] {+ex:status ?sh:path} must be exactly [completed] {sh:hasValue}.

**Project must have positive budget** {=ex:ProjectBudgetRule .sh:PropertyShape sh:message}: [budget] {+ex:budget ?sh:path} must be at least [0.01] {sh:minInclusive ^^xsd:decimal}.

---

## Test Data {=ex:data .Container}

### Valid Employee {=ex:Employee1 .ex:Employee ?member}
Department: [Engineering] {ex:department}
Status: [active] {ex:status}
Salary: [75000.00] {ex:salary ^^xsd:decimal}
Projects: [project1] {+ex:Project1 ?ex:projects} and [project2] {+ex:Project2 ?ex:projects}

##### Project 1 {=ex:Project1 .ex:Project}
Status: [completed] {ex:status}
Budget: [50000.00] {ex:budget ^^xsd:decimal}

##### Project 2 {=ex:Project2 .ex:Project}
Status: [completed] {ex:status}
Budget: [30000.00] {ex:budget ^^xsd:decimal}

### Invalid Employee - Invalid Department {=ex:Employee2 .ex:Employee ?member}
Department: [invalid-dept] {ex:department}
Status: [active] {ex:status}
Salary: [65000.00] {ex:salary ^^xsd:decimal}
Projects: [project3] {+ex:Project3 ?ex:projects} and [project3b] {+ex:Project3b ?ex:projects}

##### Project 3 {=ex:Project3 .ex:Project}
Status: [completed] {ex:status}
Budget: [40000.00] {ex:budget ^^xsd:decimal}

##### Project 3b {=ex:Project3b .ex:Project}
Status: [completed] {ex:status}
Budget: [20000.00] {ex:budget ^^xsd:decimal}

### Invalid Employee - Terminated Status {=ex:Employee3 .ex:Employee ?member}
Department: [Engineering] {ex:department}
Status: [terminated] {ex:status}
Salary: [60000.00] {ex:salary ^^xsd:decimal}
Projects: [project4] {+ex:Project4 ?ex:projects} and [project4b] {+ex:Project4b ?ex:projects}

##### Project 4 {=ex:Project4 .ex:Project}
Status: [completed] {ex:status}
Budget: [35000.00] {ex:budget ^^xsd:decimal}

##### Project 4b {=ex:Project4b .ex:Project}
Status: [completed] {ex:status}
Budget: [15000.00] {ex:budget ^^xsd:decimal}

### Invalid Employee - Insufficient Completed Projects {=ex:Employee4 .ex:Employee ?member}
Department: [Engineering] {ex:department}
Status: [active] {ex:status}
Salary: [70000.00] {ex:salary ^^xsd:decimal}
Projects: [project5] {+ex:Project5 ?ex:projects}

##### Project 5 {=ex:Project5 .ex:Project}
Status: [completed] {ex:status}
Budget: [45000.00] {ex:budget ^^xsd:decimal}

### Invalid Employee - Negative Salary {=ex:Employee5 .ex:Employee ?member}
Department: [Engineering] {ex:department}
Status: [active] {ex:status}
Salary: [-1000.00] {ex:salary ^^xsd:decimal}
Projects: [project6] {+ex:Project6 ?ex:projects} and [project6b] {+ex:Project6b ?ex:projects}

##### Project 6 {=ex:Project6 .ex:Project}
Status: [completed] {ex:status}
Budget: [20000.00] {ex:budget ^^xsd:decimal}

##### Project 6b {=ex:Project6b .ex:Project}
Status: [completed] {ex:status}
Budget: [15000.00] {ex:budget ^^xsd:decimal}
~~~~~~

**Expected Result:** 4 violations (Employee2 fails: invalid department; Employee3 fails: terminated status (NOT constraint); Employee4 fails: only 1 completed project, needs 2; Employee5 fails: negative salary; Employee1 passes)

## Best Practices

**Shape Composition:**
- Create reusable shapes for common validation patterns
- Keep shapes focused and single-purpose
- Document shape dependencies clearly

**NOT Constraint:**
- Use for forbidden patterns rather than negative conditions
- Combine with other constraints for comprehensive rules
- Test with both valid and invalid cases

**Qualified Count:**
- Define clear criteria for qualified values
- Test boundary conditions (0, 1, N values)
- Consider performance implications for large datasets

**Test Data:**
- Always include valid test cases
- Test each constraint independently
- Use descriptive test case names
- Structure nested data with proper subject chaining

## Common Pitfalls

- **Shape cycles** - Avoid circular shape references
- **Over-composition** - Don't nest shapes too deeply
- **Ambiguous constraints** - Ensure constraints are clear and specific
- **Incomplete test coverage** - Test all constraint combinations
- **Incorrect subject chaining** - Use proper syntax for nested objects

## Next Steps


- Explore [Constraints](../constraints/index.md) for detailed constraint patterns
- Learn about [Targeting Mechanisms](../targeting/index.md) for data selection
