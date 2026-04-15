[mdld] <https://mdld.js.org/>
[cat] <mdld:shacl/>
[class] <cat:class/>

# Catalog {=cat:index}

## Targeting Mechanism {+class:Targeting ?member .Class label}

These are targeting predicates that determine which nodes get validated (not constraints themselves): 

- [Target Class](./targetClass.md) {+sh:targetClass ?cat:includes .class:TargetingPredicate}
- [Target Node](./targetNode.md) {+sh:targetNode ?cat:includes .class:TargetingPredicate}
- [Target Subjects](./targetSubjectsOf.md) {+sh:targetSubjectsOf ?cat:includes .class:TargetingPredicate}
- [Target Objects](./targetObjectsOf.md) {+sh:targetObjectsOf ?cat:includes .class:TargetingPredicate}

---

## 📝 MDLD Syntax Reference

**Authors should refer to MDLD Spec and few-shot examples for complete syntax documentation. Key patterns:**

| Symbol | Meaning | Example |
|--------|---------|---------|
| `{=}` | Subject declaration (persists) | `{=ex:shape .sh:NodeShape}` |
| `{+}` | Object introduction (temporary for ?/! predicates) | `{+ex:target ?sh:targetClass}` |
| `?` | Object predicate (Subject → Object) | `?sh:targetClass`, `?sh:targetNode` |
| `!` | Reverse predicate (Object → Subject) | `!member` |
| `.` | Class type declaration | `.sh:NodeShape` |
| `^^` | Literal datatype | `^^xsd:integer` |
| `{}` | Subject reset (clears current subject) | `{=}` |

**Test data pattern:**
~~~~~~md
[Label] {+ex:instanceID ?ex:propertyName .ex:ClassName}
~~~~~~

**For detailed syntax, see:**
- MDLD Spec: `/Users/davay/Documents/DeFUCC/MDLD/mdld-parse/spec/Spec.md`
- Few-shot examples: `/Users/davay/Documents/DeFUCC/MDLD/mdld-parse/examples/few-shot.md`
