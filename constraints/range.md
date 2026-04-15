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

## 📋 Quick Start Pattern

~~~~~~md
[ex] <mdld:shacl/example/range/>

### Shape Definition

**Event ticket prices must be between $10.00 and $1000.00 inclusive** {=ex:#priceRange .sh:PropertyShape sh:message}
[ticketPrice] {+ex:price ?sh:path} must be at least [10.00] {sh:minInclusive ^^xsd:decimal} and at most [1000.00] {sh:maxInclusive ^^xsd:decimal}.

**Event attendees must be strictly between 18 and 65 years old** {=ex:#ageRange .sh:PropertyShape sh:message}
[attendeeAge] {+ex:age ?sh:path} must be greater than [18] {sh:minExclusive ^^xsd:integer} and less than [65] {sh:maxExclusive ^^xsd:integer}.

---

### Test Data {=ex:data .Container}

#### Valid Event {=ex:ValidEvent ?member}
Ticket Price: [99.99] {ex:price ^^xsd:decimal}
Attendee Age: [25] {ex:age ^^xsd:integer}

#### Invalid Event - Low Price {=ex:InvalidEventLowPrice ?member}
Ticket Price: [5.99] {ex:price ^^xsd:decimal}
Attendee Age: [25] {ex:age ^^xsd:integer}

#### Invalid Event - Underage {=ex:InvalidEventYoungAge ?member}
Ticket Price: [99.99] {ex:price ^^xsd:decimal}
Attendee Age: [18] {ex:age ^^xsd:integer}

---

[Demo] {=ex:demo} must produce exactly **2** {cat:expectsViolations ^^xsd:integer} violations.
~~~~~~

---

## 📝 MDLD Syntax Patterns

Range constraints control the value range for ordered datatypes.

~~~~~~md
**[Property] must be in [Min]-[Max] range** {=ex:PropertyRangeConstraint .sh:PropertyShape sh:message}

[Property Name] {+ex:propertyName ?sh:path} must be at least [min] {sh:minInclusive ^^xsd:datatype} and at most [max] {sh:maxInclusive ^^xsd:datatype}.
~~~~~~

**Key components:**
- **Property path** - The property to validate (`{+ex:propertyName ?sh:path}`)
- **Minimum inclusive** - Minimum value inclusive (`{sh:minInclusive ^^xsd:datatype}`)
- **Maximum inclusive** - Maximum value inclusive (`{sh:maxInclusive ^^xsd:datatype}`)
- **Minimum exclusive** - Minimum value exclusive (`{sh:minExclusive ^^xsd:datatype}`)
- **Maximum exclusive** - Maximum value exclusive (`{sh:maxExclusive ^^xsd:datatype}`)
- **Validation message** - Human-readable error message (`{sh:message}`)

**Important notes:**
- Works with ordered datatypes (numbers, dates, times, strings)
- Inclusive bounds include boundary values
- Exclusive bounds exclude boundary values
- Use minInclusive for "at least X"
- Use maxInclusive for "at most X"
- Use minExclusive for "greater than X"
- Use maxExclusive for "less than X"

---

## 🎯 Use Cases

- **Price validation** - Ensure prices are within acceptable range
- **Age restrictions** - Enforce age limits (inclusive vs exclusive)
- **Date validation** - Ensure dates are within valid period
- **Quantity limits** - Validate numeric ranges
- **Score validation** - Ensure scores are within bounds

---

## 🔧 Implementation Guidelines

**When to use range:**
- **Numeric validation** - When values must be within numeric bounds
- **Date validation** - When dates must be within time period
- **Age restrictions** - Enforce age limits with inclusive/exclusive
- **Business rules** - Implement range-based business logic
- **Data quality** - Ensure values are within expected ranges

**Best practices:**
- Use inclusive bounds for "at least/at most"
- Use exclusive bounds for "greater than/less than"
- Combine min and max for complete range validation
- Test with boundary values
- Document why range limits are needed

**Common pitfalls:**
- ❌ Using wrong inclusive/exclusive bound for the use case
- ❌ Forgetting to specify the datatype
- ❌ Not testing boundary values
- ❌ Confusing inclusive with exclusive bounds
- ❌ Using range when comparison constraint would be more appropriate
