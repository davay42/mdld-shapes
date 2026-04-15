[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[class] <cat:class/>
[ex] <cat:example/nodekind/>

# Node Kind {=sh:nodeKind .class:Constraint label}

> Expects a node to be of a specific kind (blank node, IRI, or literal) {comment}

<http://www.w3.org/ns/shacl#nodeKind> {?cat:fullIRI}

---

## � Quick Start Pattern

~~~~~~md
[ex] <cat:example/nodekind/>

### Shape Definition

**Document content must be a literal** {=ex:#contentLiteral .sh:PropertyShape sh:message}
[content] {+ex:content ?sh:path} must be a [Literal] {+sh:Literal ?sh:nodeKind}.

**Document reference must be an IRI** {=ex:#referenceIRI .sh:PropertyShape sh:message}
[reference] {+ex:reference ?sh:path} must be an [IRI] {+sh:IRI ?sh:nodeKind}.

---

### Test Data {=ex:data .Container}

#### Valid Document {=ex:ValidDocument .ex:Document ?member}
Content: [This is the document content] {ex:content}
Reference: <https://example.org/reference> {?ex:reference}

#### Invalid Document {=ex:InvalidDocument .ex:Document ?member}
Content: <https://example.org/invalid-content> {?ex:content}
Reference: [Invalid Reference String] {ex:reference}

---

[Demo] {=ex:demo} must produce exactly **2** {cat:expectsViolations ^^xsd:integer} violations.
~~~~~~

---

## 📝 MDLD Syntax Patterns

The node kind constraint validates that values are IRIs or literals (MDLD doesn't produce blank nodes).

~~~~~~md
**[Property] must be [NodeKind]** {=ex:PropertyNodeKindConstraint .sh:PropertyShape sh:message}

[Property Name] {+ex:propertyName ?sh:path} must be a [NodeKind] {+sh:NodeKind ?sh:nodeKind}.
~~~~~~

**Key components:**
- **Property path** - The property to validate (`{+ex:propertyName ?sh:path}`)
- **Node kind reference** - The required node kind (`{+sh:IRI ?sh:nodeKind}` or `{+sh:Literal ?sh:nodeKind}`)
- **Validation message** - Human-readable error message (`{sh:message}`)
- **Type checking** - Ensures values are IRI or literal

**Important notes:**
- MDLD doesn't produce blank nodes, focus on IRI and Literal
- IRI values use `<URL> {?property}` syntax
- Literal values use `[text] {property}` syntax
- Use `datatype` constraint for literal type validation
- Use `class` constraint for IRI type validation

---

## 🎯 Use Cases

- **Document management** - Content must be literal, references must be IRI
- **API endpoints** - URLs must be IRI, response bodies must be literal
- **User profiles** - User IDs must be IRI, names must be literal
- **Type safety** - Ensure references are IRIs, content is literal

---

## 🔧 Implementation Guidelines

**When to use nodeKind:**
- **Type safety** - Ensure references are IRIs, content is literal
- **Data integrity** - Validate node types match expected patterns
- **Schema validation** - Enforce proper RDF node kind constraints
- **MDLD-specific** - Since MDLD doesn't produce blank nodes, focus on IRI/Literal

**Best practices:**
- Use correct syntax: IRIs with `<URL> {?property}`, literals with `[text] {property}`
- Combine with `datatype` constraint for literal type validation
- Combine with `class` constraint for IRI type validation
- Test both valid and invalid node kind examples

**Common pitfalls:**
- ❌ Using wrong syntax for IRI vs literal values
- ❌ Confusing nodeKind with datatype (nodeKind for IRI/Literal, datatype for literal types)
- ❌ Forgetting MDLD doesn't produce blank nodes
- ❌ Not combining with other constraints for complete validation
- ❌ Using nodeKind when datatype or class constraint would be more specific
