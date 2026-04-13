# 🎯 MDLD Shapes Catalog

[![SHACL](https://img.shields.io/badge/SHACL-W3C%20Standard-blue.svg)](https://www.w3.org/TR/shacl/)
[![MDLD](https://img.shields.io/badge/MDLD-Markdown%20Linked%20Data-green.svg)](https://mdld.js.org/)
[![Coverage](https://img.shields.io/badge/Coverage-75%25-orange.svg)](./constraints/)

> **Self-validating semantic documentation** - Author SHACL constraints in human-readable Markdown while maintaining full W3C standards compliance

## 🚀 What This Is

The MDLD Shapes catalog is a **breakthrough proof-of-concept** that demonstrates how **MDLD (Markdown Linked Data)** enables semantic knowledge authoring where:

- **📚 Documentation = Validation Rules** - No more separation between human docs and machine validation
- **🎯 W3C Standards Aligned** - Full SHACL specification compliance with RDF export
- **🔧 Production Ready** - Comprehensive constraint catalog with live validation examples
- **📖 Educational** - Learn SHACL through interactive, self-documenting examples

## ✨ Key Features

### 🎪 **Comprehensive Constraint Coverage**
- **23 constraint types** with working examples
- **75% SHACL specification coverage** including value types, cardinality, ranges, patterns
- **Live validation** with expected violation counts
- **Real-world use cases** from e-commerce, healthcare, finance

### 🎨 **Innovative MDLD Syntax**
```md
# Class Constraint {=sh:class .class:Constraint label}
> Expects each value to be an instance of a specific class {comment}

**Employee manager must be a Person instance** {=ex:#managerClass .sh:PropertyShape message} 
requires the [manager] {+ex:manager ?sh:path} property to be an instance of [Person] {+ex:Person ?sh:class}.
```

### 🛠️ **Complete Toolchain**
- **ig-cli** - Command-line validation and querying
- **Intelligraphs** - Visual graph exploration
- **RDF Export** - Standard Turtle/JSON-LD output
- **SPARQL Support** - Query your validation rules

## 📊 Catalog Statistics

- **32 files** with **2,310 RDF quads**
- **168 SHACL shapes** across **31 graphs**
- **23 constraint examples** with **28 test cases**
- **4 targeting mechanisms** for flexible validation

## 🚀 Quick Start

### Option 1: Clone and Run Locally
```bash
git clone https://github.com/davay42/mdld-shapes.git
cd mdld-shapes
curl -O https://app.intelligraphs.com/ig-cli.js
chmod +x ig-cli.js
mv ig-cli.js /usr/local/bin/ig-cli

# Explore the catalog
ig-cli stats
ig-cli validate ./constraints/class.md
ig-cli get entity https://mdld.js.org/shacl/example/class/InvalidEmployee
```

### Option 2: View with Intelligraphs
👉 [Open in Intelligraphs App](https://app.intelligraphs.com/#/?clone=https://github.com/davay42/mdld-shapes.git)

## 📚 Explore the Catalog

### 🎯 **[Start Here: Shapes Language Catalog](./index.md)**
Complete guide to all SHACL constraints and targeting mechanisms

### 🔧 **[Constraints](./constraints/)**
Validation rules organized by category:
- **Value Type** - Class, DataType, NodeKind
- **Cardinality** - Min/Max count validation  
- **String-based** - Patterns, Length, Language
- **Logical** - AND, NOT constraints
- **Range** - Numeric/Date boundaries
- **Advanced** - Node, Qualified, JavaScript

### 🎯 **[Targeting Mechanisms](./targeting/)**
Select which nodes to validate:
- **Target Class** - Validate all instances of a type
- **Target Node** - Validate specific nodes
- **Target Subjects/Objects** - Validate by property relationships

## 💡 Usage Examples

### Validate Data Quality
```bash
# Check all constraint examples
ig-cli validate ./constraints/

# Test specific constraint type
ig-cli validate ./constraints/pattern.md

# Get detailed entity information
ig-cli get entity https://mdld.js.org/shacl/example/range/ValidEvent
```

### Query Validation Rules
```bash
# List all SHACL shapes
ig-cli shapes

# Find all constraint types
ig-cli types | grep "Constraint"

# Export to standard RDF formats
ig-cli dump --format=ttl > shapes.ttl
```

## 🎯 Real-World Applications

### **E-commerce**
```md
# Product validation with price ranges and required fields
{+schema:Product ?sh:targetClass}
**Product price must be between $10.00 and $1000.00** {sh:message}
```

### **Healthcare**  
```md
# Patient data validation with HIPAA compliance
{+medical:Patient ?sh:targetClass}
**Patient records must have valid medical IDs** {sh:message}
```

### **Finance**
```md
# Transaction validation with audit requirements
{+financial:Transaction ?sh:targetClass}
**All transactions must be auditable** {sh:message}
```

## 🔍 Validation Results

### ✅ **Working Constraints (75%)**
- Value Type Constraints ✅
- Cardinality Constraints ✅  
- String Constraints ✅
- Range Constraints ✅
- Logical Constraints (AND/NOT) ✅
- Targeting Mechanisms ✅

### ⚠️ **In Development (25%)**
- Logical OR/XONE constraints
- Property path constraints  
- JavaScript/SPARQL constraints
- Advanced qualified constraints

## 🛣️ Roadmap

- [ ] Complete 100% SHACL specification coverage
- [ ] Performance optimization for large datasets
- [ ] Enhanced error reporting and debugging
- [ ] Integration with popular RDF stores
- [ ] Visual constraint editor
- [ ] Automated constraint generation from schemas


### Development Setup
```bash
git clone https://github.com/davay42/mdld-shapes.git
cd mdld-shapes
# Add your constraint examples
# Test with ig-cli validate
# Submit pull request
```

## 📖 Learn More

- **[MDLD Specification](https://mdld.js.org/)** - Markdown Linked Data format
- **[SHACL W3C Recommendation](https://www.w3.org/TR/shacl/)** - Shapes Constraint Language
- **[Intelligraphs Platform](https://app.intelligraphs.com/)** - Visual semantic web tools
- **[ig-cli Documentation](https://github.com/davay42/ig-cli)** - Command-line RDF tools

---

**🎯 Transform how you author semantic validation rules - Write once, validate everywhere, learn continuously.**

