[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>

# Practical Workflow: Designing a Complete Shape

> Step-by-step example of designing a multi-constraint shape for a real-world use case {comment}

## Use Case: E-Commerce Product Validation

We need to validate product data with these requirements:
- Product must have a name (required)
- Product must have a price (required, must be positive)
- Product must have a category (must be from allowed list)
- Product description is optional but if present must be at least 10 characters
- Product SKU must follow pattern "PROD-XXXXX" (5 digits)

## Step 1: Define the Shape and Target

~~~~~~md
[ex] <tag:my@example.org,2026:product/>

**Product Validation Shape** {=ex:ProductShape .sh:NodeShape ?cat:hasShape label}
Validates all [Product] {+ex:Product ?sh:targetClass} instances.
~~~~~~

## Step 2: Add Required Properties

~~~~~~md
**Product name is required** {=ex:NameRule .sh:PropertyShape ?sh:property}
[name] {+ex:name ?sh:path} must have exactly [1] {sh:minCount sh:maxCount ^^xsd:integer} value.

**Product price is required** {=ex:PriceRule .sh:PropertyShape ?sh:property}
[price] {+ex:price ?sh:path} must have exactly [1] {sh:minCount sh:maxCount ^^xsd:integer} value.

**Product category is required** {=ex:CategoryRule .sh:PropertyShape ?sh:property}
[category] {+ex:category ?sh:path} must have exactly [1] {sh:minCount sh:maxCount ^^xsd:integer} value.
~~~~~~

## Step 3: Add Value Constraints

~~~~~~md
**Product price must be positive** {=ex:PriceRule .sh:PropertyShape ?sh:property}
[price] {+ex:price ?sh:path} must be at least [0.01] {sh:minInclusive ^^xsd:decimal}.
~~~~~~

## Step 4: Add Enumeration Constraint

~~~~~~md
**Product category must be from allowed list** {=ex:CategoryRule .sh:PropertyShape ?sh:property}
[category] {+ex:category ?sh:path} must be in allowed list.

**Allowed Categories List** {=ex:cat-l1 ?sh:in .rdf:List}: [Electronics] {rdf:first}, then [rest] {=ex:cat-l2 ?rdf:rest} by [Clothing] {rdf:first} and [nil] {+rdf:nil ?rdf:rest}. {=}
~~~~~~

## Step 5: Add Optional Property with Conditional Constraint

~~~~~~md
**Product description is optional** {=ex:DescriptionRule .sh:PropertyShape ?sh:property}
[description] {+ex:description ?sh:path} must have at least [10] {sh:minLength ^^xsd:integer} characters.
~~~~~~

## Step 6: Add Pattern Constraint

~~~~~~md
**Product SKU must match pattern** {=ex:SKURule .sh:PropertyShape ?sh:property}
[sku] {+ex:sku ?sh:path} must match [PROD-\d{5}] {sh:pattern}.
~~~~~~

## Complete Shape

~~~~~~md
[ex] <tag:my@example.org,2026:product/>

**Product Validation Shape** {=ex:ProductShape .sh:NodeShape ?cat:hasShape label}
Validates all [Product] {+ex:Product ?sh:targetClass} instances.

**Product name is required** {=ex:NameRule .sh:PropertyShape ?sh:property}
[name] {+ex:name ?sh:path} must have exactly [1] {sh:minCount sh:maxCount ^^xsd:integer} value.

**Product price is required and positive** {=ex:PriceRule .sh:PropertyShape ?sh:property}
[price] {+ex:price ?sh:path} must have exactly [1] {sh:minCount sh:maxCount ^^xsd:integer} value and be at least [0.01] {sh:minInclusive ^^xsd:decimal}.

**Product category is required and from allowed list** {=ex:CategoryRule .sh:PropertyShape ?sh:property}
[category] {+ex:category ?sh:path} must have exactly [1] {sh:minCount sh:maxCount ^^xsd:integer} value and be in allowed list.

**Allowed Categories List** {=ex:cat-l1 ?sh:in .rdf:List}: [Electronics] {rdf:first}, then [rest] {=ex:cat-l2 ?rdf:rest} by [Clothing] {rdf:first} and [nil] {+rdf:nil ?rdf:rest}. {=}

**Product description is optional but must be 10+ characters** {=ex:DescriptionRule .sh:PropertyShape ?sh:property}
[description] {+ex:description ?sh:path} must have at least [10] {sh:minLength ^^xsd:integer} characters.

**Product SKU must match pattern** {=ex:SKURule .sh:PropertyShape ?sh:property}
[sku] {+ex:sku ?sh:path} must match [PROD-\d{5}] {sh:pattern}.
~~~~~~

## Test Data

~~~~~~md
### Test Data {=ex:data .Container}

#### Valid Product {=ex:Laptop .ex:Product ?member}
Name: [MacBook Pro] {ex:name}
Price: [1299.99] {ex:price ^^xsd:decimal}
Category: [Electronics] {ex:category}
Description: [High-performance laptop] {ex:description}
SKU: [PROD-12345] {ex:sku}

#### Invalid Product - Missing Name {=ex:InvalidProduct1 .ex:Product ?member}
Price: [99.99] {ex:price ^^xsd:decimal}
Category: [Clothing] {ex:category}

#### Invalid Product - Negative Price {=ex:InvalidProduct2 .ex:Product ?member}
Name: [T-Shirt] {ex:name}
Price: [-10.00] {ex:price ^^xsd:decimal}
Category: [Clothing] {ex:category}

#### Invalid Product - Invalid Category {=ex:InvalidProduct3 .ex:Product ?member}
Name: [Shoes] {ex:name}
Price: [50.00] {ex:price ^^xsd:decimal}
Category: [Books] {ex:category}

#### Invalid Product - Short Description {=ex:InvalidProduct4 .ex:Product ?member}
Name: [Hat] {ex:name}
Price: [25.00] {ex:price ^^xsd:decimal}
Category: [Clothing] {ex:category}
Description: [Small] {ex:description}
~~~~~~

## Key Takeaways

1. **Start with targeting** - Define which data to validate first
2. **Add required properties** - Use minCount/maxCount for required fields
3. **Add value constraints** - Apply datatype, range, and pattern constraints
4. **Combine constraints** - Multiple constraints can apply to the same property
5. **Use RDF lists** - For enumeration (sh:in) and logical combinations (sh:and)
6. **Test thoroughly** - Create valid and invalid test cases for each rule
7. **Add error messages** - Use sh:message for user-friendly validation feedback

## Next Steps

- Explore [Targeting Mechanisms](../targeting/index.md) for more targeting options
- Learn about specific [Constraints](../constraints/index.md) for detailed constraint patterns
