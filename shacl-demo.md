<a id="index.demo"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[class] <cat:class/>

# MDLD SHACL Demos {=cat:index .Container label}

> Demo files for SHACL validation in MDLD - test data, shapes, and validation scenarios for development and testing. {?comment}

This catalog contains demo files with test data and expected violations for all SHACL constraints and targeting mechanisms.

## Contents

[Targeting Demos](#targeting-index.demo)
[Constraint Demos](#constraints-index.demo)






{=}



<a id="targeting-index.demo"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[class] <cat:class/>

# Demo Catalog {=cat:index}

## Targeting Mechanism Demos

Demo files for SHACL targeting predicates that determine which nodes get validated:

- [Target Class Demo](#targeting-targetclass.demo)
- [Target Node Demo](#targeting-targetnode.demo)
- [Target Subjects Demo](#targeting-targetsubjectsof.demo)
- [Target Objects Demo](#targeting-targetobjectsof.demo)






{=}



<a id="targeting-targetclass.demo"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <mdld:shacl/example/targeting/>


# Target Class {=sh:targetClass .class:TargetingMechanism label} Demo

## Demo {=ex:demo ?cat:hasDemo}

This demo demonstrates class-based targeting using a product management scenario where all Product instances are validated for business requirements.

The **Product Validation Shape** {=ex:ProductValidationShape .sh:NodeShape ?cat:hasShape label} targets all [Product] {+ex:Product ?sh:targetClass} instances to validate core product requirements.

**Product Name Rule** {=ex:#productName .sh:PropertyShape ?sh:property} requires the [name] {+ex:name ?sh:path} property to have exactly [1] {sh:minCount sh:maxCount ^^xsd:integer} value: **Product must have exactly one name** {sh:message}

[The shape] {=ex:ProductValidationShape} also has **Product Price Rule** {=ex:#productPrice .sh:PropertyShape ?sh:property} that requires the [price] {+ex:price ?sh:path} property to be at least [0.01] {sh:minInclusive ^^xsd:decimal}: **Product price must be positive** {sh:message}

---

### 📋 Test Data {=ex:data .Container}

#### Laptop {=ex:Laptop .ex:Product}

A valid product with name and positive price.

Name: [MacBook Pro] {ex:name}
Price: [1299.99] {ex:price ^^xsd:decimal}

#### Invalid Product {=ex:InvalidProduct .ex:Product}

A product with missing name and negative price.

Price: [-50.00] {ex:price ^^xsd:decimal}

#### Service {=ex:Service .ex:Service}

A service that shouldn't be targeted by product validation.

Name: [Consulting] {ex:name}
Price: [200.00] {ex:price ^^xsd:decimal}

---

{=ex:demo} must produce exactly **2** {cat:expectsViolations ^^xsd:integer} violations.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Laptop** - passes (has name and positive price)
2. **Invalid Product** - fails twice (missing name AND negative price)
3. **Service** - not validated (not a Product, so not targeted by class-based validation)

Note: Class-based targeting validates all instances of the specified class, making it ideal for domain-wide validation rules.

### 🔍 Test Validation

```bash
# This should show 2 violations - missing name and negative price
ig-cli validate ./targeting/targetClass.md
```

---






{=}



<a id="targeting-targetnode.demo"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <mdld:shacl/example/targeting/>


# Target Node {=sh:targetNode .class:TargetingMechanism label} Demo

## Demo {=ex:demo ?cat:hasDemo}

This demo demonstrates node-based targeting using critical infrastructure and executive validation scenarios.

### Critical Infrastructure Demo

The **Database Validation Shape** {=ex:DatabaseValidationShape .sh:NodeShape ?cat:hasShape label} targets the [Main Database] {+ex:MainDatabase ?sh:targetNode} for critical infrastructure validation.

**Database Status Rule** {=ex:#databaseStatus .sh:PropertyShape ?sh:property} requires the [status] {+ex:status ?sh:path} property to be exactly [online] {sh:hasValue}: **Main database must be online** {sh:message}

[The shape] {=ex:DatabaseValidationShape} also has **Database Uptime Rule** {=ex:#databaseUptime .sh:PropertyShape ?sh:property} that requires the [uptime] {+ex:uptime ?sh:path} property to be at least [99.9] {sh:minInclusive ^^xsd:decimal}: **Database uptime must be at least 99.9%** {sh:message}

### Executive Validation Demo

**CEO Validation Shape** {=ex:CEOValidationShape .sh:NodeShape ?cat:hasShape label} targets the [CEO] {+ex:CEO ?sh:targetNode} for executive-level validation.

**Executive Clearance Rule** {=ex:#executiveClearance .sh:PropertyShape ?sh:property} requires the [securityClearance] {+ex:securityClearance ?sh:path} property to be exactly [top-secret] {sh:hasValue}: **CEO must have top-secret security clearance** {sh:message}

---

### 📋 Test Data {=ex:data .Container}

#### Main Database {=ex:MainDatabase}

Critical infrastructure that should be online with high uptime.

Status: [offline] {ex:status}
Uptime: [95.5] {ex:uptime ^^xsd:decimal}

#### Backup Database {=ex:BackupDatabase}

Secondary infrastructure (not targeted by node-based validation).

Status: [online] {ex:status}
Uptime: [99.8] {ex:uptime ^^xsd:decimal}

#### CEO {=ex:CEO}

The chief executive with proper clearance.

Security Clearance: [top-secret] {ex:securityClearance}

#### CFO {=ex:CFO}

The chief financial officer (not targeted by CEO-specific validation).

Security Clearance: [secret] {ex:securityClearance}

---

{=ex:demo} must produce exactly **3** {cat:expectsViolations ^^xsd:integer} violations.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Main Database** - fails twice (status: offline ≠ online AND uptime: 95.5% < 99.9%)
2. **Backup Database** - not validated (not targeted by specific node validation)
3. **CEO** - passes (has top-secret clearance as required)
4. **CFO** - not validated (not targeted by CEO-specific validation)

Note: Node-based targeting provides precise control over which specific entities get validated, making it ideal for critical infrastructure and executive validation.

### 🔍 Test Validation

```bash
# This should show 3 violations - database status, uptime, and CEO clearance
ig-cli validate ./targeting/targetNode.md
```

---






{=}



<a id="targeting-targetsubjectsof.demo"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <mdld:shacl/example/targeting/>


# Target Subjects Of {=sh:targetSubjectsOf .class:TargetingMechanism label} Demo

## Demo {=ex:demo ?cat:hasDemo}

This demo demonstrates subject-based targeting using management and approval scenarios where we validate entities that initiate relationships.

### Management Validation Demo

The **Manager Validation Shape** {=ex:ManagerValidationShape .sh:NodeShape ?cat:hasShape label} targets all [managers] {+ex:manages ?sh:targetSubjectsOf} of the manages relationship to validate management requirements.

**Management Level Rule** {=ex:#managementLevel .sh:PropertyShape ?sh:property} requires the [level] {+ex:level ?sh:path} property to be at least [3] {sh:minInclusive ^^xsd:integer}: **Managers must have level 3 or higher** {sh:message}

[The shape] {=ex:ManagerValidationShape} also has **Team Size Rule** {=ex:#teamSize .sh:PropertyShape ?sh:property} that requires the [teamSize] {+ex:teamSize ?sh:path} property to be at most [10] {sh:maxInclusive ^^xsd:integer}: **Managers can oversee at most 10 team members** {sh:message}

### Approval Validation Demo

**Approver Validation Shape** {=ex:ApproverValidationShape .sh:NodeShape ?cat:hasShape label} targets all [approvers] {+ex:approves ?sh:targetSubjectsOf} of the approves relationship to validate approval authority.

**Approval Authority Rule** {=ex:#approvalAuthority .sh:PropertyShape ?sh:property} requires the [authority] {+ex:authority ?sh:path} property to be at least [2] {sh:minInclusive ^^xsd:integer}: **Approvers must have authority level 2 or higher** {sh:message}

---

### 📋 Test Data {=ex:data .Container}

#### Engineering Manager {=ex:EngineeringManager}

A manager with insufficient level and oversized team.

Level: [2] {ex:level ^^xsd:integer}
Team Size: [15] {ex:teamSize ^^xsd:integer}
Manages: [EngineeringTeam] {ex:manages}

#### Senior Manager {=ex:SeniorManager}

A manager with appropriate level and team size.

Level: [4] {ex:level ^^xsd:integer}
Team Size: [8] {ex:teamSize ^^xsd:integer}
Manages: [QATeam] {ex:manages}

#### Junior Developer {=ex:JuniorDeveloper}

A team member who doesn't manage anyone (not targeted).

Level: [1] {ex:level ^^xsd:integer}
Team Size: [0] {ex:teamSize ^^xsd:integer}

#### Finance Approver {=ex:FinanceApprover}

An approver with insufficient authority.

Authority: [1] {ex:authority ^^xsd:integer}
Approves: [ExpenseReport] {ex:approves}

#### Executive Approver {=ex:ExecutiveApprover}

An approver with sufficient authority.

Authority: [3] {ex:authority ^^xsd:integer}
Approves: [BudgetRequest] {ex:approves}

#### Regular Employee {=ex:RegularEmployee}

An employee who doesn't approve anything (not targeted).

Authority: [0] {ex:authority ^^xsd:integer}

---

{=ex:demo} must produce exactly **3** {cat:expectsViolations ^^xsd:integer} violations.

### Expected Validation Results {=ex:results ?cat:hasResults}

#### Management Validation (subjects of manages):
1. **Engineering Manager** - fails twice (level 2 < 3 AND teamSize 15 > 10)
2. **Senior Manager** - passes (level 4 ≥ 3 AND teamSize 8 ≤ 10)
3. **Junior Developer** - not validated (doesn't manage anyone)

#### Approval Validation (subjects of approves):
4. **Finance Approver** - fails once (authority 1 < 2)
5. **Executive Approver** - passes (authority 3 ≥ 2)
6. **Regular Employee** - not validated (doesn't approve anything)

Note: Subject-based targeting validates entities that initiate relationships, making it ideal for management, approval, and source validation scenarios.

### 🔍 Test Validation

```bash
# This should show 3 violations - management level, team size, and approval authority
ig-cli validate ./targeting/targetSubjectsOf.md
```

---






{=}



<a id="targeting-targetobjectsof.demo"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <mdld:shacl/example/targeting/>


# Target Objects Of {=sh:targetObjectsOf .class:TargetingMechanism label} Demo

## Demo {=ex:demo ?cat:hasDemo}

This demo demonstrates object-based targeting using team membership and product reference scenarios where we validate entities that are referenced by others.

### Team Membership Demo

The **Team Member Validation Shape** {=ex:TeamMemberValidationShape .sh:NodeShape ?cat:hasShape label} targets all [team members] {+ex:memberOf ?sh:targetObjectsOf} to validate team membership requirements.

**Workload Rule** {=ex:#workloadRule .sh:PropertyShape ?sh:property} requires the [workload] {+ex:workload ?sh:path} property to be at most [40] {sh:maxInclusive ^^xsd:integer}: **Team members must not exceed 40 hours workload** {sh:message}

[The shape] {=ex:TeamMemberValidationShape} also has **Active Status Rule** {=ex:#activeStatus .sh:PropertyShape ?sh:property} that requires the [status] {+ex:status ?sh:path} property to be exactly [active] {sh:hasValue}: **Team members must be active** {sh:message}

### Product Reference Demo

**Referenced Product Validation Shape** {=ex:ReferencedProductValidationShape .sh:NodeShape ?cat:hasShape label} targets all [referenced products] {+ex:references ?sh:targetObjectsOf} to validate product reference requirements.

**Product Availability Rule** {=ex:#productAvailability .sh:PropertyShape ?sh:property} requires the [available] {+ex:available ?sh:path} property to be exactly [true] {sh:hasValue}: **Referenced products must be available** {sh:message}

{=ex:ReferencedProductValidationShape} also has **Product Price Rule** {=ex:#productPrice .sh:PropertyShape ?sh:property} that requires the [price] {+ex:price ?sh:path} property to be at most [1000.00] {sh:maxInclusive ^^xsd:decimal}: **Referenced products must cost $1000 or less** {sh:message}

---

### 📋 Test Data {=ex:data .Container}

#### Senior Developer {=ex:SeniorDeveloper}

A team member with excessive workload and inactive status.

Workload: [45] {ex:workload ^^xsd:integer}
Status: [inactive] {ex:status}
Member Of: [EngineeringTeam] {ex:memberOf}

#### Junior Developer {=ex:JuniorDeveloper}

A team member with appropriate workload and active status.

Workload: [35] {ex:workload ^^xsd:integer}
Status: [active] {ex:status}
Member Of: [EngineeringTeam] {ex:memberOf}

#### Manager {=ex:Manager}

A manager who manages the team (not targeted as team member).

Workload: [50] {ex:workload ^^xsd:integer}
Status: [active] {ex:status}

#### Expensive Product {=ex:ExpensiveProduct}

A product that's too expensive and unavailable.

Price: [1500.00] {ex:price ^^xsd:decimal}
Available: [false] {ex:available}
Referenced By: [Order123] {ex:references}

#### Affordable Product {=ex:AffordableProduct}

A product that meets all requirements.

Price: [299.99] {ex:price ^^xsd:decimal}
Available: [true] {ex:available}
Referenced By: [Order456] {ex:references}

#### Unreferenced Product {=ex:UnreferencedProduct}

A product not referenced by any order (not targeted).

Price: [500.00] {ex:price ^^xsd:decimal}
Available: [true] {ex:available}

---

{=ex:demo} must produce exactly **4** {cat:expectsViolations ^^xsd:integer} violations.

### Expected Validation Results {=ex:results ?cat:hasResults}

#### Team Membership Validation (objects of memberOf):
1. **Senior Developer** - fails twice (workload 45 > 40 AND status: inactive ≠ active)
2. **Junior Developer** - passes (workload 35 ≤ 40 AND status: active)
3. **Manager** - not validated (not a team member, manages the team)

#### Product Reference Validation (objects of references):
4. **Expensive Product** - fails twice (price 1500.00 > 1000.00 AND available: false ≠ true)
5. **Affordable Product** - passes (price 299.99 ≤ 1000.00 AND available: true)
6. **Unreferenced Product** - not validated (not referenced by any order)

Note: Object-based targeting validates entities that are referenced by others, making it ideal for team membership, product references, and destination validation scenarios.

### 🔍 Test Validation

```bash
# This should show 4 violations - workload, status, price, and availability
ig-cli validate ./targeting/targetObjectsOf.md
```

---






{=}



<a id="constraints-index.demo"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[class] <cat:class/>

# Demo Catalog {=cat:index}

## Constraint Demos

Demo files for SHACL constraints with test data and validation scenarios:

## Value Type Constraints

- [Class Demo](#constraints-class.demo)
- [Data Type Demo](#constraints-datatype.demo)
- [Node Kind Demo](#constraints-nodekind.demo)

## Cardinality Constraints

- [Count Demo](#constraints-count.demo)

## Value Range Constraints

- [Range Demo](#constraints-range.demo)

## Property Pair Constraints

- [Comparison Demo](#constraints-comparison.demo)
- [Disjoint Demo](#constraints-disjoint.demo)

## Logical Constraints

- [NOT Demo](#constraints-not.demo)
- [AND Demo](#constraints-and.demo)

## String Constraints

- [Length Demo](#constraints-length.demo)
- [Pattern Demo](#constraints-pattern.demo)
- [Language Demo](#constraints-language.demo)
- [Unique Languages Demo](#constraints-uniquelang.demo)

## Other Constraints

- [Has Value Demo](#constraints-hasvalue.demo)
- [Node Demo](#constraints-node.demo)
- [In Demo](#constraints-in.demo)
- [Qualified Count Demo](#constraints-qualifiedcount.demo)
- [Closed Demo](#constraints-closed.demo)
- [Deactivated Demo](#constraints-deactivated.demo)
- [Severity Demo](#constraints-severity.demo)
- [Message Demo](#constraints-message.demo)

## JavaScript Constraints

- [JavaScript Function Demo](#constraints-js.demo)






{=}



<a id="constraints-class.demo"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[class] <cat:class/>
[ex] <tag:my@example.org,2026:class/>

# Class {=sh:class .class:Constraint label}

## Demo {=ex:demo ?cat:hasDemo}

### Employee Test Shape {=ex:EmployeeTestShape .sh:NodeShape ?cat:hasShape label}

All [employees] {+member ?sh:targetObjectsOf} must have **Manager** {+ex:#managerClass ?sh:property} assigned.

**Manager must be a Person instance** {=ex:#managerClass .sh:PropertyShape} requires the [manager] {+ex:manager ?sh:path} property to be an instance of [Person] {+ex:Person ?sh:class}.

---

### 📋 Test Data {=ex:data .Container}

#### Valid Employee {=ex:ValidEmployee ?member}
Manager: [john] {+ex:john ?ex:manager .ex:Person}

#### Invalid Employee {=ex:InvalidEmployee ?member}
Manager: [robot] {+ex:robot ?ex:manager ex:Role}

---

[Demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Employee** - passes (manager is a Person)
2. **Invalid Employee** - fails (manager is not a Person)

### 🔍 Test Validation

```bash
# This should show 1 violation for class constraint violation
ig-cli validate ./constraints/class.demo.md
```

---






{=}



<a id="constraints-datatype.demo"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[class] <cat:class/>
[ex] <tag:my@example.org,2026:datatype/>

# Data Type {=sh:datatype .class:Constraint label}

## Demo {=ex:demo ?cat:hasDemo}

### Product Test Shape {=ex:ProductTestShape .sh:NodeShape ?cat:hasShape label}

Validates [Valid Product] {+ex:ValidProduct ?sh:targetNode} and [Invalid Product] {+ex:InvalidProduct ?sh:targetNode} with **Price must be decimal** {+ex:#priceDecimal ?sh:property}.

**Price must be decimal** {=ex:#priceDecimal .sh:PropertyShape} requires the [price] {+ex:price ?sh:path} property to be a [decimal] {+xsd:decimal ?sh:datatype} value.

---

### 📋 Test Data {=ex:data .Container}

#### Valid Product {=ex:ValidProduct ?member}
Price: [29.99] {ex:price ^^xsd:decimal}

#### Invalid Product {=ex:InvalidProduct ?member}
Price: [29.99] {ex:price ^^xsd:string}

---

[Demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Product** - passes (price is decimal)
2. **Invalid Product** - fails (price is string, not decimal)

### 🔍 Test Validation

```bash
ig-cli validate ./constraints/datatype.demo.md
```

---






{=}



<a id="constraints-nodekind.demo"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[class] <cat:class/>
[ex] <tag:my@example.org,2026:nodekind/>

# Node Kind {=sh:nodeKind .class:Constraint label}

## Demo {=ex:demo ?cat:hasDemo}

### Document Test Shape {=ex:DocumentTestShape .sh:NodeShape ?cat:hasShape label}

Validates [Valid Document] {+ex:ValidDocument ?sh:targetNode} and [Invalid Document] {+ex:InvalidDocument ?sh:targetNode} with **Content must be literal** {+ex:#contentLiteral ?sh:property} and **Reference must be IRI** {+ex:#referenceIRI ?sh:property}.

**Content must be literal** {=ex:#contentLiteral .sh:PropertyShape} requires [content] {+ex:content ?sh:path} to be a [Literal] {+sh:Literal ?sh:nodeKind}.

**Reference must be IRI** {=ex:#referenceIRI .sh:PropertyShape} requires [reference] {+ex:reference ?sh:path} to be an [IRI] {+sh:IRI ?sh:nodeKind}.

---

### 📋 Test Data {=ex:data .Container}

#### Valid Document {=ex:ValidDocument ?member}
Content: [text] {ex:content}
Reference: <https://example.org> {?ex:reference}

#### Invalid Document {=ex:InvalidDocument ?member}
Content: <https://example.org> {?ex:content}
Reference: [text] {ex:reference}

---

[Demo] {=ex:demo} must produce exactly **2** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Document** - passes (content is literal, reference is IRI)
2. **Invalid Document** - fails 2 times (content is IRI not literal, reference is text not IRI)

### 🔍 Test Validation

```bash
ig-cli validate ./constraints/nodekind.demo.md
```






{=}



<a id="constraints-count.demo"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[class] <cat:class/>
[ex] <tag:my@example.org,2026:count/>

# Count {=sh:minCount .class:Constraint label}

## Demo {=ex:demo ?cat:hasDemo}

### Person Test Shape {=ex:PersonTestShape .sh:NodeShape ?cat:hasShape label}

Validates all [member] {+member ?sh:targetObjectsOf} entities with **Email must be exactly one** {+ex:#emailExact ?sh:property}.

**Email must be exactly one** {=ex:#emailExact .sh:PropertyShape} requires [email] {+ex:email ?sh:path} to have exactly [1] {sh:minCount sh:maxCount ^^xsd:integer} value.

---

### Test Data {=ex:data .Container}

#### Valid Person {=ex:ValidPerson ?member}
Email: [work@example.com] {ex:email}

#### Invalid Person {=ex:InvalidPerson ?member}
Email: [work@example.com] {ex:email}
Email: [personal@example.com] {ex:email}

---

[Demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Person** - passes (exactly one email)
2. **Invalid Person** - fails (two emails instead of one)

### 🔍 Test Validation

```bash
ig-cli validate ./constraints/count.demo.md
```






{=}



<a id="constraints-range.demo"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <tag:my@example.org,2026:range/>

# Range {=sh:minInclusive .class:Constraint label}

## Demo {=ex:demo ?cat:hasDemo}

### Product Test Shape {=ex:ProductTestShape .sh:NodeShape ?cat:hasShape label}

Validates all [member] {+member ?sh:targetObjectsOf} entities with **Price must be between 10 and 100 inclusive** {+ex:#priceRange ?sh:property}.

**Price must be between 10 and 100 inclusive** {=ex:#priceRange .sh:PropertyShape} requires [price] {+ex:price ?sh:path} to be at least [10] {sh:minInclusive ^^xsd:decimal} and at most [100] {sh:maxInclusive ^^xsd:decimal}.

---

### Test Data {=ex:data .Container}

#### Valid Product {=ex:ValidProduct ?member}
Price: [50] {ex:price ^^xsd:decimal}

#### Invalid Product {=ex:InvalidProduct ?member}
Price: [5] {ex:price ^^xsd:decimal}

---

[Demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Product** - passes (price is within range)
2. **Invalid Product** - fails (price is below minimum)

### 🔍 Test Validation

```bash
ig-cli validate ./constraints/range.demo.md
```

---






{=}



<a id="constraints-comparison.demo"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <tag:my@example.org,2026:comparison/>

# Comparison {=sh:lessThan .class:ComparisonConstraint label}

## Demo {=ex:demo ?cat:hasDemo}

### Order Test Shape {=ex:OrderTestShape .sh:NodeShape ?cat:hasShape label}

Validates all [member] {+member ?sh:targetObjectsOf} entities with **Order date must be before shipping date** {+ex:#orderDateRule ?sh:property}.

**Order date must be before shipping date** {=ex:#orderDateRule .sh:PropertyShape} requires [order date] {+ex:orderDate ?sh:path} to be before [shipping date] {+ex:shippingDate ?sh:lessThan}.

---

### Test Data {=ex:data .Container}

#### Valid Order {=ex:ValidOrder ?member}
Order Date: [2024-06-15] {ex:orderDate ^^xsd:date}
Shipping Date: [2024-06-20] {ex:shippingDate ^^xsd:date}

#### Invalid Order {=ex:InvalidOrder ?member}
Order Date: [2024-06-25] {ex:orderDate ^^xsd:date}
Shipping Date: [2024-06-20] {ex:shippingDate ^^xsd:date}

---

[Demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Order** - passes (order date is before shipping date)
2. **Invalid Order** - fails (order date is after shipping date)

### 🔍 Test Validation

```bash
ig-cli validate ./constraints/comparison.demo.md
```

---






{=}



<a id="constraints-disjoint.demo"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <tag:my@example.org,2026:disjoint/>

# Disjoint {=sh:disjoint .class:DisjointConstraint label} Demo

## Demo {=ex:demo ?cat:hasDemo}

### Label Test Shape {=ex:DisjointExampleShape .sh:NodeShape ?cat:hasShape label}

Validates all [member] {+member ?sh:targetObjectsOf} entities with **Preferred labels must be different from alternative labels** {+ex:#disjointRule ?sh:property}.

**Preferred labels must be different from alternative labels** {=ex:#disjointRule .sh:PropertyShape} requires [preferred labels] {+ex:prefLabel ?sh:path} to be [disjoint] {+ex:altLabel ?sh:disjoint} with [alternative labels].

---

### Test Data {=ex:data .Container}

#### Valid Case {=ex:USA ?member}
Preferred Label: [USA] {ex:prefLabel}
Alternative Label: [United States] {ex:altLabel}

#### Invalid Case {=ex:Germany ?member}
Preferred Label: [Germany] {ex:prefLabel}
Alternative Label: [Germany] {ex:altLabel}

---

[Demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Case** - passes (labels are different)
2. **Invalid Case** - fails (labels are the same)

### 🔍 Test Validation

```bash
ig-cli validate ./constraints/disjoint.demo.md
```

---






{=}



<a id="constraints-not.demo"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <tag:my@example.org,2026:not/>

# NOT {=sh:not .class:LogicalConstraint label} Demo

## Demo {=ex:demo ?cat:hasDemo}

### User Status Shape {=ex:UserStatusShape .sh:NodeShape ?cat:hasShape label}

Validates all [member] {+member ?sh:targetObjectsOf} entities with **User cannot have deleted status** {+ex:ForbiddenStatusShape ?sh:not}.

User status must not conform to [Forbidden Status Shape] {+ex:ForbiddenStatusShape ?sh:not}.

**Forbidden Status Shape** {=ex:ForbiddenStatusShape .sh:NodeShape} requires [status] {+ex:status ?sh:path} to be exactly [deleted] {sh:hasValue}.

---

### Test Data {=ex:data .Container}

#### Valid User {=ex:ValidActiveUser ?member}
Status: [active] {ex:status}

#### Invalid User {=ex:InvalidDeletedUser ?member}
Status: [deleted] {ex:status}

---

[Demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid User** - passes (status is not deleted)
2. **Invalid User** - fails (status is deleted)

### 🔍 Test Validation

```bash
ig-cli validate ./constraints/not.demo.md
```

---






{=}



<a id="constraints-and.demo"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <tag:my@example.org,2026:and/>

# AND {=sh:and .class:LogicalConstraint label} Demo

## Demo {=ex:demo ?cat:hasDemo}

### Product Validation Shape {=ex:ProductValidationShape .sh:NodeShape ?cat:hasShape label}

Validates all [member] {+member ?sh:targetObjectsOf} entities with **Product must have price and category** {sh:message}.

**Constraints List** {=ex:and-l1 ?sh:and .rdf:List}: [Price Required] {+ex:priceRequired ?rdf:first}, then [followed] {=ex:and-l2 ?rdf:rest} by [Category Required] {+ex:categoryRequired ?rdf:first} and [nil] {+rdf:nil ?rdf:rest}. {=}

**Price Required** {=ex:priceRequired .sh:PropertyShape} ensures [price] {+ex:price ?sh:path} has at least [1] {sh:minCount ^^xsd:integer} value.

**Category Required** {=ex:categoryRequired .sh:PropertyShape} ensures [category] {+ex:category ?sh:path} has at least [1] {sh:minCount ^^xsd:integer} value.

---

### Test Data {=ex:data .Container}

#### Valid Product {=ex:ValidProduct ?member}
Price: [999] {ex:price ^^xsd:integer}
Category: [Electronics] {ex:category}

#### Invalid Product {=ex:MissingPriceProduct ?member}
Category: [Electronics] {ex:category}

---

[Demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Product** - passes (has price and category)
2. **Invalid Product** - fails (missing price)

### 🔍 Test Validation

```bash
ig-cli validate ./constraints/and.demo.md
```

---






{=}



<a id="constraints-length.demo"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <tag:my@example.org,2026:length/>

# Length {=sh:minLength .class:Constraint label} Demo

## Demo {=ex:demo ?cat:hasDemo}

### User Account Test Shape {=ex:UserAccountTestShape .sh:NodeShape ?cat:hasShape label}

Validates all [member] {+member ?sh:targetObjectsOf} entities with **Username must be 3-20 characters** {+ex:#usernameLength ?sh:property}.

**Username must be 3-20 characters** {=ex:#usernameLength .sh:PropertyShape} requires [username] {+ex:username ?sh:path} to have at least [3] {sh:minLength ^^xsd:integer} and at most [20] {sh:maxLength ^^xsd:integer} characters.

---

### Test Data {=ex:data .Container}

#### Valid User {=ex:ValidUser ?member}
Username: [john_doe] {ex:username}

#### Invalid User {=ex:InvalidUser ?member}
Username: [jd] {ex:username}

---

[Demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid User** - passes (username is 8 characters)
2. **Invalid User** - fails (username is only 2 characters)

### 🔍 Test Validation

```bash
ig-cli validate ./constraints/length.demo.md
```






{=}



<a id="constraints-pattern.demo"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <tag:my@example.org,2026:pattern/>

# Pattern {=sh:pattern .class:PatternConstraint label} Demo

## Demo {=ex:demo ?cat:hasDemo}

### Email Validation Shape {=ex:PatternExampleShape .sh:NodeShape ?cat:hasShape label}

Validates all [member] {+member ?sh:targetObjectsOf} entities with **Email must end with example.com** {+ex:EmailPatternConstraint ?sh:property}.

**Email must end with example.com** {=ex:EmailPatternConstraint .sh:PropertyShape} requires [email] {+ex:email ?sh:path} to match [example\.com$] {sh:pattern} with [i] {sh:flags}.

---

### Test Data {=ex:data .Container}

#### Valid Email {=ex:ValidEmail ?member}
Email: [user@example.com] {ex:email}

#### Invalid Email {=ex:InvalidEmail ?member}
Email: [user@example.org] {ex:email}

---

[Demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Email** - passes (matches pattern)
2. **Invalid Email** - fails (doesn't match pattern)

### 🔍 Test Validation

```bash
ig-cli validate ./constraints/pattern.demo.md
```

---






{=}



<a id="constraints-language.demo"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <tag:my@example.org,2026:language/>

# Language {=sh:languageIn .class:StringConstraint label} Demo

## Demo {=ex:demo ?cat:hasDemo}

### Multilingual Document Shape {=ex:MultilingualDocumentShape .sh:NodeShape ?cat:hasShape label}

Validates all [member] {+member ?sh:targetObjectsOf} entities with **Title language must be en or fr** {+ex:#titleLanguage ?sh:property}.

**Title language must be en or fr** {=ex:#titleLanguage .sh:PropertyShape} requires [title] {+ex:title ?sh:path} language tags to be in allowed list.

**Allowed Languages List** {=ex:lang-l1 ?sh:languageIn .rdf:List}: [en] {rdf:first}, then [rest] {=ex:lang-l2 ?rdf:rest} by [fr] {rdf:first} and [nil] {+rdf:nil ?rdf:rest}. {=}

---

### Test Data {=ex:data .Container}

#### English Document {=ex:EnglishDocument ?member}
Title: [Hello World] {ex:title @en}

#### Invalid Document {=ex:GermanDocument ?member}
Title: [Hallo Welt] {ex:title @de}

---

[Demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **English Document** - passes (title language is en)
2. **Invalid Document** - fails (title language is de, not allowed)

### 🔍 Test Validation

```bash
ig-cli validate ./constraints/language.demo.md
```






{=}



<a id="constraints-uniquelang.demo"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <tag:my@example.org,2026:uniqueLang/>

# Unique Languages {=sh:uniqueLang .class:UniqueLanguageConstraint label} Demo

## Demo {=ex:demo ?cat:hasDemo}

### Unique Language Example Shape {=ex:UniqueLangExampleShape .sh:NodeShape ?cat:hasShape label}

Validates all [member] {+member ?sh:targetObjectsOf} entities with **Each language tag must appear only once** {+ex:TitleProperty ?sh:property}.

**Each language tag must appear only once** {=ex:TitleProperty .sh:PropertyShape} requires [title] {+ex:title ?sh:path} values to have [true] {sh:uniqueLang ^^xsd:boolean}.

---

### Test Data {=ex:data .Container}

#### Valid Document {=ex:ValidNode ?member}
Title: [Hello World] {ex:title @en}
Title: [Bonjour Monde] {ex:title @fr}

#### Invalid Document {=ex:InvalidNode ?member}
Title: [Hello World] {ex:title @en}
Title: [Hola Mundo] {ex:title @en}

---

[Demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Document** - passes (unique language tags)
2. **Invalid Document** - fails (duplicate en language tag)

### 🔍 Test Validation

```bash
ig-cli validate ./constraints/uniqueLang.demo.md
```

***






{=}



<a id="constraints-hasvalue.demo"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <tag:my@example.org,2026:hasvalue/>

# Has Value {=sh:hasValue .class:Constraint label} Demo

## Demo {=ex:demo ?cat:hasDemo}

### System Status Test Shape {=ex:SystemStatusTestShape .sh:NodeShape ?cat:hasShape label}

Validates all [member] {+member ?sh:targetObjectsOf} entities with **Status must be active** {+ex:#statusRequired ?sh:property}.

**Status must be active** {=ex:#statusRequired .sh:PropertyShape} requires [status] {+ex:status ?sh:path} to be exactly [active] {sh:hasValue}.

---

### Test Data {=ex:data .Container}

#### Valid Server {=ex:MainServer ?member}
Status: [active] {ex:status}

#### Invalid Server {=ex:BackupServer ?member}
Status: [standby] {ex:status}

---

[Demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Server** - passes (status is active)
2. **Invalid Server** - fails (status is standby, not active)

### 🔍 Test Validation

```bash
ig-cli validate ./constraints/hasvalue.demo.md
```

---






{=}



<a id="constraints-node.demo"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <tag:my@example.org,2026:node/>

# Node {=sh:node .class:NodeConstraint label} Demo

## Demo {=ex:demo ?cat:hasDemo}

### Employee Validation Shape {=ex:EmployeeValidationShape .sh:NodeShape ?cat:hasShape label}

Validates all [member] {+member ?sh:targetObjectsOf} entities with **Employee must have valid address** {+ex:#addressRule ?sh:property}.

**Employee must have valid address** {=ex:#addressRule .sh:PropertyShape} requires [address] {+ex:address ?sh:path} to conform to [Address Shape] {+ex:AddressShape ?sh:node}.

**Address Shape** {=ex:AddressShape .sh:NodeShape} requires [street] {+ex:street ?sh:path} to have at least [5] {sh:minLength ^^xsd:integer} characters.

---

### Test Data {=ex:data .Container}

#### Valid Employee {=ex:ValidEmployee ?member}
Address: [Valid Address] {=ex:ValidAddress .ex:Address ?ex:address}
Street: [Main Street] {ex:street}

#### Invalid Employee {=ex:InvalidEmployee ?member}
Address: [Short Address] {=ex:ShortAddress .ex:Address ?ex:address}
Street: [St] {ex:street}

---

[Demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Employee** - passes (address conforms to AddressShape)
2. **Invalid Employee** - fails (address doesn't conform to AddressShape)

### 🔍 Test Validation

```bash
ig-cli validate ./constraints/node.demo.md
```

---






{=}



<a id="constraints-in.demo"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <tag:my@example.org,2026:in/>

# Value Enumeration {=sh:in .class:PresenceConstraint label} Demo

## Demo {=ex:demo ?cat:hasDemo}

### Status Validation Shape {=ex:StatusValidationShape .sh:NodeShape ?cat:hasShape label}

Validates all [member] {+member ?sh:targetObjectsOf} entities with **Status must be Active or Inactive** {+ex:#allowedStatus ?sh:property}.

**Status must be Active or Inactive** {=ex:#allowedStatus .sh:PropertyShape} requires [status] {+ex:status ?sh:path} to be in allowed list.

**Allowed Values List** {=ex:in-l1 ?sh:in .rdf:List}: [Active] {+ex:Active ?rdf:first}, then [rest] {=ex:in-l2 ?rdf:rest} by [Inactive] {+ex:Inactive ?rdf:first} and [nil] {+rdf:nil ?rdf:rest}. {=}

---

### Test Data {=ex:data .Container}

#### Valid Employee {=ex:ValidEmployee ?member}
Status: [Active] {+ex:Active ?ex:status}

#### Invalid Employee {=ex:InvalidStatusEmployee ?member}
Status: [Pending] {+ex:Pending ?ex:status}

---

[Demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Employee** - passes (status is Active)
2. **Invalid Employee** - fails (status is Pending, not allowed)

### 🔍 Test Validation

```bash
ig-cli validate ./constraints/in.demo.md
```

---






{=}



<a id="constraints-qualifiedcount.demo"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <tag:my@example.org,2026:qualified/>

# Qualified Count {=sh:qualifiedMinCount .class:QualifiedConstraint label} Demo

## Demo {=ex:demo ?cat:hasDemo}

### Employee Validation Shape {=ex:EmployeeValidationShape .sh:NodeShape ?cat:hasShape label}

Validates all [member] {+member ?sh:targetObjectsOf} entities with **Employee must have exactly one work email** {+ex:#workEmailRule ?sh:property}.

**Employee must have exactly one work email** {=ex:#workEmailRule .sh:PropertyShape} requires [email] {+ex:email ?sh:path} to have exactly [1] {sh:qualifiedMinCount sh:qualifiedMaxCount ^^xsd:integer} work email matching **Work Email Shape** {=ex:WorkEmailShape .sh:NodeShape ?sh:qualifiedValueShape}.

**Work Email Shape** {=ex:WorkEmailShape .sh:NodeShape} must be a [literal] {+sh:Literal ?sh:nodeKind} with pattern [company.org] {sh:pattern}.

---

### Test Data {=ex:data .Container}

#### Valid Employee {=ex:ValidEmployee ?member}
Email: [john@company.org] {ex:email}

#### Invalid Employee {=ex:NoWorkEmployee ?member}
Email: [bob@gmail.com] {ex:email}

---

[Demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Employee** - passes (1 work email)
2. **Invalid Employee** - fails (0 work emails)

### 🔍 Test Validation

```bash
ig-cli validate ./constraints/qualifiedCount.demo.md
```

---






{=}



<a id="constraints-closed.demo"></a>

[mdld] <https://mdld.js.org/vocab/>
[cat] <https://mdld.js.org/shacl/catalog/>
[schema] <http://schema.org/>


# Closed World Constraint {=sh:closed .class:ClosedWorldConstraint label} Demo

## Demo {=ex:demo ?cat:hasDemo}

This demo demonstrates closed world validation using person data.

### Person Data Demo

**Only declared properties allowed** {=ex:ClosedExampleShape .sh:NodeShape ?cat:hasShape label} targets [ValidPerson] {+ex:ValidPerson ?sh:targetNode} and [InvalidPerson] {+ex:InvalidPerson ?sh:targetNode} with **no additional properties** {sh:closed} constraint except [Name] {+ex:NameProperty ?sh:property} and [Age] {+ex:AgeProperty ?sh:property}.

**Person must have a name** {=ex:NameProperty .sh:PropertyShape  sh:message} ensures [name] {+schema:name ?sh:path} is [string] {+xsd:string ?sh:datatype} and [1] {sh:minCount}.

**Person must have exactly one age** {=ex:AgeProperty .sh:PropertyShape sh:message} ensures [age] {+ex:age ?sh:path} is [integer] {+xsd:integer ?sh:datatype} and exactly [1] {sh:minCount sh:maxCount}.

### 📋 Test Data {=ex:data .Container}

#### Valid Person {=ex:ValidPerson}

Person with only declared properties.

Name: [John Doe] {schema:name ^^xsd:string}
Age: [30] {ex:age ^^xsd:integer}

#### Invalid Person {=ex:InvalidPerson}

Person with undeclared property (violates closed world constraint).

Name: [Jane Smith] {schema:name ^^xsd:string}
Age: [25] {ex:age ^^xsd:integer}
Email: [<jane@example.com>] {ex:email}  # Undeclared property

***

[This demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Person** - passes (only declared properties: name, age ✓)
2. **Invalid Person** - fails once (has undeclared property: email ✗)

### 🔍 Test Validation

```bash
# This should show 1 violation - InvalidPerson has undeclared email property
ig-cli validate ./constraints/closed.demo.md
```

***






{=}



<a id="constraints-deactivated.demo"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <tag:my@example.org,2026:deactivated/>

# Deactivated {=sh:deactivated .class:DeactivatedConstraint label} Demo

## Demo {=ex:demo ?cat:hasDemo}

### Deactivated Example Shape {=ex:DeactivatedExampleShape .sh:NodeShape ?cat:hasShape label}

Validates all [member] {+member ?sh:targetObjectsOf} entities with **User status must be active** {+ex:ActiveProperty ?sh:property}.

**User status must be active** {=ex:ActiveProperty .sh:PropertyShape} requires [status] {+ex:status ?sh:path} to be [active] {sh:hasValue}.

**Category rule** {=ex:DeactivatedProperty .sh:PropertyShape} is [deactivated] {sh:deactivated}.

---

### Test Data {=ex:data .Container}

#### Valid Account {=ex:ValidNode ?member}
Status: [active] {ex:status}

#### Invalid Account {=ex:InvalidNode ?member}
Status: [inactive] {ex:status}

---

[Demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Account** - passes (status is active)
2. **Invalid Account** - fails (status is inactive)

### 🔍 Test Validation

```bash
ig-cli validate ./constraints/deactivated.demo.md
```

---






{=}



<a id="constraints-severity.demo"></a>

[mdld] <https://mdld.js.org/vocab/>
[cat] <https://mdld.js.org/shacl/catalog/>
[ex] <http://example.org/>


# Severity Levels {=sh:severity .class:SeverityConstraint label} Demo

## Demo {=ex:demo ?cat:hasDemo}

This demo demonstrates severity levels and custom messages using user account validation.

### User Account Validation Demo

The **User Validation Shape** {=ex:UserValidationShape .sh:NodeShape ?cat:hasShape label} targets all [users] {+ex:User ?sh:targetClass} to validate account requirements with different severity levels: **Critical Email Rule** {+ex:CriticalRule ?sh:property label}, **Warning Age Rule** {+ex:WarningRule ?sh:property label} and **Info Name Rule** {+ex:InfoNameRule ?sh:property label}.

**Email address is required and must be valid** {=ex:CriticalRule .sh:PropertyShape sh:message} that requires [email] {+ex:email ?sh:path} to be [string] {+xsd:string ?sh:datatype} and at least [1] {sh:minCount ^^xsd:integer} corporate email [example.com] {sh:pattern} with [Violation severity] {+sh:Violation ?sh:severity}.

**Age should be between 18 and 120** {=ex:WarningRule .sh:PropertyShape sh:message} that requires [age] {+ex:age ?sh:path} to be [integer] {+xsd:integer ?sh:datatype}, more than [18] {sh:minInclusive ^^xsd:integer} and less than [120] {sh:maxInclusive ^^xsd:integer} with [Warning severity] {+sh:Warning ?sh:severity}.

**Name should be a string of 2+ letters** {=ex:InfoNameRule .sh:PropertyShape sh:message} that requires [name] {+ex:name ?sh:path} to be [string] {+xsd:string ?sh:datatype} at least [1] {sh:minCount} and longer than [3] {sh:minInclusive} with [Info severity] {+sh:Info ?sh:severity}.

### 📋 Test Data {=ex:data .Container}

#### Valid User {=ex:ValidUser .ex:User}

User with complete valid information.

Email: [user@example.com] {ex:email}
Age: [25] {ex:age ^^xsd:integer}
Name: [John Doe] {ex:name}

#### Invalid User {=ex:InvalidUser .ex:User}

User with multiple issues at different severity levels.

Email: [invalid-email] {ex:email}  # Critical violation
Age: [150] {ex:age ^^xsd:integer}  # Warning violation
Name: [] {ex:name}  # Info violation (empty string)

---

[This demo] {=ex:demo} must produce exactly **3** {cat:expectsViolations ^^xsd:integer} violations.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid User** - passes (has valid email, reasonable age, and name ✓)
2. **Invalid User** - fails three times:
   - **Critical**: Email is invalid format ✗
   - **Warning**: Age is unusually high ✗  
   - **Info**: Name is missing ✗

### 🔍 Test Validation

```bash
# This should show 3 violations with different severity levels
ig-cli validate ./constraints/severity.demo.md
```

---






{=}



<a id="constraints-message.demo"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <tag:my@example.org,2026:message/>

# Violation Message {=sh:message .class:MessageConstraint label} Demo

## Demo {=ex:demo ?cat:hasDemo}

### Business Rule Validation Shape {=ex:BusinessRuleValidationShape .sh:NodeShape ?cat:hasShape label}

Validates all [member] {+member ?sh:targetObjectsOf} entities with **Contract value must be positive** {+ex:ContractValueRule ?sh:property}.

**Contract value must be positive** {=ex:ContractValueRule .sh:PropertyShape sh:message} ensures [contract value] {+ex:contractValue ?sh:path} is greater than [0] {sh:minInclusive ^^xsd:decimal}.

---

### Test Data {=ex:data .Container}

#### Valid Contract {=ex:ValidContract ?member}
Value: [50000.00] {ex:contractValue ^^xsd:decimal}

#### Invalid Contract {=ex:InvalidContract ?member}
Value: [-1000.00] {ex:contractValue ^^xsd:decimal}

---

[Demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Contract** - passes (positive value)
2. **Invalid Contract** - fails (negative value)

### 🔍 Test Validation

```bash
ig-cli validate ./constraints/message.demo.md
```

---






{=}



<a id="constraints-js.demo"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <tag:my@example.org,2026:js/>

# JavaScript Function {=sh:js .class:Constraint label} Demo

## Demo {=ex:demo ?cat:hasDemo}

### Date Validation Shape {=ex:DateValidationShape .sh:NodeShape ?cat:hasShape label}

Validates all [member] {+member ?sh:targetObjectsOf} entities with **Event date must be valid** {+ex:DatePropertyShape ?sh:property}.

**Event date must be valid** {=ex:DatePropertyShape .sh:PropertyShape} requires [eventDate] {+ex:eventDate ?sh:path} to be a valid JS date.

~~~~~~js {=ex:DateJSConstraint ?sh:JSConstraint sh:js}
const date = new Date(value);
return !isNaN(date.getTime());
~~~~~~

---

### Test Data {=ex:data .Container}

#### Valid Event {=ex:ValidEvent ?member}
Event Date: [2024-12-25] {ex:eventDate ^^xsd:date}

#### Invalid Event {=ex:InvalidEvent ?member}
Event Date: [not-a-date] {ex:eventDate}

---

[Demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Event** - passes (valid date string)
2. **Invalid Event** - fails (not a valid date)

### 🔍 Test Validation

```bash
ig-cli validate ./constraints/js.demo.md
```

---
