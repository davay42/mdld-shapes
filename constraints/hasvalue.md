[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <mdld:shacl/example/hasvalue/>
[xsd] <http://www.w3.org/2001/XMLSchema#>

# Has Value {=sh:hasValue .class:Constraint label}

> Requires a property to have exactly this specific value - useful for fixed status fields, required constants, or mandatory identifiers. {comment}

<http://www.w3.org/ns/shacl#hasValue> {?cat:fullIRI}

---

## 📋 Quick Start Pattern

~~~~~~md
[ex] <mdld:shacl/example/hasvalue/>

### Shape Definition

**Main server must have active status** {=ex:#statusRequired .sh:PropertyShape sh:message}
[status] {+ex:status ?sh:path} must be exactly [active] {sh:hasValue}.

**Main server must be in production environment** {=ex:#environmentRequired .sh:PropertyShape sh:message}
[environment] {+ex:environment ?sh:path} must be exactly [production] {sh:hasValue}.

---

### Test Data {=ex:data .Container}

#### Main Server {=ex:MainServer ?member}
Status: [active] {ex:status}
Environment: [production] {ex:environment}

#### Backup Server {=ex:BackupServer ?member}
Status: [standby] {ex:status}
Environment: [production] {ex:environment}

#### Development Server {=ex:DevelopmentServer ?member}
Status: [active] {ex:status}
Environment: [development] {ex:environment}

---

[Demo] {=ex:demo} must produce exactly **2** {cat:expectsViolations ^^xsd:integer} violations.
~~~~~~

---

## 📝 MDLD Syntax Patterns

The hasValue constraint requires a property to have exactly a specific value.

~~~~~~md
**[Property] must be [Value]** {=ex:PropertyHasValueConstraint .sh:PropertyShape sh:message}

[Property Name] {+ex:propertyName ?sh:path} must be exactly [Value] {sh:hasValue}.
~~~~~~

**Key components:**
- **Property path** - The property to validate (`{+ex:propertyName ?sh:path}`)
- **Required value** - The exact value required (`{sh:hasValue}`)
- **Validation message** - Human-readable error message (`{sh:message}`)
- **Exact match** - Property must have exactly this value

**Important notes:**
- HasValue requires exact match, no partial matches
- Works with both literal values and IRIs
- Property must have the value (use minCount for required properties)
- Often used with NOT constraint to forbid specific values
- Cannot be used with other value constraints on same property

---

## 🎯 Use Cases

- **Fixed status fields** - Ensure status is exactly "active" or "inactive"
- **Required constants** - Enforce mandatory constant values
- **Environment flags** - Ensure environment is "production" or "development"
- **System identifiers** - Validate specific system identifiers
- **Configuration validation** - Ensure configuration values are correct

---

## 🔧 Implementation Guidelines

**When to use hasValue:**
- **Fixed values** - When a property must have a specific constant value
- **Status validation** - Ensure status fields have required values
- **Configuration** - Validate configuration properties
- **Business rules** - Enforce specific business rule values
- **Data integrity** - Ensure critical properties have correct values

**Best practices:**
- Use hasValue for fixed, unchanging values
- Combine with NOT constraint to forbid specific values
- Use descriptive property names for clarity
- Test with both valid and invalid values
- Consider using enum patterns for multiple allowed values

**Common pitfalls:**
- ❌ Using hasValue for variable values (use other constraints instead)
- ❌ Forgetting that hasValue requires exact match
- ❌ Not combining with minCount for required properties
- ❌ Using hasValue when datatype constraint would be more appropriate
- ❌ Confusing hasValue with in constraint (hasValue for single value, in for multiple)
