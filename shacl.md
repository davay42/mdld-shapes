<a id="index"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[class] <cat:class/>

# MDLD SHACL Catalog {=cat:index .Container label}

> A comprehensive guide to SHACL validation in MDLD (Markdown Linked Data) - self-validating documentation for semantic authors. {?comment}

This catalog [includes] {+cat:includes .rdf:Property label} all constraints and targeting mechanisms available in SHACL.

## Contents

[Targeting](#targeting-index)
[Constraints](#constraints-index)






{=}



<a id="targeting-index"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[class] <cat:class/>

# Catalog {=cat:index}

## Targeting Mechanism {+class:Targeting ?member .Class label}

These are targeting predicates that determine which nodes get validated (not constraints themselves): 

- [Target Class](#targeting-targetclass) {+sh:targetClass ?cat:includes .class:TargetingPredicate}
- [Target Node](#targeting-targetnode) {+sh:targetNode ?cat:includes .class:TargetingPredicate}
- [Target Subjects](#targeting-targetsubjectsof) {+sh:targetSubjectsOf ?cat:includes .class:TargetingPredicate}
- [Target Objects](#targeting-targetobjectsof) {+sh:targetObjectsOf ?cat:includes .class:TargetingPredicate}





{=}



<a id="targeting-targetclass"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <mdld:shacl/example/targeting/>
[xsd] <http://www.w3.org/2001/XMLSchema#>

# Target Class {=sh:targetClass .class:TargetingMechanism label}

> Targets all nodes that are instances of a specific RDF class (rdf:type) for shape validation. Essential for class-based validation scenarios across entire domains. {comment}

<http://www.w3.org/ns/shacl#targetClass> {?cat:fullIRI}

---

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

## 📝 MDLD Syntax Patterns

**Recommended pattern for class-based targeting:**

```md
# Target all instances of a class
{+ex:ClassName ?sh:targetClass}
```

**Use cases:**
- **Domain validation** - all Product instances must have required fields
- **Regulatory compliance** - all FinancialTransaction instances must follow rules
- **Data quality** - all UserAccount instances must have valid emails
- **Business rules** - all Order instances must have valid dates

**Key advantages:**
- ✅ **Scalable validation** - applies to all instances automatically
- ✅ **Domain-wide consistency** - ensures all entities follow same rules
- ✅ **Easy maintenance** - add/remove rules once, apply everywhere
- ✅ **Type safety** - only validates instances of specified type

---

## 🎯 Real-World Examples

### **E-commerce:**
```md
# All products must have prices and names
{+schema:Product ?sh:targetClass}
```

### **Healthcare:**
```md
# All patients must have medical records
{+medical:Patient ?sh:targetClass}
```

### **Finance:**
```md
# All transactions must be auditable
{+financial:Transaction ?sh:targetClass}
```

### **HR:**
```md
# All employees must have contracts
{+hr:Employee ?sh:targetClass}
```






{=}



<a id="targeting-targetnode"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <mdld:shacl/example/targeting/>
[xsd] <http://www.w3.org/2001/XMLSchema#>

# Target Node {=sh:targetNode .class:TargetingMechanism label}

> Targets specific individual nodes identified by their IRI for precise, node-by-node validation. Perfect for critical infrastructure, testing scenarios, and executive-level validation. {comment}

<http://www.w3.org/ns/shacl#targetNode> {?cat:fullIRI}

---

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

## 📝 MDLD Syntax Patterns

**Recommended pattern for node-based targeting:**

```md
# Target specific individual nodes
{+ex:SpecificEntity ?sh:targetNode}
{+ex:CriticalSystem ?sh:targetNode}
{+ex:ExecutivePosition ?sh:targetNode}
```

**Use cases:**
- **Critical infrastructure** - validate specific servers, databases, systems
- **Executive validation** - validate CEO, CFO, other key positions
- **Testing scenarios** - validate specific test data entities
- **Business constants** - validate specific business rules entities
- **Compliance checkpoints** - validate specific regulatory entities

**Key advantages:**
- ✅ **Precise targeting** - validates exactly what you specify
- ✅ **Critical focus** - ideal for high-value, high-risk entities
- ✅ **Testing efficiency** - validate specific test cases
- ✅ **Executive oversight** - ensure key positions meet requirements
- ✅ **Infrastructure monitoring** - validate critical systems status

---

## 🎯 Real-World Examples

### **Infrastructure:**
```md
# Critical production systems
{+infra:MainDatabase ?sh:targetNode}
{+infra:PaymentGateway ?sh:targetNode}
{+infra:AuthServer ?sh:targetNode}
```

### **Executive:**
```md
# C-suite validation
{+exec:CEO ?sh:targetNode}
{+exec:CFO ?sh:targetNode}
{+exec:CTO ?sh:targetNode}
```

### **Compliance:**
```md
# Regulatory entities
{+compliance:GDPRController ?sh:targetNode}
{+compliance:SOXCompliance ?sh:targetNode}
```

### **Testing:**
```md
# Test data validation
{+test:ValidTestCase ?sh:targetNode}
{+test:InvalidTestCase ?sh:targetNode}
```






{=}



<a id="targeting-targetsubjectsof"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <mdld:shacl/example/targeting/>
[xsd] <http://www.w3.org/2001/XMLSchema#>

# Target Subjects Of {=sh:targetSubjectsOf .class:TargetingMechanism label}

> Targets all subjects (nodes) that have a specific property pointing to any value. Useful for reverse relationship targeting, source validation, and validating entities that initiate relationships. {comment}

<http://www.w3.org/ns/shacl#targetSubjectsOf> {?cat:fullIRI}

---

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

## 📝 MDLD Syntax Patterns

**Recommended pattern for subject-based targeting:**

```md
# Target all entities that have this property
{+ex:manages ?sh:targetSubjectsOf}
{+ex:approves ?sh:targetSubjectsOf}
{+ex:owns ?sh:targetSubjectsOf}
{+ex:authored ?sh:targetSubjectsOf}
```

**Use cases:**
- **Management validation** - validate all who manage others
- **Approval workflows** - validate all who approve requests
- **Ownership validation** - validate all who own assets
- **Author validation** - validate all who create content
- **Source validation** - validate entities that initiate relationships

**Key advantages:**
- ✅ **Relationship-aware** - validates based on graph connections
- ✅ **Source validation** - focuses on entities that initiate relationships
- ✅ **Workflow validation** - perfect for approval and management flows
- ✅ **Reverse targeting** - validates from the source side of relationships
- ✅ **Business process validation** - ensures process initiators meet requirements

---

## 🎯 Real-World Examples

### **Management:**
```md
# All managers must have proper authority
{+org:manages ?sh:targetSubjectsOf}
{+org:supervises ?sh:targetSubjectsOf}
```

### **Finance:**
```md
# All approvers must have sufficient authority
{+finance:approves ?sh:targetSubjectsOf}
{+finance:authorizes ?sh:targetSubjectsOf}
```

### **Content:**
```md
# All authors must have credentials
{+content:authored ?sh:targetSubjectsOf}
{+content:published ?sh:targetSubjectsOf}
```

### **Assets:**
```md
# All owners must meet requirements
{+asset:owns ?sh:targetSubjectsOf}
{+asset:controls ?sh:targetSubjectsOf}
```






{=}



<a id="targeting-targetobjectsof"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <mdld:shacl/example/targeting/>
[xsd] <http://www.w3.org/2001/XMLSchema#>

# Target Objects Of {=sh:targetObjectsOf .class:TargetingMechanism label}

> Targets all objects (values) that are pointed to by a specific property. Ideal for validating referenced entities, relationship targets, and entities that are the destination of relationships. {comment}

<http://www.w3.org/ns/shacl#targetObjectsOf> {?cat:fullIRI}

---

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

## 📝 MDLD Syntax Patterns

**Recommended pattern for object-based targeting:**

```md
# Target all entities that are referenced by this property
{+ex:memberOf ?sh:targetObjectsOf}
{+ex:references ?sh:targetObjectsOf}
{+ex:partOf ?sh:targetObjectsOf}
{+ex:locatedIn ?sh:targetObjectsOf}
```

**Use cases:**
- **Team membership** - validate all members of teams
- **Product references** - validate all referenced products
- **Component validation** - validate all parts of assemblies
- **Location validation** - validate all entities in locations
- **Destination validation** - validate targets of relationships

**Key advantages:**
- ✅ **Reference validation** - validates entities that are referenced
- ✅ **Relationship targets** - focuses on destination entities
- ✅ **Dependency validation** - ensures referenced entities meet requirements
- ✅ **Membership validation** - validates all members of collections
- ✅ **Quality assurance** - validates referenced quality standards

---

## 🎯 Real-World Examples

### **Teams:**
```md
# All team members must meet requirements
{+org:memberOf ?sh:targetObjectsOf}
{+org:participantIn ?sh:targetObjectsOf}
```

### **Products:**
```md
# All referenced products must be available
{+catalog:references ?sh:targetObjectsOf}
{+inventory:contains ?sh:targetObjectsOf}
```

### **Components:**
```md
# All parts must meet specifications
{+manufacturing:contains ?sh:targetObjectsOf}
{+assembly:includes ?sh:targetObjectsOf}
```

### **Locations:**
```md
# All located entities must meet requirements
{+geo:locatedIn ?sh:targetObjectsOf}
{+facility:contains ?sh:targetObjectsOf}
```






{=}



<a id="constraints-index"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[class] <cat:class/>

### 📋 Constraint {=class:Constraint ?member .Class label}

> A SHACL constraint is a rule that defines a validation condition for a specific shape and target node. {comment}

We can broadly divide them into these type groups: 
- Metadata Predicate {+class:MetadataPredicate !subClassOf label}
- Targeting Predicate {+class:TargetingPredicate !subClassOf label}
- Value Type Constraint {+class:ValueTypeConstraint !subClassOf label}
- Cardinality Constraint {+class:CardinalityConstraint !subClassOf label}
- String-based Constraint {+class:StringConstraint !subClassOf label}
- Property Pair Constraint {+class:PropertyPairConstraint !subClassOf label}
- Logical Constraint {+class:LogicalConstraint !subClassOf label}
- Shape-based Constraint {+class:ShapeConstraint !subClassOf label}
- Property Path {+class:PropertyPath !subClassOf label}
- JavaScript Constraint {+class:JSConstraint !subClassOf label}
- SPARQL Constraint {+class:SPARQLConstraint !subClassOf label}

# Catalog {=cat:index}

This catalog includes these constraints: 

## Value Type Constraints

- [Class](#constraints-class) {+sh:class ?cat:includes .class:ValueTypeConstraint}
- [Data Type](#constraints-datatype) {+sh:datatype ?cat:includes .class:ValueTypeConstraint}
- [Node Kind](#constraints-nodekind) {+sh:nodeKind ?cat:includes .class:ValueTypeConstraint}

## Cardinality Constraints

- [Min Count](#constraints-count) {+sh:minCount ?cat:includes .class:CardinalityConstraint}
- [Max Count](#constraints-count) {+sh:maxCount ?cat:includes .class:CardinalityConstraint}

## Value Range Constraints

- [Min Inclusive](#constraints-range) {+sh:minInclusive ?cat:includes .class:ValueRangeConstraint}
- [Max Inclusive](#constraints-range) {+sh:maxInclusive ?cat:includes .class:ValueRangeConstraint}
- [Min Exclusive](#constraints-range) {+sh:minExclusive ?cat:includes .class:ValueRangeConstraint}
- [Max Exclusive](#constraints-range) {+sh:maxExclusive ?cat:includes .class:ValueRangeConstraint}

## Property Pair Constraints

- [Equals](#constraints-comparison) {+sh:equals ?cat:includes .class:PropertyPairConstraint}
- [Disjoint](#constraints-disjoint) {+sh:disjoint ?cat:includes .class:PropertyPairConstraint}
- [Less Than](#constraints-comparison) {+sh:lessThan ?cat:includes .class:PropertyPairConstraint}
- [Less Than or Equals](#constraints-comparison) {+sh:lessThanOrEquals ?cat:includes .class:PropertyPairConstraint}

## Logical Constraints

- [NOT](#constraints-not) {+sh:not ?cat:includes .class:LogicalConstraint}
- [AND](#constraints-and) {+sh:and ?cat:includes .class:LogicalConstraint}

## String Constraints

- [Minimum Length](#constraints-length) {+sh:minLength ?cat:includes .class:StringConstraint}
- [Maximum Length](#constraints-length) {+sh:maxLength ?cat:includes .class:StringConstraint}
- [Pattern](#constraints-pattern) {+sh:pattern ?cat:includes .class:StringConstraint}
- [Pattern Flags](#constraints-pattern) {+sh:flags ?cat:includes .class:StringConstraint}
- [Language In](#constraints-language) {+sh:languageIn ?cat:includes .class:StringConstraint}
- [Unique Languages](#constraints-uniquelang) {+sh:uniqueLang ?cat:includes .class:StringConstraint}

## Other Constraints

- [Has Value](#constraints-hasvalue) {+sh:hasValue ?cat:includes}
- [Entity type](#constraints-node) {+sh:node ?cat:includes .class:ShapeConstraint}
- [Value enumeration](#constraints-in) {+sh:in ?cat:includes}
- [Qualified Min Count](#constraints-qualifiedcount) {+sh:qualifiedMinCount ?cat:includes}
- [Qualified Max Count](#constraints-qualifiedcount) {+sh:qualifiedMaxCount ?cat:includes}
- [Closed world](#constraints-closed) {+sh:closed ?cat:includes .class:MetadataPredicate}
- [Deactivation flag](#constraints-deactivated) {+sh:deactivated ?cat:includes .class:MetadataPredicate}
- [Severity levels](#constraints-severity) {+sh:severity ?cat:includes .class:MetadataPredicate}
- [Violation message](#constraints-message) {+sh:message ?cat:includes .class:MetadataPredicate}

Some parts are still completely uncovered and don't work even on ttl or pure quads - something might be wrong in the validator or in examples we use in tests, need deeper investigation:

- Ignored Properties {+sh:ignoredProperties ?cat:includes .class:MetadataPredicate .cat:notCovered}

## JavaScript Constraints

- [JavaScript Function](./constraints/js.md) {+sh:js ?cat:includes .class:JSConstraint}
- JS Function Name {+sh:jsFunctionName ?cat:includes .class:JSConstraint .cat:notCovered}
- JS Library {+sh:jsLibrary ?cat:includes .class:JSConstraint .cat:notCovered}
- JS Library URL {+sh:jsLibraryURL ?cat:includes .class:JSConstraint .cat:notCovered}

## SPARQL Constraints

- SPARQL ASK Query {+sh:ask ?cat:includes .class:SPARQLConstraint .cat:notCovered}
- SPARQL SELECT Query {+sh:select ?cat:includes .class:SPARQLConstraint .cat:notCovered}
- SPARQL CONSTRUCT Query {+sh:construct ?cat:includes .class:SPARQLConstraint .cat:notCovered}
- SPARQL UPDATE Query {+sh:update ?cat:includes .class:SPARQLConstraint .cat:notCovered}

## Logical Constraints (Broken)

These seem to be broken in the validator:

- OR {+sh:or ?cat:includes .class:LogicalConstraint .cat:notCovered}
- XONE {+sh:xone ?cat:includes .class:LogicalConstraint .cat:notCovered}

## Property Path Constraints

Need to check if these are working:

- Qualified Value Shape {+sh:qualifiedValueShape ?cat:includes .class:ShapeConstraint .cat:notCovered}
- Qualified Value Shapes Disjoint {+sh:qualifiedValueShapesDisjoint ?cat:includes .class:ShapeConstraint .cat:notCovered}
- Inverse Path {+sh:inversePath ?cat:includes .class:PropertyPath .cat:notCovered}
- Alternative Path {+sh:alternativePath ?cat:includes .class:PropertyPath .cat:notCovered}
- Zero or More Path {+sh:zeroOrMorePath ?cat:includes .class:PropertyPath .cat:notCovered}
- One or More Path {+sh:oneOrMorePath ?cat:includes .class:PropertyPath .cat:notCovered}
- Zero or One Path {+sh:zeroOrOnePath ?cat:includes .class:PropertyPath .cat:notCovered}

---


## Some constraints are environment dependent, are not tested to be working and are [Not covered] {=cat:notCovered .Class label} by this calalog.

## 🚀 Getting Started

Each constraint includes:
- ✅ **Valid examples** that pass validation
- ❌ **Invalid examples** with expected violations
- 📝 **MDLD syntax** patterns for authoring
- 🔍 **ig-cli validation** commands






{=}



<a id="constraints-class"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[class] <cat:class/>
[ex] <cat:example/class/>
[xsd] <http://www.w3.org/2001/XMLSchema#>

# Class {=sh:class .class:Constraint label}

> Expects each value to be an instance of a specific class (RDF type) {comment}

<http://www.w3.org/ns/shacl#class> {?cat:fullIRI}

---

## Demo {=ex:demo ?cat:hasDemo}

### Employee Test Shape {=ex:EmployeeTestShape .sh:NodeShape ?cat:hasShape label}

All [employees] {+member ?sh:targetObjectsOf} must have both **Human Manager** {+ex:#managerClass ?sh:property} and **Department** {+ex:#departmentClass ?sh:property} assigned.

**Employee manager must be a Person instance** {=ex:#managerClass .sh:PropertyShape message} requires the [manager] {+ex:manager ?sh:path} property to be an instance of [Person] {+ex:Person ?sh:class}.

**Employee department must be a Department instance** {=ex:#departmentClass .sh:PropertyShape sh:message}  requires the [department] {+ex:department ?sh:path} property to be an instance of [Department] {+ex:Department ?sh:class}

---

### 📋 Test Data {=ex:data .Container}

#### Valid Employee {=ex:ValidEmployee ?member}

Manager: [john-manager] {+ex:john ?ex:manager .ex:Person}
Department: [engineering] {+ex:engineering ?ex:department .ex:Department}

#### Invalid Employee {=ex:InvalidEmployee ?member}

Manager: [robot-ai] {+ex:ai ?ex:manager ex:Role}
Department: [marketing] {+ex:marketing ?ex:department}

---

[Demo] {=ex:demo} must produce exactly **2** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Employee** - passes (manager is a Person, department is a Department)
2. **Invalid Employee** - fails (manager is not a Person, department is not a Department)

### 🔍 Test Validation

```bash
# This should show 1 violation for class constraint violation
ig-cli validate ./constraints/class.md
```

---

## 📝 MDLD Syntax Patterns

**Recommended pattern for class constraints:**

1. Use `sh:class` to validate RDF type relationships
2. Combine with container targeting for scalable test data
3. Provide clear validation messages specifying the expected class
4. Test both valid and invalid class instances

This approach ensures proper type checking while maintaining clear validation semantics.

---






{=}



<a id="constraints-datatype"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[class] <cat:class/>
[ex] <cat:example/datatype/>
[xsd] <http://www.w3.org/2001/XMLSchema#>

# Data Type {=sh:datatype .class:Constraint label}

<http://www.w3.org/ns/shacl#datatype> {?cat:fullIRI}

> Expects a literal value to have certain datatype {comment}

---

## 🛡️ Self-Validation Demo {=ex:demo ?cat:hasDemo}

### Shapes

The **Product Test Shape** {=ex:ProductTestShape .sh:NodeShape ?cat:hasShape label} validates both [Valid Product] {+ex:ValidProduct ?sh:targetNode} and [Invalid Product] {+ex:InvalidProduct ?sh:targetNode} entities to demonstrate datatype constraints: **Decimal Price Rule** {+ex:#priceDecimal ?sh:property} and **Integer Quantity Rule** {+ex:#quantityInteger ?sh:property}.

### Rules

**Product price must be a decimal number** {=ex:#priceDecimal .sh:PropertyShape sh:message} requires the [price] {+ex:price ?sh:path} property to be a [decimal] {+xsd:decimal ?sh:datatype} value for accurate calculations.

**Product quantity must be an integer** {=ex:#quantityInteger .sh:PropertyShape sh:message} requires the [quantity] {+ex:quantity ?sh:path} property to be an [integer] {+xsd:integer ?sh:datatype} value.

---

## Demo {=ex:demo}

### 📋 Test Data {=ex:data .Container}

#### Valid Product {=ex:ValidProduct ?member}

Price: [29.99] {ex:price ^^xsd:decimal}
Quantity: [5] {ex:quantity ^^xsd:integer}

#### Invalid Product {=ex:InvalidProduct ?member}

Price: [29.99] {ex:price ^^xsd:string}
Quantity: [five] {ex:quantity ^^xsd:string}

---

[Demo] {=ex:demo} must produce exactly **2** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Product** - passes (decimal price, integer quantity)
2. **Invalid Product** - fails 2 times (price is string instead of decimal, quantity must be integer)

### 🔍 **Test Validation**

```bash
# This should show 1 violation for incorrect datatype
ig-cli validate ./constraints/datatype.md
```

---

## 📝 **MDLD Syntax Patterns**

**Recommended pattern for datatype constraints:**

1. Define the PropertyShape with a clear name
2. Describe the requirement in natural language  
3. Add the validation message
4. Specify path and datatype in separate lines

This approach prevents annotation overload while maintaining readability.










{=}



<a id="constraints-nodekind"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[class] <cat:class/>
[ex] <cat:example/nodekind/>
[xsd] <http://www.w3.org/2001/XMLSchema#>

# Node Kind {=sh:nodeKind .class:Constraint label}

> Expects a node to be of a specific kind (blank node, IRI, or literal) {comment}

<http://www.w3.org/ns/shacl#nodeKind> {?cat:fullIRI}

---

## Demo {=ex:demo ?cat:hasDemo}

## Document Test Shape {=ex:DocumentTestShape .sh:NodeShape ?cat:hasShape label}

Validates all [Document] {+ex:Document ?sh:targetClass} entities to demonstrate node kind constraints: **Content Literal Rule** {+ex:#contentLiteral ?sh:property} and **Reference IRI Rule** {+ex:#referenceIRI ?sh:property}.

## Rules

**Document content must be a literal** {=ex:#contentLiteral .sh:PropertyShape sh:message} -  all [content] {+ex:content ?sh:path} must be a [Literal] {+sh:Literal ?sh:nodeKind}.

**Document reference must be an IRI** {=ex:#referenceIRI .sh:PropertyShape sh:message} - each [reference] {+ex:reference ?sh:path} must be an [IRI] {+sh:IRI ?sh:nodeKind}.

---

### 📋 Test Data {=ex:data .Container}

#### Valid Document {=ex:ValidDocument .ex:Documen ?member}

Content: [This is the document content] {ex:content}
Reference: <https://example.org/reference> {?ex:reference}

#### Invalid Document {=ex:InvalidDocument .ex:Document ?member}

Content: <https://example.org/invalid-content> {?ex:content}
Reference: [Invalid Reference String] {ex:reference}

---

[Demo] {=ex:demo} must produce exactly **2** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Document** - passes (title is IRI, content is literal, reference is IRI)
2. **Invalid Document** - fails 2 times (title is string instead of IRI and content is IRI, but should be a literal)

Note: SHACL may report only one violation per focus node. The Invalid Document has multiple node kind violations but only the first is reported.

### 🔍 Test Validation

```bash
# This should show 1 violation for node kind constraint violation
ig-cli validate ./constraints/nodekind.md
```

---

## 📝 MDLD Syntax Patterns

**Recommended pattern for node kind constraints:**

1. Use `sh:targetClass` for class-based targeting (diversity from container targeting)
2. Focus on IRI and Literal node kinds (MDLD doesn't produce blank nodes)
3. Use correct property syntax: IRIs without brackets, literals with brackets
4. Test both valid and invalid node kind combinations

This approach ensures proper node type validation while demonstrating different SHACL targeting techniques.

---

## 🏗️ **Node Kind Reference**

### IRI {=sh:IRI .sh:NodeKind label}

> Internationalized Resource Identifier - a global identifier for resources {?comment}

### Literal {=sh:Literal .sh:NodeKind label}

> Literal value such as strings, numbers, dates {?comment}

### BlankNodeOrIRI {=sh:BlankNodeOrIRI .sh:NodeKind label}

> Either a blank node or an IRI (but not a literal) {?comment}

**Note:** MDLD doesn't produce blank nodes, so focus on IRI and Literal constraints for practical demonstrations.






{=}



<a id="constraints-count"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[class] <cat:class/>
[ex] <cat:example/count/>
[xsd] <http://www.w3.org/2001/XMLSchema#>

# Min Count {=sh:minCount .class:Constraint label}

> Specifies the minimum number of values a property must have {comment}

<http://www.w3.org/ns/shacl#minCount> {?cat:fullIRI}

# Max Count {=sh:maxCount .class:Constraint label}

> Specifies the maximum number of values a property can have {comment}

<http://www.w3.org/ns/shacl#maxCount> {?cat:fullIRI}

---

## Shapes {=ex:demo ?cat:hasDemo}

The **Person Test Shape** {=ex:PersonTestShape .sh:NodeShape ?cat:hasShape label} validates all [member] {+member ?sh:targetObjectsOf} entities of the test data container to demonstrate count constraints - [email] {+ex:#emailExact ?sh:property} and [phone] {+ex:#phoneOptional ?sh:property}.

## Rules

**Person must have exactly one email address** {=ex:#emailExact .sh:PropertyShape  sh:message} requires the [email] {+ex:email ?sh:path} property to have exactly  [1] {sh:minCount sh:maxCount ^^xsd:integer}.

**Person can have at most two phone numbers** {=ex:#phoneOptional .sh:PropertyShape  sh:message} allows the [phone] {+ex:phone ?sh:path} property to have at most [2] {sh:maxCount ^^xsd:integer} values.

---

### 📋 Test Data {=ex:data .Container}

#### Valid Person {=ex:ValidPerson ?member}

Email: [work@example.com] {ex:email}
Phone: [555-1234] {ex:phone}
Phone: [555-5678] {ex:phone}

#### Invalid Person - Too Few {=ex:InvalidPersonFew ?member}

Phone: [555-1234] {ex:phone}

#### Invalid Person - Too Many {=ex:InvalidPersonMany ?member}

Email: [work@example.com] {ex:email}
Email: [personal@example.com] {ex:email}
Phone: [555-1234] {ex:phone}
Phone: [555-5678] {ex:phone}
Phone: [555-9999] {ex:phone}

---

[Demo] {=ex:demo} must produce exactly **3** {cat:expectsViolations ^^xsd:integer} violations.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Person** - passes (1 email, 2 phones - all within limits)
2. **Invalid Person - Too Few** - fails (0 emails - below minCount of 1)
3. **Invalid Person - Too Many** - fails 2 times (2 emails - exceeds maxCount of 1, 3 phones exceed the maxCount of 2)

### 🔍 Test Validation

```bash
# This should show 3 violations for count constraint violations
ig-cli validate ./constraints/count.md
```

---

## 📝 MDLD Syntax Patterns

**Recommended pattern for count constraints:**

1. Use exact values with both minCount and maxCount for required properties
2. Use maxCount alone for optional multi-valued properties
3. Combine multiple count constraints in a single NodeShape
4. Provide clear validation messages that specify the exact requirement

This approach ensures precise cardinality control while maintaining readability.






{=}



<a id="constraints-range"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <mdld:shacl/example/range/>
[xsd] <http://www.w3.org/2001/XMLSchema#>

# Minimum Inclusive {=sh:minInclusive .class:Constraint label}

> Specifies the minimum inclusive value for range constraints - the value must be greater than or equal to this bound. Works with numbers, dates, times, and other ordered datatypes. {comment}

<http://www.w3.org/ns/shacl#minInclusive> {?cat:fullIRI}

# Maximum Inclusive {=sh:maxInclusive .class:Constraint label}

> Specifies the maximum inclusive value for range constraints - the value must be less than or equal to this bound. Works with numbers, dates, times, and other ordered datatypes. {comment}

<http://www.w3.org/ns/shacl#maxInclusive> {?cat:fullIRI}

# Minimum Exclusive {=sh:minExclusive .class:Constraint label}

> Specifies the minimum exclusive value for range constraints - the value must be greater than this bound. Works with numbers, dates, times, and other ordered datatypes. {comment}

<http://www.w3.org/ns/shacl#minExclusive> {?cat:fullIRI}

# Maximum Exclusive {=sh:maxExclusive .class:Constraint label}

> Specifies the maximum exclusive value for range constraints - the value must be less than this bound. Works with numbers, dates, times, and other ordered datatypes. {comment}

<http://www.w3.org/ns/shacl#maxExclusive> {?cat:fullIRI}

---

## Demo {=ex:demo ?cat:hasDemo}

### Event Management Test Shape {=ex:EventTestShape .sh:NodeShape ?cat:hasShape label}

Validates all [member] {+member ?sh:targetObjectsOf} entities of the test data container to demonstrate comprehensive range constraints across multiple datatypes for event management scenarios. It includes **Ticket Price Range Rule** {+ex:#priceRange ?sh:property label}, **Attendee Age Restriction Rule** {+ex:#ageRange ?sh:property label}, **Event Scheduling Window Rule** {+ex:#eventDate ?sh:property label} and **Registration Deadline Rule** {=ex:#registrationDeadline ?sh:property label}.

### Rules

**Event ticket prices must be between $10.00 and $1000.00 inclusive for fair pricing** {=ex:#priceRange .sh:PropertyShape sh:message} - [ticketPrice] {+ex:price ?sh:path} property follows standard event pricing guidelines by being at least [10.00] {sh:minInclusive ^^xsd:decimal} (minimum viable ticket price) and at most [1000.00] {sh:maxInclusive ^^xsd:decimal} (premium event cap).

**Event attendees must be strictly between 18 and 65 years old for age-restricted events** {=ex:#ageRange .sh:PropertyShape sh:message} - legal and safety requirements by requiring the [attendeeAge] {+ex:age ?sh:path} property to be greater than [18] {sh:minExclusive ^^xsd:integer} (legal adult age) and less than [65] {sh:maxExclusive ^^xsd:integer} (senior discount eligibility).

**Events must be scheduled within the 2024-2025 planning period for proper resource allocation** {=ex:#eventDate .sh:PropertyShape sh:message} - the [eventDate] {+ex:eventDate ?sh:path} property falls within the current planning cycle by being at least [2024-01-01] {sh:minInclusive ^^xsd:date} (start of fiscal year) and at most [2025-12-31] {sh:maxInclusive ^^xsd:date} (end of planning horizon).

**Registration deadlines must be set after December 31, 2024 to allow adequate preparation time** {=ex:#registrationDeadline .sh:PropertyShape sh:message} - proper advance planning by requiring the [registrationDeadline] {+ex:registrationDeadline ?sh:path} property to be greater than [2024-12-31T23:59:59Z] {sh:minExclusive ^^xsd:dateTime} (end of current year).

---

### 📋 Test Data {=ex:data .Container}

#### Valid Event {=ex:ValidEvent ?member}

A perfectly configured conference event with all values within approved business ranges - standard pricing, adult attendee age, current fiscal year scheduling, and proper advance registration deadline.

Ticket Price: [99.99] {ex:price ^^xsd:decimal}
Attendee Age: [25] {ex:age ^^xsd:integer}
Event Date: [2024-06-15] {ex:eventDate ^^xsd:date}
Registration Deadline: [2025-01-15T10:00:00Z] {ex:registrationDeadline ^^xsd:dateTime}

#### Invalid Event - Budget Price Violation {=ex:InvalidEventLowPrice ?member}

A community workshop priced below the minimum viable ticket price threshold, violating standard event pricing guidelines.

Ticket Price: [5.99] {ex:price ^^xsd:decimal}
Attendee Age: [25] {ex:age ^^xsd:integer}
Event Date: [2024-06-15] {ex:eventDate ^^xsd:date}
Registration Deadline: [2025-01-15T10:00:00Z] {ex:registrationDeadline ^^xsd:dateTime}

#### Invalid Event - Premium Price Violation {=ex:InvalidEventHighPrice ?member}

An exclusive gala event priced above the maximum premium event cap, exceeding standard pricing guidelines.

Ticket Price: [1500.00] {ex:price ^^xsd:decimal}
Attendee Age: [25] {ex:age ^^xsd:integer}
Event Date: [2024-06-15] {ex:eventDate ^^xsd:date}
Registration Deadline: [2025-01-15T10:00:00Z] {ex:registrationDeadline ^^xsd:dateTime}

#### Invalid Event - Underage Attendee {=ex:InvalidEventYoungAge ?member}

A music festival with age restrictions that incorrectly allows attendees at the minimum legal boundary age.

Ticket Price: [99.99] {ex:price ^^xsd:decimal}
Attendee Age: [18] {ex:age ^^xsd:integer}
Event Date: [2024-06-15] {ex:eventDate ^^xsd:date}
Registration Deadline: [2025-01-15T10:00:00Z] {ex:registrationDeadline ^^xsd:dateTime}

#### Invalid Event - Senior Age Boundary {=ex:InvalidEventOldAge ?member}

A sports training camp that violates the age restriction by including attendees at the senior discount eligibility boundary.

Ticket Price: [99.99] {ex:price ^^xsd:decimal}
Attendee Age: [65] {ex:age ^^xsd:integer}
Event Date: [2024-06-15] {ex:eventDate ^^xsd:date}
Registration Deadline: [2025-01-15T10:00:00Z] {ex:registrationDeadline ^^xsd:dateTime}

#### Invalid Event - Historical Scheduling {=ex:InvalidEventEarlyDate ?member}

A retrospective event scheduled before the current fiscal year, violating the planning period constraints.

Ticket Price: [99.99] {ex:price ^^xsd:decimal}
Attendee Age: [25] {ex:age ^^xsd:integer}
Event Date: [2023-12-31] {ex:eventDate ^^xsd:date}
Registration Deadline: [2025-01-15T10:00:00Z] {ex:registrationDeadline ^^xsd:dateTime}

#### Invalid Event - Future Scheduling {=ex:InvalidEventLateDate ?member}

A technology summit scheduled beyond the planning horizon, exceeding the maximum allowed scheduling window.

Ticket Price: [99.99] {ex:price ^^xsd:decimal}
Attendee Age: [25] {ex:age ^^xsd:integer}
Event Date: [2026-01-01] {ex:eventDate ^^xsd:date}
Registration Deadline: [2025-01-15T10:00:00Z] {ex:registrationDeadline ^^xsd:dateTime}

#### Invalid Event - Insufficient Preparation Time {=ex:InvalidEventEarlyDeadline ?member}

A corporate training event with registration deadline set exactly at the exclusive boundary, not allowing adequate preparation time.

Ticket Price: [99.99] {ex:price ^^xsd:decimal}
Attendee Age: [25] {ex:age ^^xsd:integer}
Event Date: [2024-06-15] {ex:eventDate ^^xsd:date}
Registration Deadline: [2024-12-31T23:59:59Z] {ex:registrationDeadline ^^xsd:dateTime}

---

{=ex:demo} must produce exactly **7** {cat:expectsViolations ^^xsd:integer} violations.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Event** - passes (all range constraints satisfied)
2. **Invalid Event - Price Too Low** - fails once (price: 5.99 < 10.00 minInclusive)
3. **Invalid Event - Price Too High** - fails once (price: 1500.00 > 1000.00 maxInclusive)
4. **Invalid Event - Age Too Young** - fails once (age: 18 = 18 minExclusive)
5. **Invalid Event - Age Too Old** - fails once (age: 65 = 65 maxExclusive)
6. **Invalid Event - Date Too Early** - fails once (date: 2023-12-31 < 2024-01-01 minInclusive)
7. **Invalid Event - Date Too Late** - fails once (date: 2026-01-01 > 2025-12-31 maxInclusive)
8. **Invalid Event - Deadline Too Early** - fails once (deadline: 2024-12-31T23:59:59Z = 2024-12-31T23:59:59Z minExclusive)

Note: Inclusive bounds (minInclusive, maxInclusive) include the boundary values, while exclusive bounds (minExclusive, maxExclusive) exclude the boundary values. Range constraints work with any ordered datatype including numbers, dates, times, and strings.

### 🔍 Test Validation

```bash
# This should show 7 violations - various range constraint failures across multiple datatypes
ig-cli validate ./constraints/range.md
```

---

## 📝 MDLD Syntax Patterns

**Recommended pattern for range constraints:**

1. Use container member targeting for comprehensive validation
2. Apply inline subject redeclaration for multiple PropertyShapes
3. Combine minInclusive/maxInclusive for inclusive ranges
4. Use minExclusive/maxExclusive for exclusive ranges
5. Use appropriate datatypes (xsd:decimal, xsd:integer, xsd:date, xsd:dateTime, etc.)

**Supported Ordered Datatypes:**
- **Numeric:** xsd:decimal, xsd:integer, xsd:float, xsd:double
- **Date/Time:** xsd:date, xsd:dateTime, xsd:time, xsd:gYear, xsd:gYearMonth
- **String:** Lexicographic ordering (A-Z, 0-9)

**Key advantages:**
- ✅ **Multi-datatype support** - numbers, dates, times, strings
- ✅ **Inclusive/Exclusive control** - precise boundary behavior
- ✅ **Business rule enforcement** - age limits, price ranges, scheduling
- ✅ **Temporal validation** - event scheduling, deadline management

---

## 🎯 Use Cases

### **Numeric Ranges**
- **Price validation** - enforce product pricing ranges
- **Age restrictions** - validate user age requirements
- **Inventory management** - ensure non-negative stock levels
- **Score ranges** - validate test scores or ratings
- **Financial constraints** - validate transaction amounts

### **Date/Time Ranges**
- **Event scheduling** - ensure events are within valid date ranges
- **Registration periods** - validate signup deadlines
- **Expiration dates** - check product/service validity
- **Booking windows** - enforce reservation timeframes
- **Compliance dates** - validate regulatory deadlines
- **Historical constraints** - ensure dates are within historical periods

### **String Ranges**
- **Alphabetical ordering** - validate code sequences
- **Version ranges** - enforce version string ordering
- **Identifier ranges** - validate ID ranges lexicographically






{=}



<a id="constraints-comparison"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <mdld:shacl/example/comparison/>
[xsd] <http://www.w3.org/2001/XMLSchema#>

# Comparison Constraints {=sh:lessThan .class:ComparisonConstraint label}

> Validates property values against reference nodes using comparison operators. Essential for ordering, version control, date validation, and business rule enforcement where values must be smaller than or equal to specific reference points. {comment}

<http://www.w3.org/ns/shacl#lessThan> {?cat:fullIRI}
<http://www.w3.org/ns/shacl#lessThanOrEquals> {?cat:fullIRI}
<http://www.w3.org/ns/shacl#equals> {?cat:fullIRI}

---

## Demo {=ex:demo ?cat:hasDemo}

This demo demonstrates comparison constraints using event scheduling and pricing validation.

### Event Validation Demo

The **Event Planning Shape** {=ex:EventPlanningShape .sh:NodeShape ?cat:hasShape label} targets all [events] {+ex:Event ?sh:targetClass} to validate business rules: **Event must follow business planning rules** {sh:message}

**Order Date Rule** {=ex:#orderDateRule .sh:PropertyShape ?sh:property} ensures [order date] {+ex:orderDate ?sh:path} is scheduled before [shipping date] {+ex:shippingDate ?sh:lessThan}: **Order must be placed before shipping** {sh:message}.

{=ex:EventPlanningShape}

**Version Rule** {=ex:#versionRule .sh:PropertyShape ?sh:property} ensures [current version] {+ex:currentVersion ?sh:path} does not exceed [latest version] {+ex:latestVersion ?sh:lessThanOrEquals}: **Current version must be ≤ latest version** {sh:message}.

{=ex:EventPlanningShape}

**Pricing Rule** {=ex:#pricingRule .sh:PropertyShape ?sh:property} ensures [ticket price] {+ex:ticketPrice ?sh:path} matches [standard price] {+ex:standardPrice ?sh:equals}: **Ticket price must equal standard price** {sh:message}.

{=ex:demo}

### 📋 Test Data {=ex:data .Container}

#### Valid Event {=ex:ValidEvent .ex:Event}

A properly scheduled event with correct versioning and standard pricing.

Order Date: [2024-06-15] {ex:orderDate ^^xsd:date}
Shipping Date: [2024-06-20] {ex:shippingDate ^^xsd:date}
Current Version: [2.1] {ex:currentVersion ^^xsd:string}
Latest Version: [3.0] {ex:latestVersion ^^xsd:string}
Ticket Price: [99.99] {ex:ticketPrice ^^xsd:decimal}
Standard Price: [99.99] {ex:standardPrice ^^xsd:decimal}

#### Invalid Event - Late Order {=ex:LateOrderEvent .ex:Event}

An event with order date after shipping date (violates temporal business rule).

Order Date: [2024-06-25] {ex:orderDate ^^xsd:date}
Shipping Date: [2024-06-20] {ex:shippingDate ^^xsd:date}
Current Version: [2.1] {ex:currentVersion ^^xsd:string}
Latest Version: [3.0] {ex:latestVersion ^^xsd:string}
Ticket Price: [99.99] {ex:ticketPrice ^^xsd:decimal}
Standard Price: [99.99] {ex:standardPrice ^^xsd:decimal}

#### Invalid Event - Version Mismatch {=ex:VersionMismatchEvent .ex:Event}

An event using version [3.1] {ex:currentVersion ^^xsd:string} newer than latest available (violates version control).

Order Date: [2024-06-15] {ex:orderDate ^^xsd:date}
Shipping Date: [2024-06-20] {ex:shippingDate ^^xsd:date}
Latest Version: [3.0] {ex:latestVersion ^^xsd:string}
Ticket Price: [99.99] {ex:ticketPrice ^^xsd:decimal}
Standard Price: [99.99] {ex:standardPrice ^^xsd:decimal}

#### Invalid Event - Price Mismatch {=ex:PriceMismatchEvent .ex:Event}

An event with non-standard pricing (violates pricing policy).

Order Date: [2024-06-15] {ex:orderDate ^^xsd:date}
Shipping Date: [2024-06-20] {ex:shippingDate ^^xsd:date}
Current Version: [2.1] {ex:currentVersion ^^xsd:string}
Latest Version: [3.0] {ex:latestVersion ^^xsd:string}
Ticket Price: [149.99] {ex:ticketPrice ^^xsd:decimal}
Standard Price: [99.99] {ex:standardPrice ^^xsd:decimal}

---

[This demo] {=ex:demo} must produce exactly **4** {cat:expectsViolations ^^xsd:integer} violations.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Event** - passes (order < shipping ✓, version ≤ latest ✓, price = standard ✓)
2. **Invalid Event - Late Order** - fails once (order > shipping ✗, version ≤ latest ✓, price = standard ✓)
3. **Invalid Event - Version Mismatch** - fails once (order ≤ shipping ✓, version > latest ✗, price = standard ✓)
4. **Invalid Event - Price Mismatch** - fails once (order ≤ shipping ✓, version ≤ latest ✓, price ≠ standard ✗)

Note: Each constraint validates independently; multiple violations can occur on same event.

### 🔍 Test Validation

```bash
# This should show 4 violations - late order, version mismatch, and price mismatch
ig-cli validate ./constraints/comparison.md
```

---

## 📝 MDLD Syntax Patterns

**Use cases:**
- **Temporal validation** - order dates before shipping dates, start times before end times
- **Version control** - ensure current version doesn't exceed latest version
- **Pricing validation** - ticket prices must match standard pricing tiers
- **Business rules** - enforce directional business constraints (A must happen before B)
- **Quality gates** - ensure metrics stay within approved ranges

**Key advantages:**
- ✅ **Directional validation** - clear semantic direction (focus node vs reference node)
- ✅ **Reference-based** - compare against specific reference values/nodes
- ✅ **Business logic** - encode complex business rules in declarative constraints
- ✅ **Asymmetric by design** - prevents ambiguous validation logic
- ✅ **Node comparison** - works with IRI references, not just literals

---

## 🔧 Technical Notes

### **Constraint Behavior:**
- `sh:lessThan` - focus node values must be smaller than reference node values
- `sh:lessThanOrEquals` - focus node values must be ≤ reference node values  
- `sh:equals` - focus node values must equal reference node values
- All use `sh:nodeKind sh:IRI` to reference other nodes

### **SHACL Processing:**
- Reference nodes are not validated themselves - they serve as comparison targets
- Asymmetric design prevents circular validation logic
- Multiple comparison constraints can apply to same property
- Validation fails if ANY comparison constraint fails

### **Best Practices:**
- Use clear reference node names that indicate their purpose (latestVersion, shippingDate)
- Document the business rule clearly in constraint messages
- Test reference nodes independently to ensure they exist
- Consider using `sh:in` for enumerated valid values instead of complex comparisons
- Group related comparison constraints on same property for business logic clarity






{=}



<a id="constraints-disjoint"></a>

[mdld] <https://mdld.js.org/vocab/>
[cat] <https://mdld.js.org/shacl/catalog/>
[ex] <http://example.org/>
[xsd] <http://www.w3.org/2001/XMLSchema#>

# Disjoint Constraint {=sh:disjoint .class:DisjointConstraint label}

> Ensures that values of a property are disjoint with values of another property. Essential for preventing value overlap between related properties like labels, categories, or mutually exclusive attributes. {comment}

<http://www.w3.org/ns/shacl#disjoint> {?cat:fullIRI}

---

## Demo {=ex:demo ?cat:hasDemo}

This demo demonstrates the disjoint constraint using country labels.

### Country Label Demo

The **Disjoint Example Shape** {=ex:DisjointExampleShape .sh:NodeShape ?cat:hasShape label} targets [USA] {+ex:USA ?sh:targetNode} and [Germany] {+ex:Germany ?sh:targetNode} to validate that [preferred labels] {+ex:prefLabel ?sh:path} are [disjoint] {+ex:altLabel ?sh:disjoint}: **Preferred labels must be different from alternative labels** {sh:message}.

### 📋 Test Data {=ex:data .Container}

#### Valid Case - USA {=ex:USA}

Country with distinct preferred and alternative labels.

Preferred Label: [USA] {ex:prefLabel}
Alternative Label: [United States] {ex:altLabel}

#### Invalid Case - Germany {=ex:Germany}

Country with same value in both labels (violates disjoint constraint).

Preferred Label: [Germany] {ex:prefLabel}
Alternative Label: [Germany] {ex:altLabel}

---

[This demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **USA** - passes (prefLabel "USA" ≠ altLabel "United States" ✓)
2. **Germany** - fails once (prefLabel "Germany" = altLabel "Germany" ✗)

### 🔍 Test Validation

```bash
# This should show 1 violation - Germany has same value in both properties
ig-cli validate ./constraints/disjoint.md
```

---

## 📝 MDLD Syntax Patterns

**Use cases:**
- **Label management** - ensure prefLabel and altLabel don't overlap
- **Category exclusivity** - prevent items from being in multiple exclusive categories
- **Status separation** - ensure status properties don't share values
- **Data quality** - prevent duplicate values across related properties

**Key behavior:**
- **Value-level validation** - checks individual values, not entire sets
- **Property-to-property comparison** - compares values between two properties on same node
- **Violation per overlapping value** - each shared value generates a separate violation






{=}



<a id="constraints-not"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <mdld:shacl/example/not/>
[xsd] <http://www.w3.org/2001/XMLSchema#>

# NOT Constraint {=sh:not .class:LogicalConstraint label}

> Requires value nodes to NOT conform to a given shape. Essential for negation patterns and exclusion rules. {comment}

<http://www.w3.org/ns/shacl#not> {?cat:fullIRI}

---

## Demo {=ex:demo ?cat:hasDemo}

This demo demonstrates logical NOT constraint using forbidden status validation scenario.

### Forbidden Status Demo

The **User Status Shape** {=ex:UserStatusShape .sh:NodeShape ?cat:hasShape label} targets all [users] {+ex:User ?sh:targetClass} to validate forbidden status: **User cannot have deleted status** {sh:message}

User status must not conform to the forbidden shape using [Forbidden Status Shape] {+ex:ForbiddenStatusShape ?sh:not}.

**Forbidden Status Shape** {=ex:ForbiddenStatusShape .sh:NodeShape} requires the [status] {+ex:status ?sh:path} property to be exactly [deleted] {sh:hasValue}.


### 📋 Test Data {=ex:data .Container}

#### Valid User - Active {=ex:ValidActiveUser .ex:User}

A valid user with active status.

Name: [Alice] {ex:name}
Status: [active] {ex:status}

#### Valid User - Inactive {=ex:ValidInactiveUser .ex:User}

A valid user with inactive status.

Name: [Bob] {ex:name}
Status: [inactive] {ex:status}

#### Invalid User - Deleted {=ex:InvalidDeletedUser .ex:User}

An invalid user with deleted status (forbidden).

Name: [Charlie] {ex:name}
Status: [deleted] {ex:status}

#### Valid User - No Status {=ex:ValidNoStatusUser .ex:User}

A valid user with no status (doesn't match forbidden shape).

Name: [Dana] {ex:name}

---

[This demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid User - Active** - passes (status: active ≠ deleted)
2. **Valid User - Inactive** - passes (status: inactive ≠ deleted)  
3. **Invalid User - Deleted** - fails once (status: deleted = forbidden)
4. **Valid User - No Status** - passes (no status property, doesn't match forbidden shape)

Note: sh:not only validates nodes that would conform to the forbidden shape.

### 🔍 Test Validation

```bash
# This should show 1 violation - user with deleted status
ig-cli validate ./constraints/not.md
```

---

## 📝 MDLD Syntax Patterns

**Use cases:**
- **Forbidden values** - status cannot be "deleted" or "blocked"
- **Exclusion rules** - users cannot be in certain categories
- **Negation patterns** - documents cannot have "draft" and "published" simultaneously
- **Business rules** - orders cannot have "cancelled" and "shipped" status
- **Data quality** - records cannot have "test" or "demo" identifiers

**Key advantages:**
- ✅ **Exclusion validation** - clearly defines forbidden conditions
- ✅ **Business rules** - models real-world prohibition scenarios
- ✅ **Data integrity** - prevents invalid states
- ✅ **Flexible shapes** - can negate any constraint shape
- ✅ **Clear semantics** - unambiguous exclusion logic

---

## 🔧 Technical Notes

### **Logical Behavior:**
- `sh:not` succeeds if the value node does NOT conform to the given shape
- Only validates nodes that would conform to the negated shape
- Works with any shape type (NodeShape, PropertyShape)
- Can negate complex constraint combinations

### **SHACL Behavior:**
- Creates a validation context for the negated shape
- Violations only reported for nodes conforming to negated shape
- Performance depends on complexity of negated shape
- Can be nested within other logical constraints

### **Best Practices:**
- Keep negated shapes simple and focused
- Use descriptive names for forbidden shapes
- Test the negated shape independently first
- Document exclusion rules clearly in comments
- Consider using sh:and for multiple exclusion conditions






{=}



<a id="constraints-and"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <mdld:shacl/example/logical/>
[xsd] <http://www.w3.org/2001/XMLSchema#>

# AND Constraint {=sh:and .class:LogicalConstraint label}

> Requires all constraints in the list to be satisfied. Essential when multiple conditions must all pass for validation to succeed. {comment}

<http://www.w3.org/ns/shacl#and> {?cat:fullIRI}

---

## Demo {=ex:demo ?cat:hasDemo}

This demo demonstrates logical AND constraint using product validation scenario.

### Product Validation Demo

The **Product Validation Shape** {=ex:ProductValidationShape .sh:NodeShape ?cat:hasShape label} targets all [products] {+ex:Product ?sh:targetClass} to validate multiple conditions: **Product must have a price and at least 1 category defined** {sh:message}

Product must satisfy all constraints using verbose RDF list syntax for sh:and.

**Constraints List** {=ex:l1 ?sh:and .rdf:List}: [Min Count] {+ex:priceRequired ?rdf:first}, then [followed] {=ex:l2 ?rdf:rest} by the second constraint [Class] {+ex:categoryRequired ?rdf:first} and a [nil] {+rdf:nil ?rdf:rest} node (end of list). Reset current subject to avoid accidental further assignments with {=}.

**Price Required Constraint** {=ex:priceRequired .sh:PropertyShape} ensures the [price] {+ex:price ?sh:path} property has at least [1] {sh:minCount ^^xsd:integer} value.

**Category Required Constraint** {=ex:categoryRequired .sh:PropertyShape} ensures the [category] {+ex:category ?sh:path} property has at least [1] {sh:minCount ^^xsd:integer} value.

{=ex:demo}

### 📋 Test Data {=ex:data .Container}

#### Valid Product {=ex:ValidProduct .ex:Product}

A valid product with both price and category.

Name: [Laptop] {ex:name}
Price: [999] {ex:price ^^xsd:integer}
Category: [Electronics] {ex:category}

#### Missing Price Product {=ex:MissingPriceProduct .ex:Product}

A product missing price.

Name: [Phone] {ex:name}
Category: [Electronics] {ex:category}

#### Missing Category Product {=ex:MissingCategoryProduct .ex:Product}

A product missing category.

Name: [Tablet] {ex:name}
Price: [299] {ex:price ^^xsd:integer}

#### Empty Product {=ex:EmptyProduct .ex:Product}

A product with no required properties.

Name: [Monitor] {ex:name}

---

[This demo] {=ex:demo} must produce exactly **3** {cat:expectsViolations ^^xsd:integer} violations.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Product** - passes (has price ✓, has category ✓)
2. **Missing Price Product** - fails once (missing price ✗, has category ✓)
3. **Missing Category Product** - fails once (has price ✓, missing category ✗)
4. **Empty Product** - fails once (missing price ✗, missing category ✗)

Note: Each failing node produces one violation for sh:and, even if multiple constraints fail.

### 🔍 Test Validation

```bash
# This should show 3 violations - products missing required properties
ig-cli validate ./constraints/logical.md
```

---

## 📝 MDLD Syntax Patterns

**Use cases:**
- **Multi-field validation** - user registration forms, product listings
- **Business rules** - order processing, approval workflows
- **Conditional logic** - dependent field validation
- **Complex constraints** - composite business requirements
- **Quality assurance** - data completeness checks

**Key advantages:**
- ✅ **Complex validation** - combines multiple constraint types
- ✅ **Business logic** - encodes real-world validation rules
- ✅ **Conditional requirements** - dependent field validation
- ✅ **Error grouping** - single violation for multiple failures
- ✅ **Documentation clarity** - makes complex rules visible

---

## 🔧 Technical Notes

### **Logical Operators:**
- `sh:and` - all constraints must pass

### **SHACL Behavior:**
- Logical constraints create nested validation contexts
- Each constraint in the list is evaluated independently
- Violations are grouped under the logical constraint
- Performance depends on constraint complexity

### **Best Practices:**
- Use descriptive constraint names for debugging
- Test each constraint independently before combining
- Consider constraint ordering for performance
- Document business rules clearly in comments






{=}



<a id="constraints-length"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <mdld:shacl/example/length/>
[xsd] <http://www.w3.org/2001/XMLSchema#>

# Min Length {=sh:minLength .class:Constraint label}

> Specifies the minimum length of string values - useful for password requirements, username validation, or content length limits. {comment}

<http://www.w3.org/ns/shacl#minLength> {?cat:fullIRI}

# Max Length {=sh:maxLength .class:Constraint label}

> Specifies the maximum length of string values - useful for field size limits, message length restrictions, or data entry constraints. {comment}

<http://www.w3.org/ns/shacl#maxLength> {?cat:fullIRI}

---

## Demo {=ex:demo ?cat:hasDemo}

## Shapes

The **User Account Test Shape** {=ex:UserAccountTestShape .sh:NodeShape ?cat:hasShape label} validates all [member] {+member ?sh:targetObjectsOf} entities of the test data container to demonstrate length constraints with **Username Length Rule** {+ex:#usernameLength ?sh:property}, **Password Length Rule** {+ex:#passwordLength ?sh:property label} and **Bio Length Rule** {+ex:#bioLength .sh:PropertyShape ?sh:property label}

## Rules

**Username must be 3-20 characters long** {=ex:#usernameLength .sh:PropertyShape sh:message} requires the [username] {+ex:username ?sh:path} property to have at least [3] {sh:minLength ^^xsd:integer} and at most [20] {sh:maxLength ^^xsd:integer} characters.

**Password must be at least 8 characters long** {=ex:#passwordLength .sh:PropertyShape sh:message} 
[password] {+ex:password ?sh:path} property to have at least [8] {sh:minLength ^^xsd:integer} characters.

**Bio must be at most 200 characters long** {=ex:#bioLength .sh:PropertyShape sh:message}  
[bio] {+ex:bio ?sh:path} property has at most [200] {sh:maxLength ^^xsd:integer} characters.

---

### 📋 Test Data {=ex:data .Container}

#### Valid User {=ex:ValidUser ?member}

A user with properly sized fields.

Username: [john_doe] {ex:username}
Password: [securepass123] {ex:password}
Bio: [Software developer with 5 years of experience in web technologies] {ex:bio}

#### Invalid User - Short Username {=ex:InvalidUserShort ?member}

A user with username that's too short.

Username: [jd] {ex:username}
Password: [securepass123] {ex:password}
Bio: [Software developer] {ex:bio}

#### Invalid User - Long Username {=ex:InvalidUserLong ?member}

A user with username that's too long.

Username: [this_username_is_way_too_long_for_the_system] {ex:username}
Password: [securepass123] {ex:password}
Bio: [Software developer] {ex:bio}

#### Invalid User - Short Password {=ex:InvalidUserPassword ?member}

A user with password that's too short.

Username: [john_doe] {ex:username}
Password: [short] {ex:password}
Bio: [Software developer] {ex:bio}

#### Invalid User - Long Bio {=ex:InvalidUserBio ?member}

A user with bio that's too long.

Username: [john_doe] {ex:username}
Password: [securepass123] {ex:password}
Bio: [Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.] {ex:bio}

---

{=ex:demo} must produce exactly **4** {cat:expectsViolations ^^xsd:integer} violations.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid User** - passes (all length constraints satisfied)
2. **Invalid User - Short Username** - fails once (username too short: 2 < 3)
3. **Invalid User - Long Username** - fails once (username too long: 33 > 20)
4. **Invalid User - Short Password** - fails once (password too short: 5 < 8)
5. **Invalid User - Long Bio** - fails once (bio too long: > 200 characters)

Note: Length constraints enforce string size limits for usernames, passwords, and bio fields. Both minLength and maxLength can be used together or separately.

### 🔍 Test Validation

```bash
# This should show 4 violations - various length constraint failures
ig-cli validate ./constraints/length.md
```

---

## 📝 MDLD Syntax Patterns

**Recommended pattern for length constraints:**

1. Use container member targeting for comprehensive validation
2. Apply inline subject redeclaration for multiple PropertyShapes
3. Combine minLength and maxLength in single PropertyShape when needed
4. Use integer literals with xsd:integer datatype for bounds

**Key advantages:**
- ✅ **String size validation** - enforce minimum and maximum lengths
- ✅ **Input validation** - prevent too short or too long entries
- ✅ **User experience** - ensure appropriate field sizes
- ✅ **Data quality** - maintain consistent string lengths

---

## 🎯 Use Cases

- **Username validation** - enforce reasonable username lengths
- **Password policies** - ensure minimum password complexity
- **Content limits** - restrict post/comment/message sizes
- **Form validation** - enforce field size requirements
- **Database constraints** - match column length limits
- **API validation** - ensure request payload sizes






{=}



<a id="constraints-pattern"></a>

[mdld] <https://mdld.js.org/vocab/>
[cat] <https://mdld.js.org/shacl/catalog/>
[ex] <http://example.org/>
[xsd] <http://www.w3.org/2001/XMLSchema#>

# Pattern Constraint {=sh:pattern .class:PatternConstraint label}

> Validates string values against regular expression patterns. Essential for email validation, phone number formatting, identifier patterns, and any text-based data format requirements. {comment}

<http://www.w3.org/ns/shacl#pattern> {?cat:fullIRI}
<http://www.w3.org/ns/shacl#flags> {?cat:fullIRI}

---

## Demo {=ex:demo ?cat:hasDemo}

This demo demonstrates pattern validation using email addresses.

### Email Validation Demo

The **Pattern Example Shape** {=ex:PatternExampleShape .sh:NodeShape ?cat:hasShape label} targets [ValidNode] {+ex:ValidNode ?sh:targetNode} and [InvalidNode] {+ex:InvalidNode ?sh:targetNode} to validate [email addresses] {+ex:email ?sh:path} match [example.com] {sh:pattern} with [i] {sh:flags}: **Email must follow standard format** {sh:message}.

### 📋 Test Data {=ex:data .Container}

#### Valid Email {=ex:ValidNode}

Email address that matches standard pattern.

Email: [user@example.com] {ex:email ^^xsd:string}

#### Invalid Email {=ex:InvalidNode}

Email address that doesn't match standard pattern.

Email: [user@example.org] {ex:email ^^xsd:string}

---

[This demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Email** - passes (matches email pattern ✓)
2. **Invalid Email** - fails once (doesn't match email pattern ✗)

### 🔍 Test Validation

```bash
# This should show 1 violation - InvalidNode has malformed email
ig-cli validate ./constraints/pattern.md
```

---

## 📝 MDLD Syntax Patterns

**Use cases:**
- **Email validation** - ensure proper email format with domain validation
- **Phone number validation** - enforce specific phone number patterns
- **Identifier validation** - product codes, employee IDs, serial numbers
- **URL validation** - ensure proper URL structure
- **Username validation** - enforce username format rules

**Pattern syntax:**
- **Regular expressions** - full regex pattern support
- **Case flags** - `i` for case-insensitive, `g` for global, `m` for multiline
- **Unicode support** - handles international character sets
- **Escape sequences** - use `\\` for literal backslashes in patterns

**Key behavior:**
- **String-only validation** - applies to string literal values
- **Pattern matching** - entire value must match the regex pattern
- **Violation per non-match** - each value that fails pattern generates violation






{=}



<a id="constraints-language"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <mdld:shacl/example/language/>
[xsd] <http://www.w3.org/2001/XMLSchema#>

# Language In {=sh:languageIn .class:StringConstraint label}

> Constrains string literals to have language tags from a specified list using RDF lists. Essential for multilingual content validation and internationalization support. {comment}

<http://www.w3.org/ns/shacl#languageIn> {?cat:fullIRI}

***

## Demo {=ex:demo ?cat:hasDemo}

This demo demonstrates language constraint using multilingual document scenarios.

### Multilingual Document Demo

The **Multilingual Document Shape** {=ex:MultilingualDocumentShape .sh:NodeShape ?cat:hasShape label} targets all [documents] {+ex:Document ?sh:targetClass} to validate language tags.

**Title language must be in allowed list** {=ex:#titleLanguage .sh:PropertyShape ?sh:property sh:message} defines rules for the [title] {+ex:title ?sh:path} property.

Title language tags must be in the allowed list using verbose RDF list syntax.

We start from the [List] {=ex:l1 ?sh:languageIn .rdf:List} of the list, followed by first literal value [en] {rdf:first}, then goes the next list [node] {=ex:l2 ?rdf:rest} with another language as literal in an inline value carrier [fr] {rdf:first} followed by a closing [nil] {+rdf:nil ?rdf:rest} and as subject reset.
{=}

***

### 📋 Test Data {=ex:data .Container}

#### English Document {=ex:EnglishDocument .ex:Document}

A valid document with English title.

Title: [Hello World] {ex:title @en}

#### French Document {=ex:FrenchDocument .ex:Document}

A valid document with French title.

Title: [Bonjour le monde] {ex:title @fr}

#### German Document {=ex:GermanDocument .ex:Document}

An invalid document with German title (not in allowed list).

Title: [Hallo Welt] {ex:title @de}

#### No Language Document {=ex:NoLanguageDocument .ex:Document}

A document without language tag.

Title: [Untitled] {ex:title}

***

{=ex:demo} must produce exactly **2** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **English Document** - passes (title: @en ✓)
2. **French Document** - passes (title: @fr ✓)
3. **German Document** - fails once (title: @de ✗)
4. **No Language Document** - fails once (no language tag)

Note: `sh:languageIn` only validates language tags if they exist. Use `sh:minCount` to check for required properties.

### 🔍 Test Validation

```bash
# This should show 2 violation - German title not in allowed list
ig-cli validate ./constraints/language.md
```

***

**Use cases:**

* **Multilingual content** - restrict documents to specific languages

* **Regional compliance** - ensure content meets language requirements

* **Content localization** - validate language-specific versions

* **International standards** - enforce language tag standards

* **Translation workflows** - control which languages are allowed

**Key advantages:**

* ✅ **Language validation** - ensures content uses approved languages

* ✅ **Internationalization support** - essential for global applications

* ✅ **Compliance enforcement** - meets regional language requirements

* ✅ **Content quality** - maintains language consistency

* ✅ **Workflow control** - manages translation processes

***






{=}



<a id="constraints-uniquelang"></a>

[mdld] <https://mdld.js.org/vocab/>
[cat] <https://mdld.js.org/shacl/catalog/>
[ex] <ttps://mdld.js.org/shacl/catalog/uniqueLang/example/>
[xsd] <http://www.w3.org/2001/XMLSchema#>

# Unique Languages Constraint {=sh:uniqueLang .class:UniqueLanguageConstraint label}

> Ensures that language tags of string literals are unique within a property. Essential for multilingual content management, preventing duplicate language entries, and maintaining clean internationalization data. {comment}

<http://www.w3.org/ns/shacl#uniqueLang> {?cat:fullIRI}

***

## Demo {=ex:demo ?cat:hasDemo}

This demo demonstrates unique language constraint using multilingual document titles.

### Multilingual Document Demo

The **Unique Language Example Shape** {=ex:UniqueLangExampleShape .sh:NodeShape ?cat:hasShape label} targets [ValidNode] {+ex:ValidNode ?sh:targetNode} and [InvalidNode] {+ex:InvalidNode ?sh:targetNode} to validate 

**Each language tag must appear only once** {=ex:TitleProperty .sh:PropertyShape ?sh:property sh:message} - [title] {+ex:title ?sh:path} values have [true] {sh:uniqueLang ^^xsd:boolean}. 


### 📋 Test Data {=ex:data .Container}

#### Valid Document {=ex:ValidNode}

Document with unique language tags.

Title: [Hello World] {ex:title @en}
Title: [Bonjour Monde] {ex:title @fr}

#### Invalid Document {=ex:InvalidNode}

Document with duplicate language tag (violates unique language constraint).

Title: [Hello World] {ex:title @en}
Title: [Hola Mundo] {ex:title @en}  # Duplicate "en" language tag

***

[This demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Document** - passes (unique "en" and "fr" language tags ✓)
2. **Invalid Document** - fails once (duplicate "en" language tag ✗)

### 🔍 Test Validation

```bash
# This should show 1 violation - InvalidNode has duplicate "en" language tag
ig-cli validate ./constraints/uniqueLang.md
```

***

## 📝 MDLD Syntax Patterns

**Use cases:**

* **Multilingual content** - ensure each language appears only once per property

* **Internationalization** - prevent duplicate translations in same property

* **Content management** - maintain clean language-specific metadata

* **Document localization** - enforce proper language tag distribution

**Key behavior:**

* **Language tag uniqueness** - each language tag appears at most once per property

* **String literal focus** - applies only to language-tagged string literals

* **Violation per duplicate** - each repeated language tag generates a violation

* **Case-sensitive comparison** - language tags are compared case-sensitively

**Language tag syntax:**

* **Standard format** - uses RFC 4646 language tags (en, fr, de, etc.)

* **Automatic detection** - works with `@en`, `@en-US`, `@fr-FR` formats

* **Integration ready** - combines with other string constraints seamlessly






{=}



<a id="constraints-hasvalue"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <mdld:shacl/example/hasvalue/>
[xsd] <http://www.w3.org/2001/XMLSchema#>

# Has Value {=sh:hasValue .class:Constraint label}

> Requires a property to have exactly this specific value - useful for fixed status fields, required constants, or mandatory identifiers. {comment}

<http://www.w3.org/ns/shacl#hasValue> {?cat:fullIRI}

---

## Demo {=ex:demo ?cat:hasDemo}

### Shapes

The **System Status Test Shape** {=ex:SystemStatusTestShape .sh:NodeShape ?cat:hasShape label} validates all [member] {+member ?sh:targetObjectsOf} entities of the test data container to demonstrate hasValue constraints for mandatory system properties with **Status Required Rule** {+ex:#statusRequired ?sh:property} and **Environment Required Rule** {+ex:#environmentRequired ?sh:property}.

### Rules

**Main server must have active status** {=ex:#statusRequired .sh:PropertyShape sh:message} requires the [status] {+ex:status ?sh:path} property to be exactly [active] {sh:hasValue}.

**Main server must be in production environment** {=ex:#environmentRequired .sh:PropertyShape sh:message} that requires the [environment] {+ex:environment ?sh:path} property to be exactly [production] {sh:hasValue}.

---

{=ex:demo}

### 📋 Test Data {=ex:data .Container}

#### Main Server {=ex:MainServer ?member}

The primary production server that must meet all requirements.

Status: [active] {ex:status}
Environment: [production] {ex:environment}
Version: [1.2.3] {ex:version}

#### Backup Server {=ex:BackupServer ?member}

A secondary server that fails status requirement.

Status: [standby] {ex:status}
Environment: [production] {ex:environment}
Version: [1.2.3] {ex:version}

#### Development Server {=ex:DevelopmentServer ?member}

A dev server that fails environment requirement.

Status: [active] {ex:status}
Environment: [development] {ex:environment}
Version: [1.2.4] {ex:version}

---

{=ex:demo} must produce exactly **2** {cat:expectsViolations ^^xsd:integer} violations.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Main Server** - passes (has active status AND production environment)
2. **Backup Server** - fails once (status is standby, not active)
3. **Development Server** - fails once (environment is development, not production)

Note: Container member targeting with proper member annotations ensures all servers are validated. HasValue constraints enforce exact value matches for mandatory properties.

### 🔍 Test Validation

```bash
# This should show 2 violations - status and environment failures
ig-cli validate ./constraints/hasvalue.md
```

---

## 📝 MDLD Syntax Patterns

**Recommended pattern for hasValue constraints:**

1. Use `sh:targetNode` for direct entity targeting
2. Apply current subject redeclaration for multiple PropertyShapes
3. Use literal values for hasValue constraints
4. Combine multiple hasValue rules for comprehensive validation

**Key advantages:**
- ✅ **Exact value matching** - no ambiguity
- ✅ **Mandatory constants** - enforce required states
- ✅ **Status validation** - ensure proper system states
- ✅ **Identifier verification** - validate fixed identifiers

---

## 🎯 Use Cases

- **System status validation** - ensure services are in required states
- **Configuration verification** - validate mandatory settings
- **Environment enforcement** - ensure proper deployment environments
- **Version constraints** - validate specific required versions
- **Access level validation** - ensure proper permission levels






{=}



<a id="constraints-node"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <mdld:shacl/example/node/>
[xsd] <http://www.w3.org/2001/XMLSchema#>

# Node Constraint {=sh:node .class:NodeConstraint label}

> Requires property values to conform to a specific node shape. Essential for validating complex nested objects and ensuring structural integrity of related entities. {comment}

<http://www.w3.org/ns/shacl#node> {?cat:fullIRI}

---

## Demo {=ex:demo ?cat:hasDemo}

This demo demonstrates node constraint using address validation scenario.

### Employee Validation Shape {=ex:EmployeeValidationShape .sh:NodeShape ?cat:hasShape label}

Targets all [employees] {+ex:Employee ?sh:targetClass} to validate address structure: **Employee must have valid address** {=ex:#addressRule .sh:PropertyShape ?sh:property sh:message}. Each [address] {+ex:address ?sh:path} property must point at a proper [Address node] {+ex:AddressShape ?sh:node} validation.

#### Address Shape {=ex:AddressShape .sh:NodeShape label}

Defines address requirements: **Street Rule** {=ex:#streetProperty ?sh:property label} and **City Rule** {=ex:#cityProperty ?sh:property label}.

**Street Rule** {=ex:#streetProperty .sh:PropertyShape} validates the [street] {+ex:street ?sh:path} property with at least [5] {sh:minLength ^^xsd:integer} characters.

**City Rule** {=ex:#cityProperty .sh:PropertyShape} validates the [city] {+ex:city ?sh:path} property with at least [2] {sh:minLength ^^xsd:integer} characters.

---

### 📋 Test Data {=ex:data .Container}

#### Valid Employee {=ex:ValidEmployee .ex:Employee}

An employee with a complete, valid address.

Name: [John Doe] {ex:name}

Address: [Valid Address] {=ex:ValidAddress .ex:Address ?ex:address}
Street: [Main Street] {ex:street}
City: [New York] {ex:city}

#### Invalid Employee - Short Address {=ex:InvalidEmployee .ex:Employee}

An employee with an address that has insufficient detail.

Name: [Jane Smith] {ex:name}

Address: [Short Address] {=ex:ShortAddress .ex:Address ?ex:address}
Street: [St] {ex:street}
City: [NY] {ex:city}

#### Employee with Literal Address {=ex:LiteralEmployee .ex:Employee}

An employee with a literal address (node constraint doesn't apply to literals).

Name: [Bob Wilson] {ex:name}
Address: [123 Main St, Anytown] {ex:address}

---

[This demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Employee** - passes (address node conforms to AddressShape ✓)
2. **Invalid Employee - Short Address** - fails once (address node doesn't conform to AddressShape ✗)
3. **Employee with Literal Address** - passes (literal values are not validated by sh:node ✓)

Note: `sh:node` only applies to node values (IRIs/blank nodes), not literal values.

### 🔍 Test Validation

```bash
# This should show 1 violation - address with insufficient detail
ig-cli validate ./constraints/node.md
```

---

## 📝 MDLD Syntax Patterns

**Use cases:**
- **Address validation** - ensure complete address structure with required fields
- **Contact validation** - validate complex contact objects with nested properties
- **Product validation** - ensure product specifications meet structural requirements
- **Organization validation** - validate company information with required departments
- **Document validation** - ensure document metadata has complete structure

**Key advantages:**
- ✅ **Structural validation** - enforce complex object structure requirements
- ✅ **Nested validation** - validate related entities as part of parent validation
- ✅ **Reusability** - apply the same shape to multiple properties
- ✅ **Composition** - build complex validation from reusable shape components
- ✅ **Type safety** - ensure property values have expected structure

---

## 🔧 Technical Notes

### **Node Constraint Behavior:**
- `sh:node` applies only to node values (IRIs and blank nodes)
- Literal values are ignored by `sh:node` constraints
- The referenced shape is applied to each value node individually
- Violations are reported on the property that uses `sh:node`

### **SHACL Processing:**
- Node shapes can be reused across multiple properties
- Circular references between node shapes are handled properly
- Node constraints can be combined with other constraint types
- Performance depends on complexity of referenced shapes

### **Best Practices:**
- Use descriptive names for node shapes that clearly indicate their purpose
- Keep node shapes focused on specific validation concerns
- Test node shapes independently before using in node constraints
- Consider using `sh:datatype` for literal validation instead of `sh:node`
- Document the expected structure of node shapes clearly






{=}



<a id="constraints-in"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <mdld:shacl/example/in/>
[xsd] <http://www.w3.org/2001/XMLSchema#>

# Value Enumeration {=sh:in .class:PresenceConstraint label}

> Constrains property values to be within a specified list of allowed values using RDF lists. Essential for controlled vocabularies, status codes, and enumeration validation. {comment}

<http://www.w3.org/ns/shacl#in> {?cat:fullIRI}

---

## Demo {=ex:demo ?cat:hasDemo}

This demo demonstrates value enumeration using a status validation scenario.

### Status Validation Shape {=ex:StatusValidationShape .sh:NodeShape ?cat:hasShape label}

Targets all [employees] {+ex:Employee ?sh:targetClass} to validate status values.

**Status must be in allowed list** {=ex:#allowedStatus .sh:PropertyShape ?sh:property sh:message}

[Status] {+ex:status ?sh:path} must be either Active or Inactive. We need to define these using verbose RDF list syntax.

First we need a [List] {=ex:l1 ?sh:in .rdf:List} node with the first item assigned to it [Active] {+ex:Active ?rdf:first}, then followed by another [list] {=ex:l2 ?rdf:rest} node with the second item [Inactive] {+ex:Inactive ?rdf:first} followed by a nil node (end of list) [nil] {+rdf:nil ?rdf:rest} And reset current subject to avoid accidental assignments: {=}

---

### 📋 Test Data {=ex:data .Container}

#### Valid Employee {=ex:ValidEmployee .ex:Employee}

A valid employee with allowed status.

Status: [Active] {+ex:Active ?ex:status}

#### Invalid Status Employee {=ex:InvalidStatusEmployee .ex:Employee}

An employee with invalid status.

Status: [Pending] {+ex:Pending ?ex:status}

#### Missing Status Employee {=ex:MissingStatusEmployee .ex:Employee}

An employee with no status (not validated by sh:in).

---

[This demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Employee** - passes (status: Active ✓)
2. **Invalid Status Employee** - fails once (status: Pending ✗)
3. **Missing Status Employee** - not validated (no status property - sh:in doesn't check presence)

Note: `sh:in` only validates values if the property exists. Use `sh:minCount` to check for required properties.

### 🔍 Test Validation

```bash
# This should show 1 violation - invalid status value
ig-cli validate ./constraints/in.md
```

---

## 📝 MDLD Syntax Patterns

**Use cases:**
- **Controlled vocabularies** - status codes, priority levels
- **Enumeration validation** - department categories, document types
- **Value constraints** - allowed colors, sizes, formats
- **Business rules** - valid payment methods, shipping options
- **Data quality** - valid country codes, currency codes

**Key advantages:**
- ✅ **Explicit validation** - clearly defines allowed values
- ✅ **Ordered semantics** - maintains list structure in RDF
- ✅ **Flexible targeting** - works with any SHACL targeting mechanism
- ✅ **Business clarity** - makes allowed values visible in documentation
- ✅ **Type safety** - ensures only predefined values are used

---

## 🔧 Technical Notes

### **RDF List Structure:**
- Each list node has `rdf:type rdf:List`
- `rdf:first` contains the current item
- `rdf:rest` points to the next list node
- Final list node has `rdf:rest rdf:nil`

### **SHACL Behavior:**
- `sh:in` only validates existing property values
- Does not check for property presence (use `sh:minCount` for that)
- Works with any datatype (IRIs, literals, numbers)
- List order is preserved but not significant for validation

### **Performance Considerations:**
- RDF lists are traversed during validation
- Large lists may impact performance
- Consider `sh:hasValue` for single-value constraints
- Use `sh:pattern` for pattern-based validation when appropriate






{=}



<a id="constraints-qualifiedcount"></a>

[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <mdld:shacl/example/qualified/>
[xsd] <http://www.w3.org/2001/XMLSchema#>

# Qualified Count Constraints {=sh:qualifiedMinCount .class:QualifiedConstraint label}

> Applies count constraints only to values that meet additional shape criteria. Essential for conditional validation where only certain values should be counted. {comment}

<http://www.w3.org/ns/shacl#qualifiedMinCount> {?cat:fullIRI}
<http://www.w3.org/ns/shacl#qualifiedMaxCount> {?cat:fullIRI}

---

## Demo {=ex:demo ?cat:hasDemo}

This demo demonstrates qualified constraints using work email validation scenario.

### Work Email Validation Demo

The **Employee Validation Shape** {=ex:EmployeeValidationShape .sh:NodeShape ?cat:hasShape label} targets all [employees] {+ex:Employee ?sh:targetClass} to validate work email requirements:

**Employee must have exactly one work email** {=ex:#workEmailRule .sh:PropertyShape ?sh:property sh:message} applies to every [email] {+ex:email ?sh:path} property with qualified constraints: it must have exactly [1] {sh:qualifiedMinCount sh:qualifiedMaxCount ^^xsd:integer} work email that matches the **Work Email Shape** {=ex:WorkEmailShape .sh:NodeShape ?sh:qualifiedValueShape} which defines what counts as a work email: must be a [literal] {+sh:Literal ?sh:nodeKind} with [string] {+xsd:string ?sh:datatype} type and pattern [company.org] {sh:pattern}.

### 📋 Test Data {=ex:data .Container}

#### Valid Employee {=ex:ValidEmployee .ex:Employee}

A valid employee with exactly one work email.

Name: [John Doe] {ex:name}
Email: [john@company.org] {ex:email}

#### Invalid Employee - Multiple Work Emails {=ex:MultipleWorkEmployee .ex:Employee}

An employee with multiple work emails (violates qualifiedMaxCount).

Name: [Jane Smith] {ex:name}
Email: [jane@company.org] {ex:email}
Email: [jane.smith@company.org] {ex:email}

#### Invalid Employee - No Work Email {=ex:NoWorkEmployee .ex:Employee}

An employee with no work email (violates qualifiedMinCount).

Name: [Bob Wilson] {ex:name}
Email: [bob@gmail.com] {ex:email}

#### Valid Employee - Mixed Emails {=ex:MixedEmailEmployee .ex:Employee}

A valid employee with one work email and one personal email.

Name: [Alice Brown] {ex:name}
Email: [alice@company.org] {ex:email}
Email: [alice.personal@gmail.com] {ex:email}

---

[This demo] {=ex:demo} must produce exactly **2** {cat:expectsViolations ^^xsd:integer} violations.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Employee** - passes (1 work email ✓, meets qualifiedMinCount 1 and qualifiedMaxCount 1)
2. **Invalid Employee - Multiple Work Emails** - fails once (2 work emails ✗, exceeds qualifiedMaxCount 1)
3. **Invalid Employee - No Work Email** - fails once (0 work emails ✗, below qualifiedMinCount 1)
4. **Valid Employee - Mixed Emails** - passes (1 work email ✓, personal email ignored by qualified constraint)

Note: Qualified constraints only count values that conform to the qualified shape.

### 🔍 Test Validation

```bash
# This should show 2 violations - multiple work emails and no work email
ig-cli validate ./constraints/qualified.md
```

---

## 📝 MDLD Syntax Patterns

**Use cases:**
- **Work email validation** - require exactly one work email, allow personal emails
- **Primary contact validation** - ensure one primary phone number among multiple contacts
- **Business address validation** - require one business address, allow home addresses
- **Role-based validation** - count only values with specific characteristics
- **Conditional counting** - apply constraints only to values meeting criteria

**Key advantages:**
- ✅ **Selective validation** - only count/validate values that meet criteria
- ✅ **Conditional logic** - apply constraints based on value characteristics
- ✅ **Flexible counting** - mix required and optional values elegantly
- ✅ **Business rules** - model real-world validation scenarios
- ✅ **Data quality** - ensure specific types of values meet requirements

---

## 🔧 Technical Notes

### **Qualified Constraint Components:**
- `sh:qualifiedMinCount` - minimum count of values that conform to qualified shape
- `sh:qualifiedMaxCount` - maximum count of values that conform to qualified shape
- `sh:qualifiedValueShape` - shape that values must conform to be counted
- `sh:qualifiedValueShapesDisjoint` - ensure qualified value shapes are mutually exclusive

### **SHACL Behavior:**
- Qualified constraints only consider values that conform to the qualified shape
- Non-conforming values are ignored for counting purposes
- Regular constraints apply to all values (conforming and non-conforming)
- Can be combined with regular constraints for comprehensive validation

### **Best Practices:**
- Use clear qualified shapes that define specific value characteristics
- Test qualified shapes independently before using in qualified constraints
- Document what counts as "qualified" values clearly
- Consider performance implications for complex qualified shapes
- Use descriptive names for qualified constraints and shapes






{=}



<a id="constraints-closed"></a>

[mdld] <https://mdld.js.org/vocab/>
[cat] <https://mdld.js.org/shacl/catalog/>
[schema] <http://schema.org/>
[xsd] <http://www.w3.org/2001/XMLSchema#>

# Closed World Constraint {=sh:closed .class:ClosedWorldConstraint label}

> Enables closed world validation where only explicitly declared properties are allowed. Essential for strict data modeling, schema enforcement, and preventing property proliferation in RDF graphs. {comment}

<http://www.w3.org/ns/shacl#closed> {?cat:fullIRI}

***

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
ig-cli validate ./constraints/closed.md
```

***

## 📝 MDLD Syntax Patterns

**Use cases:**

* **Schema enforcement** - ensure data follows strict property definitions

* **Data quality** - prevent accidental property introduction

* **API validation** - enforce contract-based property sets

* **Migration safety** - prevent property drift during data migration

**Key behavior:**

* **Property whitelist** - only explicitly declared properties are valid

* **Violation per undeclared property** - each unknown property generates a violation

* **Shape-level constraint** - applies to all properties of the target node

* **Strict validation** - more restrictive than open world RDF semantics






{=}



<a id="constraints-deactivated"></a>

[mdld] <https://mdld.js.org/vocab/>
[cat] <https://mdld.js.org/shacl/catalog/>
[ex] <http://example.org/>
[xsd] <http://www.w3.org/2001/XMLSchema#>

# Deactivated Constraint {=sh:deactivated .class:DeactivatedConstraint label}

> Temporarily disables specific constraints during validation. Essential for phased validation, conditional rule enforcement, and managing constraint lifecycle in evolving schemas. {comment}

<http://www.w3.org/ns/shacl#deactivated> {?cat:fullIRI}

---

## Demo {=ex:demo ?cat:hasDemo}

This demo demonstrates deactivated constraint using user account validation.

### Shape

The **Deactivated Example Shape** {=ex:DeactivatedExampleShape .sh:NodeShape ?cat:hasShape label} targets [Valid Node] {+ex:ValidNode ?sh:targetNode}  [Invalid Node] {+ex:InvalidNode  ?sh:targetNode} to validate user account properties with **Active Status Rule** {+ex:ActiveProperty ?sh:property label} and **Deactivated Category Rule** {+ex:DeactivatedProperty ?sh:property label} 

### Rules

**User status must be active** {=ex:ActiveProperty .sh:PropertyShape sh:message}: [status] {+ex:status ?sh:path} must be [active] {sh:hasValue}.

**Must have premium category** {=ex:DeactivatedProperty .sh:PropertyShape sh:message}: [category] {+ex:category ?sh:path} is always [premium] {sh:hasValue}. Was temporarily [deactivated] {sh:deactivated}.

### 📋 Test Data {=ex:data .Container}

#### Valid Account {=ex:ValidNode}

Account with active status (satisfies active rule).

Status: [active] {ex:status}
Category: [basic] {ex:category}  # Would violate category rule but it's deactivated

#### Invalid Account {=ex:InvalidNode}

Account with inactive status (violates active rule).

Status: [inactive] {ex:status}  # Violates active rule
Category: [basic] {ex:category}  # Would violate category rule but it's deactivated

---

[This demo] {=ex:demo} must produce exactly **1** {cat:expectsViolations ^^xsd:integer} violation.

### Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Account** - passes (status is "active" ✓, category rule deactivated ✓)
2. **Invalid Account** - fails once (status is "inactive" ✗, category rule deactivated ✓)

### 🔍 Test Validation

```bash
# This should show 1 violation - only from active status rule
ig-cli validate ./constraints/deactivated.md
```

---

## 📝 MDLD Syntax Patterns

**Use cases:**
- **Phased validation** - enable/disable constraints during schema migration
- **Conditional enforcement** - temporarily suspend business rules during maintenance
- **A/B testing** - compare validation with different constraint sets
- **Gradual rollout** - enable constraints incrementally across systems

**Key behavior:**
- **Constraint-level control** - applies to individual constraints, not entire shapes
- **Validation exclusion** - deactivated constraints are completely ignored
- **No side effects** - deactivated constraints don't affect other validations
- **Runtime flexibility** - can be toggled without schema changes

**Deactivation strategies:**
- **Maintenance mode** - disable non-critical constraints during system updates
- **Legacy data** - temporarily relax rules for historical data migration
- **Feature flags** - enable/disable validation based on application features






{=}



<a id="constraints-severity"></a>

[mdld] <https://mdld.js.org/vocab/>
[cat] <https://mdld.js.org/shacl/catalog/>
[ex] <http://example.org/>
[xsd] <http://www.w3.org/2001/XMLSchema#>

# Severity Levels {=sh:severity .class:SeverityConstraint label}

> Defines the severity level of validation violations (Info, Warning, Violation). Essential for prioritizing validation results and managing different types of constraint failures. {comment}

<http://www.w3.org/ns/shacl#severity> {?cat:fullIRI}
<http://www.w3.org/ns/shacl#message> {?cat:fullIRI}

---

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
ig-cli validate ./constraints/severity.md
```

---

## 📝 MDLD Syntax Patterns

**Recommended pattern for severity and message constraints:**

1. **Named PropertyShapes** - Use explicit nodes for better organization
2. **Severity levels** - Apply `sh:Violation`, `sh:Warning`, or `sh:Info`
3. **Custom messages** - Provide clear, actionable error descriptions
4. **Class targeting** - Use `sh:targetClass` for domain validation

**Severity levels:**
- **sh:Violation** - Critical errors that must be fixed
- **sh:Warning** - Non-critical issues that should be addressed
- **sh:Info** - Informational messages for improvement

**Message best practices:**
- **Clear and concise** - Explain what's wrong and how to fix
- **User-friendly** - Avoid technical jargon where possible
- **Actionable** - Provide guidance for resolution
- **Context-specific** - Tailor to the constraint being violated

**Use cases:**
- **Critical validation** - Required fields, format validation
- **Business rules** - Policy compliance, data quality
- **User experience** - Optional but recommended fields
- **System monitoring** - Performance thresholds, usage patterns






{=}



<a id="constraints-message"></a>

[mdld] <https://mdld.js.org/vocab/>
[cat] <https://mdld.js.org/shacl/catalog/>
[ex] <http://example.org/>
[xsd] <http://www.w3.org/2001/XMLSchema#>

# Violation Message {=sh:message .class:MessageConstraint label}

> Provides human-readable error messages for constraint violations. Essential for user-friendly validation feedback, debugging, and actionable error reporting. {comment}

<http://www.w3.org/ns/shacl#message> {?cat:fullIRI}

---

## Demo {=ex:demo ?cat:hasDemo}

This demo demonstrates semantic message design using complex business validation scenarios.

### Shape

The **Business Rule Validation Shape** {=ex:BusinessRuleValidationShape .sh:NodeShape ?cat:hasShape label} targets all [contracts] {+ex:Contract ?sh:targetClass} to validate complex business requirements: **Contract Value Rule** {+ex:ContractValueRule ?sh:property label} and  **Approval Date Rule** {+ex:ApprovalDateRule ?sh:property label}.

### Rules

**Contract value must be positive for financial compliance** {=ex:ContractValueRule .sh:PropertyShape sh:message} ensures [contract value] {+ex:contractValue ?sh:path} is greater than [0] {sh:minInclusive ^^xsd:decimal}.

**Contract must be approved before start date** {=ex:ApprovalDateRule .sh:PropertyShape sh:message}: [approval date] {+ex:approvalDate ?sh:path} is [before start date] {+ex:startDate ?sh:lessThan}.


## 📋 Test Data {=ex:data .Container}

### Valid Contract {=ex:ValidContract .ex:Contract}

Contract that meets all business requirements.

Value: [50000.00] {ex:contractValue ^^xsd:decimal}
Approval Date: [2024-01-15] {ex:approvalDate ^^xsd:date}
Start Date: [2024-02-01] {ex:startDate ^^xsd:date}

### Invalid Contract {=ex:InvalidContract .ex:Contract}

Contract with multiple business rule violations.

Value: [-1000.00] {ex:contractValue ^^xsd:decimal}  # Negative value
Approval Date: [2024-03-01] {ex:approvalDate ^^xsd:date}  # After start date
Start Date: [2024-02-01] {ex:startDate ^^xsd:date}

---

[This demo] {=ex:demo} must produce exactly **2** {cat:expectsViolations ^^xsd:integer} violations.

## Expected Validation Results {=ex:results ?cat:hasResults}

1. **Valid Contract** - passes (positive value, approved before start, acceptable risk ✓)
2. **Invalid Contract** - fails two times:
   - **Value violation**: Contract value must be positive for financial compliance ✗
   - **Date violation**: Contract must be approved before start date ✗

### 🔍 Test Validation

```bash
# This should show 2 violations with semantic business messages
ig-cli validate ./constraints/message.md
```

---

## 📝 Message Design Principles

**Semantic clarity:**
- **Business context** - Explain what business rule is violated
- **Impact description** - Describe why this matters
- **Actionable guidance** - Suggest how to fix the issue
- **Domain terminology** - Use appropriate business language

**Message structure patterns:**

### 1. Comparison Constraints
```md
**[Property] must be [relationship] [reference property]**: **[Business consequence]**
```
*Example*: "Contract must be approved before start date"
*Why*: Explains temporal business rule clearly

### 2. Value Range Constraints  
```md
**[Property] must be [condition] for [business requirement]**: **[Compliance reason]**
```
*Example*: "Contract value must be positive for financial compliance"
*Why*: Connects technical rule to business purpose

### 3. Enumeration Constraints
```md
**[Property] must be within acceptable [domain] parameters**: **[Business justification]**
```
*Example*: "Risk level must be within acceptable business parameters"
*Why*: Explains domain validation in business terms

## 🎯 Advanced Message Techniques

**Context-aware messaging:**
- **Multi-constraint scenarios** - Different messages for related violations
- **Severity-appropriate language** - Critical vs. informational tone
- **User role consideration** - Technical vs. business audience
- **Internationalization ready** - Clear, translatable messages

**Complex scenario handling:**
- **Cascading violations** - When one failure causes others
- **Interdependent rules** - Messages that reference related constraints
- **Business process flow** - Messages that follow workflow logic
- **Compliance reporting** - Regulatory and audit-focused language

**Message quality checklist:**
- ✅ **Specific** - Identifies exact constraint violated
- ✅ **Semantic** - Carries business meaning, not just technical
- ✅ **Actionable** - Provides clear resolution path
- ✅ **Consistent** - Uses uniform terminology across constraints
- ✅ **Concise** - Delivers maximum information efficiently
