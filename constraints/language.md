[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[ex] <mdld:shacl/example/language/>


# Language In {=sh:languageIn .class:StringConstraint label}

> Constrains string literals to have language tags from a specified list using RDF lists. Essential for multilingual content validation and internationalization support. {comment}

<http://www.w3.org/ns/shacl#languageIn> {?cat:fullIRI}

---

## 📋 Quick Start Pattern

~~~~~~md
[ex] <tag:my@example.org,2026:language/>

### Shape Definition

**Title language must be in allowed list** {=ex:#titleLanguage .sh:PropertyShape ?sh:property sh:message}
[title] {+ex:title ?sh:path} language tags must be in the allowed list.

**Allowed Languages List** {=ex:lang-l1 ?sh:languageIn .rdf:List}: [en] {rdf:first}, 
then [followed] {=ex:lang-l2 ?rdf:rest} by [fr] {rdf:first} 
and [nil] {+rdf:nil ?rdf:rest}. Reset subject: {=}

---

### Test Data {=ex:data .Container}

#### English Document {=ex:EnglishDocument .ex:Document ?member}
Title: [Hello World] {ex:title @en}

#### French Document {=ex:FrenchDocument .ex:Document ?member}
Title: [Bonjour le monde] {ex:title @fr}

#### German Document {=ex:GermanDocument .ex:Document ?member}
Title: [Hallo Welt] {ex:title @de}

---

[Demo] {=ex:demo} must produce exactly **1** violation.
~~~~~~

---

## 📝 MDLD Syntax Patterns

The languageIn constraint constrains string literals to have language tags from a specified list.

~~~~~~md
**[Property] language must be in [List]** {=ex:PropertyLanguageInConstraint .sh:PropertyShape ?sh:property sh:message}

[Property Name] {+ex:propertyName ?sh:path} language tags must be in the allowed list.

**Allowed Languages List** {=ex:lang-l1 ?sh:languageIn .rdf:List}: [en] {rdf:first}, 
then [followed] {=ex:lang-l2 ?rdf:rest} by [fr] {rdf:first} 
and [nil] {+rdf:nil ?rdf:rest}. Reset subject: {=}
~~~~~~

**Key components:**
- **Property path** - The property to validate (`{+ex:propertyName ?sh:path}`)
- **List node** - RDF list container (`{=ex:lang-l1 ?sh:languageIn .rdf:List}`)
- **List elements** - Allowed language tags in the list (`{rdf:first}`)
- **List structure** - Linked list with `rdf:first`, `rdf:rest`, `rdf:nil`
- **Subject reset** - `{=}` prevents unintended subject continuation

**Important notes:**
- Uses verbose RDF list syntax (similar to AND and IN constraints)
- Only validates language tags if they exist
- Use `@lang` syntax for language-tagged literals
- Use `minCount` to check for required properties
- Language tags must be valid BCP 47 language codes

---

## 🎯 Use Cases

- **Multilingual content** - Restrict documents to specific languages
- **Regional compliance** - Ensure content meets language requirements
- **Content localization** - Validate language-specific versions
- **International standards** - Enforce language tag standards
- **Translation workflows** - Control which languages are allowed

---

## 🔧 Implementation Guidelines

**When to use languageIn:**
- **Multilingual support** - When content must be in specific languages
- **Regional compliance** - Ensure content meets regional language requirements
- **Content localization** - Validate language-specific content
- **Translation control** - Manage translation workflows
- **Internationalization** - Support global applications

**Best practices:**
- Use valid BCP 47 language codes (en, fr, de, es, etc.)
- Keep the language list short for maintainability
- Combine with `minCount` for required language tags
- Test with both valid and invalid language tags
- Use unique list identifiers to avoid collisions

**Common pitfalls:**
- ❌ Forgetting the subject reset `{=}` after list definition
- ❌ Reusing list identifiers causing collisions
- ❌ Using invalid BCP 47 language codes
- ❌ Not combining with `minCount` for required properties
- ❌ Confusing languageIn with other string constraints
