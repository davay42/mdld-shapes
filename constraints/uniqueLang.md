[mdld] <https://mdld.js.org/vocab/>
[cat] <https://mdld.js.org/shacl/catalog/>
[ex] <ttps://mdld.js.org/shacl/catalog/uniqueLang/example/>
[xsd] <http://www.w3.org/2001/XMLSchema#>

# Unique Languages Constraint {=sh:uniqueLang .class:UniqueLanguageConstraint label}

> Ensures that language tags of string literals are unique within a property. Essential for multilingual content management, preventing duplicate language entries, and maintaining clean internationalization data. {comment}

<http://www.w3.org/ns/shacl#uniqueLang> {?cat:fullIRI}

---

## 📋 Quick Start Pattern

~~~~~~md
[mdld] <https://mdld.js.org/vocab/>
[cat] <https://mdld.js.org/shacl/catalog/>
[ex] <ttps://mdld.js.org/shacl/catalog/uniqueLang/example/>
[xsd] <http://www.w3.org/2001/XMLSchema#>

### Shape Definition

**Each language tag must appear only once** {=ex:UniqueLangExampleShape .sh:NodeShape ?cat:hasShape label}
[title] {+ex:title ?sh:path} values have [unique language tags] {sh:uniqueLang ^^xsd:boolean}: **Each language tag must appear only once** {sh:message}.

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
~~~~~~

---

## 📝 MDLD Syntax Patterns

The uniqueLang constraint ensures that language tags of string literals are unique within a property.

~~~~~~md
**[Property] must have unique language tags** {=ex:PropertyUniqueLangConstraint .sh:PropertyShape sh:message}

[Property Name] {+ex:propertyName ?sh:path} values have [true] {sh:uniqueLang ^^xsd:boolean}.
~~~~~~

**Key components:**
- **Property path** - The property to validate (`{+ex:propertyName ?sh:path}`)
- **Unique language flag** - Enables unique language validation (`{sh:uniqueLang ^^xsd:boolean}`)
- **Validation message** - Human-readable error message (`{sh:message}`)
- **Language tag uniqueness** - Prevents duplicate language tags

**Important notes:**
- Only applies to language-tagged string literals
- Prevents duplicate language tags within the same property
- Works with multilingual content management
- Use `@lang` syntax for language-tagged literals
- Boolean value must be `true` to enable constraint

---

## 🎯 Use Cases

- **Multilingual content** - Prevent duplicate language entries
- **Internationalization** - Maintain clean i18n data
- **Translation management** - Ensure unique language tags
- **Content localization** - Prevent redundant translations
- **Language consistency** - Ensure one entry per language

---

## 🔧 Implementation Guidelines

**When to use uniqueLang:**
- **Multilingual content** - When content has language-tagged values
- **Translation management** - Prevent duplicate language entries
- **Internationalization** - Maintain clean i18n data
- **Content localization** - Ensure unique language tags
- **Language consistency** - One entry per language

**Best practices:**
- Use with language-tagged string literals
- Combine with languageIn for complete language validation
- Test with duplicate and unique language tags
- Document why language tags must be unique
- Consider cardinality constraints alongside uniqueLang

**Common pitfalls:**
- ❌ Using uniqueLang on non-language-tagged literals
- ❌ Forgetting to use `@lang` syntax
- ❌ Not testing with duplicate language tags
- ❌ Not combining with languageIn for complete validation
- ❌ Confusing uniqueLang with other string constraints
